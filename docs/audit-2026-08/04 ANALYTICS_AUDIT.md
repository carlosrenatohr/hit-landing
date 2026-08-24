# 04 ANALYTICS_AUDIT.md — Analytics Implementation Audit

- **Scope:** GTM (`GTM-K55VC9JZ`) + Cloudflare Web Analytics on the landing rewrite.
- **Legacy reference:** old stack sent `track_search` + `whatsapp_click` via a dataLayer shim + `Sentry`/`gtag` on v1.1.

## 1. Structure

- GTM tag present and pinned (`Layout.astro` header; GTM secured, hash-pinned → check `astro.config.mjs` integrity settings).
- GA4 (googletagmanager.com) + Cloudflare Web Analytics next/after GTM.
- **Key difference vs legacy:** there is no v1.2-known way to see events. Any "event validator" is memory-only → no a/b-able view. Decommissioned: Sentry/gtag (smaller + leaner).

## 2. Events sent vs GTM-side handling

| Event | Emitted by | GTM-side handling |
|---|---|---|
| `track_search` (w/ outcome `tr/track OK`, `ts`) | `lib/tracking.ts` + `TrackingPortal.tsx` | GTM events are **fire-and-forget** — no tags mapped yet |
| `whatsapp_click` | `WhatsappFab.tsx` | **nothing** — no tags mapped yet |
| `gtm.js`/`gtm.dom`/`gtm.load` | GTM library | — |
| `page_view` (auto) | GA4 default tags | yes |

→ **Both custom events currently go into the void**: verified in-browser, dataLayer emits them, but no GTM trigger/tag consumes them. This is a **Gap in analytics**, not a code bug — needs the GTM-side work (see G-items) to be useful.

## 3. Correctness

- Lazy/eager loading (GTM loading synchronous in head; CF Web Analytics also loading) might add a tiny FCP cost; acceptable.
- CookieConsent: **none of the 2 consent setups are active** (CookieY es/ blocked, CF web analytics; no cookie banner) → compliance risk under EU/GA4 since only GTM consent-less. Check Nicaragua applicability, but if the site targets EU traffic via GA4, consent is required.
- **HIPAA-grade privacy**: user searches from live traffic go to CF Web Analytics (sampled IP). Visitor search-guia-level is out — no ga4 request from searches? (track_search fires without PII). OK.
- Session persistence tooling: no hybrid/extra SPA-based events for Landing (only track via dataLayer).

## 4. GTM-side actions (feed PROJECT_PLAN G-1xx)

1. **G1** — Create GTM triggers for `track_search` + `whatsapp_click`; map to GA4 custom events + pixel. (This is the single most-valuable CI-side gap.)
2. **G2** — Reintroduce one event validator: GA4 debug/mode view or ga4-debug in staging; centralize in `docs` the GTM event schema (name, payload, outcome enum, semantics of `tr`).
3. **G3** — Add consent deployment decision (cookie banner) — flag compliance; blockers untracked.
4. **G4** — Telegram/Email digest of search failure spikes (ops alerting; ties to smoke/CI).
5. **G5** — Re-add IRP/business metrics table to the dashboard (search `hit-panel` E2E) before async.
6. **G6** — Document dataLayer schema + event catalog in the site repo (single source of truth for GTM-side work).
7. **G7** — If testimonial section removed, substitute store-logo band + verifiable aggregate metrics (R-24).

## 5. Was the track_search dataLayer actually emitted? (live check)

Yes — in-browser confirmed: `{event:'track_search', tr:'error', ts:null}` on a mocked 404 lookup; `gtm.js/gtm.dom/gtm.load` also present (see `evidence/console-*` run, dataLayer dump). So the site-side implementation is correct; only the GTM-side mapping is missing (G1).