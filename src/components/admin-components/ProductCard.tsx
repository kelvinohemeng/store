"use client";

import { Product } from "@/lib/types";
import { useProductSlideState } from "@/store";
import Image from "next/image";
import React, { useState } from "react";

const ProductCard = ({
  product,
  index,
  isLoading, // New loading prop
  outOfStock,
}: {
  product?: Product;
  index?: number;
  isLoading?: boolean;
  outOfStock?: boolean;
}) => {
  const { setState } = useProductSlideState();

  const [imageLoaded, setImageLoaded] = useState(false);
  const imageUrl: string | undefined = product?.image_url[0];

  const openProductDetails = () => {
    setState("view");
  };

  if (outOfStock) {
    return (
      <>
        <div
          onClick={openProductDetails}
          key={product?.id || index}
          className="relative w-full max-w-[250px] min-w-[250px] p-4 border border-slate-300 bg-white rounded-xl flex flex-col gap-4 transition hover:translate-y-[-12px] cursor-pointer"
        >
          <div className="relative w-full aspect-square overflow-hidden rounded-md">
            {!imageLoaded && (
              <div className=" w-full h-full bg-gray-200 animate-pulse rounded-md"></div>
            )}

            <Image
              src={imageUrl ?? "/piblic/vercel.svg"}
              width={0}
              height={0}
              sizes="100vw"
              className={`w-full h-full object-cover rounded-md transition-all duration-300 grayscale-100 blur-2xl scale-110`}
              alt={product?.product_name ?? "Product image"}
              onLoadingComplete={() => setImageLoaded(true)}
            />
            <div className="absolute inset-0 z-5 flex items-center justify-center">
              <p className="px-3 py-2 bg-red-500 text-white border-white border rounded-full">
                Out of Stock
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl pb-3">{product?.product_name}</h2>
            <p className="line-clamp-3 text-[18px] mb-2 text-slate-700">
              {product?.product_description}
            </p>
            <div className="flex flex-wrap gap-2">
              <div className="p-2 py-1 text-white bg-green-400 rounded-lg w-full max-w-[40px] grid place-items-center">
                <span>$ {product?.product_price}</span>
              </div>
              <div className="p-2 py-1 border rounded-lg w-full max-w-[120px] border-slate-400 grid place-items-center">
                <p>In Stock: {product?.stock}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  if (isLoading) {
    return (
      <div className="w-full max-w-[250px] p-4 border border-slate-300 bg-white rounded-xl flex flex-col gap-4">
        <div className="w-full max-w-[250px] aspect-square bg-gray-200 animate-pulse rounded-md"></div>

        <div>
          <div className="h-6 w-3/4 bg-gray-200 animate-pulse rounded-md mb-3"></div>
          <div className="h-4 w-full bg-gray-200 animate-pulse rounded-md mb-2"></div>
          <div className="h-4 w-5/6 bg-gray-200 animate-pulse rounded-md mb-2"></div>

          <div className="flex flex-wrap gap-2">
            <div className="h-8 w-[40px] bg-gray-200 animate-pulse rounded-lg"></div>
            <div className="h-8 w-[120px] bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div
        onClick={openProductDetails}
        key={product?.id}
        className="relative w-full max-w-[250px] min-w-[250px] p-4 border border-slate-300 bg-white rounded-xl flex flex-col gap-4 transition hover:translate-y-[-12px] cursor-pointer"
      >
        <div className="w-full aspect-square overflow-hidden rounded-md">
          {!imageLoaded && (
            <div className=" w-full h-full bg-gray-200 animate-pulse rounded-md"></div>
          )}

          <Image
            src={imageUrl ?? "/piblic/vercel.svg"}
            width={0}
            height={0}
            sizes="100vw"
            className={`w-full h-full object-cover rounded-md transition-all duration-300 ${
              imageLoaded
                ? "grayscale-0 blur-0 scale-100"
                : "grayscale-100 blur-2xl scale-110"
            }`}
            alt={product?.product_name ?? "Product image"}
            onLoadingComplete={() => setImageLoaded(true)}
          />
        </div>

        <div>
          <h2 className="text-2xl pb-3">{product?.product_name}</h2>
          <p className="line-clamp-3 text-[18px] mb-2 text-slate-700">
            {product?.product_description}
          </p>
          <div className="flex flex-wrap gap-2">
            <div className="p-2 py-1 text-white bg-green-400 rounded-lg w-full max-w-[40px] grid place-items-center">
              <span>$ {product?.product_price}</span>
            </div>
            <div className="p-2 py-1 border rounded-lg w-full max-w-[120px] border-slate-400 grid place-items-center">
              <p>In Stock: {product?.stock}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
