# Design

## Visual Direction

OneHandy feels like a calm, premium home-service concierge for expat homeowners in Chiang Mai — not a gig marketplace or a luxury hotel lobby. The design earns trust through precision and restraint, not decoration.

Theme: **Light.** Expats browse from home or on mobile during daylight hours, looking for reassurance. Warmth matters; clinical white does not.

Register split: brand pages lead with editorial typography and spacious layouts; product pages (`/book`, `/admin`) are clean and functional with no decorative elements.

---

## Color

Strategy: **Restrained** — tinted neutrals with one gold accent used at ≤10% of surface area as a divider, highlight, and CTA reinforcer.

### Palette

| Role | Token | OKLCH | Usage |
|---|---|---|---|
| Page background | `--color-surface` | `oklch(98.5% 0.004 90)` | Warm off-white, always behind everything |
| Card / panel | `--color-card` | `oklch(99.5% 0.003 90)` | Surfaces, form backgrounds |
| Primary text | `--color-ink` | `oklch(15% 0.006 90)` | Headings, buttons, primary copy |
| Muted text | `--color-ink-muted` | `oklch(52% 0.009 255)` | Secondary copy, metadata, labels |
| Accent | `--color-accent` | `oklch(75% 0.13 80)` | Gold — dividers, step indicators, selected states |
| Border | `--color-border` | `oklch(91% 0.004 255)` | Hairline borders, separators |
| Focus ring | `--color-focus` | `oklch(95% 0.05 80)` | Focus rings, hover tints on light surfaces |
| Error | `--color-error` | `oklch(55% 0.22 25)` | Form error states only |

### Rules

- Never use pure black or pure white. All neutrals carry a warm tint toward the brand hue.
- Gold is an accent only. It does not fill buttons or dominate any surface.
- On product pages (`/book`, `/admin`), reduce gold further — ink, surface, and border is sufficient; gold appears on step indicators only.
- No gradient text. No glassmorphism. No side-stripe card borders.

---

## Typography

### Typefaces

- **Playfair Display** — brand register only: hero text, editorial section headings, display moments on marketing pages.
- **DM Sans** — everything else: body copy, labels, navigation, buttons, booking flow, admin.

### Scale

| Token | Size | Weight | Leading | Usage |
|---|---|---|---|---|
| `--text-display` | 3.5rem | 400 Playfair | 1.15 | Hero headline |
| `--text-h1` | 2.5rem | 400 Playfair | 1.2 | Page titles |
| `--text-h2` | 1.75rem | 400 Playfair | 1.25 | Section headings |
| `--text-h3` | 1.25rem | 600 DM Sans | 1.3 | Card headings, step titles |
| `--text-body` | 1rem | 400 DM Sans | 1.6 | Body copy |
| `--text-small` | 0.875rem | 400 DM Sans | 1.5 | Labels, metadata, form hints |
| `--text-xsmall` | 0.75rem | 500 DM Sans | 1.4 | Badges, tags |

### Rules

- Playfair Display is brand-register only. Inside `/book` and `/admin`, use DM Sans for all headings.
- Never render Playfair smaller than 1.25rem.
- Cap body line length at 65ch. Headings on brand pages may run shorter for visual rhythm.
- Weight hierarchy: Playfair italic for editorial emphasis; DM Sans 600 for functional emphasis.

---

## Spacing

8pt base grid.

| Token | Value | Usage |
|---|---|---|
| `--space-1` | 4px | Icon gap, tight inline spacing |
| `--space-2` | 8px | Compact input padding |
| `--space-3` | 12px | Badge padding, small gap |
| `--space-4` | 16px | Standard component gap |
| `--space-6` | 24px | Card padding, form group gap |
| `--space-8` | 32px | Section gap (mobile) |
| `--space-12` | 48px | Section gap (desktop) |
| `--space-16` | 64px | Large section breathing room |
| `--space-24` | 96px | Hero vertical padding |

Vary spacing for rhythm. Identical padding everywhere is monotony.

---

## Layout

