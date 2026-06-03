# OneHandy Hostinger/Dokploy Deployment

This app is designed to run as a public Next.js service on Hostinger while Hermes, Arra, n8n, and database admin surfaces remain private.

## Required Environment

Set these in Dokploy or your Compose `.env` file:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.example
NEXT_PUBLIC_ONEHANDY_WHATSAPP_NUMBER=66929894495
COMPOSE_PROJECT_NAME=onehandy-v1
TRAEFIK_HOST=srv1691893.hstgr.cloud
POSTGRES_PASSWORD=...
ADMIN_PASSWORD=...
ADMIN_SESSION_SECRET=...
ADMIN_API_TOKEN=...
N8N_WEBHOOK_URL=https://n8n.your-domain.example/webhook/onehandy-events
N8N_WEBHOOK_SECRET=...
```

Use long random values for `ADMIN_SESSION_SECRET`, `ADMIN_API_TOKEN`, and `N8N_WEBHOOK_SECRET`. The public WhatsApp number is `0929894495`, normalized for `wa.me` as `66929894495`.

## First Deploy

1. Push the repo branch to GitHub.
2. In Dokploy or on the VPS, create a Docker Compose app from this repository.
3. Add the environment variables above.
4. Deploy the Compose stack.
5. Run the migration once inside the app container:

```bash
npm run db:migrate
```

6. Confirm health. With the temporary Hostinger route this is:

```bash
curl -i https://onehandy-v1.srv1691893.hstgr.cloud/api/health
```

Expected: `200` with `"status":"ok"` after Postgres is reachable.

## n8n Workflow

Create one production webhook in n8n and set its URL as `N8N_WEBHOOK_URL`. The app sends signed JSON payloads with:

- `X-OneHandy-Event`
- `X-OneHandy-Signature: sha256=<hex-hmac>`

Verify the signature in n8n using the exact raw JSON body and `N8N_WEBHOOK_SECRET`. Events are stored in `n8n_event_logs`; failed or pending events can be retried from `/admin/settings`.

The importable workflow at `docs/n8n/onehandy-events-workflow.json` is the V1 event processor. It accepts:

- `service_request.created`
- `service_request.updated`
- `technician_application.created`
- `technician_application.updated`

For `service_request.created`, n8n calls the private Hermes webhook and Hermes sends the owner a Telegram alert with request details, safe English/Thai reply drafts, the admin request link, and a prefilled customer `wa.me` reply link. V1 does not automatically send WhatsApp messages to customers; the owner reviews and sends manually from WhatsApp.

Set these n8n container variables without committing real secrets:

```bash
ONEHANDY_N8N_WEBHOOK_SECRET=same-value-as-N8N_WEBHOOK_SECRET
ONEHANDY_HERMES_WEBHOOK_URL=http://172.16.2.1:8644/webhooks/onehandy-draft
ONEHANDY_HERMES_WEBHOOK_SECRET=...
ONEHANDY_SITE_URL=https://onehandy-v1.srv1691893.hstgr.cloud
ONEHANDY_PUBLIC_WHATSAPP_NUMBER=66929894495
NODE_FUNCTION_ALLOW_BUILTIN=crypto
```

The Hermes webhook may listen on `8644`, but it must be blocked from public internet access with UFW and called privately from n8n through the Docker host gateway.

## Security Notes

- Do not expose Postgres, Hermes, Arra, or n8n editor ports publicly.
- Do not expose the Hermes OneHandy draft webhook publicly.
- Put the Next.js app behind Traefik/nginx/Dokploy HTTPS.
- Keep `/admin` protected with a strong `ADMIN_PASSWORD`.
- Use `ADMIN_API_TOKEN` only for trusted server-to-server maintenance calls.
- Public request routes never write customer PII into URLs.
