"use client";

import React, { useEffect, useRef, useState } from "react";
import ProductButton from "./ProductButton";
import { useProductSlideState, useProductStore } from "@/store";
import { updateProduct } from "@/actions";
import imageCompression from "browser-image-compression";
import { Product } from "@/lib/types";

const UpdateProductSlide = ({ product }: { product: Product | null }) => {
  const { state, setState } = useProductSlideState();
  const ref = useRef<HTMLFormElement>(null);
  return (
    <>
      {state === "update" && (
        <div
          onClick={() => setState("")}
          className="fixed inset-0 bg-slate-800 opacity-70"
        ></div>
      )}
      <div
        className={`max-w-[450px] p-6 w-full border absolute z-[99] right-0 h-full top-0 bg-white transform ${
          state === "update" ? "translate-x-[0%]" : "translate-x-[100%]"
        } transition-all duration-300`}
      >
        <div className="py-4 flex justify-end">
          <button onClick={() => setState("")}>
            <p>close menu</p>
          </button>
        </div>
        <h1 className="text-2xl mb-6">Update Product</h1>
        <hr />
        <form
          ref={ref}
          // action={updateAction}
          className="mt-6 min-w-full flex flex-col gap-4 "
        >
          <label htmlFor="product_name" className="space-y-3">
            <p>What is the name of this Product?</p>
            <div id="product_name">
              <input
                type="text"
                name="name"
                defaultValue={product?.product_name}
                className=" border border-gray-400 p-3 text-lg w-full rounded-md"
              />
            </div>
          </label>
          <div className="space-y-3 h-full">
            <p>Select images for Products</p>
            <div id="product_image" className="flex gap-4">
              {/* Image Preview Section */}
              {/* {previewUrls.length > 0 && ( )} */}
              <div className="flex flex-wrap gap-3">
                {/* {allPreviews.map((url, index) => (
                  <div
                    key={index}
                    className="relative aspect-square h-[90px] group transition duration-200 bg-slate-950 rounded-lg overflow-hidden"
                  >
                    <img
                      src={url}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover border group-hover:opacity-80"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 text-white text-sm h-5 w-5 rounded-full opacity-0 group-hover:opacity-100"
                      onClick={() => removeImage(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))} */}
                <label htmlFor="images" className=" flex flex-col gap-4">
                  <div className=" !cursor-pointer flex items-center justify-center relative h-[90px]  aspect-square border border-slate-400 rounded-lg">
                    <input
                      id="images"
                      type="file"
                      name="images"
                      multiple
                      accept="image/*"
                      className=" w-full h-full opacity-0 pointer-events-none absolute"
                      // onChange={handleUpdateImageChange}
                    />
                    <span className="text-4xl">+</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <label htmlFor="product_description" className="space-y-3">
            <p>Please descibe your Product</p>
            <div id="product_description">
              <input
                type="text"
                name="description"
                defaultValue={product?.product_description}
                className=" border border-gray-400 p-3 text-lg w-full rounded-md"
                placeholder="Product Description"
              />
            </div>
          </label>
          <label htmlFor="product_type" className="space-y-3">
            <p>Select a category for your Product</p>
            <div id="product_type">
              <input
                type="text"
                name="type"
                defaultValue={product?.product_type}
                className=" border border-gray-400 p-3 text-lg w-full rounded-md"
                placeholder="Product Type"
              />
            </div>
          </label>
          <ProductButton
            text="Update Product"
            pendingText="Your Product is Updating"
          />
        </form>
      </div>
    </>
  );
};

export default UpdateProductSlide;
