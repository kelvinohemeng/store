"use client";

import { Product } from "@/lib/types";
import { useCartStore } from "@/store";
import { Minus, Plus } from "@phosphor-icons/react";
import React, { ReactNode } from "react";

const CartItem = ({
  index,
  item,
}: {
  index: string | number;
  item: Product;
}) => {
  const { addItem, removeItem } = useCartStore();

  return (
    <div
      key={index}
      className="flex justify-between items-center border border-slate-400 p-4 rounded-lg"
    >
      <div className="flex items-center gap-4">
        <img
          className="max-w-[80px] w-full rounded-md object-cover object-center aspect-square"
          src={item.image_url[0]}
          alt=""
        />
        <div>
          <p>{item.product_name}</p>
          <p>{((item.product_price * 100) / 100).toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button title="add" onClick={() => addItem(item)}>
          <Plus size={18} />
        </button>
        <p>{item.quantity}</p>
        <button
          title="minus"
          onClick={() => {
            console.log("Remove button clicked for ID:", item.id);
            removeItem(item.id);
          }}
        >
          <Minus size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
