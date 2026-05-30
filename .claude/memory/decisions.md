# Decisions

| Date | Decision | Reason |
|---|---|---|
| 2026-05-21 | Phase 1 booking must be request/availability based, not paid/confirmed, unless real backend/payment/availability exists. | Prevent misleading customer expectations and align implementation with current product maturity. |
| 2026-05-21 | Booking URL may contain only `step` and `service`; all customer PII is prohibited from route/search params. | Protect customer privacy and make child implementation tasks unambiguous. |
| 2026-05-21 | Fake WhatsApp links, fake job counts, and fake testimonials are disallowed; use configurable contact constants and launch/pilot-safe proof. | Keep public copy honest and implementation-ready without inventing business facts. |
| 2026-05-21 | Emergency public copy must use urgent request triage/availability language unless real emergency dispatch/contact guarantees are configured and verified. | Avoid unsupported response-time guarantees or fake emergency contact paths while still giving users a visible urgent route. |
| 2026-05-21 | Booking draft PII is kept in React state with `sessionStorage` continuity, and inbound booking URLs are sanitized back to `step`/`service`. | Preserve reload/back UX while avoiding persistent/shareable URL exposure of customer PII. |
| 2026-05-21 | Booking step access is derived from completed required data, not only the `step` URL param or button state. | Prevent obvious step-skipping by URL/UI manipulation while keeping the Phase 1 client-only flow. |
| 2026-05-21 | Admin Phase 1 screens use explicit mock/sample records behind a configured local PIN gate; no default PIN fallback or production-auth claim. | Avoid exposing realistic-looking mock PII or implying robust backend authentication before it exists. |
