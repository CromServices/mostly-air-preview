# Mostly Air — spec redesign wireframe v1.2

**Status:** wireframe only. Nothing has been built, published, or sent. No contact with the owner.

Pitch piece for Andrew Moseley, Mostly Air, Adelaide Hills SA. Prepared 10 Nov 2026 (Australia/Perth). v1.2 keeps the v1.1 theme, type, 5-page scope, A$990 + A$49/mo care and the WordPress pick, and adds the issues list, current page mechanics and a Google reviews block. v1 and v1.1 are unchanged in their folders.

Scope (Nate via Director, 10 Nov): intro build A$990 plus A$49/mo care (standard build A$1,490). This is a 5-page site sized to that intro price.

Production digest md5: `c63ff4c8007fdf7f68563e40d74a7000`. Locks read: L-WIREFRAME, L-BUILDMETHOD, L-101, L-NOSQBUB, L-017, L-019, L-032, L-HAND, L-NOIDLE, L-098.

---

## 1. Before and after

| | Current site (10 Nov 2026) | This rebuild |
|---|---|---|
| Desktop Lighthouse | 40 | Target ≥ 90 |
| Mobile Lighthouse | 61 | Target ≥ 80 |
| Desktop LCP | 9.4 s | ≤ 2.5 s |
| Desktop CLS | 0.31 | ≤ 0.1 |
| Viewport | Missing | Present |
| Quote form | None | On Home and on Quote |
| Local schema | None | HVACBusiness with the live NAP |
| Copyright | Still 2015 | Current year |
| Platform | Custom PHP 5.6 / Bootstrap 3, no CMS | WordPress, light block theme, no page builder |
| Pages | One page | Five pages, listed below |

Current-site proofs remain in the parent folder: `../proofs/current-desktop-1440.png`, `../proofs/current-mobile-390.png`. Rebuilt-site proofs for this revision: `proofs/desktop-1440.png`, `proofs/mobile-390.png`.

---

## 2. Taken from the live site

Fetched 10 Nov 2026, 11:43 AWST, `https://www.mostlyair.com.au/` (HTTP 200, 5,046 bytes). Cross-checked against Outbound evidence `mostly-air-adelaide.json` (checked 10 Nov 2026 08:22 AWST).

| Fact | Source on the current site |
|---|---|
| Business name | Heading and title: Mostly Air |
| Person | “My name is Andrew Moseley.” |
| Trade | Self-employed air conditioning and refrigeration technician |
| Area | Adelaide Hills, South Australia; “lived in the Adelaide Hills all my life” |
| Started in the trade | 1994 |
| Scope claimed | Domestic through to industrial and commercial; all types and makes; installs, repairs and maintenance |
| Services listed | Split system installs; Ducted system installs; Sales; Repairs; Maintenance |
| Qualification claimed | “Qualified A-Class electrician” (no licence number published) |
| Equipment | Recommends DAIKIN, will work with all types and makes. Current page also carries a Daikin logo linking to daikin.com.au |
| Address | 126 Bald Hills Road, Blakiston SA |
| Phone | 0411 135 918 |
| Email | andrew@mostlyair.com.au |
| Title | Mostly Air - Air conditioning & refrigeration - Adelaide Hills, South Australia |
| Meta description | Split system installs, Ducted System installs, Sales, Repairs, Maintenance |
| Photo on file | `theme/custom/mostlyair/images/mostlyair_van.jpg` (work van) |
| Footer | “Copyright 2015 Mostly Air”; “Web design by Codesnap” |

**Current platform:** custom PHP on LiteSpeed, `X-Powered-By: PHP/5.6.40`, Bootstrap 3.3.5 and Font Awesome 4.3 from a public CDN, styles under `theme/custom/mostlyair/`. Not WordPress, Wix, Framer, Webflow or Lovable. PHP 5.6 has been end-of-life since 2018, so a host upgrade is needed before deploy.

Nothing below was taken from a review, a job list, a licence register or a photo library other than the van image already on the site.

---

## 3. Gaps (visible placeholders on the proofs)

- No reviews, testimonials, job list, before/after photos or results are published. None have been invented. The reviews band is a labelled placeholder.
- No electrical or refrigeration licence number, and no ABN, appears on the site. Reserved slot: “A-Class electrical licence number — not published on the current site. Add only with Andrew’s confirmation.”
- Opening hours are not published. Contact has a hours placeholder.
- Service-area suburbs beyond “Adelaide Hills” and the Blakiston address are not listed. No extra suburb pages have been invented.
- The existing van photo can be reused if Andrew agrees. The hero uses a labelled photo slot.

