"use client";

import { Order } from "@/lib/types";
import React, { useEffect, useState } from "react";
import OrderItemDisp from "./OrderItem";
import DisplayOrderSlide from "./DisplayOrderSlide";
import { useSlide } from "@/store";

const DisplayOrders = ({ orders }: { orders: Order[] | undefined }) => {
  const [selectedOrder, setSelectedOrder] = useState<Order>();
  const { setState } = useSlide();

  return (
    <div>
      <div className="flex flex-col gap-4">
        {orders?.map((order, index) => (
          <div
            onClick={() => {
              setSelectedOrder(order);
              setState("view-order");
            }}
          >
            <OrderItemDisp order={order} />
          </div>
        ))}
      </div>
      <DisplayOrderSlide order={selectedOrder} />
    </div>
  );
};

export default DisplayOrders;
