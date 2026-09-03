# Oman Kwesi

A fashion e-commerce storefront — apparel, shoes, and glasses, checkout via Paystack. Built as a portfolio piece: a full storefront + admin dashboard running on Cloudflare's edge, not just a UI shell.

**Live:** https://store.kelvinohemeng59.workers.dev

## Try it live

The admin dashboard is fully explorable without asking anyone for access — sign in at [`/admin/login`](https://store.kelvinohemeng59.workers.dev/admin/login) with the demo account shown on that page. It has real admin permissions to browse products, orders, and the dashboard; writes are gated server-side so the demo can't be used to vandalize the catalog.

## Stack

- **Framework:** Next.js (App Router) on **Cloudflare Workers** via OpenNext, deployed as a single Worker (no separate origin server)
- **Data:** Cloudflare **D1** (SQLite) with **Drizzle ORM**; product images in **R2**
- **Auth:** [better-auth](https://www.better-auth.com/), session-based, seeded server-side
- **Payments:** [Paystack](https://paystack.com/) checkout, verified server-side against Paystack's API before an order is recorded
- **State/data-fetching:** Zustand + TanStack Query on the client, server-fetched initial data on the storefront's product pages (no client-only loading flash)
- **UI:** Tailwind CSS v4, Radix primitives, Motion for animation

## Architecture notes

- **Two surfaces, one deploy:** the customer-facing storefront and the `/admin` dashboard ship from the same Next.js app and Worker — the admin panel is intentionally a plainer, utilitarian UI so it reads as a distinct tool rather than a themed page.
- **Public demo account:** `src/lib/demo.ts` defines a demo user whose email/password are meant to be shared. Every mutating server action checks `isCurrentUserDemo()` and refuses to run for it — enforced server-side (not just a disabled button), so the same check can't be bypassed from the client.
- **SSR where it earns its keep:** product detail pages and the product grids on `/home` and `/products` fetch from D1 in a Server Component and pass the result down as `initialProducts`, so the page has real content on first paint; the Zustand store takes over once populated, so client-side navigation between pages stays instant without depending on that first request.

## Local development

```bash
npm install
npm run dev                 # next dev, reads .dev.vars for local secrets
```

You'll need a `.dev.vars` file (gitignored) with `BETTER_AUTH_SECRET` and `PAYSTACK_SECRET_KEY` — see `wrangler.jsonc` for the non-secret vars.

```bash
npm run db:migrate:local    # apply Drizzle migrations to the local D1 instance
npm run db:studio           # browse the local DB
```

## Deploying

```bash
npm run deploy               # opennextjs-cloudflare build && deploy
npm run db:migrate:remote    # apply migrations to the production D1 database
```

Secrets (`BETTER_AUTH_SECRET`, `PAYSTACK_SECRET_KEY`) are set once via `wrangler secret put <NAME>` and persist across deploys.
