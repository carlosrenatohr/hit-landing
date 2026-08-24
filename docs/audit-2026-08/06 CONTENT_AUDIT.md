# 06 CONTENT_AUDIT.md — Copy, Content, Conversion, Journeys

- **Scope:** every user-facing string vs `docs/marketing/copy-seo-audit.md` v3.0 prescriptions; conversion path; 6 journeys walked in-browser (390px mobile + 1440px desktop, screenshots in `evidence/`).
- **Method:** code-first (file:line) + browser click-throughs (dead CTAs verified live).
- **Headline:** **Sprint 1 of the copy prescription was partially applied (title, phone); Sprint 2 (conversion copy) was not applied at all.** The build ships with 4 dead CTAs where conversions must happen.
- **Language verdict:** voseo is the dominant voice but with drift: **howItWorks is 100% tuteo**, FAQ header tuteo, home TrackingForm mixes both. Fix per C10 (voseo wins).

## 1. Critical findings (Alta)

| # | Finding | Evidence | Prescription |
|---|---|---|---|
| C-01 | Hero "Con bodega estratégica en Miami" implies owned warehouse — reality is reseller casillero | `home.ts:4` | "Casillero / Tu dirección en Miami" (BI-06) |
| C-02 | HowItWorks "Envía a Nuestra Bodega" explicit ownership claim | `howItWorks.ts:14,16` | "Enviá a tu casillero HIT CARGO" |
| C-03 | **Hero non-compliant vs option C**: "Tu Aliado Logístico" (banned phrase), CTAs "Consultar Servicios"/"Cotizar Ahora" (prescribed "Calcular Costo de Envío"), no concrete times (5-7 días), jargon highlights | `home.ts:2-16` | option C copy |
| C-04 | **4 dead CTA buttons** (clicks do nothing, verified in browser): "Ver Todos los Servicios" (ServicesSection), "Cotizar Mi Envío" + "Solicitar Cotización" (CTASection) | `ServicesSection.astro:33-35`, `CTASection.astro:18-23` | link/handler each |
| C-05 | **Broken internal link** FAQ → `/services` (404; route is `/servicios`) | `faq.ts:8` → FAQSection.tsx:75 | fix to `/servicios` |
| C-06 | **FAQ non-compliant**: no price question (must be first), missing 4 of 7 prescribed Qs (city delivery 24/48/72h, Amazon/Shein registration, import taxes, damage/insurance) | `faq.ts:11-37` | §2.4 prescription |
| C-07 | **No prices anywhere** (correct policy: "never invent prices") — but /precios has zero rates, no chart, FAQ cost answer is vague | `precios.astro:7-9`, `faq.ts:23-26` | blocked on BI-01 |
| C-08 | Services section all-jargon titles (audit "Before" list verbatim), no concrete figures/features | `services.ts:1-34` | §2.2 |
| C-09 | Hours conflict: site Mon–Fri 08:00–17:00 vs prescription/GMB Sat 08:00–13:00 | `contacto.astro:30`, `JSONLD.astro:30-41` | BI-04 |
| C-10 | Footer: no WhatsApp CTA, no hours, missing /precios and /track links, "Contactanos" duplicate (link+button) | `footer.ts:5-19`, `Footer.astro:38,54,71` | §2.7 |

## 2. Media findings (selected)

- **Tuteo drift:** howItWorks 100% tuteo (`howItWorks.ts:3,8,10,14,16,21,25`); FAQ header (`faq.ts:2,4`); CTA desc (`cta.ts:3`); services card (`services.ts:17` — banned phrases "Recibe en Nicaragua…manejo profesional"); siteConfig.description USA-only + tuteo (`site.ts:4` → footer every page); TrackingForm h2+placeholder tuteo vs error voseo (`TrackingForm.tsx:28,52` vs :14); precios subjunctive (`precios.astro:14,20`).
- **Testimonials:** 3 generic quotes + stock webp photos, section `hidden` — **do not unhide** without real clients + consent (BI-03, BI-05). If removed, replace with store-logo band + verifiable aggregates (image-plan dec. 4, G7).
- **NAP/sameAs/geo mismatches:** JSON-LD FB `facebook.com/hitcargoni` vs config `share/19eySNaXUy` (JSONLD.astro:43 vs site.ts:9); JSON-LD street "Managua, Nicaragua" vs full address in config (JSONLD.astro:19 vs site.ts:14); JSON-LD geo 12.1364,-86.2514 vs map pin 12.0606,-86.1942 (~10 km apart, contacto.astro:10) — BI-10/BI-13.
- **FAQ heading structure inverted** — subtitle rendered as h2, title as p (FAQSection.tsx:52-57).
- **Legal pages self-declared drafts** ("Needs legal review") — terminos.astro:5-6, privacidad.astro:5 — BI-14.

