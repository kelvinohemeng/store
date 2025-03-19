"use client";

import ProductCard from "../components/ProductCard";
import { useProductStore } from "@/store";

export default function ProductSection() {
  const { products, setProducts, fetchProducts } = useProductStore();

  return (
    <section className=" w-full min-h-screen py-[64px] px-5 space-y-6">
      <h2 className="test-lg tracking-tighter font-semibold">New Arrivals</h2>
      <div className=" grid grid-cols-3 gap-4">
        {products.slice(0, 3).map((product, index) => (
          <ProductCard index={index} product={product} />
        ))}
      </div>
    </section>
  );
}
