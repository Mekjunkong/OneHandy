# OneHandy — Phase 1 Design Spec
**Date:** 2026-05-21  
**Scope:** Marketing Site + Booking Flow  
**Target:** Expat homeowners in Chiang Mai  
**Deployment:** Vercel

---

## 1. Product Overview

OneHandy is a managed marketplace connecting expat homeowners in Chiang Mai with vetted local technicians for home services. It acts as a trusted middleman: handling communication in English, scheduling, dispatching, and secure payment — so expats never have to navigate language barriers or find technicians on their own.

**Core value proposition:** Book a vetted technician in minutes. Pay securely online. Get English updates with photos. Done.

---

## 2. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSG for SEO pages, RSC for performance |
| Styling | Tailwind CSS v4 | Utility-first, consistent spacing system |
| Animation | Framer Motion | Smooth booking wizard transitions |
| Icons | Lucide React | Consistent SVG icon set |
| Payments | Stripe (placeholder) | Real UI, disabled checkout pending live keys |
| i18n | None (Phase 1) | English-only; add Thai/Hebrew in Phase 2 |
| Deployment | Vercel | Edge CDN, instant preview URLs, env vars |
| Analytics | Vercel Analytics (built-in) | Zero-config page view tracking |

**Repository:** `/Users/pasuthunjunkong/Documents/OneHandy`

---

## 3. Design System

### Brand Identity
- **Name:** OneHandy
- **Tagline:** "Your home, handled."
- **Tone:** Premium, reliable, expat-friendly — concierge service, not a gig app

### Color Palette
| Token | Value | Usage |
|---|---|---|
| `background` | `#FAFAF9` | Page background |
| `surface` | `#FFFFFF` | Cards, panels |
| `text-primary` | `#1C1C1C` | Headings, body |
| `text-muted` | `#6B7280` | Subtitles, meta |
| `accent-gold` | `#D4A853` | Dividers, badges, highlights |
| `accent-dark` | `#1C1C1C` | Primary buttons |
| `border` | `#E5E7EB` | Card borders, dividers |
| `error` | `#DC2626` | Form errors |
| `success` | `#059669` | Confirmation states |

### Typography
| Role | Font | Weight | Size |
|---|---|---|---|
| Display heading | Playfair Display | 300 italic | 48–64px |
| Section heading | Playfair Display | 600 | 28–36px |
| Card heading | DM Sans | 600 | 18–22px |
| Body | DM Sans | 400 | 16px |
| Label / meta | DM Sans | 500 | 12–14px |
| Button | DM Sans | 600 | 14px |

### Spacing System
- Base unit: 4px
- Scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px
- Max content width: `max-w-6xl` (1152px)

### Component Tokens
- Border radius: `rounded-sm` (4px) for buttons/badges, `rounded-lg` (8px) for cards
- Shadow: `shadow-sm` only — minimal depth, no heavy elevation
- Transitions: 150ms ease-out for hover, 250ms ease-out for page transitions

---

## 4. Site Structure (Phase 1)

```
/                          → Home (hero + services preview + how-it-works + trust + CTA)
/services                  → Services hub (all service cards with FIXED/QUOTE badges)
/services/ac-cleaning      → AC Cleaning service page (SEO-optimised)
/services/plumbing         → Plumbing service page
/services/electrical       → Electrical service page
/services/gardening        → Gardening service page
/services/roof-repair      → Roof Repair service page
/services/emergency        → Emergency Callout service page
/services/property-care    → Property Care Subscription page
/how-it-works              → Explainer page (3-step process)
/pricing                   → Transparent pricing table
/book                      → Booking wizard (4-step flow)
/book/confirmation         → Booking confirmed page
/join                      → Technician partner application form
/admin                     → Admin dashboard (protected, mock data)
/admin/jobs                → Job management table
/admin/technicians         → Technician list + assignment
/admin/payments            → Payment tracker
```

### Navigation (header)
```
Logo | Services | How It Works | Pricing | [Book a Service →]
```
Mobile: hamburger → slide-down drawer with same links + Book CTA at bottom.

### Footer
```
Logo + tagline | Links: Services / Pricing / How It Works / Join as Technician
Contact: WhatsApp link | Trust: Verified · Secure Payment · English Support
© 2026 OneHandy | Privacy Policy | Terms
```

---

## 5. Page Designs

### 5.1 Home Page (`/`)

**Section 1 — Hero (Hybrid layout)**
- Centered editorial headline: *"Your home, handled."* (Playfair Display 300 italic, 56px)
- Gold divider line (28px wide)
- Subtitle: "Vetted technicians · English support · Secure payment"
- Inline booking widget: dropdown (Select a service…) + "Book →" button (gold border on widget)
- Category pill strip below: AC Cleaning · Plumbing · Electrical · Gardening · Emergency · + More
- Trust strip at very bottom of hero: ✓ 200+ Jobs Completed · ✓ Verified Technicians · ✓ English-Speaking Support