---

## 4. Platform recommendation

**Pick: WordPress (self-hosted), light block theme, no page builder.**

**Monthly cost: A$12.95 inc GST** for a one-site Australian LiteSpeed plan (My Australian Host “WP Starter”, checked 10 Nov 2026: 1 WordPress site, 20 GB NVMe, LSCache, SSL). Similar starter plans sit at A$14.99 (Webhoster WP Starter) and A$15 (Stack2 Spark; HostingBay WP Business). All of these stay under the A$20/mo cap, so the A$49/mo care plan still has margin.

**Flag, do not use:** My Australian Host WP Business is A$24.95/mo, Webhoster WP Business is A$29.99/mo, and ModusOp Basic is A$24.95/mo inc GST — each would break the care margin. A 5-page brochure site does not need those tiers. Wix Light is A$21/mo and Wix Core is A$42/mo (standard annual AUD rates, GST included, checkout-verified 2026) — both are over the cap, which is a further reason not to pick Wix. WordPress.com paid tiers are also over the cap; this pick is self-hosted WordPress only.

If Andrew’s current LiteSpeed host can run a current PHP version for A$20/mo or less, stay there and skip a host move. Confirm the bill before build. The software itself is free.

**Why WordPress:** the live site is a 2015 one-page PHP file with no CMS, so Andrew cannot edit hours, services or the copyright line himself. WordPress on a starter LiteSpeed plan lets him change phone, hours, services and photos in the editor, stays inside the care margin, and matches Nate’s standing view that trade service sites belong on WordPress. Lovable, Framer and Webflow are weaker fits for a tradie who only needs to edit contact details. Squarespace and Bubble are out (L-NOSQBUB).

---

## 5. Theme carried over

v1 used a warm bone / bottle-green / copper palette and Fraunces, which read as a new brand. This revision follows the live site so it reads as Mostly Air, modernised.

Taken from the live CSS at `https://www.mostlyair.com.au/theme/custom/mostlyair/css/styles.css` (fetched again 10 Nov 2026) and from the current-site proofs.

**Colours (exact from the CSS):**

| Hex / value | Role on the current site |
|---|---|
| `#05ABE0` | Brand cyan. Header gradient start (33%), footer links. |
| `#53CBF1` | Header gradient mid stop (66%). |
| `#87E0FD` | Header gradient end. |
| `#FFFFFF` | Type on the header, tagline bar and footer. |
| `rgba(255,255,255,0.5)` | Frosted content wells. |
| `rgba(0,0,0,0.5)` | Advertising, tagline and footer bars. |

The background photograph is a deep teal sky. Sampled from the current desktop proof and used as a solid navy, not the 2015 orb photograph: `#07364B`, `#0E6992`, `#10556E`. Page ice `#F4F8FB` is sampled from the light areas of the current mobile proof (`#F4F7F8`). Ink `#13242D` is sampled from the darker sky.

**Logo treatment:** uppercase stacked wordmark “MOSTLY AIR” over “AIR CONDITIONING”, with the phone set at the same size on the right, all in white on the cyan header — the lockup already used on the site and on the van.

**Imagery and motifs:** work-van photograph (slot only until reuse is agreed); two-column copy plus photograph; services and address beside the van; a navy tagline bar with “Air conditioning & refrigeration – Adelaide Hills, South Australia.” The Daikin banner ad is not carried over; the recommendation stays in the about copy, as it already does on the live page.

**Type:** Outfit 400 and 700, self-hosted latin woff2 (~25 KB the pair), SIL Open Font Licence. Replaces the live site’s Source Serif Pro + Open Sans, and v1’s Fraunces + Source Sans 3. No display pairing, so the first-load budget stays intact.

Desktop-first, then 390px. Still Andrew’s first-person voice. Motion: none. No scrolltide, no scrollshaders.

---

## 6. Pages, sections and copy notes

Five pages. Copy is drawn from the live site; do not invent jobs, reviews, prices, hours, licence numbers or suburbs. Placeholders stay visible until Andrew fills them.

### 1. Home (`/`)

