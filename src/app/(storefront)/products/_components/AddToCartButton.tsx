"use client";
import { Product } from "@/lib/types";
import { useCartStore, useSlide, useVariantSelectionStore } from "@/store";

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCartStore();
  const { setState } = useSlide();
  const { selectedSize } = useVariantSelectionStore();

  const handleAddToCart = () => {
    addItem(product, { size: selectedSize });
    setState("cart");
  };
  return (
    <button
      name="add to cart"
      className="w-full bg-ink px-8 py-3.5 font-sans text-sm font-semibold uppercase tracking-wide text-paper hover:bg-ink/85"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
}
