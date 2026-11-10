# Spec-site preview builds — shared decisions

**Status:** shared path locked 10 Nov 2026 12:12 AWST. All three site builds are **HOLD** until Production lands v1.1 wireframes (each business's current-site theme, modern font) under `production/outbound-spec-sites-2026-11-10/<business>/v1.1/`. Do not launch Cursor cloud agents until those packs exist and Director re-opens the briefs.

Client delivery platform (unchanged, Production v1): self-hosted WordPress, light block theme, ~A$12.95/mo hosting, sized to A$990 intro + A$49/mo care. This file covers the **pitch preview** only: we have no WordPress host for a public preview.

Locks read: L-017, L-018, L-019, L-032, L-050, L-071, L-101, L-WIREFRAME, L-BUILDMETHOD, L-NOSQBUB, L-CODEFIRST, L-HAND. Nate 10 Nov: build once wireframes are done; pitch leads with the rebuilt site, then price. v1.1 hold supersedes a same-day start on the v1 packs.

---

## 1. Preview hosting — pick

**GitHub Pages on a public CromServices repo, one repo per site. Static HTML + CSS.**

Target URL shape: `https://cromservices.github.io/<repo>/`

**Why this path**

- Already wired, free, no new sign-up. Live today: [ojjm-hire](https://cromservices.github.io/ojjm-hire/) (static Shopify-theme preview, later ports to Shopify) and [homepage-preview](https://cromservices.github.io/homepage-preview/) (noindex, `robots.txt` Disallow). Same pattern as booking-demo, job-page-sample, next-ui-sample, ad-leads-sample.
- Closest analogue is OJJM Hire: a static public preview that later ports to the real delivery platform. Here the delivery platform is self-hosted WordPress, not Shopify.
- Lifecycle Build (the WordPress trade demo) is files and screenshots only — no public WP URL — so there is no existing WordPress demo host to reuse.
- crom-job-host is ruled out (L-071: job pages only for real bids/jobs; no demo pages stay live).
- Lovable / Framer would cost credits or sit on the wrong stack (L-018 credit gate; weaker WP port). Softpunch is Framer; Grove and Potion is Lovable; neither is the WP handover path.
- Cloudflare is connected (`cromservices@gmail.com`) and fronts cromservices.com.au, but demo deploys already go through GitHub Pages. Do not open a new Cloudflare Pages path unless GH Pages is blocked.
- `CromServices/trade-site-preview` is a private Lovable / TanStack one-pager, not a deploy we should extend. Leave it alone.

**What to build (preview stack)**

- Static HTML + CSS only. No React, Vite, Lovable, jQuery, or page builders. Semantic, section-shaped markup and CSS custom properties so a later WP block theme can take the same sections almost as-is.
- Also ship a `wp-theme/` folder in the same repo: `theme.json` (palette, type, spacing from the v1.1 wireframe) plus block-pattern HTML that mirrors each static section. The preview itself does not run WordPress.
- All in-repo links must be **relative** (Pages serves from `/<repo>/`, not `/`).
- Enable Pages: Settings → Pages, Deploy from a branch, `main`, folder `/` (legacy, same as ojjm-hire and homepage-preview). HTTPS enforced. No custom domain.
- Repos are **public** because GH Pages on this org is already proven on public repos. Source will be public; the live preview must still be clearly marked and noindexed.

**Do not:** buy hosting, sign up to a new service, deploy to Fly, put these on crom-job-host, or index the previews.

---

## 2. Repo names

Checked 10 Nov 2026 12:12 AWST via `gh` as CromServices (authed, `repo` scope). None of these exist:

| Business | Proposed repo | Preview URL (after Pages is on) |
|---|---|---|
| Mostly Air | `CromServices/mostly-air-preview` | https://cromservices.github.io/mostly-air-preview/ |
| Michael Jin Plastering | `CromServices/michael-jin-plastering-preview` | https://cromservices.github.io/michael-jin-plastering-preview/ |
| Industry Refrigeration | `CromServices/industry-refrigeration-preview` | https://cromservices.github.io/industry-refrigeration-preview/ |

Repo description (all three): `Spec preview by Crom Services. Not the live site. Not indexed.`

Default branch `main`. Public. One site per repo — do not dump all three into `trade-site-preview`.

Director (or the cloud agent, if granted) creates each repo when the matching brief is taken off HOLD. Do not create them while the builds are held.

---

## 3. Deploy path (when a brief is released)

1. Create the repo above. Add a short README: preview only, not the live site, not indexed, public face Crom Services (L-032).
2. Commit the static site at the repo root (`index.html`, inner pages, `css/`, `fonts/`, `robots.txt`, optional `img/`) plus `wp-theme/`.
3. Turn on GitHub Pages: branch `main`, folder `/`.
4. Confirm the Pages URL returns 200 logged-out, HTTPS, and that inner pages resolve under `/<repo>/`.
5. Nothing is sent to a tradie, added to the proof list, or submitted to Search Console. Audit still gates any later send (L-018, L-016). Nate already greened the preview builds themselves once wireframes are ready; v1.1 is the ready pack.

Cloud-agent handoff: attach the v1.1 `wireframe.md`, `wireframe.html`, and proof PNGs (and this SHARED.md). Agents will not see `/workspace` unless Director copies those files into the repo first.

---

## 4. Rules that apply to every preview

- **Noindex:** `<meta name="robots" content="noindex, nofollow">` on every page, and `robots.txt` with `User-agent: *` / `Disallow: /` (same as homepage-preview and ojjm-hire).
- **Banner:** a slim, always-visible bar: “Spec preview by Crom Services”, linking to https://cromservices.com.au. This is a preview of a real third-party business, not a fictional proof-list demo, so L-050 / L-101 (no “sample/demo” labels on Crom demo products) do not ban this mark. Remove the bar when the design is later ported onto the client’s WordPress.
- Public face is Crom Services only (L-032): no Nate, no bot names, location “Australia” if the firm is mentioned.
- **Do not invent** licence numbers, ABNs, reviews, jobs, hours, suburbs, or staff bios. Placeholders stay visible, wording taken from the (v1.1) wireframe.
- **Do not change** published phone numbers, emails, or addresses.
- **Do not scrape and republish** the owner’s photos (e.g. the Mostly Air van) or hotlink their host. Use labelled photo slots until the owner agrees.
- **Forms:** demo-only. Intercept submit in the browser, show a thank-you state, and **do not POST** to the tradie’s inbox or any live endpoint. Helper line: this preview form does not send.
- Light page weight (Speed + SEO offer): Home first load (HTML + CSS + fonts + hero, compressed) ≤ 300 KB, aim ≤ 250 KB. One self-hosted heading/body woff2 (latin subset) or a system stack. No CDN CSS frameworks, carousels, or unused JS. Images: width/height set; lazy below the fold.
- Motion: none, unless v1.1 says otherwise.
- Copy and visual theme come from the **v1.1** wireframe, not from this file. v1 said “follow a new palette”; v1.1 follows the business’s own current-site theme with a modern font. Do not implement v1 palettes once v1.1 exists.

---

## 5. Acceptance checks (template)

Copy into each site brief when it leaves HOLD. Fill the repo / URL / page list then.

**Pages and chrome**

- [ ] Five pages from the v1.1 wireframe, all reachable from the header nav, all using relative links under `/<repo>/`.
- [ ] Desktop-first, then usable at 390px, matching the v1.1 proofs in layout and theme (current-site look, modern font).
- [ ] “Spec preview by Crom Services” bar visible on every page.
- [ ] noindex + `robots.txt` Disallow as above.
- [ ] Placeholders for missing licence / ABN / reviews / hours / photos are visible and honest. No invented facts.
- [ ] Published NAP and phone numbers match the wireframe exactly. Click-to-call works.
- [ ] Leftover or conflicting current-site copy called out in the wireframe is not carried over.

**Form**

- [ ] Quote form present where the wireframe puts it.
- [ ] Submit does not send email or hit a live endpoint. Thank-you state only.

**Speed and SEO (preview, still noindex)**

- [ ] Lighthouse Performance: ≥ 90 desktop, ≥ 80 mobile (PageSpeed Insights or local Lighthouse).
- [ ] LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 (desktop and mobile, same run).
- [ ] Home first load ≤ 300 KB (aim ≤ 250 KB).
- [ ] Viewport, unique title and meta on each page, consistent NAP. JSON-LD only with facts in the wireframe. No Search Console submit.

**Port-ready**

- [ ] `wp-theme/theme.json` plus block patterns that match the static sections, ready to drop into a self-hosted WP light block theme later.

**Logged-out proof (L-019)**

- [ ] Screenshot desktop 1440 and mobile 390 of Home (and any page that differs).
- [ ] Logged-out curl/open of the Pages URL: 200, HTTPS.

---

## 6. What the cloud agent reports back

- Public preview URL (Pages, 200 logged-out).
- Repo URL, PR if used, and the merge commit SHA.
- Lighthouse / PSI scores (desktop and mobile Performance, LCP, CLS) and the Home transfer size.
- Confirmation the form does not submit live.
- Path to `wp-theme/`.
- Any leftover gaps or wireframe questions (do not invent answers).

---

## 7. Brief stubs

| Business | Stub | State |
|---|---|---|
| Mostly Air | `mostly-air/BRIEF.md` | HOLD, pending v1.1 |
| Michael Jin Plastering | `michael-jin-plastering/BRIEF.md` | HOLD, pending v1.1 |
| Industry Refrigeration | `industry-refrigeration/BRIEF.md` | HOLD, pending v1.1 |

When v1.1 lands, Director fills each BRIEF with pages, copy notes, and assets from that pack, points at this SHARED.md for stack / deploy / checks, and only then launches a cloud agent. One repo, one agent, one site.
