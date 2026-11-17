# Ridgeline Roofing Ltd. — website

Single-page site in plain HTML, Tailwind CSS v3 (compiled and committed) and a small vanilla JS file. No frameworks, no runtime CDNs.

## Folder layout

```
index.html              ← the whole site, sections separated by comment banners
thanks.html             ← shown after the quote form is sent
404.html                ← GitHub Pages not-found page (uses <base href="/ridgeline-roofing/">)
assets/css/styles.css   ← compiled Tailwind – don't edit, run `npm run build`
assets/js/main.js       ← menu, scroll reveals, services explorer, gallery filter + lightbox, form validation
assets/fonts/           ← self-hosted Archivo (variable) + Hanken Grotesk, with OFL licences
images/brand/           ← logo.svg (light backgrounds), logo-white.svg (dark), mark.svg
images/work/            ← job photos as WebP: name.webp (large) + name-sm.webp (small)
images/                 ← favicons, og-image.jpg (share card), site.webmanifest
src/input.css           ← Tailwind source, @font-face, keyframes, hero illustration animation
tailwind.config.js      ← brand colours and fonts
sitemap.xml, robots.txt
_fb-pack/               ← Facebook source pack (not published – underscore folders are skipped by Pages)
_shots/                 ← desktop/mobile screenshots for sending to the client (not published)
```

## Brand

| Name | Hex | Used for |
|---|---|---|
| ink | `#0b0b0d` | Text, About section, footer (logo background, #060606, softened) |
| ridge | `#1450d2` | Buttons, links, accents, the ridge-line divider (blue sampled from the logo roof line) |
| ridge-700 | `#0d3aa6` | Button hover |
| ridge-100 / 50 | `#dfe7fa` / `#eef2fb` | Icon tiles, illustration background |
| slate | `#4a4849` | Body copy, illustrated slates (from the cover photo) |
| paper | `#fbf9f6` | Page background (from the cover photo) |

- **Fonts:** Archivo (semi-expanded, headings – picks up the wide lettering in the logo) and Hanken Grotesk (body).
- **Logo:** the Facebook logo is a square image with phone numbers on a black circle, so it was **redrawn as SVG** (same house roof line, chimney, four-pane window, wide "RIDGELINE" with the blue N, spaced "ROOFING"). The lettering is set in Michroma, the closest open font; worth asking the client for the original artwork file.
- **Hero illustration:** inline SVG in `index.html` – courses of slates are laid from the eaves up, then the ridge goes on, on a 10-second loop. Turned off for reduced-motion users.

## Editing

- **Text:** everything is in `index.html`.
- **Colours:** change `tailwind.config.js`, then `npm install && npm run build`.
- **Adding a work photo:** export `name.webp` (about 1600px on the long side) and `name-sm.webp` (about 800px) into `images/work/`, then copy one of the `<li class="g-item">` blocks in the *Recent work* section. Set `data-cat` to `reroof`, `repair` or `progress` (this drives the filter buttons), set `data-full` to the large image, and write the caption in the `<p>` under it – the lightbox uses that caption.
- **Services explorer:** each service is a `<button role="tab">` plus a matching `<article role="tabpanel">` (`tab-xxx` ↔ `panel-xxx`). To add one, copy both and give them a new id. The `data-service` on each panel's button pre-selects that option in the quote form, so keep it matching an `<option>` in the form.
- **Before & after:** not included – the pack had no matching before/after pairs of the same roof. If the client has some, a slider is an easy add.

## Before going live – checklist

- [ ] Swap `https://sarniasites.github.io/ridgeline-roofing/` for the real domain everywhere: canonical, `og:url`, `og:image`, `twitter:image`, JSON-LD, `sitemap.xml`, `robots.txt`, and the form's `_next`. Change `<base href>` in `404.html` to `/`.
- [ ] **When the client goes ahead, switch the form from Toby's email (`formsubmit.co/toby1@greggs.org`) to the client's (probably ridgeline.gsy@gmail.com) and activate FormSubmit** (first submission sends a confirmation email).
- [ ] Confirm phone numbers: the Facebook contact info lists **07781 412075** (used as the main Call number); the logo and WhatsApp button use **07781 437171**. Both are shown – check which should be the main one.
- [ ] Confirm email ridgeline.gsy@gmail.com.
- [ ] Client to sign off the services wording. Assumptions made from their photos rather than their words: they fit insulation between rafters, breathable membrane and battens; they do flashings around chimneys, dormers and roof windows; they reset ridges and verges.
- [ ] No reviews were available (reviews are off on their page), so there is no testimonials section. Add 3–6 if the client can supply them.
- [ ] Not stated, so not claimed: insurance, guarantees, free quotes, prices, areas outside Guernsey, commercial work.
- [ ] Left out of the site: the "looking for a roofer to join the team" recruitment post, and the GBS (Guernsey Building Supplies) branding on the clay-tile photos (cropped off).
- [ ] Ask for the original logo artwork and any better/landscape photos of finished roofs.

## Source

Built from the Facebook pack in `_fb-pack/` (not published on the live site).
