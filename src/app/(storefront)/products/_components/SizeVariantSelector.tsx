"use client";
import { Product } from "@/lib/types";
import { useVariantSelectionStore } from "@/store";
import { useState } from "react";

export default function SizeVariantSelector({ product }: { product: Product }) {
  const { selectedSize, setSelectedSize } = useVariantSelectionStore();
  return (
    <div className="flex flex-col gap-2">
      <p>Available Sizes</p>
      <div className="flex items-center gap-2">
        {product.sizes &&
          product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-2 py-1 text-xl border rounded ${
                size === selectedSize ? "bg-black text-white" : "bg-gray-100"
              }`}
            >
              {size}
            </button>
          ))}
      </div>
    </div>
  );
}
