# MindfulTrip — Premium Day-Trip Website

> *Évasion & Élégance — Premium Day Trips*
> Belgium → European capitals, starting with Paris.

A production-ready, **no-build static website** (HTML5 · CSS3 · vanilla JS).
Deployable as-is to Netlify, Vercel, or any shared hosting — just upload the
folder. Mobile-first, bilingual (FR/EN), WCAG 2.1 AA-oriented, and engineered
for a Lighthouse score > 90.

---

## 1. Executive summary — approach

The brief is **"mindful luxury."** Every decision serves that positioning:

- **Restraint over noise.** Deep navy canvas, generous whitespace, a single
  gold accent used sparingly, and an editorial serif (Cormorant Garamond)
  paired with a calm geometric sans (Jost). The design breathes.
- **Experience-first, not transaction-first.** Copy speaks of *composed days*,
  *pauses*, *presence* — the CTA is an invitation ("Reserve your seat"), never
  a hard sell. Trust signals (reviews, "16 guests max", "all-inclusive",
  "1 tree planted") sit under the fold, reassuring without shouting.
- **No-build for portability + performance.** No framework tax, no hydration,
  no CLS. Custom CSS (one file, design-tokenised) beats a CDN Tailwind for
  Lighthouse and long-term control. Progressive enhancement: the site works
  fully with JavaScript disabled; JS only *adds* polish.
- **Two flagship pages built in full** — the Homepage (discovery) and the Paris
  Trip Detail (conversion) — plus every supporting page so the site is
  immediately navigable and shippable.

### Why static vanilla, not React?
For a marketing/brochure + light booking site, a static build maximises
Lighthouse, SEO crawlability, hosting flexibility and maintenance simplicity.
Reach for Next.js/React only when you add: real-time seat inventory, a customer
account area, or a CMS-driven Journal with dozens of authors. The design system
here (tokens + component CSS) ports cleanly to React later.

---

## 2. Sitemap

```
MindfulTrip (www.mindfultrip.nexgencare.org)
│
├── / .................................. Homepage            index.html
│     └─ hero · trust bar · featured Paris · wellness pillars
│        · experience arc · testimonials · journal preview · newsletter
│
├── /trips.html ........................ Experiences (grid + filters)
│     └── /trips/paris-bien-etre-culture.html ... Trip Detail ★ (conversion)
│           └─ gallery · hour-by-hour itinerary · included/excluded
│              · testimonials · FAQ · sticky booking rail → Booking
│     └── (Amsterdam, London, Geneva — "coming soon" placeholders)
│
├── /wellness.html ..................... Wellness Philosophy (4 pillars)
├── /about.html ........................ About Us (story · values · team)
├── /groups.html ....................... Private & Corporate (+ quote form)
├── /journal.html ...................... Journal / Blog (SEO)
├── /contact.html ...................... Contact + FAQ (phone/email/WhatsApp)
└── /booking.html ...................... Booking (4-step flow + live pricing)

Shared: assets/css/styles.css · assets/js/main.js · assets/js/partials.js
SEO/infra: robots.txt · sitemap.xml · site.webmanifest · netlify.toml
```

**Primary conversion path:** Home → Paris Detail → Booking.
**Secondary paths:** Home → Wellness/About (trust) → Booking · Home → Groups → quote.

---

## 3. Design system

### Colour palette
| Token | Hex | Use |
|-------|-----|-----|
| `--navy` | `#0A192F` | Primary. Backgrounds, headings, dark sections |
| `--navy-700` | `#17304F` | Gradients, hover depth |
| `--gold` | `#C9A84C` | Accent. CTAs, rules, active states (use sparingly) |
| `--gold-deep` | `#A8863A` | Gold text on light (AA contrast) |
| `--offwhite` | `#F8F6F0` | Page surface |
| `--offwhite-200` | `#EFECE2` | Alternating "cream" sections |
| `--ink` | `#10192B` | Body text on light |
| `--ink-muted` | `#4A5568` | Secondary text |