1. **Utility bar** — Adelaide Hills · click-to-call 0411 135 918 · Request a quote.
2. **Header** — wordmark “Mostly Air”. Nav: Work, About, Quote, Contact. Call button.
3. **Hero** — Heading: “Air conditioning and refrigeration for the Adelaide Hills.” Lead, from his copy: Andrew Moseley, self-employed technician, in the trade since 1994. CTAs: Request a quote / Call 0411 135 918. Photo slot for the existing van image (`mostlyair_van.jpg`), labelled until reuse is agreed.
4. **Services row** — the five live-site items only: Split system installs; Ducted system installs; Sales; Repairs; Maintenance. Each links to the matching Work section.
5. **About teaser** — short first-person extract: local climate knowledge; one call from quote through to commissioning because he is a qualified A-Class electrician; recommends Daikin and will work with all types and makes. Link to About. Licence number is a placeholder.
6. **Quote card** — the form in §7.
7. **Contact strip** — 126 Bald Hills Road, Blakiston SA, 0411 135 918, andrew@mostlyair.com.au.
8. **Reviews band** — placeholder only: “No reviews are published on the current site. Add only ones Andrew confirms.”
9. **Footer** — NAP, nav, current year. No 2015 copyright. No Codesnap credit unless he asks to keep it.

SEO: title `Air conditioning & refrigeration, Adelaide Hills | Mostly Air`. Meta: `Split and ducted installs, sales, repairs and maintenance in the Adelaide Hills. Call Andrew Moseley on 0411 135 918.`

### 2. Work (`/work`)

1. Header as Home.
2. Intro: the five services, from domestic through to industrial and commercial, as he already states.
3. **Split system installs** — short section. No invented prices or job shots.
4. **Ducted system installs** — same rule.
5. **Sales** — he sells as well as installs; he recommends Daikin and works with all makes.
6. **Repairs**
7. **Maintenance**
8. Quote CTA and footer.

Photo slots on this page stay labelled placeholders unless Andrew supplies job photos.

### 3. About (`/about`)

1. Header.
2. Use his live first-person copy, lightly tidied for spelling only (“it’s” → “its” in “its heating and cooling requirements”):
   - Self-employed air conditioning and refrigeration technician, Adelaide Hills.
   - Began in the trade in 1994; domestic through to industrial and commercial; all types and makes.
   - Lived in the Adelaide Hills all his life; understands the local climate and its heating and cooling requirements.
   - Community-minded, with past and present involvement in local sporting groups and clubs.
   - Pride and honesty; a good quality job, priced fairly; hopes for return customers and word-of-mouth.
   - Qualified A-Class electrician, so installations do not need an extra tradesman; one call from quotation through to commissioning and backup service.
   - Recommends Daikin, works with all types and makes.
3. Licence-number placeholder. No invented qualification text.
4. Van photo slot.
5. Footer.

### 4. Quote (`/quote`)

1. Header.
2. Heading: “Request a quote”. Helper: Andrew will call back to talk through the job. No prices or lead times.
3. The form in §7, plus the phone and email beside it.
4. Footer.

### 5. Contact (`/contact`)

1. Header.
2. NAP from the live site: 126 Bald Hills Road, Blakiston SA, 0411 135 918, andrew@mostlyair.com.au.
3. Hours placeholder: “Opening hours — not published on the current site. Add only with Andrew’s confirmation.”
4. Map embed only once he confirms the Blakiston address should be public on a map.
5. The same quote form, or a short link to /quote.
6. Footer, with the licence placeholder repeated so NAP + licence stay consistent.

No suburb pages until he names the towns he covers.

---

## 7. Quote form

The current site has no form. Home and /quote share one form, posted to andrew@mostlyair.com.au.

Fields: name, phone, email, suburb or address, work type (split system install, ducted system install, sales, repairs, maintenance, other), short description, preferred time to talk. Submit: “Request a quote”.

---

## 8. Speed and SEO

Targets after launch (Lighthouse desktop and mobile, or field data): LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1. Performance ≥ 90 desktop, ≥ 80 mobile. Home first load (HTML + CSS + fonts + hero image, compressed) ≤ 300 KB, aim ≤ 250 KB.

Images: reuse the van photo if agreed, AVIF/WebP, width/height set, 800/1440 srcset. One self-hosted sans (Outfit 400 and 700, woff2, latin, ~25 KB). No Google Fonts request, no jQuery, Bootstrap, CDN CSS, carousels or legacy `analytics.js`.

SEO: viewport, canonical, XML sitemap, current copyright year, consistent NAP, click-to-call, `HVACBusiness` JSON-LD with the Blakiston NAP, telephone, email and areaServed “Adelaide Hills, South Australia”. Add the licence number only once he supplies it.

---

## 9. Build-hours estimate

Sized to the A$990 intro build. **Figure: 12 hours** (inside the 10–14 h band).

