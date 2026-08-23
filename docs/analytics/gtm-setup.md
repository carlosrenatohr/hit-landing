# GTM ↔ GA4 Setup Guide — hit-cargo-web

> Purpose: map everything needed to make the two site conversion events measurable in GA4 (audit tasks **G1**, **G2**). The site side is DONE — events already push to `dataLayer`. What remains is container configuration (GTM) plus one-time account setup (GA4).
>
> Owner actions are marked **👤 OWNER**. Everything else is click-by-click inside the GTM container.

---

## 1. What the site emits (verified 2026-08-23)

| Event | Trigger | dataLayer parameters | Source |
|---|---|---|---|
| `whatsapp_click` | Click on floating WhatsApp button | `location: "floating_widget"` | `src/components/preact/WhatsappFab.tsx:13` |
| `track_search` | Every tracking form submission outcome | `track_query` (guía), `track_result`: `"found" \| "notfound" \| "error" \| "timeout"`, `track_status` | `src/components/preact/tracking/shared.tsx:81-90` |

GTM container already installed in `<head>`: **`GTM-K55VC9JZ`** (hash-pinned — never reformat the snippet).

Known gap (**HC-323**): only the FAB pushes `whatsapp_click`. Hero / CTA-section / contacto WhatsApp anchors do NOT emit the event yet. Options: (a) wire GA4 with FAB-only today, add placements later; (b) small code change first (recommended, ~30 min) so `location` can be `hero`, `cta_section`, `contact_page`, etc.

---

## 2. 👤 OWNER — one-time account prerequisites

1. **GA4 property**: confirm a GA4 property exists for hit-cargo.com. If not: analytics.google.com → Admin → Create property → timezone `America/Managua`, currency `USD`.
2. **Data stream**: one Web stream for `https://hit-cargo.com`. Copy the **Measurement ID** (`G-XXXXXXXXXX`) — needed below.
3. **GTM access**: log into tagmanager.google.com with the account that owns container `GTM-K55VC9JZ`.
4. **Link GTM → GA4**: in GA4 → Admin → Product links → Google Tag Manager, link the container (allows selecting the GA4 config tag target without pasting IDs).
5. **Optional but recommended**: enable **Google Signals** and set data retention to 14 months (Admin → Data settings).

## 3. GTM configuration (container GTM-K55VC9JZ)

### 3.1 Google tag (GA4 configuration)
- Tags → New → **Google tag**
- Tag ID: the `G-…` Measurement ID
- Trigger: **Initialization – All Pages**
- Name: `GA4 – Config`

### 3.2 Data Layer Variables
Variables → New (User-Defined) → type **Data Layer Variable**:

| Variable name | DL variable name | Notes |
|---|---|---|
| `DLV – track_result` | `track_result` | found/notfound/error/timeout |
| `DLV – track_status` | `track_status` | carrier status when found |
| `DLV – whatsapp_location` | `location` | where the click happened |

### 3.3 Triggers
Triggers → New → **Custom Event**:

| Trigger name | Event name | Fires on |
|---|---|---|
| `CE – track_search` | `track_search` | all track_search pushes |
| `CE – whatsapp_click` | `whatsapp_click` | all whatsapp_click pushes |

### 3.4 Event tags
Tags → New → **Google Analytics: GA4 Event** — Configuration tag: `GA4 – Config`.

| Tag name | Event name | Trigger | Event parameters |
|---|---|---|---|
| `GA4 – EV – track_search` | `track_search` | `CE – track_search` | `search_term` = `{{DLV – track_query}}`* · `result` = `{{DLV – track_result}}` · `status` = `{{DLV – track_status}}` |
| `GA4 – EV – whatsapp_click` | `whatsapp_click` | `CE – whatsapp_click` | `location` = `{{DLV – whatsapp_location}}` · `link_url` = built-in **Click URL** |

\* GA4 reserves `search_term` for internal search reports — using it makes searches visible in Reports → Engagement → Searches at no extra cost. If preferred otherwise, use `tracking_query`.

### 3.5 Conversions (Admin → Events in GA4, after data flows)
Mark as key event (conversion):
- `whatsapp_click` — macro conversion (primary acquisition action).
- `track_search` with `result = found` — high-intent micro conversion. In GA4 create the key event on `track_search`; filtering by `result` happens in analysis/conversions export, not in the flag itself.

Do NOT mark page_view or scroll as conversions.

## 4. Testing (G2)

1. GTM → Preview → connect to `https://hit-cargo.com/track`.
2. Submit guía `910500` → Summary shows `track_search` with variables resolved.
3. Click FAB → `whatsapp_click` with `location=floating_widget`.
4. GA4 → Admin → **DebugView**: both events appear with parameters.
5. Publish the container workspace (version note: "audit G1 — conversion events").
6. After 24–48 h: Reports → Engagement → Events shows both; then mark conversions per §3.5.

## 5. UTM convention (proposal — needs owner sign-off, BI-08)

Format: `utm_source=meta|google|whatsapp|email|influencer:<name>` · `utm_medium=cpc|social|organic|referral` · `utm_campaign=<yyyymm>-<goal>` (e.g. `202609-lanzamiento`) · `utm_content=<creative id>` · `utm_term=` only for paid search keywords.

Example Meta ad:
```
https://hit-cargo.com/?utm_source=meta&utm_medium=cpc&utm_campaign=202609-lanzamiento&utm_content=video-bodega-15s
```

## 6. Meta CAPI readiness (documented, not built)

Current architecture supports clean future CAPI: single Worker domain (`hit-ever-scraper.nativerse.workers.dev`) can host a `/capi` endpoint; events already have stable names. To prepare:
- Add `event_id` (UUID per interaction) to both dataLayer pushes when CAPI work starts — enables browser/server dedup.
- Capture `fbclid` (URL param) + `_fbp` cookie into dataLayer via GTM variable — no code change needed (GTM first-party cookie variable).
- Consent: EU traffic is negligible today; revisit banner decision (G3) before any EEA targeting.

## 7. Residual gaps

| Gap | Task | Blocked on |
|---|---|---|
| Only FAB emits `whatsapp_click` | HC-323 code change | none (recommend next sprint) |
| GA4 Measurement ID undocumented | this doc §2.2 | 👤 owner |
| Consent banner | G3 | 👤 owner decision |
| Search-failure alerting (digest) | G4 | after G1 data accrues |
