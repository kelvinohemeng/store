"use client";

import { useSlide } from "@/store";
import { OrderData } from "@/lib/types";
import OrderProduct from "./OrderProduct";
import { formatDate, scrollToTopOnView } from "@/Helpers";
import { OrderStatusButton } from "./OrderStatusButton";
import { useEffect, useRef } from "react";
import { SlideHeading } from "@/components/_slideComponents/index";
import { Badge } from "@/components/ui/badge";

export default function DisplayOrderSlide({
  order,
}: {
  order: OrderData | null | undefined;
}) {
  const orderDate = new Date(order?.created_at ?? "");
  const containerRef = useRef<HTMLDivElement>(null);

  const { state, setState } = useSlide();

  useEffect(() => {
    scrollToTopOnView(state, containerRef);
  }, [state]);

  return (
    <div>
      {state == "view-order" && (
        <div
          onClick={() => setState("")}
          className="fixed inset-0 bg-neutral-900/30 z-[98]"
        ></div>
      )}
      <div
        ref={containerRef}
        className={`max-w-[450px] p-6 w-full border-l border-neutral-200 fixed z-[99] right-0 h-full top-0 bg-white transform overflow-y-scroll transition-all duration-300 ${
          state === "view-order" ? "translate-x-[0%]" : "translate-x-[100%]"
        }`}
      >
        {/* Card Name */}
        <SlideHeading title="Order Details" />

        {/* header */}
        <main className="space-y-6">
          <div className="flex items-center gap-3 p-4 rounded-lg bg-neutral-50 border border-neutral-200">
            <div className="w-10 aspect-square bg-neutral-900 rounded-full capitalize text-base font-semibold text-white flex items-center justify-center shrink-0">
              {order?.email?.split("")[0]}
            </div>
            <p className="text-sm font-medium text-neutral-900 truncate">
              {order?.email}
            </p>
          </div>

          <div className="rounded-lg border border-neutral-200 divide-y divide-neutral-100">
            <div className="flex items-center p-4">
              <div className="w-full">
                <span className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                  Customer Name
                </span>
                <p className="text-base font-medium text-neutral-900">
                  {order?.email?.split("@")[0]}
                  {/* {order?.customer_name ?? order?.email?.split("@")[0]} */}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-sm text-nowrap text-neutral-500">
                  {formatDate(orderDate)}
                </p>
                <p className="flex gap-1.5 text-sm font-medium text-neutral-900">
                  {order?.order_items?.length}{" "}
                  <span className="text-nowrap">
                    {(order?.order_items?.length ?? 0) > 1 ? "Items" : "Item"}{" "}
                    Ordered
                  </span>
                </p>
              </div>
            </div>

            <div className="p-4 flex flex-col items-center gap-4">
              <div className="w-full flex items-center gap-2">
                <p className="w-full text-sm text-neutral-500">Payment Status</p>
                <Badge tone={order?.payment_status === "paid" ? "green" : "yellow"} dot>
                  {order?.payment_status}
                </Badge>
              </div>
              <div className="w-full flex items-center gap-2">
                <p className="w-full text-sm text-neutral-500">Order Status</p>
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

            <div className="p-4">
              <div className="flex gap-3">
                <p className="w-full text-sm text-neutral-500">Total Amount</p>
                <p className="text-nowrap font-semibold text-neutral-900">
                  GHC {order?.total_amount}
                </p>
              </div>
            </div>

            <div className="p-4">
              <div className="flex flex-col gap-2">
                <p className="w-full text-xs font-medium uppercase tracking-wide text-neutral-500">
                  Order Note
                </p>
                <p className="font-medium text-sm text-neutral-700">
                  {order?.order_note || "—"}
                </p>
              </div>
            </div>

            <div className="p-4">
              <div className="flex flex-col gap-3">
                <p className="w-full text-xs font-medium uppercase tracking-wide text-neutral-500">
                  Ordered items
                </p>
                <div className="flex flex-col gap-3">
                  {order?.order_items?.map((orderItem, index) => (
                    <OrderProduct key={index} orderItem={orderItem} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
