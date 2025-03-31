"use client";

import Stack from "@/components/global-components/Stack";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "@/store";

export default function ProductSection() {
  const { products } = useProductStore();

  return (
    <section className=" w-full py-[64px] px-5 space-y-6">
      <Stack orientation="vertical" container="default">
        <h4 className="tracking-tighter font-semibold">Featured</h4>
        <div className=" grid grid-col-2 md:grid-cols-4 gap-4">
          {products.slice(0, 4).map((product, index) => (
            <div key={index} className="">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </Stack>
    </section>
  );
}
