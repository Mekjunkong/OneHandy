# OneHandy T1 Acceptance Criteria — Product/PM Spec Gate

Date: 2026-05-21
Scope: Phase 1 critique-to-fix implementation criteria for child tasks T2–T7.
Sources:
- `docs/kanban/onehandy-critique-fix-missions.md`
- `docs/superpowers/specs/2026-05-21-onehandy-phase1-design.md`

## Phase 1 policy

OneHandy Phase 1 is a request-and-availability booking experience unless real backend scheduling, payment processing, and technician availability are implemented and verified. Public copy must not imply a paid, guaranteed, or confirmed service when the product only records an inquiry/request.

Acceptance criteria:
- Booking CTAs and final states use request/availability language such as `Check Availability`, `Request Service`, `Review Request`, `Submit Service Request`, and `Request received`.
- Do not use paid/confirmed language such as `Review & Pay`, `Pay & Confirm Booking`, or `Confirm Booking (Demo)` unless real payment and technician confirmation flows exist.
- If payment UI remains present for Phase 1, it must be clearly disabled or framed as not charging the customer until availability is confirmed.
- Confirmation pages must communicate that the request was received and that OneHandy will follow up to confirm technician availability and arrival details.

## URL privacy and booking data

Acceptance criteria:
- Booking URLs/search params may contain only these booking params:
  - `step`
  - `service`
- Customer PII must never be written to route params, path segments, query strings, search params, hashes, or shareable URLs.
- Prohibited URL/search-param fields include, but are not limited to:
  - `name`
  - `email`
  - `phone`
  - `address`
  - `unit`
  - `floor`
  - `accessNotes`
  - `notes`
  - payment-like fields such as `card`, `cvc`, `expiry`, `payment`, `stripe`, `amount` when tied to a customer
  - `customer` or customer-identifying objects/IDs unless backed by a real private backend design
- Booking draft data may live in React component state and may use localStorage/sessionStorage only when needed for UX continuity.
- Reload, back, and forward behavior should remain reasonable without exposing PII in the URL.
- Existing service preselection through `service` must continue to work.
- No backend/API/external service should be introduced solely for this critique fix.

## Contact and WhatsApp links

Acceptance criteria:
- No fake public WhatsApp/contact links are allowed.
- The placeholder `https://wa.me/66800000000` and number `66800000000` must be removed from public UI.
- Contact links must use configurable constants/env-derived public config, for example a centralized contact/config module.
- If no real WhatsApp/contact number is configured, public UI must omit the deep link or render an honest disabled/non-link state such as `WhatsApp contact coming soon` or `Submit a request and we will follow up`.
- Do not contact external services or real customers while implementing or testing.

## Trust proof and testimonials

Acceptance criteria:
- No fake or unverified trust proof in public UI.
- Remove or replace unverified claims such as:
  - `200+ Jobs Completed`
  - `200+ jobs completed in Chiang Mai`
  - fake-looking named testimonials such as `Sarah` or `David` unless real source proof exists in the repo or is provided by the owner.
- Use launch/pilot-safe proof language unless real proof exists, e.g.:
  - `Launching in Chiang Mai`
  - `English-speaking coordination`
  - `Clear request updates`
  - `Vetted technician network in progress`
  - `Pilot service for expat homeowners`
- Emergency/local Chiang Mai proof must be honest and practical: mention areas served, response process, English coordination, or request triage only when supported by current product behavior/copy.
- Do not invent job counts, customer names, ratings, response-time guarantees, certifications, background checks, or partner counts.

## Service navigation and CTAs

Acceptance criteria:
- Service cards open service detail pages at `/services/[slug]` when the card/detail area is clicked.
- Booking must start only through an explicit CTA such as `Request this service`, `Check availability`, or `Book this service`.
- Explicit booking CTAs must preserve service preselection via `/book?service=<slug>` without adding PII.
- Existing service detail routes must continue to work.
- Hero primary CTA should be request/availability oriented, not generic or payment-oriented.
- Emergency/urgent path should be visible above the fold or in hero context, but must not use fake phone/WhatsApp links or unsupported emergency guarantees.

## Admin, mock data, and hardening boundaries

Acceptance criteria:
- Do not expose or imply real customer/technician/payment data if admin screens are seeded with mock data.
- If admin auth is incomplete, admin status must be clearly treated as Phase 1/mock/protected-by-local-gate and not production-grade auth.
- Booking validation should prevent obvious step skipping, invalid dates, and missing required fields in later implementation tasks.
- Fixed-price vs quote/request handling must remain clear and must not imply final payable totals when pricing requires confirmation.

## Final QA requirements for child tasks

Package scripts discovered in `package.json`:
- `npm run lint`
- `npm run build`

Acceptance criteria:
- Final QA must run the available package scripts above where feasible and report pass/fail with exact command names.
- If a script cannot be run, record the reason explicitly.
- Final QA must run targeted searches for:
  - booking URL/search-param contexts containing `name`, `email`, `phone`, `address`, `unit`, `floor`, `access`, `notes`, `payment`, `customer`
  - fake contact placeholders: `66800000000`, `wa.me`
  - demo/payment wording: `Confirm Booking (Demo)`, `Review & Pay`, `Pay & Confirm`, `Demo` in public booking flow
  - unverified proof/testimonial terms: `200+`, `Jobs Completed`, `Sarah`, `David`, `testimonial`
- Final QA must review the local diff and summarize changed files.
- Final QA must confirm all work stayed local: no commits, pushes, deploys, external contact, secrets, or new project creation.

## Guardrails

- Work only in `/Users/pasuthunjunkong/workspace/OneHandy`.
- Do not create a new project.
- Do not commit, push, deploy, publish, or force-push.
- Do not contact external services or real customers.
- Do not add secrets or expose private data.
- Preserve the existing premium, reliable, expat-friendly design direction.
- Keep files and UI copy in English.
