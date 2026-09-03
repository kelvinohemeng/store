"use client";

import Stack from "@/components/global-components/Stack";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "@/store";
import Link from "next/link";

export default function ProductSection({
  title = "Featured",
}: {
  title?: string;
}) {
  const { products } = useProductStore();

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
          {products.slice(0, 4).map((product, index) => (
            <div key={index}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </Stack>
    </section>
  );
}
