# Brand Analysis: LDMA (ldmabrand.com)

> Analysis created 2026-09-03 for the Oman Kwesi storefront remake.

## Source
- **URL:** https://ldmabrand.com/
- Reference screenshots captured live via browser (home, shop-all grid, PDP, about) — not saved to `public/references/` since none of LDMA's actual photography or copy is being reused; only the layout/type/color *system* below informs the rebuild.

## Remake Approach
- **Selected:** Inspired Remake
- **Font Handling:** Claude's choice — bold condensed display sans + elegant serif accent, in the same spirit as LDMA's pairing, sourced from Google Fonts
- **Color Handling:** Match the monochrome-first palette (black/white/neutral-grey), color comes from product photography, one small brand accent added for Oman Kwesi
- **Layout Handling:** Preserve the structural ideas (split heroes, sparse grids, sticky PDP info panel, huge wordmark footer) but rebuilt fresh for Oman Kwesi's own products/copy

## Brand Personality (of the reference)
- **Tone:** Confident, minimal, editorial
- **Energy:** Bold headlines, calm body copy — contrast rather than loudness
- **Feel:** Premium but not fussy; studio-photography clean
- **Style:** Modern grotesk + classic serif pairing; sharp (unrounded) UI edges

## Color Palette (reference)
| Role | Value | Usage |
|------|-------|-------|
| Ink | near-black | headlines, nav, buttons |
| Paper | white / off-white | page background |
| Studio grey | neutral #dfdedb-ish | product photography backdrop |
| Accent | none fixed — color comes from the product/photography itself | category tiles, imagery |

## Typography (reference)
- **Headings:** bold, condensed, all-caps grotesk (dense tracking, heavy weight)
- **Accents / eyebrows / collection names:** light serif, often italic
- **Body:** plain sans, generous line-height
- Strong contrast between the two families is the signature move, not any one specific typeface

## Section-by-Section Notes
- **Nav:** logo left/center, text links, icon cluster right (account / search / bag), thin bottom rule, announcement bar above
- **Hero:** full-bleed image, headline + CTA anchored to one corner, no card/box framing
- **Home sections:** serif italic section title + "View all" link; 4-up product grid; two-up oversized category tiles with text overlay; UGC/editorial strip; "shop by color/style" tiles
- **Shop/collection grid:** italic serif page title, lightweight filter row (Size/Color), 4-col grid, swatches under each card
- **PDP:** large image column + sticky info panel (title, rating, price, color, size, qty, full-width black CTA, tabbed details)
- **About:** split layout — image one side, "MEET [BRAND]" eyebrow + bold statement headline + serif body on the other
- **Footer:** minimal link columns + email capture, closed out with an oversized wordmark as a visual signature
- **CTAs:** solid black, rectangular (no rounding), uppercase, no gradients/shadows

## What Carries Over to Oman Kwesi
- Bold display / serif-accent type pairing
- Monochrome UI, color from product photography
- Sharp (unrounded) buttons and cards — a deliberate contrast to the admin panel's soft, rounded shadcn UI
- Split/asymmetric layouts over centered boxed sections
- Sticky PDP info panel
- Wordmark-as-footer-signature

## What Does NOT Carry Over
- No LDMA photography, copy, product names, or promo mechanics (discount popups, "40% off" bar) are reused
- Oman Kwesi's own product categories (Dress, Tradition, Shoes, Glasses) and GHC/Paystack checkout stay as-is
