"use client";

import { Product } from "@/lib/types";
import { useProductSlideState } from "@/store";
import { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import { NextButton, PrevButton } from "./SwiperBtn";
import { useRef } from "react";
import DefaultButton from "../global-components/ProductButton";
import { deleteProduct } from "@/actions";
import UpdateProductSlide from "./UpdateProductSlide";
import Image from "next/image";

export default function ProductDisplaySlide({
  product,
}: {
  product: Product | null;
}) {
  const swiperRef = useRef<SwiperType | null>(null);
  const { state, setState } = useProductSlideState();

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

  return (
    <div>
      {state == "view" && (
        <div className="fixed inset-0 bg-slate-800 opacity-70"></div>
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
            // onSlideChange={() => console.log("slide change")}
            // onSwiper={(swiper) => console.log(swiper)}
            onSwiper={(swiper: any) => (swiperRef.current = swiper)}
            navigation={true}
            pagination={{
              clickable: true,
            }}
          >
            {product?.image_url?.map((imageFile, index) => (
              <SwiperSlide key={index}>
                <div className=" aspect-video">
                  <Image
                    className="w-full h-full object-cover"
                    src={imageFile}
                    alt=""
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute inset-0 z-[9] flex items-center justify-center">
            <div className=" w-full flex justify-between">
              <PrevButton swiperRef={swiperRef} />
              <NextButton swiperRef={swiperRef} />
            </div>
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
        <div className="pt-4">
          <span>Product Name</span>
          <p>{product?.product_name}</p>
        </div>
        <div className="pt-4">
          <span>Product Description</span>
          <p>{product?.product_description}</p>
        </div>
        <div className="pt-4">
          <span>Product Type</span>
          <p>{product?.product_type}</p>
        </div>
        <div className="pt-4">
          <span>Product Price</span>
          <p>GHC {product?.product_price}</p>
        </div>
        <div className="pt-4">
          <span>Product Quantity</span>
          <p>{product?.quantity}</p>
        </div>
      </div>
      <UpdateProductSlide product={product} />
    </div>
  );
}
