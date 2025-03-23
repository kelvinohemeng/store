"use client";

import { useSlide } from "@/store";
import { OrderData, OrderItem, Product } from "@/lib/types";
import OrderProduct from "./OrderProduct";
import { formatDate } from "@/Helpers";
import { OrderStatusButton } from "./OrderStatusButton";

export default function DisplayOrderSlide({
  order,
}: {
  order: OrderData | null | undefined;
}) {
  const orderDate = new Date(order?.created_at ?? "");

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
        {/* Card Name */}
        <div className="flex items-center my-6">
          <div className="w-full">
            <h1 className="text-2xl">Order Details</h1>
          </div>
          <button onClick={() => setState("")}>
            <p className="text-nowrap leading-[100%]">close menu</p>
          </button>
        </div>

        {/* header */}
        <main className=" space-y-6">
          <div className=" flex items-center gap-2 p-6 rounded-[16px] bg-black/5">
            <div className=" w-[50px] aspect-square bg-red-500 rounded-full capitalize text-2xl font-bold text-white flex items-center justify-center">
              {order?.email?.split("")[0]}
            </div>
            <p className="text-xl font-medium">{order?.email}</p>
          </div>

          <div className="space-y-3  rounded-2xl shadow-sm border">
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
                  <span className=" text-nowrap">Items Ordered</span>
                </p>
              </div>
            </div>

            <hr />

            <div className="p-4 flex flex-col items-center gap-4">
              <div className="w-full flex items-center gap-2">
                <p className="w-full text-slate-600 text-sm">Payment Status</p>
                <p className="text-base px-4 py-1 rounded-[8px] bg-green-500 border-[3px] text-white w-fit border-green-300 font-medium capitalize">
                  {order?.payment_status}
                </p>
              </div>
              <div className="w-full flex items-center gap-2">
                <p className="w-full text-slate-600 text-sm">Order Status</p>
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

            <hr />

            <div className="p-4">
              <div className="flex gap-3">
                <p className="w-full">Total Amount</p>
                <p className="text-nowrap font-semibold">
                  GHC {order?.total_amount}
                </p>
              </div>
            </div>

            <div className="p-4 flex flex-col gap-2 w-full">
              <span>Total Amount</span>
              <p className="text-xl">
                ${" "}
                {order?.order_items
                  ?.reduce((total, item) => {
                    return total + (item.price * item.quantity || 0); // Ensure price and quantity are defined
                  }, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="p-4 flex flex-col gap-4">
              <span className=" text-slate-600">Ordered Product</span>
              <div className="flex gap-4">
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