## 3. Per-section compliance

| Section | Verdict | One-liner |
|---|---|---|
| Hero | **non-compliant** | banned phrase, no times, jargon highlights, bodega claim |
| Services | **non-compliant** | jargon titles, no figures, dead button |
| HowItWorks | **non-compliant** | 100% tuteo, ownership claim, USA-only, no casillero how-to |
| FAQ | **non-compliant** | no price Q, missing 4 Qs, broken link, inverted h2 |
| CTA | **non-compliant** | no incentive/badge, tuteo, both buttons dead |
| Footer | **non-compliant** | no WhatsApp/hours, missing links, USA-only desc |
| Contacto | **partial** | strong voseo + WhatsApp-first; hours conflict |
| Precios | **partial** | honors "never invent prices"; blocked on rates |
| Servicios/[slug] | **partial** | best copy on site; no transit figures/rates |
| Track | **partial** | clean voseo; "nuestra bodega" in step copy; no page description |
| Términos | **compliant-pending-legal** | accurate forwarder framing, casillero wording |
| Privacidad | **compliant-pending-legal** | minimal tracker-data description |

## 4. Conversion & journeys (walked in browser)

**Funnel map (current state):**
```
Landing → [Hero: Consultar Servicios ✓ / Cotizar Ahora → WA ✓] 
        → [Services: cards → /servicios/[slug] ✓ | "Ver Todos" ✗ DEAD]
        → [HowItWorks → 7 steps → CTA block ✗ DEAD buttons | WA FAB ✓]
        → [FAQ → "Ver todos los servicios" ✗ 404]
        → [Footer: links ✓ (no WA CTA)]
        → [Track: hero form/home form → worker ✓ works]
```

| Journey | Result | Leak points |
|---|---|---|
| 01 New customer | OK path | hero CTA → servicios → slug → WA FAB viable; dead buttons tempt clicks |
| 02 Wants quote | **BROKEN at the widest point** | both CTA-section buttons dead; only WA FAB rescues |
| 03 Encomienda (marítimo) | partial | slug copy best but no rates/transit figures → "pocos días" |
| 04 Tracking | **OK** | 1 request per submit verified; error state clear |
| 05 Mobile-from-ad | OK | no overflow at 320-414; hero CTA visible; **hamburger 24 px target** |
| 06 Returning | OK | nav + search; no account concept (out of scope for landing) |

**Conversion priorities (feed HC-4xx):** fix 4 dead CTAs (P0), fix /services link (P0), rate table + cost calc link (P1, blocked BI-01), FAQ price Q first (P1), WhatsApp in footer + hours (P1), voseo sweep (P1), hero option C (P1).

## 5. BUSINESS INPUT REQUIRED (from copy side)

- **BI-01** Rates: air $/lb + sea $/lb. 3 conflicting cards in docs ($4.50/$2.50 · $6.25/$2.90 promo · $5.50). Nothing publishes a number until confirmed.
- **BI-03** Testimonials: real clients with consent? (Current are generic + stock photos; section hidden.)
- **BI-04** Hours: Mon–Fri 8-5 (site) vs Mon–Fri 8-6 + Sat 8-1 (prescription/GMB).
- **BI-06** Miami wording approval: "Casillero / Tu dirección en Miami" replaces all "bodega" ownership claims (C1).
- **BI-13** Facebook canonical URL (config vs JSON-LD).
- **BI-14** Legal review sign-off for terminos/privacidad (Nicaraguan law).