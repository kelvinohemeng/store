"use client";

import { Product } from "@/lib/types";
import { useSlide } from "@/store";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useRef, useEffect } from "react";

import "swiper/css";

import { NextButton, PrevButton } from "../../admin-components/SwiperBtn";
import DefaultButton from "../../../../components/global-components/ProductButton";
import { deleteProduct } from "@/actions/product";
import UpdateProductSlide from "./UpdateProductSlide";

export default function ProductDisplaySlide({
  product,
}: {
  product: Product | undefined | null;
}) {
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
          <h1 className="text-2xl mb-6">View Product</h1>
          <hr />
        </div>
        <div className="mt-6 relative rounded-2xl overflow-hidden">
          <Swiper
            spaceBetween={5}
            slidesPerView={1}
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
              <SwiperSlide key={index}>
                <div className=" aspect-video">
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
        <div className="flex w-full gap-3 py-5">
          <div className="w-full" onClick={updateSelectedProduct}>
            <DefaultButton text="Update Product" />
          </div>
          <div className="w-full" onClick={deleteSelectedProduct}>
            <DefaultButton variant="destructive" text="Delete Product" />
          </div>
        </div>
        <div className="pt-4 space-y-4">
          <span className=" text-slate-600">Product Name</span>
          <p className="text-2xl font-medium">{product?.product_name}</p>
        </div>
        <div className="pt-4 space-y-4">
          <span className=" text-slate-600">Product Description</span>
          <p className="text-2xl font-medium">{product?.product_description}</p>
        </div>
        <div className="pt-8 flex justify-between gap-3">
          <div className="pt-4 space-y-2 w-full p-3 border border-slate-400 rounded-xl">
            <span>Product Type</span>
            <p className="text-2xl font-medium">{product?.product_type}</p>
          </div>
          <div className="pt-4 space-y-2 w-full p-3 border border-slate-400 rounded-xl">
            <span>Product Price</span>
            <p className="text-2xl font-medium">GHC {product?.product_price}</p>
          </div>
          <div className="pt-4 space-y-2 w-full p-3 border border-slate-400 rounded-xl">
            <span>Product Quantity</span>
            <p className="text-2xl font-medium">{product?.quantity}</p>
          </div>
        </div>
      </div>
      <UpdateProductSlide product={product} />
    </div>
  );
}
