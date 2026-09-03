# Oman Kwesi — Site Notes

## Business
- **Name:** Oman Kwesi (nav wordmark: "OM — K")
- **What it is:** Fashion e-commerce store — dresses, traditional wear, shoes, glasses
- **Market:** Checkout via Paystack (West African market, prices in GHC)
- **Two surfaces:** a customer-facing storefront (this doc) and an internal `/admin` panel (untouched — stays a plain, utilitarian shadcn-style UI on purpose, so the storefront reads as a totally different, dynamic experience)

## Visual Direction
Inspired by ldmabrand.com's design system (see `BRAND-ANALYSIS.md`) — not its content.
- **Type pairing:** bold condensed display sans (headlines, UI, all-caps) + a light serif, often italic (eyebrows, section titles, accents)
- **Palette:** monochrome — ink/paper/neutral grey — color comes from product photography; one small warm accent for badges/sale states
- **Shape language:** sharp, unrounded — deliberate contrast to the admin panel's rounded/soft components
- **Layout:** asymmetric split heroes, sparse product grids, sticky PDP info panel, oversized wordmark in the footer

## Pages in Scope
- Home (`/home`)
- About (`/about`) — new
- Shop (`/products`) — plus working search
- PDP (`/products/[slug]`)
- Orders (`/orders`)

## Build Log
- 2026-09-03: Design tokens (fonts, color, button system), Navigation + Footer, Home (Hero, Featured, Categories), Shop + working search, PDP, new About page, Orders restyle — all built and passing `next build`.
