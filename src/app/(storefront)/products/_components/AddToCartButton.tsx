"use client";
import { Product } from "@/lib/types";
import { useCartStore, useSlide, useVariantSelectionStore } from "@/store";
import { useState } from "react";

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
      className=" bg-black text-white px-8 py-2"
      onClick={handleAddToCart}
    >
      Add to Cart{" "}
    </button>
  );
}
