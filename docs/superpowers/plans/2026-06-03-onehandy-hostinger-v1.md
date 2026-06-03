# OneHandy Thailand Hostinger V1 Implementation Checklist

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Ship a Chiang Mai-first, expat-focused OneHandy website with request persistence, admin triage, technician applications, n8n automation events, and Hostinger/Dokploy deployment assets.

**Architecture:** Reuse the existing Next.js/Tailwind OneHandy app, add raw Postgres persistence through `pg`, validate all public writes with `zod`, protect admin pages with an HttpOnly session cookie, and emit signed n8n webhooks for operational automation. Keep Hermes and n8n admin surfaces private; the public site only talks to the Next.js API.

**Tech Stack:** Next.js App Router, React, Tailwind CSS, Postgres, pg, zod, Docker Compose, n8n signed webhooks.

---

### Task 1: Repository and Branch

- [x] Add `https://github.com/Mekjunkong/OneHandy.git` as `origin`.
- [x] Create and switch to `codex/onehandy-hostinger-v1`.

### Task 2: Backend and Persistence

- [x] Add `db/schema.sql` for service requests, request events, technician applications, and n8n delivery logs.
- [x] Add `scripts/migrate.mjs` and `npm run db:migrate`.
- [x] Add typed validation, status enums, Postgres repository helpers, admin session auth, and n8n signature/delivery helpers.

### Task 3: Public Flows

- [x] Change `/book` from session-only confirmation to `POST /api/service-requests`.
- [x] Keep customer PII out of URLs; store the non-PII request reference in session storage for the confirmation view.
- [x] Change `/join` from local-only submission to `POST /api/technician-applications`.
- [x] Remove launch-unsafe claims around guaranteed payments, licensed electricians, and warranties.

### Task 4: Admin Operations

- [x] Replace the mock PIN-gated dashboard with password login and server-protected admin pages.
- [x] Add live dashboard, request queue, request detail editor, technician application review, settings, and n8n retry.
- [x] Redirect old `/admin/jobs` and `/admin/payments` routes to the live request queue.

### Task 5: Deployment

- [x] Add standalone Next.js output, Dockerfile, docker-compose, `.env.example`, and `/api/health`.
- [x] Add Hostinger/Dokploy deployment notes.

### Task 6: Verification

- [x] Run unit tests: `npm run test`.
- [x] Run lint: `npm run lint`.
- [x] Run production build: `npm run build`.
- [x] Start the app locally and verify public/admin routes at `http://localhost:3001`.
- [x] Confirm local Docker/Postgres smoke is blocked in this environment because `docker`, `psql`, and `postgres` are not installed.
