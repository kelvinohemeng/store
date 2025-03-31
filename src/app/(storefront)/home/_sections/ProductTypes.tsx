"use client";

import { useEffect } from "react";
import { Product } from "@/lib/types";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "@/store";
import { Button, PrimaryBtn } from "../../_storeComponents/Buttons";
import Stack from "@/components/global-components/Stack";

export default function ProductTypes() {
  const { products } = useProductStore();

  // Fetch products on component mount

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
    <Stack orientation="vertical" gap="default" container="default">
      <h4 className="test-lg tracking-tighter font-semibold">Categories</h4>
      <div className="grid grid-cols-5 grid-rows-2 h-[600px] mt-6 gap-10">
        {Object.entries(productTypes).map(
          ([type, items], index) =>
            items.length > 0 && (
              <div
                key={type}
                className={`relative rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 ${
                  index === 0
                    ? "col-span-3 row-span-2" // First item takes 2x2
                    : index === 1
                    ? "col-span-2 row-span-1" // Second item takes 2x1
                    : "col-span-2 row-span-1" // Other items take 1x1
                }`}
              >
                <div className="absolute top-0 left-0 w-full h-full flex justify-between gap-3 p-6 items-start z-10">
                  <h5 className=" text-white font-semibold tracking-tight capitalize">
                    {type}
                  </h5>
                  <Button type="ghost" link={`/products?type=${type}`}>
                    Explore Category
                  </Button>
                </div>
                <div className="absolute inset-0 bg-black/30 z-[1] hover:bg-black/40 transition-all duration-300"></div>
                <img
                  className="w-full h-full object-cover object-center"
                  src={items[0].image_url[0]}
                  alt={`${type} category`}
                />
              </div>
            )
        )}
      </div>
    </Stack>
  );
}
