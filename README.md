# Ridgeline Roofing Ltd. — website

Single-page site for a Guernsey roofing contractor. Plain HTML, Tailwind CSS v3 (compiled), vanilla JS. No frameworks, no CDNs, all paths relative.

```
index.html              the page (sections separated by comment banners)
thanks.html             shown after the quote form is sent
404.html                "This page has slipped" (a roof with one slate missing)
assets/css/styles.css   compiled Tailwind (committed, do not edit by hand)
assets/js/main.js       menu, header, slate edges, ridge lines, services explorer,
                        roof cross-section on scroll, gallery lightbox, form
assets/fonts/           self-hosted woff2 + OFL licences
images/brand/           logo.svg (redrawn), mark.svg, logo-symbol.svg (used by thanks/404)
images/work/            job photos, two WebP sizes (name.webp ~1600px, name-sm.webp ~800px)
images/                 favicons, og-image.jpg, site.webmanifest
src/input.css           Tailwind source, @font-face, components, keyframes
tailwind.config.js      colours by role + fonts
_fb-pack/               Facebook research pack (not published, folder starts with _)
_shots/                 screenshots for the team (not published)
```

## Brand

| Name | Hex | Used for |
|---|---|---|
| action | `#1254D3` | The logo's roof line and N. Buttons, links, focus rings, the ridge-line motif |
| action-700 | `#0B3FB0` | The logo's shaded blue. Button hover |
| ink | `#0D1017` | The logo's black, tinted slightly blue. Text and dark sections |
| slate | `#4A4849` / `#676668` | The slates in the cover photo. Section edges, drawings |
| surface | `#F1F1EE` | The cover photo's pale sky, cooled to granite grey. Light grounds |
| highlight | `#C2512A` | Red treated battens / terracotta clay tiles from their jobs. Drawings and markers only |
| timber | `#D8B98E` | Bare rafters. Drawings only |

Fonts: **Zalando Sans Expanded** (display, wide square capitals like the logo lettering), **Rethink Sans** (body), **Azeret Mono** (small labels). All OFL, from @fontsource.

Logo: the Facebook logo is a square image with phone numbers in it, so it was **redrawn as SVG** (roof line, window, RIDGELINE with the blue N rising as the chimney, ROOFING). The lettering is set in Zalando Sans Expanded as the closest open match. Ask the client for the original vector file before going live.

Recurring device: a small blue roof line drawn over one word of each heading (from the logo).

## Editing

- **Text**: edit `index.html`.
- **Colours**: `tailwind.config.js`, then `npm install && npm run build`.
- **A work photo**: export `name.webp` (~1600px long side) and `name-sm.webp` (~800px) into `images/work/`, then copy one of the `<a class="work-tile">` blocks in the *Recent roofs* section and change the paths, `alt` and `data-cap` (the lightbox caption).
- **Services explorer**: each service is a `.svc-row` in the *Services* section. The desktop photo panel (`[data-svc-photos]`) holds one image per row in the same order, and the captions are the `caps` list in `assets/js/main.js`.
- **Roof cross-section**: the drawing is inline SVG in the *How a roof goes back on* section (layers `data-l="1"`..`5"`). Steps are the `[data-step]` list items; the stage names under the drawing are the `names` list in `main.js`.
- No before/after slider: the pack had no matching before/after pairs.

## Going live — checklist

- [ ] Client buys their domain in their own name (roughly £10 a year for .com, £30–40 for .gg)
- [ ] Help the client create a free Cloudflare account in their name; connect this repo to Cloudflare Pages on their account (production branch `main`, no build command, output = repo root) and add their domain to the Pages project
- [ ] Swap the GitHub Pages URL for the real domain everywhere: canonical, og tags, JSON-LD, sitemap.xml, robots.txt, the form's `_next`
- [ ] Switch the form from the team's email to the client's (`ridgeline.gsy@gmail.com`?) and activate FormSubmit
- [ ] Confirm both phone numbers (07781 412075 and 07781 437171) and that 437171 is the WhatsApp number; confirm the email
- [ ] Get the client to sign off the services wording, especially "Valleys and abutments" and "Around dormers and rooflights" under repairs (taken from their photos, not their posts)
- [ ] Ask for the original logo vector
- [ ] Optional: transfer the repo to the client's own GitHub if they want it

Assumptions and things left out:
- Areas: the pack only says "Guernsey", so no parishes are named.
- No testimonials or FAQ: the page had no reviews and no questions to answer.
- Left out: the "looking for a roofer to join the team" post (hiring), and the Guernsey Building Supplies banner on the clay tile photo (cropped off).
- No prices, insurance, guarantees or "free quotes" claims: none are in the pack.

## Source

Built from the Facebook pack in `_fb-pack/` (not published on the live site).
