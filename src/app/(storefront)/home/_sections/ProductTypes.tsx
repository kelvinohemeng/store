"use client";

import { useProductStore } from "@/store";
import { Button } from "../../_storeComponents/Buttons";
import Stack from "@/components/global-components/Stack";

export default function ProductTypes() {
  const { products } = useProductStore();

  if (!products || products.length === 0) {
    return null;
  }

  const productTypes = {
    dresses: products.filter((product) => product.product_type === "dress"),
    shoes: products.filter((product) => product.product_type === "shoe"),
    glasses: products.filter((product) => product.product_type === "glasses"),
  };

  return (
    <section className="w-full py-16 px-5 md:px-10">
      <Stack orientation="vertical" gap="default" container="default">
        <p className="eyebrow border-b border-ink/15 pb-4">Shop by category</p>
        <div className="grid grid-cols-5 grid-rows-2 h-[600px] mt-2 gap-4 md:gap-6">
          {Object.entries(productTypes).map(
            ([type, items], index) =>
              items.length > 0 && (
                <div
                  key={type}
                  className={`relative overflow-hidden group ${
                    index === 0
                      ? "col-span-3 row-span-2"
                      : "col-span-2 row-span-1"
                  }`}
                >
                  <div className="absolute top-0 left-0 flex w-full items-start justify-between gap-3 p-6 z-10">
                    <h5 className="font-serif italic text-2xl text-white capitalize">
                      {type}
                    </h5>
                    <Button type="ghost" link={`/products?type=${type}`}>
                      Explore
                    </Button>
                  </div>
                  <div className="absolute inset-0 bg-black/35 z-[1] transition-all duration-300 group-hover:bg-black/45" />
                  <img
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    src={items[0].image_url[0]}
                    alt={`${type} category`}
                  />
                </div>
              )
          )}
        </div>
      </Stack>
    </section>
  );
}