| Part | Hours |
|---|---|
| Hosting/PHP check, WordPress setup, light theme | 1.5 |
| Home | 2.5 |
| Work | 2 |
| About (from the live copy) | 1 |
| Quote page and notification email | 2 |
| Contact, schema, titles | 1.5 |
| Performance, QA, handover | 1.5 |
| **Total** | **12** |

---

## 10. Proofs

Rendered at device pixel ratio 3 from `wireframe.html`.

- `../proofs/current-desktop-1440.png` — live site at 1440 (unchanged from v1)
- `../proofs/current-mobile-390.png` — live site at 390 (unchanged from v1)
- `proofs/desktop-1440.png` — proposed Home at 1440
- `proofs/mobile-390.png` — proposed Home at 390

Visuals carry no sample, demo or template wording, and no mention of bots or AI.

---

## 11. Next step

Nate reviews this v1.2 pack. No build starts until he says so (L-WIREFRAME).

---

## 12. Issues found

Scores and listed issues are from Outbound evidence `crom-desk/02-working/outbound/tradie-weak-sites-2026-11-10/evidence/mostly-air-adelaide.json`, checked 10 Nov 2026 at 08:22 AWST. The file’s performance runs are tagged `lighthouse-local` (mobile) and `lighthouse-local-desktop` (desktop). Accessibility, best practices and SEO category scores are not in that file, so they are not listed.

| | Mobile | Desktop |
|---|---|---|
| Performance | **61** | **40** |
| First Contentful Paint | 5.2 s | 4.4 s |
| Largest Contentful Paint | 9.2 s | 9.4 s |
| Speed Index | 5.3 s | 4.4 s |
| Total Blocking Time | 110 ms | 0 ms |
| Cumulative Layout Shift | 0 | 0.31 |
| Time to Interactive | 9.2 s | 9.4 s |

**Faults from that evidence file:** no `<meta name=viewport>` (weighted as a broken-mobile issue); copyright still 2015; no quote or contact form (`forms=0`); no LocalBusiness or JSON-LD schema and no Maps embed.

**Also confirmed on the live site (10 Nov 2026), and already noted in v1:** the site is custom PHP on LiteSpeed with `X-Powered-By: PHP/5.6.40` (end-of-life since 2018); Bootstrap 3.3.5 and Font Awesome 4.3 from a public CDN; a fixed full-page background photograph; legacy `analytics.js`; no CMS, so Andrew cannot edit the copyright line or services himself; one page only.

The rebuild targets performance ≥ 90 desktop and ≥ 80 mobile, LCP ≤ 2.5 s and CLS ≤ 0.1, adds a viewport, a working quote form, current-year footer, and HVACBusiness schema with the published NAP.

---

## 13. Current page mechanics

The live site is a single page, `https://www.mostlyair.com.au/`, fetched again for this revision on 10 Nov 2026.

| Page | What it does | Nav | Forms, CTAs, sliders and motion | Rebuild |
|---|---|---|---|---|
| Home (the whole site) | First-person introduction, the five services, the van photograph, NAP and a Daikin advertising banner. | There is no site navigation. The header lockup is the name, “Air conditioning”, and the phone number. | No form. The main actions are the click-to-call number in the header and a `mailto:` on the email. The Daikin banner links out to `daikin.com.au`. No slider, carousel or animation library. The only motion is a CSS gradient on the header and `background-attachment: fixed` on the sky photograph. Footer credits Codesnap and still says 2015. | Keep the copy, the five services, the NAP and the van photograph as a labelled slot. Keep the Daikin recommendation in the about copy, not as a banner ad. Add a simple nav (Work, About, Quote, Contact), a working quote form on Home and Quote, a viewport, and a current-year footer. Drop the fixed background, the CDN CSS/JS and `analytics.js`. |

---

## 14. Google reviews

Sought this session (10 Nov 2026) from the Google Business Profile. The Maps place page itself did not return review text or reviewer names.

Third-party pages that attribute a figure to Google were retrieved, but they are not enough to put reviews on the pitch site: `https://aussiebuildersdirectory.com/business/mostly-air-blakiston-sa/` reports **4.3 from 11 Google reviews** and shows quote snippets, and states “Reviewers' names are not shown here.” `https://reviews.birdeye.com/mostly-air-166817352751368` also reports **4.3 from 11 reviews** and a Google source, but the retrieved page had no review bodies or names.

**On the new site:** a Google reviews block on Home, in its own section just above the footer, after the note that the current website publishes no reviews. Because named quotes were not retrieved from the GBP this session, that block is the placeholder: “Google reviews: not retrieved, add from the GBP with the owner's OK.” Nothing has been invented or paraphrased.

