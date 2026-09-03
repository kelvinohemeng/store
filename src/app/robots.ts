import type { MetadataRoute } from "next";

// Same URL as the metadataBase constant in layout.tsx — see the comment
// there for why this isn't read from env.
const SITE_URL = "https://store.kelvinohemeng59.workers.dev";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Nothing here is sensitive (see src/lib/demo.ts — the whole point of
      // /admin is that anyone can explore it via the public demo account),
      // but crawlers indexing dashboard/auth routes as if they were public
      // storefront pages serves no one.
      disallow: ["/admin", "/login", "/signup", "/orders", "/payment-success"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
