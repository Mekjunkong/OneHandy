# OneHandy Critique Fix — Hermes Kanban Mission Fallback

Board slug: `onehandy-critique-fix`
Board name: `OneHandy Critique Fix`
Board description: `Critique-to-fix mission for /Users/pasuthunjunkong/workspace/OneHandy`
Workspace for all tasks: `dir:/Users/pasuthunjunkong/workspace/OneHandy`
Assignee fallback: `default` (specialist intent encoded in each task body)

> Fallback note: this file is a complete mission-card specification for Hermes Kanban. It was created because this subagent did not have terminal execution access to invoke `hermes kanban` directly. Do not dispatch/start workers from this file without explicit user approval.

## Global guardrails for every task

- Work only in `/Users/pasuthunjunkong/workspace/OneHandy`.
- Do not create a new project.
- Do not commit, push, deploy, publish, or force-push.
- Do not contact external services or real customers.
- Do not add secrets or expose private data.
- Do not invent fake proof, fake testimonials, fake job counts, or fake contact numbers.
- Preserve the existing design direction and improve clarity/safety/conversion within it.
- Prefer minimal, targeted changes with clear verification.
- If a real business fact or contact detail is unknown, use honest launch/pilot-safe copy or a configurable empty/disabled state instead of fabricating.

## Dependency graph

- T1 is the root spec gate.
- T2, T3, T4, T5 depend on T1.
- T6 depends on T2.
- T7 depends on T2, T3, T4, T5, and T6.

---

## T1 — Product/PM spec gate: acceptance criteria + honest Phase 1 policy

Assignee: `default`
Priority: P0
Status to create as: `todo`
Workspace: `dir:/Users/pasuthunjunkong/workspace/OneHandy`
Required skills: product/PM reasoning; `impeccable` for copy quality if available.
Dependencies: none.

### Mission
Turn Moshe's critique into implementation-ready acceptance criteria before code changes. Decide safe Phase 1 language for booking, trust proof, contact links, and privacy/data handling.

### Inputs / findings to cover
- PII currently leaks through booking URL/query params; URL should keep only `step` and `service`.
- Footer WhatsApp placeholder `https://wa.me/66800000000` must not remain public.
- Trust proof such as `200+ Jobs Completed`, `200+ jobs completed in Chiang Mai`, and Sarah/David testimonials may be unverified/fake-looking.
- Payment/confirmation copy is demo/prototype-like: `Confirm Booking (Demo)`, `Review & Pay`; Phase 1 should say request received, not paid/confirmed booking unless technician availability/payment is real.
- Conversion/locality issues: generic hero CTA, emergency service buried, weak Chiang Mai proof, service cards linking straight to `/book`.
- Docs gap: root `PRODUCT.md` and `DESIGN.md` should be created/promoted from `docs/superpowers/specs/2026-05-21-onehandy-phase1-design.md`.
- Hardening gaps: booking validation, admin gate/public mock data audit, final QA.

### Acceptance criteria
- Produce a concise implementation spec/checklist in a comment/result for child tasks.
- Include exact copy policy:
  - No fake numbers or fake trust metrics.
  - Use launch/pilot-safe trust language unless real proof is found in repo or provided by owner.
  - Booking language should be request/availability based, not payment/confirmed-service based.
- Include privacy acceptance criteria:
  - URL may contain only `step` and `service` booking params.
  - Customer PII stored in React state plus localStorage/sessionStorage only if necessary; no PII in route/search params.
- Include navigation acceptance criteria:
  - Service cards open service detail pages (`/services/[slug]`).
  - Explicit CTA starts booking.
- Include verification plan for later tasks.

### Verification expectations
- No code changes required for this task unless creating/updating a spec artifact is explicitly needed.
- Report where acceptance criteria were recorded.
- Confirm no commits/pushes/deploys/external contacts were made.

---

## T2 — Privacy + booking flow implementation: remove URL PII

Assignee: `default`
Priority: P0
Status to create as: `todo`
Workspace: `dir:/Users/pasuthunjunkong/workspace/OneHandy`
Required skills: systematic debugging; test-driven-development if available.
Dependencies: T1.

### Mission
Implement the privacy fix so booking flow no longer stores customer PII in URL/query params. Keep only `step` and `service` in the URL; store booking draft data in React state and/or localStorage/sessionStorage.

### Likely files
- `src/components/booking/BookingWizard.tsx`
- `src/components/booking/StepProperty.tsx`
- `src/components/booking/StepDateTime.tsx`
- `src/components/booking/StepPayment.tsx`
- Related booking confirmation/page files if they consume query params.

