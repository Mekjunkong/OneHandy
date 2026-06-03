# OneHandy

OneHandy is a Chiang Mai-first home-service concierge for expat homeowners, remote owners, Airbnb hosts, and landlords. The site is request-first: customers submit a service request, OneHandy confirms availability and quote/payment details, then PromptPay or cash is handled after confirmation.

## What V1 Includes

- Public marketing pages for services, pricing, process, privacy, terms, and technician applications.
- Service request wizard with no customer PII in URLs.
- Postgres-backed service requests, technician applications, request events, and n8n event logs.
- Password-protected admin for triage, status changes, quote amount, PromptPay/cash payment tracking, technician application review, and n8n retries.
- Signed n8n webhooks for operational automation.
- Docker/Compose deployment assets for Hostinger/Dokploy.

## Local Development

```bash
npm install
cp .env.example .env.local
npm run dev
```

For a full local backend, start Postgres and set `DATABASE_URL`, then run:

```bash
npm run db:migrate
```

Open:

- Public site: `http://localhost:3000`
- Admin: `http://localhost:3000/admin/login`
- Health: `http://localhost:3000/api/health`

## Required Environment

```bash
NEXT_PUBLIC_SITE_URL=https://onehandy.example.com
NEXT_PUBLIC_ONEHANDY_WHATSAPP_NUMBER=66800000000
DATABASE_URL=postgres://onehandy:password@localhost:5432/onehandy
ADMIN_PASSWORD=...
ADMIN_SESSION_SECRET=...
ADMIN_API_TOKEN=...
N8N_WEBHOOK_URL=https://n8n.example.com/webhook/onehandy-events
N8N_WEBHOOK_SECRET=...
```

`ADMIN_PIN` is still accepted as a compatibility fallback, but `ADMIN_PASSWORD` is preferred for V1.

## Scripts

```bash
npm run dev
npm run lint
npm run test
npm run build
npm run db:migrate
```

## Deployment

See [`docs/hostinger-deployment.md`](docs/hostinger-deployment.md) for the Hostinger/Dokploy runbook.