**Section 2 — Services Preview**
- Section heading: "What can we help with?"
- 3-column grid (2 on mobile) of service cards, each with:
  - Service icon (Lucide SVG)
  - Service name
  - One-line description
  - FIXED (gold badge) or QUOTE (grey badge) pricing indicator
  - Starting price or "Custom quote"
  - "Book Now" link → /book?service=slug
- "See all services →" link

**Section 3 — How It Works**
- 3 steps with large number, icon, heading, description:
  1. Choose your service — browse our fixed-price menu or request a custom quote
  2. We dispatch a vetted technician — verified, background-checked, fully equipped
  3. Pay securely, get photo updates — all communication and payment handled in English
- Subtle gold numbered circles

**Section 4 — Trust & Social Proof**
- 3 trust columns: Verified Technicians / English Support / Secure Payment
- 2–3 testimonial quotes (styled as pull-quotes with gold left border)
- "200+ jobs completed in Chiang Mai" stat

**Section 5 — Property Care CTA**
- Dark background section (charcoal)
- Heading: "Going away? We'll watch your home."
- Subtitle: Property care subscriptions from ฿2,500/month
- Button: "Learn More" → /services/property-care

**Section 6 — Technician Apply Teaser**
- Minimal strip: "Are you a skilled technician in Chiang Mai? Join our network." + "Apply to Partner →" link

---

### 5.2 Individual Service Pages (`/services/[slug]`)

Each service page follows the same template:
- Hero: service name (h1, Playfair 600), subtitle, FIXED/QUOTE badge, price, "Book This Service →" CTA
- What's Included: bullet list
- How It Works (service-specific): 3 steps
- Pricing Breakdown: table with line items
- FAQ: 3–4 questions specific to that service
- Related Services: 2 cards
- Bottom CTA: full-width "Book Now" button

**SEO metadata per page:**
- `title`: "AC Cleaning Chiang Mai | OneHandy — Vetted Technicians"
- `description`: Unique 155-char description per service
- `keywords`: service + location + expat variants
- Structured data: `Service` schema with `areaServed: Chiang Mai`

---

### 5.3 Booking Wizard (`/book`)

4-step flow with URL state (`/book?step=1&service=ac-cleaning`). Back button navigates to previous step. Progress bar at top (4 segments, gold fill).

**Step 1 — Choose Your Service**
- Service pre-selected if coming from a service page (`?service=` param)
- Grid of service cards (same as home preview), selected state highlighted with gold border
- Show price/badge immediately on selection
- "Continue →" button (disabled until selection made)

**Step 2 — Your Property**
- Property type: Condo / Villa / Townhouse / House (radio cards with icons)
- Address: text input (required)
- Floor / unit number: text input (optional)
- Access notes: textarea (optional, placeholder: "e.g. Gate code, parking instructions, call on arrival…")
- Number of AC units: number input (shown only for AC Cleaning service)

**Step 3 — Date, Time & Contact**
- Preferred date: date picker (min: tomorrow, max: 30 days out)
- Preferred time window: Morning (8–12) / Afternoon (12–17) / Evening (17–20) — radio chips
- Your name: text input
- WhatsApp / phone number: tel input
- Email: email input
- Additional notes: textarea (optional)

**Step 4 — Review & Pay**
- Order summary card: service, property address, date+time, price breakdown
- Stripe payment element (placeholder UI: card number / expiry / CVC fields, styled to match brand)
- "Pay ฿XXX & Confirm Booking" button — disabled with tooltip "Payments launching soon" for Phase 1
- Fine print: "Your card will not be charged until our team confirms technician availability. You'll receive a WhatsApp confirmation within 2 hours."

**Confirmation page (`/book/confirmation`)**
- Success icon (animated checkmark, Framer Motion)
- Booking reference number (randomly generated for Phase 1)
- Summary of booking
- "You'll receive a WhatsApp message within 2 hours to confirm your technician and exact arrival time."
- WhatsApp deep link button: "Message us now →"
- "Return to home" link

---

### 5.4 Technician Application (`/join`)

- Hero: "Join the OneHandy Network" — partner with us to grow your business
- Benefits: guaranteed payments, English-speaking clients, flexible schedule
- Application form:
  - Full name, phone, WhatsApp, years of experience
  - Services offered (multi-select checkboxes)
  - Tools/equipment owned (textarea)
  - Previous work description (textarea)
  - Upload: ID / work portfolio photo (file input, styled)
  - Agree to background check (checkbox, required)
  - "Submit Application" button

---

### 5.5 Admin Dashboard (`/admin`)

Protected by a hardcoded pin (`ADMIN_PIN` env var) for Phase 1 — no auth system needed yet.