### Acceptance criteria
- URL/search params contain only booking navigation/safe selectors: `step` and `service`.
- Name, email, phone, address, notes, payment-like fields, and other customer PII are never written to query params or path segments.
- Booking draft persists safely enough for the current UX via component state and localStorage/sessionStorage where appropriate.
- Reload/back/forward behavior remains reasonable without exposing PII.
- Existing service preselection through `service` still works.
- No new backend/API/external service is introduced.

### Guardrails
- No commit/push/deploy.
- No secrets.
- No external contact.
- Do not create a new project.
- Preserve existing design direction.

### Verification expectations
- Run available package scripts from `package.json` where feasible: lint, typecheck, test, build.
- Search source for booking URL writes/reads that include PII-like fields: `name`, `email`, `phone`, `address`, `notes`, `payment`, `customer` in query/search-param context.
- Confirm only `step` and `service` remain in booking URL handling.
- Report exact commands run and results.

---

## T3 — Trust/contact/conversion copy implementation: honest Phase 1 public copy

Assignee: `default`
Priority: P0
Status to create as: `todo`
Workspace: `dir:/Users/pasuthunjunkong/workspace/OneHandy`
Required skills: `impeccable` for UI/copy polish.
Dependencies: T1.

### Mission
Replace fake-looking or demo/prototype public copy with honest, Phase 1-safe wording and configurable contact handling.

### Findings to fix
- Footer WhatsApp link placeholder: `https://wa.me/66800000000`.
- Trust proof may be unverified/fake-looking: `200+ Jobs Completed`, `200+ jobs completed in Chiang Mai`, Sarah/David testimonials.
- Payment/confirmation copy is demo/prototype-like: `Confirm Booking (Demo)`, `Review & Pay`.

### Acceptance criteria
- Create/use a configurable contact constant for WhatsApp/contact links.
- If no real WhatsApp number exists in config/constants, do not render a fake public `wa.me` link; use honest disabled/request-contact copy or omit the link.
- Replace unverified job counts/testimonials with honest launch/pilot trust copy unless real proof exists in repo.
- Replace payment/demo copy with request-oriented language, e.g. `Request Service`, `Review Request`, `Submit Service Request`, `Request received`.
- Confirmation page must not imply paid/confirmed booking unless technician availability/payment is actually implemented.
- Copy remains polished and conversion-minded.

### Guardrails
- No fake proof.
- No fake public contact links.
- No commit/push/deploy.
- No external contact.
- Preserve existing design direction.

### Verification expectations
- Targeted searches must show no remaining public fake/demo terms unless intentionally documented in non-public dev context:
  - `66800000000`
  - `Confirm Booking (Demo)`
  - `Review & Pay`
  - `200+ Jobs Completed`
  - `200+ jobs completed in Chiang Mai`
  - `Sarah`
  - `David`
- Run available lint/typecheck/build scripts where feasible.
- Report changed files and exact search results/commands.

---

## T4 — Service navigation + emergency/local proof implementation

Assignee: `default`
Priority: P1
Status to create as: `todo`
Workspace: `dir:/Users/pasuthunjunkong/workspace/OneHandy`
Required skills: `impeccable` for UI/copy polish; systematic implementation.
Dependencies: T1.

### Mission
Improve conversion/navigation while keeping the existing design direction: stronger CTA, visible urgent path, concrete Chiang Mai support details, and service-card navigation separation.

### Findings to fix
- Hero CTA too generic; prefer `Check Availability` / `Request a Service`.
- Emergency service is buried; add urgent WhatsApp/emergency path above fold or in hero context.
- Homepage lacks concrete Chiang Mai/local proof; add areas served and practical expat support details.
- Service cards currently link whole card directly to `/book`; card should open `/services/[slug]`, explicit CTA starts booking.

### Acceptance criteria
- Hero primary CTA is availability/request oriented.
- Emergency/urgent path is visible above fold or in hero context; if no real WhatsApp/contact number is configured, use safe request/availability language and avoid fake links.
- Homepage includes concrete Chiang Mai area/support details without inventing unverifiable claims.
- Service cards navigate to `/services/[slug]` when the card/detail area is clicked.
- Each card has an explicit booking CTA that starts booking with the correct service.
- Existing service detail route continues to work.

### Guardrails
- No fake emergency number.
- No fake local proof.
- No commit/push/deploy.
- No external contact.
- Preserve existing design direction.

### Verification expectations
- Manual/static check of home/service card code paths.
- Targeted search/inspection confirms card link destination is service detail, not whole-card `/book`.
- Run available lint/typecheck/build scripts where feasible.
- Report changed files and any routes verified.