- Max content width: 1280px. Prose and narrow content caps at 720px.
- Booking flow: single-column, centered, max 640px — reduces anxiety by eliminating visual noise.
- Brand pages: editorial layouts with asymmetric sections, wide type moments, and constrained prose blocks.
- Do not wrap everything in a container. Most elements do not need one.
- Avoid identical card grids. Use varied layouts: typographic lists, alternating sections, wide/narrow column contrast.

---

## Components

### Buttons

| Variant | Usage | Style |
|---|---|---|
| Primary | Main CTAs (`Check Availability`, `Submit Request`) | `--color-ink` background, white DM Sans 500, 4px radius |
| Secondary | Navigation CTAs, secondary actions | Transparent, `--color-ink` border, `--color-ink` text |
| Ghost | Tertiary actions, cancel | No border, `--color-ink` text, hover underline |

- Radius: 4px — not pill-shaped; not square.
- No gold button backgrounds. Gold is an accent, not a fill.
- Disabled: 40% opacity.

### Cards

Use cards only when they are the best affordance for the content. Do not use cards by reflex.

- Border: 1px `--color-border`
- Background: `--color-card`
- Radius: 8px
- Shadow: `0 1px 3px oklch(15% 0.006 90 / 8%)` maximum — no heavy SaaS-style shadows
- No nested cards.
- No side-stripe accent borders.

### Form inputs

- Border: 1px `--color-border`
- Focus border: 1.5px `--color-ink`
- Focus ring background: `--color-focus`
- Radius: 4px
- Helper text: `--text-small` in `--color-ink-muted`
- Error: retain border, swap to `--color-error`, add error message below the field
- Validation messages must be plain English — no technical codes, no overly formal phrasing

### Booking wizard

- Step indicator: numbered circles, `--color-ink` text, gold underline on active step
- Each step: single column, generous vertical padding (`--space-8` top/bottom minimum)
- Related fields grouped in a card; do not give each field its own card
- Progress bar: thin (2px), `--color-accent`, full-width above the form area

### Trust / pilot language

- Short factual phrases: `Launching in Chiang Mai`, `English-speaking coordination`, `Clear request updates`
- Style: `--text-small`, `--color-ink-muted`, DM Sans 400
- No icons that imply third-party verification, certification, or background checks unless real

---

## Motion

- Respect `prefers-reduced-motion: reduce` on all scroll-triggered and entrance animations.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (exponential ease-out) for all transitions. No bounce, no elastic, no overshoot.
- Booking step transitions: crossfade or horizontal slide, 200ms, ease-out.
- Hero entrance: fade-in + 12px upward translate, 400ms, ease-out, 80ms stagger per element.
- Animate `opacity` and `transform` only. Never animate `height`, `width`, `padding`, or `margin`.

---

## Elevation

| Level | Value | Usage |
|---|---|---|
| Surface | none | Page background elements |
| Raised | `0 1px 3px oklch(15% 0.006 90 / 8%)` | Cards, form panels |
| Floating | `0 4px 16px oklch(15% 0.006 90 / 12%)` | Dropdowns, sticky nav on scroll |

No decorative glow, no `25px+` blur shadows.

---

## Iconography

- Library: Lucide React (in dependencies)
- Sizes: 16px inline / 20px UI actions / 24px navigation
- Color: `currentColor` — inherits from surrounding text
- Stroke width: 1.5px
- Icons earn their place by aiding comprehension. Do not use them as decorative filler.

---

## Register-specific guidance

### Brand pages (`/`, `/services`, `/how-it-works`, `/pricing`, `/join`)

- Playfair Display for all section headings. Lead with editorial typography.
- Sections may be asymmetric. Vary column counts, alignment, and whitespace.
- Gold as section dividers or subtle underlines on key headings — never as fill.
- Whitespace is not empty — it is the premium signal.
- Avoid: identical card grids, bullet-list hero sections, dashboard-style layouts, any element that reads as a SaaS app.

### Product pages (`/book`, `/admin`)

- DM Sans throughout — no Playfair.
- Tighter spacing. Clarity over editorial rhythm.
- Booking wizard: single column, one task per step, no decorative elements.
- Admin tables: functional, clean — no decorative chrome, no status-indicator colors beyond ink and muted.
- Gold: step indicator only. Remove all other gold elements from product surfaces.
