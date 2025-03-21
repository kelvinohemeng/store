"use client";

import { Product } from "@/lib/types";
import { useSlide } from "@/store";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useRef, useEffect } from "react";

import "swiper/css";

import { NextButton, PrevButton } from "../../_admin-components/SwiperBtn";
import DefaultButton from "../../../../components/global-components/ProductButton";
import { deleteProduct } from "@/actions/product";
import UpdateProductSlide from "./UpdateProductSlide";
import ProductButton from "./ProductButton";
import { useQueryClient } from "@tanstack/react-query";
import { invalidateQueryKey } from "@/Helpers";

export default function ProductDisplaySlide({
  product,
}: {
  product: Product | undefined | null;
}) {
  const queryClient = useQueryClient();
  const swiperRef = useRef<SwiperType | null>(null);
  const { state, setState } = useSlide();
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(product && product.image_url.length <= 1);

  const updateSelectedProduct = () => {
    setState("update");
  };
  const deleteSelectedProduct = async () => {
    try {
      await deleteProduct(product?.id);
      await invalidateQueryKey(queryClient, "products");
    } finally {
      setState("");
    }
  };

  useEffect(() => {
    if (state === "view" && swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  }, [state]);

  return (
    <div>
      {state == "view" && (
        <div
          onClick={() => setState("")}
          className="fixed inset-0 bg-slate-800 opacity-30"
        ></div>
      )}
      <div
        className={`max-w-[450px] p-6 w-full border fixed z-[99] right-0 h-full top-0 bg-white transform overflow-y-scroll transition-all duration-300 ${
          state === "view" ? "translate-x-[0%]" : "translate-x-[100%]"
        }`}
      >
        <div className="py-4 flex justify-end">
          <button onClick={() => setState("")}>
            <p>close menu</p>
          </button>
        </div>
        <div>
          <div className=" pb-3 space-y-2">
            <p className="text-base">View Product</p>
            <h2 className="text-3xl font-medium">{product?.product_name}</h2>
          </div>
        </div>
        <div className="mt-6 relative overflow-hidden">
          <Swiper
            spaceBetween={5}
            slidesPerView={1.5}
            onSwiper={(swiper: any) => {
              swiperRef.current = swiper;
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isBeginning);
            }}
            onSlideChange={(swiper) => {
              setIsBeginning(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            navigation={true}
            pagination={{
              clickable: true,
            }}
          >
            {product?.image_url?.map((imageFile, index) => (
              <SwiperSlide key={index} className="w-auto h-auto">
                <div className="overflow-hidden rounded-2xl max-w-[254px] w-full h-[320px]">
                  <img
                    className="w-full h-full object-cover"
                    src={imageFile}
                    alt=""
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

        <div className="space-y-2 py-3 pt-10">
          <span className=" text-slate-600">Product Description</span>
          <p className="font-medium">{product?.product_description}</p>
        </div>

        <div className=" flex flex-col justify-between gap-3 py-3">
          <div className="pt-4 space-y-2 w-full">
            <span>Category</span>
            <div className="p-2 px-3 bg-black/10 rounded-[4px] w-max">
              <span className="font-medium">{product?.product_type}</span>
            </div>
          </div>
          <div className="pt-4 space-y-2 w-full">
            <span>Product Price</span>
            <div className="p-2 px-3 bg-black/10 font-semibold rounded-[4px] w-max space-x-4">
              <span className="">GHC {product?.product_price.toFixed(2)}</span>
              {product?.compare_price && (
                <span className=" line-through text-black/70">
                  {product?.compare_price.toFixed(2)}
                </span>
              )}
            </div>
          </div>
          <div className="pt-4 space-y-2 w-full">
            <span>In Stock</span>
            <div className="p-2 px-3 bg-black/10 rounded-[4px] w-max">
              <span className="font-medium">{product?.quantity}</span>
            </div>
          </div>
          <div className="pt-4 space-y-2 w-full">
            <span>Sizes</span>
            <div className=" w-max">
              <span className="font-medium flex gap-2">
                {product?.sizes?.length ? (
                  product?.sizes?.map((size, index) => (
                    <span
                      key={`alt${size}_${index}`}
                      className="p-2 px-3 bg-black/10 rounded-[4px]"
                    >
                      {size}
                    </span>
                  ))
                ) : (
                  <span>None</span>
                )}
              </span>
            </div>
          </div>
        </div>
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