---

## T5 — Product/DESIGN docs creation from Phase 1 design spec

Assignee: `default`
Priority: P2
Status to create as: `todo`
Workspace: `dir:/Users/pasuthunjunkong/workspace/OneHandy`
Required skills: product documentation; `impeccable` for clarity if available.
Dependencies: T1.

### Mission
Create/promote root `PRODUCT.md` and `DESIGN.md` from `docs/superpowers/specs/2026-05-21-onehandy-phase1-design.md` so future workers have canonical product/design guidance.

### Acceptance criteria
- Read `docs/superpowers/specs/2026-05-21-onehandy-phase1-design.md` if present.
- Create or update root `PRODUCT.md` with concise Phase 1 product goals, audience, booking/request policy, trust/contact policy, and non-goals.
- Create or update root `DESIGN.md` with visual direction, UX principles, component/copy guidance, and constraints to preserve current design direction.
- Docs must explicitly mention no fake proof/contact data and request-not-payment positioning.
- Avoid duplicating huge source docs; promote/summarize with pointers.

### Guardrails
- No commit/push/deploy.
- Do not create a new project.
- Do not change app code unless necessary to link docs (not expected).

### Verification expectations
- Confirm both root files exist and include references to Phase 1, privacy, honest trust proof, contact policy, and design direction.
- Report created/updated doc paths.

---

## T6 — Booking/admin hardening audit and fixes

Assignee: `default`
Priority: P2
Status to create as: `todo`
Workspace: `dir:/Users/pasuthunjunkong/workspace/OneHandy`
Required skills: systematic debugging; test-driven-development if available.
Dependencies: T2.

### Mission
Audit and harden booking validation and admin/public mock-data exposure after the URL privacy fix.

### Scope
- Booking validation hardening:
  - prevent step skipping,
  - enforce required fields,
  - date limits,
  - email/phone validation,
  - fixed vs quote handling.
- Admin area gate/public mock data audit.

### Acceptance criteria
- Users cannot skip required booking steps by manipulating `step` or UI state.
- Required fields are validated before advancing/submitting.
- Date/time choices have sane limits and cannot select obviously invalid dates.
- Email and phone validation are appropriate for Phase 1 and do not overfit to one format unnecessarily.
- Fixed-price vs quote/request handling is clear and safe.
- Admin routes/components are audited for public mock data exposure and gate expectations.
- If admin auth is not implemented, public/admin mock status is clearly documented and not misleading.

### Guardrails
- No external services.
- No secrets.
- No commit/push/deploy.
- Do not invent backend/auth that is out of scope; prefer clear gating/placeholder treatment if needed.

### Verification expectations
- Run available lint/typecheck/test/build scripts where feasible.
- Targeted inspection/search of booking step state, validation, admin routes, and mock data.
- Report each hardening item as fixed, already safe, or deferred with reason.

---

## T7 — Final QA/build/diff/static verifier

Assignee: `default`
Priority: P2
Status to create as: `todo`
Workspace: `dir:/Users/pasuthunjunkong/workspace/OneHandy`
Required skills: systematic debugging; test-driven-development if available; `impeccable` for final UX/copy review.
Dependencies: T2, T3, T4, T5, T6.

### Mission
Perform final local-only QA verification for the full critique-to-fix mission. Do not deploy or dispatch further work.

### Acceptance criteria
- Read `package.json` and run appropriate available local scripts, such as lint, typecheck, tests, and build.
- Run targeted searches for regression risks:
  - URL PII in booking params (`name`, `email`, `phone`, `address`, `notes`, `customer`, `payment` in query/search-param contexts).
  - Fake WhatsApp placeholder: `66800000000`, `wa.me` contact handling.
  - Demo/payment wording: `Confirm Booking (Demo)`, `Review & Pay`, `Demo` in public booking flow.
  - Unverified trust proof: `200+`, `Jobs Completed`, `Sarah`, `David`, `testimonial`.
- Review final diff locally and summarize changed files.
- Confirm all changes are local only.
- Confirm no commits, pushes, deploys, secrets, external contacts, or force-pushes occurred.

### Guardrails
- Do not commit, push, deploy, or contact external services.
- Do not start/dispatch workers.
- Do not hide failures; report any failing checks with exact command and error summary.

### Verification expectations
- Final report includes:
  - commands run and pass/fail status,
  - targeted search results,
  - changed files summary,
  - unresolved risks or follow-ups,
  - explicit local-only status.
