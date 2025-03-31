"use client";

import { useSlide } from "@/store";
import { OrderData, OrderItem, Product } from "@/lib/types";
import OrderProduct from "./OrderProduct";
import { formatDate, useScrollToTopOnView } from "@/Helpers";
import { OrderStatusButton } from "./OrderStatusButton";
import { X } from "@phosphor-icons/react";
import { useEffect, useRef } from "react";
import { SlideHeading } from "../../../../components/_slideComponents/index";

export default function DisplayOrderSlide({
  order,
}: {
  order: OrderData | null | undefined;
}) {
  const orderDate = new Date(order?.created_at ?? "");
  const containerRef = useRef<HTMLDivElement>(null);

  const { state, setState } = useSlide();

  useEffect(() => {
    useScrollToTopOnView(state, containerRef);
  }, [state]);

  return (
    <div>
      {state == "view-order" && (
        <div
          onClick={() => setState("")}
          className="fixed inset-0 bg-slate-800 opacity-30"
        ></div>
      )}
      <div
        ref={containerRef}
        className={`max-w-[450px] p-6 w-full border border-black/30 fixed z-[99] right-0 h-full top-0 bg-white transform overflow-y-scroll transition-all duration-300 ${
          state === "view-order" ? "translate-x-[0%]" : "translate-x-[100%]"
        }`}
      >
        {/* Card Name */}
        <SlideHeading title="Order Details" action="" />

        {/* header */}
        <main className=" space-y-6">
          <div className=" flex items-center gap-2 p-6 rounded-[16px] bg-black/5">
            <div className=" w-[50px] aspect-square bg-red-500 rounded-full capitalize text-2xl font-bold text-white flex items-center justify-center">
              {order?.email?.split("")[0]}
            </div>
            <p className="text-xl font-medium">{order?.email}</p>
          </div>

          <div className="space-y-3  rounded-2xl shadow-sm border border-black/10">
            <div className="flex items-center p-4">
              <div className=" w-full">
                <span className=" text-slate-600">Customer Name</span>
                <p className="text-xl font-medium">
                  {order?.email?.split("@")[0]}
                  {/* {order?.customer_name ?? order?.email?.split("@")[0]} */}
                </p>
              </div>
              <div className=" flex flex-col items-end">
                <p className="text-base text-nowrap">{formatDate(orderDate)}</p>
                <p className="flex gap-2 text-base font-semibold">
                  {order?.order_items?.length}{" "}
                  <span className=" text-nowrap">
                    {(order?.order_items?.length ?? 0) > 1 ? "Items" : "Item"}{" "}
                    Ordered
                  </span>
                </p>
              </div>
            </div>

            <hr className=" opacity-30" />

            <div className="p-4 flex flex-col items-center gap-4">
              <div className="w-full flex items-center gap-2">
                <p className="w-full text-slate-600 text-lg">Payment Status</p>
                <p className="text-sm px-4 py-1 rounded-[8px] bg-green-500 border-[3px] text-white w-fit border-green-300 font-medium capitalize">
                  {order?.payment_status}
                </p>
              </div>
              <div className="w-full flex items-center gap-2">
                <p className="w-full text-slate-600 text-lg">Order Status</p>
                <div>
                  {order && (
                    <OrderStatusButton
                      initialStatus={order.order_status}
                      id={order.id}
                    />
                  )}
                </div>
              </div>
            </div>

            <hr className=" opacity-30" />

            <div className="p-4">
              <div className="flex gap-3">
                <p className="w-full">Total Amount</p>
                <p className="text-nowrap font-semibold">
                  GHC {order?.total_amount}
                </p>
              </div>
            </div>

            <hr className=" opacity-30" />

            <div className="p-4">
              <div className="flex flex-col gap-3">
                <p className="w-full font-semibold text-black/70 tracking-tight text-base">
                  Order Note
                </p>
                <p className="text-nowrap font-medium text-base">
                  {order?.order_note}
                </p>
              </div>
            </div>

            <hr className=" opacity-30" />

            <div className="p-4 flex flex-col gap-4">
              <p className="w-full font-semibold text-black/70 tracking-tight text-base">
                Ordered items
              </p>{" "}
              <div className="flex flex-col gap-3">
                {order?.order_items?.map((orderItem, index) => (
                  <OrderProduct orderItem={orderItem} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
