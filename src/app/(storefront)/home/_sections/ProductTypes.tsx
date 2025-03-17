"use client";

import { useEffect } from "react";
import { Product } from "@/lib/types";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "@/store";

export default function ProductTypes() {
  const { products, fetchProducts } = useProductStore();

  // Fetch products on component mount
  useEffect(() => {
    if (!products || products.length === 0) {
      fetchProducts();
    }
  }, [fetchProducts, products]);

  if (!products || products.length === 0) {
    return <div className="py-20 text-center">Loading products...</div>;
  }

  // Group products by their type
  const productTypes = {
    dresses: products.filter((product) => product.product_type === "dress"),
    shoes: products.filter((product) => product.product_type === "shoe"),
    glasses: products.filter((product) => product.product_type === "glasses"),
  };

  return (
    <section className="gap-3 px-5 py-[64px] h-auto">
      <h2 className="test-lg tracking-tighter font-semibold">Categories</h2>
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[500px]">
        {Object.entries(productTypes).map(
          ([type, items]) =>
            items.length > 0 && (
              <div key={type} className="relative min-h-[300px] w-full">
                <h2 className="absolute top-[24px] left-[24px] text-white text-2xl font-semibold capitalize p-5 z-10">
                  {type}
                </h2>
                <div className="absolute inset-0 bg-black/30 z-[1]"></div>
                <img
                  className="w-full h-full object-cover object-center"
                  src={items[0].image_url[0]}
                  alt={`${type} category`}
                />
              </div>
            )
        )}
      </div>
    </section>
  );
}
