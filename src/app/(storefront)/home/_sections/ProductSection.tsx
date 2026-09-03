"use client";

import Stack from "@/components/global-components/Stack";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "@/store";
import Link from "next/link";

type ProductSectionVariant = "new" | "featured";

export default function ProductSection({
  title = "Featured",
  variant = "featured",
}: {
  title?: string;
  variant?: ProductSectionVariant;
}) {
  const { products } = useProductStore();

  // The two variants must actually show different products, not just carry
  // different titles — "new" is a recency sort, "featured" prioritizes
  // discounted items (falling back to catalog order if nothing is on sale)
  // so the two home page sections never render an identical grid.
  const sectionProducts =
    variant === "new"
      ? [...products]
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          )
          .slice(0, 4)
      : [...products]
          .sort((a, b) => Number(!!b.compare_price) - Number(!!a.compare_price))
          .slice(0, 4);

  return (
    <section className="w-full py-16 px-5 space-y-6 md:px-10">
      <Stack orientation="vertical" container="default">
        <div className="flex items-end justify-between border-b border-ink/15 pb-4">
          <p className="eyebrow">{title}</p>
          <Link
            href="/products"
            className="font-sans text-sm font-semibold uppercase tracking-wide text-ink/60 hover:text-ink"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {sectionProducts.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </Stack>
    </section>
  );
}