> **Contrast note:** gold (#C9A84C) on navy passes AA for large/UI text; for
> gold *text on light* we use `--gold-deep` (#A8863A). Gold buttons use navy
> text (high contrast). Verify final combos with a checker before launch.

### Typography
- **Display / headings:** *Cormorant Garamond* (serif) — elegance & editorial voice.
- **UI / body:** *Jost* (geometric sans) — calm, modern legibility.
- Fluid `clamp()` scale from `--fs-eyebrow` to `--fs-h1` (2.6→5rem). No fixed
  breakpoint jumps; type scales smoothly.
- Eyebrows: uppercase, `letter-spacing: 0.28em`, gold — the signature "luxury label."

### Components (in `styles.css`, fully tokenised)
`.btn` (+ `--outline`, `--ghost-light`, `--lg`, `--block`) · `.card` /
`.trip-card` · `.feature-card` · `.testimonial` · `.article-card` · `.chip` /
amenity badges · `.timeline` (itinerary) · `.checklist` (included/excluded) ·
`.gallery` + lightbox · forms (`.field`, `.stepper`, `.option-card`,
`.summary`) · `.accordion` (FAQ) · sticky header · footer · `.filter-pill`.

### Motion
Reveal-on-scroll (IntersectionObserver), hover lifts, gold underline sweeps,
subtle hero parallax. **All disabled** under `prefers-reduced-motion`.

### Buttons at a glance
```
Primary   → gold fill, navy text, pill, uppercase 0.18em      (Book / Reserve)
Secondary → navy outline → fills navy on hover                (See itinerary)
On dark   → translucent border → fills off-white on hover     (hero secondary)
Text link → gold with animated underline sweep                (Discover →)
```

---

## 4. Wireframe / layout notes

**Homepage (desktop → mobile)**
- Full-viewport hero, parallax image, navy scrim, left-aligned headline + dual
  CTA. Sticky transparent nav → solidifies on scroll. Mobile: hero text stacks,
  nav collapses to a right-slide drawer.
- Navy trust bar (4 stats) → *Featured Paris* 2-col split (copy + tall card;
  stacks on mobile) → cream *Wellness pillars* 3-up (→ 1-up) → navy *experience
  arc* 4 chapters → testimonials 3-up → journal 3-up → navy newsletter CTA.

**Trip Detail (desktop → mobile)**
- Compact image hero + breadcrumb + amenity chips. Body = **1.7fr content +
  1fr sticky booking rail**. On mobile the rail drops below content and a
  **sticky bottom CTA bar** appears (price + Book) once the hero scrolls away.
- Content order: intro → mosaic gallery (lightbox) → hour-by-hour timeline →
  included/excluded columns → testimonials → FAQ accordion → cross-sell.

**Booking**: 4-step single-page form (Escape → Guests+extras → Details →
Payment placeholder) with a sticky live-total summary card that recomputes on
every change.

---

## 5. Copywriting (FR-first, bilingual — all live via the FR/EN toggle)

**Hero headlines**
- FR: *« L'art de voyager, le temps d'une journée. »*
- EN: *"The art of travel, in a single day."*

**Value proposition**
- FR: *« Des escapades culturelles et bien-être d'exception au départ de Liège.
  Bus VIP, guides privés, et l'élégance d'un voyage pensé dans chaque détail —
  pour rentrer le soir, transformé·e. »*
- EN: *"Extraordinary cultural & wellness day escapes from Liège… home by
  evening, quietly transformed."*

**CTAs** — *Réserver ma place / Reserve my seat* · *Découvrir Paris / Discover
Paris* · *Demander une proposition / Request a proposal* · *Poser une question /
Ask a question*.

**Tone rules:** invitation not urgency; sensory verbs (composer, ressentir,
respirer); "vous", warm but refined; never "cheap/deal/discount".

---

## 6. SEO strategy

**Global:** semantic HTML5, one `<h1>`/page, descriptive alt text, Open Graph +
Twitter cards, canonical URLs, `sitemap.xml`, `robots.txt`, and **JSON-LD**:
`TravelAgency` + `TouristTrip` (home), `Event` + `Offer` + `BreadcrumbList`
(Paris detail — eligible for event rich results), `FAQPage` (contact).

**Priority keywords:** *excursion premium Paris depuis Belgique*, *voyage bien-être
une journée*, *day trip Paris from Liège*, *escapade culturelle luxe*, *mindful
travel Europe*, *séminaire entreprise Paris*, *bus VIP Liège Paris*.

| Page | Meta title (≤ ~60c) | Meta description (≤ ~155c) |
|------|--------------------|-----------------------------|
| Home | MindfulTrip — Évasion & Élégance · Escapades Premium d'une Journée | Escapades culturelles & bien-être haut de gamme au départ de la Belgique. Paris en bus VIP, guide privé, pleine conscience. Dès 290€. |
| Paris detail | Paris — Bien-être & Culture · Escapade Premium d'une Journée | Journée à Paris depuis Liège, 31 juil. 2026. Bus VIP, guide privé, moment bien-être, déjeuner. Tout inclus dès 290€, 16 pers. max. |
| Experiences | Nos Escapades Premium d'une Journée | Découvrez les escapades culturelles & bien-être MindfulTrip. Paris dès maintenant ; Amsterdam, Londres, Genève à venir. |
| Wellness | Philosophie du Voyage en Pleine Conscience | Slow travel, méditation, expériences sensorielles : découvrez l'approche mindful de MindfulTrip. |
| Groups | Groupes Privés & Entreprises — Escapades sur Mesure | Team-building, séminaires & charters VIP privatisables au départ de Belgique. Proposition sous 48h. |

---

## 7. Booking flow (bonus)

```
[1] Escape & date  →  [2] Guests + wellness add-ons (live price)
      →  [3] Contact details  →  [4] Payment placeholder + T&C  →  ✅ Confirmation
```
Single page, minimal friction, sticky running total. **Integration points**
(marked in code): swap the `<form action>` for Formspree / Web3Forms / Netlify
Forms, and drop **Stripe Checkout / Mollie / PayPal** into the step-4
placeholder. `main.js` already computes `base × pax + extras×pax`.

**Loyalty / referral placeholder:** add a "MindfulTrip Cercle" field at step 3
(referral code → 5% off next escape) and a post-confirmation "invite a friend"
share block. Hook to a simple codes table when the booking engine lands.

---

## 8. Analytics (bonus)

Add before `</head>` (behind a cookie-consent gate for GDPR — you're in the EU):
```html
<!-- GA4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}
gtag('js',new Date());gtag('config','G-XXXXXXX');</script>
<!-- Hotjar: paste the standard snippet with your site id -->
```
**Track:** `book_now_click`, `reserve_seat`, `add_extra`, `newsletter_signup`,
`lang_switch`, gallery opens, FAQ expands. Note: update `netlify.toml` CSP
`script-src`/`connect-src` to allow the analytics hosts.

---

## 9. Run & deploy

```bash
# Local preview (any static server):
cd apps/mindfultrip-web
python3 -m http.server 8080      # → http://localhost:8080

# Netlify:  publish dir = apps/mindfultrip-web  (netlify.toml included)
# Vercel:   framework preset = Other, output dir = apps/mindfultrip-web
# Shared hosting: upload the folder contents to your web root.
```

Before launch: set the `Content-Security-Policy` `connect-src`/`script-src`
for your analytics + form host in `netlify.toml`.

---

## 10. Next steps & what to test

**Content**
- Replace Unsplash placeholders with **licensed premium photography** and add
  real OG images (`assets/img/og-home.jpg`, `og-paris.jpg`, 1200×630).
- Finalise real phone / WhatsApp / email, legal pages (footer links are stubs),
  and cookie-consent banner (GDPR).

**Engineering**
- Wire the real form endpoint + payment provider (see §7).
- Self-host the two web fonts (woff2) to drop the Google Fonts round-trip and
  tighten CSP; add `<link rel="preload">` for the hero image.
- Optional: pre-generate responsive `srcset`/AVIF for hero & gallery.

**QA / testing checklist**
- Lighthouse (mobile + desktop) > 90 on Home & Paris detail.
- Keyboard-only pass: skip-link, nav drawer, lightbox focus, accordion, forms.
- Screen-reader spot check (VoiceOver/NVDA) on the two flagship pages.
- Cross-browser: Safari iOS, Chrome Android, Firefox, Edge.
- `prefers-reduced-motion` and JS-disabled smoke tests.
- Validate structured data in Google's Rich Results Test.

---

© 2026 MindfulTrip · built by tdksoftconsulting. Placeholder imagery via Unsplash.
