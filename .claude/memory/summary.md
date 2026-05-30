# OneHandy Project Summary

OneHandy is a Next.js app for a Phase 1 marketing site and request-based booking flow for expat homeowners in Chiang Mai.

## Current structure observed
- `src/app/` contains public routes including home, services, booking, pricing, how-it-works, join, privacy/terms, and admin pages.
- `src/components/` contains layout, home, service, booking, admin, and UI components.
- `docs/superpowers/specs/2026-05-21-onehandy-phase1-design.md` is the Phase 1 design/product source spec.
- `docs/kanban/onehandy-critique-fix-missions.md` defines critique-fix tasks T1–T7.

## Completed features/docs
- T1 Product/PM spec gate acceptance criteria recorded in `docs/kanban/onehandy-t1-acceptance-criteria.md`.
- T2 booking URL privacy implemented: only `step` and `service` remain in booking URLs; customer draft PII stays in React state/sessionStorage.
- T4 service navigation and emergency/local proof improvements completed: separated service-detail vs request CTAs, added urgent request hero path, and added honest Chiang Mai areas served copy.
- T5 root product/design docs completed: `PRODUCT.md` and `DESIGN.md` summarize Phase 1 product goals, request-not-payment policy, privacy/no-PII URL policy, honest proof/contact rules, premium visual direction, UX principles, and design constraints.
- T6 booking/admin hardening completed: booking step access now validates completed requirements before advance/submit, date/contact validation is stricter but Phase 1-practical, quote vs guide-price copy is clearer, and admin mock data/local PIN gate expectations are explicit.
- T7 final QA verification completed in `docs/kanban/onehandy-t7-verification-report.txt`: targeted source checks pass, `npm run lint` passes, and `npm run build` passes.
