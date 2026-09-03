"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { Product } from "@/lib/types";
import { useSlide } from "@/store";
import { NextButton, PrevButton } from "@/app/admin/_admin-components/SwiperBtn";
import { deleteProduct } from "@/actions/product";
import UpdateProductSlide from "./UpdateProductSlide";
import ProductButton from "./ProductButton";
import { useQueryClient } from "@tanstack/react-query";
import { invalidateQueryKey, scrollToTopOnView } from "@/Helpers";
import { SlideHeading } from "@/components/_slideComponents";
import { toast } from "react-toastify";
import Image from "next/image";

export default function ProductDisplaySlide({
  product,
}: {
  product: Product | undefined | null;
}) {
  const queryClient = useQueryClient();
  const swiperRef = useRef<SwiperType | null>(null);
  const { state, setState } = useSlide();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(product && product.image_url.length <= 1);

  const updateSelectedProduct = () => {
    setState("update");
  };

  const deleteSelectedProduct = async () => {
    try {
      await deleteProduct(product?.id);
      await invalidateQueryKey(queryClient, "products");
      toast.success("Product deleted successfully");
    } finally {
      setState("");
    }
  };

  useEffect(() => {
    scrollToTopOnView(state, containerRef);
  }, [state]);

  return (
    <div>
      {state === "view" && (
        <div
          onClick={() => setState("")}
          className="fixed inset-0 bg-neutral-900/30 z-[98]"
        ></div>
      )}
      <div
        ref={containerRef}
        className={`max-w-[450px] p-6 w-full border-l border-neutral-200 fixed z-[99] right-0 h-full top-0 bg-white transform overflow-y-auto transition-all duration-300 ${
          state === "view" ? "translate-x-[0%]" : "translate-x-[100%]"
        }`}
      >
        <SlideHeading title="View Product" />

        <h3 className="text-lg font-semibold text-neutral-900">
          {product?.product_name}
        </h3>
        {/* Product Images */}
        <div className="mt-6 relative overflow-hidden">
          <Swiper
            spaceBetween={5}
            slidesPerView={1.5}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isBeginning);
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            navigation={true}
            pagination={{ clickable: true }}
          >
            {product?.image_url?.map((imageFile, index) => (
              <SwiperSlide key={index} className="w-auto h-auto">
                <div className="relative overflow-hidden rounded-2xl max-w-[254px] w-full h-[320px]">
                  <Image
                    className="object-cover"
                    src={imageFile}
                    alt=""
                    fill
                    sizes="254px"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="absolute inset-0 z-[9] flex items-center justify-center pointer-events-none">
            {!isBeginning && (
              <div className="absolute left-0 top-1/2 -translate-y-[50%] pointer-events-auto">
                <PrevButton swiperRef={swiperRef} />
              </div>
            )}
            {!isEnd && (
              <div className="absolute top-1/2 right-0 -translate-y-[50%] pointer-events-auto">
                <NextButton swiperRef={swiperRef} />
              </div>
            )}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-2 py-3 pt-8">
          <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
            Product Description
          </span>
          <p className="text-sm text-neutral-700">{product?.product_description}</p>
        </div>

        <div className="flex flex-col gap-5 py-3 divide-y divide-neutral-100">
          <div className="pt-4 space-y-2 w-full first:pt-0">
            <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Category
            </span>
            <div className="p-2 px-3 bg-neutral-100 rounded-md w-max">
              <span className="text-sm font-medium">{product?.product_type}</span>
            </div>
          </div>

          <div className="pt-4 space-y-2 w-full">
            <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Product Price
            </span>
            <div className="p-2 px-3 bg-neutral-100 font-semibold rounded-md w-max space-x-4 text-sm">
              <span>GHC {product?.product_price.toFixed(2)}</span>
              {product?.compare_price && (
                <span className="line-through text-neutral-400 font-normal">
                  {product?.compare_price.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <div className="pt-4 space-y-2 w-full">
            <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              In Stock
            </span>
            <div className="p-2 px-3 bg-neutral-100 rounded-md w-max">
              <span className="text-sm font-medium">{product?.quantity}</span>
            </div>
          </div>

          <div className="pt-4 space-y-2 w-full">
            <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Sizes
            </span>
            <div className="w-max flex gap-2 flex-wrap">
              {product?.sizes?.length ? (
                product?.sizes.map((size, index) => (
                  <span
                    key={`size_${index}`}
                    className="p-2 px-3 bg-neutral-100 rounded-md text-sm"
                  >
                    {size}
                  </span>
                ))
              ) : (
                <span className="text-sm text-neutral-400">None</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex w-full gap-3 py-5">
          <div className="w-full" onClick={updateSelectedProduct}>
            <ProductButton text="Update Product" type="primary" />
          </div>
          <form className="w-full" action={deleteSelectedProduct}>
            <ProductButton
              text="Delete Product"
              pendingText="Deleting product.."
              type="destructive"
            />
          </form>
        </div>
      </div>

      <UpdateProductSlide product={product} />
    </div>
  );
}
