import { Order } from "@/lib/types";
import React from "react";

const OrderItemDisp = ({ order }: { order: Order }) => {
  return (
    <div className=" cursor-pointer flex  p-4 border rounded-lg hover:bg-white group">
      <div className="flex flex-col gap2 w-full">
        <span>Customer Name</span>
        <span>{order?.customer_name}</span>
      </div>
      <div className="flex flex-col gap2 w-full">
        <span>Customer Email</span>
        <span>{order?.email}</span>
      </div>
      <div className="flex flex-col gap2 w-full">
        <span>Payment Status</span>
        <span>{order?.payment_status}</span>
      </div>
      <div className="flex flex-col gap2 w-full">
        <span>Total Orders</span>
        <span>{order?.order_items?.length}</span>
      </div>
      <div className="flex flex-col gap2 w-full">
        <span>Total Amount</span>
        <span>
          ${" "}
          {order?.order_items
            ?.reduce((total, item) => {
              return total + item.price * item.quantity;
            }, 0)
            .toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default OrderItemDisp;
