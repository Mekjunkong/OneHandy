# Product

## Register

brand (marketing: `/`, `/services`, `/how-it-works`, `/pricing`, `/join`)
product (booking and admin: `/book`, `/admin`)

Default: brand

## Users

Primary: expat homeowners, tenants, and property caretakers in Chiang Mai who need reliable home maintenance support in English. They are navigating a foreign-language context and feel anxious about coordinating local service providers without a trusted intermediary.

Secondary: local technicians seeking to join the OneHandy vetted network.

## Product Purpose

OneHandy removes the coordination anxiety expats face when booking home services in Chiang Mai. Phase 1 launches a marketing site and request-based booking flow — English-first, premium, and honest about what it is: a concierge layer between expat homeowners and vetted local technicians. Success means an expat can request a service with confidence and understand exactly what happens next.

## Brand Personality

Professional, clear, expat-friendly. Crisp and no-nonsense — designed around the real anxiety of coordinating home repairs in a foreign language. Confident without being clinical. Trustworthy without being stiff.

Reference tone: Stripe — trust earned through precision, clean hierarchy, and copy that never oversells.

## Anti-references

- **Gig marketplaces** (TaskRabbit, Thumbtack): busy grids, aggressive pricing comparisons, race-to-the-bottom language. OneHandy is a concierge, not a bidding floor.
- **Local Thai service directories**: dense, multi-language, cluttered. Reminds the expat of the coordination problem they are paying to escape.
- **Luxury hotel overkill**: over-designed, slow-loading, aesthetic-first at the expense of practical clarity. Too precious for a service people need when their AC breaks.
- **SaaS startup aesthetics**: hero metric blocks, gradient text, neon accents, superlative copy.

## Design Principles

1. **Clarity is the concierge.** Every screen should reduce anxiety, not add it. Information is organized around what the user needs to do next, not what is impressive about the service.
2. **Trust through honesty.** Confidence comes from what we say clearly, not from what we inflate. No fake proof, no unverifiable claims, no placeholder social evidence.
3. **Premium without pretension.** Restrained, spacious, never fussy. The design signals reliability through consistency, not decoration.
4. **Request-first, never payment-first.** The interaction model is a conversation, not a checkout. Copy, flows, and UI states must reflect where Phase 1 actually is.
5. **English as shelter.** For expats frustrated by language barriers, English-first is not just a language choice — it is the core value proposition. Every label, message, and error must feel confident and plain.

## Accessibility & Inclusion

WCAG AA. All interactive elements keyboard-navigable. Color contrast ratios meet AA minimums (4.5:1 body, 3:1 large text). Body type should be generous — the expat audience may include older homeowners. Reduced-motion preference suppresses scroll-triggered animations.

---

## Phase 1 implementation policies

### Request and availability booking policy

Phase 1 is **request-first, not payment-first**.

- Public booking copy must use request/availability language: `Check Availability`, `Request Service`, `Review Request`, `Submit Service Request`, `Request received`.
- Do not imply a paid, guaranteed, dispatched, or confirmed booking unless real backend scheduling, payment processing, and verified technician availability exist.
- If any payment UI remains visible, it must be disabled or clearly framed as future/availability-dependent.
- Confirmation states must say that OneHandy received the service request and will follow up to confirm availability and arrival details.
- Fixed-price and quote services may show indicative pricing, but totals must not be presented as final payable amounts when technician confirmation or quoting is still required.

### Privacy policy for booking data

- Customer PII must never be written to URLs, route params, path segments, query strings, hashes, or other shareable links.
- Booking URLs may contain only: `step`, `service`.
- Prohibited URL data includes names, emails, phone numbers, addresses, unit/floor details, access notes, general notes, payment-like fields, and customer-identifying objects or IDs unless backed by a real private backend design.
- Booking draft data may live in component state and, when needed for continuity, `sessionStorage` or `localStorage`; it must not leak into public/shareable URLs.

### Trust, proof, and contact policy

- No fake proof, fake testimonials, fake job counts, fake ratings, fake certifications, fake background-check claims, or fake response-time guarantees.
- Use launch-safe and pilot-safe proof language: `Launching in Chiang Mai`, `English-speaking coordination`, `Clear request updates`, `Vetted technician network in progress`, `Pilot service for expat homeowners`.
- Public WhatsApp/contact links must come from configurable public config/env-derived constants. If no real contact is configured, omit the link or use an honest fallback such as `Submit a request and we will follow up`.

### Non-goals for Phase 1

- Real Stripe payment processing or charging customers.
- Guaranteed technician dispatch, real-time availability, or emergency response guarantees.
- Customer accounts, full production authentication, or technician mobile app.
- WhatsApp/SMS/email API automation.
- Real-time job tracking maps.
- Review/rating system or public testimonials without verified source proof.
- Internationalization beyond English.
- Production-grade admin/customer/technician data workflows unless explicitly implemented and verified.
