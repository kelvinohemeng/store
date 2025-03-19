"use client";
import { useProductStore } from "@/store";
import ProductSection from "../home/_sections/ProductSection";
import ProductCard from "../home/components/ProductCard";
import { useEffect } from "react";

export default function ProductPage() {
  const { products, setProducts, fetchProducts } = useProductStore();

  useEffect(() => {
    console.log(products);
  }, [products]);
  return (
    <section className="pt-[84px] px-5 bg-red-50">
      <h2 className="test-lg tracking-tighter font-semibold">All Products</h2>
      <div className=" w-full py-[64px] space-y-6">
        <div className=" grid w-full grid-cols-3 gap-4">
          {products.map((product, index) => (
            <div className="min-w-[450px] max-h-[550px] h-full">
              <ProductCard index={index} product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