**Jobs view (`/admin/jobs`)**
- Table columns: Booking ID · Service · Customer · Address · Date · Status · Technician · Amount
- Status badges: Pending (grey) / Confirmed (blue) / In Progress (amber) / Completed (green) / Cancelled (red)
- Filter bar: by status, by service, by date range
- Seeded with 10 mock jobs

**Technicians view (`/admin/technicians`)**
- Table: Name · Services · Status (Active/Inactive) · Jobs completed · Rating
- Assign technician to a job: dropdown per job row
- Seeded with 5 mock technicians

**Payments view (`/admin/payments`)**
- Table: Booking ID · Customer · Amount · Platform fee · Net · Status (Pending/Paid/Refunded)
- Summary cards at top: Total Revenue · Platform Fees · Pending Payouts

---

## 6. Services & Pricing Data

| Service | Type | Price | Duration |
|---|---|---|---|
| AC Cleaning | FIXED | ฿800/unit | 1–2 hrs |
| Plumbing | FIXED | from ฿1,200 | 1–3 hrs |
| Electrical | FIXED | from ฿1,000 | 1–2 hrs |
| Gardening | FIXED | from ฿600 | 2–4 hrs |
| Roof Repair | QUOTE | from ฿3,000 | Varies |
| Emergency Callout | FIXED | ฿500 + parts | Within 2 hrs |
| Property Care | QUOTE | from ฿2,500/mo | Subscription |

---

## 7. SEO Strategy

- **Target keywords:** "home services Chiang Mai expat", "AC cleaning Chiang Mai", "plumber Chiang Mai English", "property maintenance expat Thailand"
- Individual service pages with unique H1, meta description, structured data
- `sitemap.ts` auto-generated from service slugs
- `robots.ts` — index all public pages, noindex `/admin`
- OpenGraph images per page (static for Phase 1)
- Local business schema on home page

---

## 8. Vercel Deployment

- **Project name:** `onehandy`
- **Framework preset:** Next.js
- **Build command:** `next build`
- **Environment variables needed:**
  - `STRIPE_PUBLISHABLE_KEY` — Stripe placeholder key
  - `STRIPE_SECRET_KEY` — Server-side (unused in Phase 1, placeholder)
  - `ADMIN_PIN` — Simple 6-digit pin for admin access
  - `NEXT_PUBLIC_SITE_URL` — Production URL
- **Vercel Analytics:** enabled via `@vercel/analytics`
- **Domain:** configure after deployment (`onehandy.com` or subdomain)

---

## 9. File Structure

```
/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout, fonts, analytics
│   │   ├── page.tsx                # Home page
│   │   ├── globals.css             # Tailwind + CSS variables
│   │   ├── services/
│   │   │   ├── page.tsx            # Services hub
│   │   │   └── [slug]/page.tsx     # Individual service pages
│   │   ├── book/
│   │   │   ├── page.tsx            # Booking wizard
│   │   │   └── confirmation/page.tsx
│   │   ├── how-it-works/page.tsx
│   │   ├── pricing/page.tsx
│   │   ├── join/page.tsx
│   │   └── admin/
│   │       ├── layout.tsx          # Admin pin gate
│   │       ├── page.tsx            # Admin overview
│   │       ├── jobs/page.tsx
│   │       ├── technicians/page.tsx
│   │       └── payments/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SiteHeader.tsx
│   │   │   └── SiteFooter.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ServicesPreview.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── TrustSection.tsx
│   │   │   └── PropertyCareCTA.tsx
│   │   ├── booking/
│   │   │   ├── BookingWizard.tsx
│   │   │   ├── StepService.tsx
│   │   │   ├── StepProperty.tsx
│   │   │   ├── StepDateTime.tsx
│   │   │   └── StepPayment.tsx
│   │   ├── services/
│   │   │   ├── ServiceCard.tsx
│   │   │   └── ServicePageTemplate.tsx
│   │   ├── admin/
│   │   │   ├── JobsTable.tsx
│   │   │   ├── TechniciansTable.tsx
│   │   │   └── PaymentsTable.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── ProgressBar.tsx
│   │       └── PinGate.tsx
│   └── lib/
│       ├── services.ts             # Service data + slugs
│       ├── mock-data.ts            # Mock jobs, technicians, payments
│       └── metadata.ts             # Shared metadata helpers
├── public/
│   └── images/                     # Service hero images
├── next.config.ts
├── tailwind.config.ts
└── .env.local.example
```

---

## 10. Out of Scope (Phase 1)

- User accounts / authentication
- Real Stripe payment processing (UI only, disabled)
- SMS / WhatsApp API integration
- Technician mobile app
- Review / rating system
- i18n (Thai, Hebrew)
- Real-time job tracking map
- Email notifications

---

## Phase 2 Preview

- Real Stripe payments (webhooks, receipts)
- Customer account portal (booking history, photo updates)
- Technician portal (job queue, earnings)
- WhatsApp Business API for automated updates
- Review system

---

*Spec written by Claude Code / SuperClaude brainstorming session — 2026-05-21*
