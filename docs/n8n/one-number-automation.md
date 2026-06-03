# OneHandy One-Number Automation

V1 uses one customer-facing WhatsApp number: `0929894495`, normalized as `66929894495` for `wa.me` links.

Because there is only one WhatsApp number, the system does not use WhatsApp Cloud API for internal owner alerts. A customer submits the structured booking form, OneHandy sends a signed n8n event, n8n verifies the signature, and n8n calls a private Hermes webhook. Hermes sends the owner a Telegram alert with a safe English/Thai draft and a prefilled customer WhatsApp reply link.

## Flow

1. Customer submits `/book`.
2. The Next.js API stores the request in Postgres.
3. The app creates an `n8n_event_logs` row and POSTs the signed payload to n8n.
4. n8n rejects invalid `X-OneHandy-Signature` requests with `401`.
5. For `service_request.created`, n8n calls the private Hermes webhook.
6. Hermes drafts the response and sends the owner Telegram alert to the configured `telegram:Mike Fishken (dm)` target.
7. The owner opens the prefilled `wa.me` link, reviews the draft, and manually sends the customer message.

## Private Services

Keep these off the public internet:

- Hermes webhook, for example `8644/tcp`
- Hermes dashboard
- Arra
- Postgres
- n8n editor/admin ports

The public website should only expose the Next.js app and the production n8n webhook URL.
