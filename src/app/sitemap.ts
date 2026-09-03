import type { MetadataRoute } from "next";
import { getProducts } from "@/actions/product";

// Product rows change via the admin panel between deploys — without this,
// Next prerenders the product list once at build time and every crawl
// would see that same frozen snapshot until the next deploy.
export const dynamic = "force-dynamic";

// Same URL as the metadataBase constant in layout.tsx — see the comment
// there for why this isn't read from env.
const SITE_URL = "https://store.kelvinohemeng59.workers.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/home`, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/products`, changeFrequency: "daily", priority: 0.9 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
  ];

  // Best-effort: a D1 hiccup here shouldn't take the whole sitemap down —
  // fall back to just the static routes above.
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getProducts();
    productRoutes = products.map((product) => ({
      url: `${SITE_URL}/products/${product.id}`,
      lastModified: new Date(product.created_at),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {
    // Sitemap best-effort — see comment above.
  }

  return [...staticRoutes, ...productRoutes];
}
