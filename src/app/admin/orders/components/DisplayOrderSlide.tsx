"use client";

import { submitNewProduct } from "@/actions/product";
import { useSlide } from "@/store";
import { useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import DefaultButton from "@/components/global-components/ProductButton";
import { Order, OrderItem, Product } from "@/lib/types";
import ProductCard from "../../products/components/archieves/ProductCard";

export default function DisplayOrderSlide({
  order,
}: {
  order: Order | null | undefined;
}) {
  const { state, setState } = useSlide();

  return (
    <div>
      {state == "view-order" && (
        <div
          onClick={() => setState("")}
          className="fixed inset-0 bg-slate-800 opacity-30"
        ></div>
      )}
      <div
        className={`max-w-[450px] p-6 w-full border fixed z-[99] right-0 h-full top-0 bg-white transform overflow-y-scroll transition-all duration-300 ${
          state === "view-order" ? "translate-x-[0%]" : "translate-x-[100%]"
        }`}
      >
        <div className="py-4 flex justify-end">
          <button onClick={() => setState("")}>
            <p>close menu</p>
          </button>
        </div>
        <div>
          <h1 className="text-2xl mb-6">View Order Details</h1>
          <hr />
        </div>
        {/* <div className="flex w-full gap-3 py-5">
          <div className="w-full">
            <DefaultButton text="Update Product" />
          </div>
          <div className="w-full">
            <DefaultButton variant="destructive" text="Delete Product" />
          </div>
        </div> */}
        <div className="pt-4">
          <span className=" text-slate-600">Customer Name</span>
          <p className="text-2xl font-medium">{order?.customer_name}</p>
        </div>
        <div className="pt-4">
          <span className=" text-slate-600">Customer Email</span>
          <p className="text-2xl font-medium">{order?.email}</p>
        </div>
        <div className="pt-4">
          <span className=" text-slate-600">Order Status</span>
          <p className="text-2xl font-medium">{order?.payment_status}</p>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <span>Total Amount</span>
          <span>
            ${" "}
            {order?.order_items
              ?.reduce((total, item) => {
                return total + (item.price * item.quantity || 0); // Ensure price and quantity are defined
              }, 0)
              .toFixed(2)}
          </span>
        </div>
        <div className="flex flex-col gap-4 pt-4">
          <span className=" text-slate-600">Ordered Product</span>
          <div className="flex gap-4">
            {order?.order_items?.map((orderItem, index) => (
              <div className="flex flex-col gap-2 p-3 rounded-xl max-w-[250px] border border-slate-400">
                <span>{orderItem.product.product_name}</span>
                <span>{orderItem.product.product_price}</span>
                <span>{orderItem.product.product_description}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
