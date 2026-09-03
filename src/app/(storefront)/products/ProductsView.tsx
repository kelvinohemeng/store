"use client";
import { useProductStore } from "@/store";
import ProductCard from "../home/components/ProductCard";
import { useState } from "react";
import Stack from "@/components/global-components/Stack";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/lib/types";

// `value` is the canonical `product_type` written by the admin product
// form — keep this in sync with the categories list in ProductSlide.tsx /
// UpdateProductSlide.tsx rather than inventing separate display strings.
// Static, so it lives outside the component instead of being rebuilt every render.
const filterButtons = [
  { label: "All", value: "all" },
  { label: "Apparel", value: "apparel" },
  { label: "Shoes", value: "shoe" },
  { label: "Glasses", value: "glasses" },
];

export default function ProductsView({
  // Server-fetched catalog for this page's first render (see page.tsx), so
  // there's real content in the initial HTML instead of a loading state.
  // The global product store (populated by LoadProducts in the storefront
  // layout) takes over once it has data, since it's the one that stays
  // fresh across client-side navigation.
  initialProducts = [],
}: {
  initialProducts?: Product[];
}) {
  const storeProducts = useProductStore((state) => state.products);
  const products = storeProducts.length > 0 ? storeProducts : initialProducts;
  const searchParams = useSearchParams();
  const query = searchParams.get("search")?.toLowerCase().trim() ?? "";
  const typeParam = searchParams.get("type");

  // Seeded from the URL directly (not a hardcoded "all") so a link straight
  // to /products?type=apparel — e.g. the home page category tiles — lands
  // pre-filtered instead of showing everything until a later navigation
  // happens to change the query param.
  const initialFilter =
    filterButtons.find((f) => f.value === typeParam?.toLowerCase())?.value ??
    "all";
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  // Sync the type query param (from home page category tiles) into the
  // filter row. Adjusted during render rather than in a useEffect — see the
  // same pattern in UpdateProductSlide.tsx / CartItem.tsx.
  const [lastTypeParam, setLastTypeParam] = useState(typeParam);
  if (typeParam !== lastTypeParam) {
    setLastTypeParam(typeParam);
    const match = filterButtons.find(
      (f) => f.value === typeParam?.toLowerCase(),
    );
    if (match) setActiveFilter(match.value);
  }

  // Derived from products/activeFilter/query directly — no need to mirror
  // it into its own state via an effect (see
  // https://react.dev/learn/you-might-not-need-an-effect).
  let filteredProducts = products;
  if (activeFilter !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.product_type.toLowerCase() === activeFilter,
    );
  }
  if (query) {
    filteredProducts = filteredProducts.filter((product) =>
      product.product_name.toLowerCase().includes(query),
    );
  }

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <Stack
      orientation="vertical"
      gap="large"
      container="full-width"
      className="pt-nav-section px-5 md:px-10 pb-20"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-ink/15 pb-6">
        <div>
          <p className="eyebrow">Shop</p>
          <h2 className="font-display uppercase tracking-tight text-e-8xl md:text-e-11xl">
            {query ? `Results for “${query}”` : "All Products"}
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 h-auto items-center">
          {filterButtons.map((filter) => (
            <button
              key={filter.value}
              onClick={() => handleFilterClick(filter.value)}
              aria-pressed={activeFilter === filter.value}
              className={`px-3 py-1.5 border border-ink font-sans text-sm font-semibold uppercase tracking-wide cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 focus-visible:ring-offset-paper
                ${
                  activeFilter === filter.value
                    ? "bg-ink text-paper"
                    : "text-ink/70 hover:bg-ink/5"
                }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="w-full py-20 text-center">
          <p className="font-body text-xl text-ink/60">
            {query
              ? `No products match “${query}”.`
              : "No products found in this category."}
          </p>
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                layout
                key={product.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1.0],
                  delay: index * 0.05,
                }}
              >
                <ProductCard index={index} product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </Stack>
  );
}
