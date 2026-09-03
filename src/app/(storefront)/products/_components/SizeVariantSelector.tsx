"use client";
import { Product } from "@/lib/types";
import { useVariantSelectionStore } from "@/store";

export default function SizeVariantSelector({ product }: { product: Product }) {
  const { selectedSize, setSelectedSize } = useVariantSelectionStore();

  if (!product.sizes || product.sizes.length === 0) return null;

  return (
    <div className="flex flex-col gap-2">
      <p className="font-sans text-xs font-semibold uppercase tracking-wide text-ink/50">
        Size
      </p>
      <div className="flex items-center gap-2">
        {product.sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`h-9 min-w-9 px-2 border font-sans text-sm font-semibold transition-colors ${
              size === selectedSize
                ? "border-ink bg-ink text-paper"
                : "border-ink/30 text-ink hover:border-ink"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
