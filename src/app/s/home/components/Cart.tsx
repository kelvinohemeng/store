"use client";

import { Product } from "@/lib/types";
import { useCartStore } from "@/store";
import { useState } from "react";
import CartItem from "./CartItem";
import PayStackCheckout from "./PayStackCheckout";

const Cart = () => {
  const { items, clearCart } = useCartStore();

  const totalPrice = useCartStore((state) => state.totalPrice());
  return (
    <div className="cart max-w-[500px] p-4 w-full absolute border right-0 min-h-dvh bg-[#fefefe]">
      <h2>Shopping Cart</h2>
      {items.length > 0 ? (
        <>
          <div className="flex flex-col gap-5">
            {items.map((item) => (
              <CartItem index={item.id} item={item} />
            ))}
          </div>
          <p>Total: ${totalPrice.toFixed(2)}</p>
          <button onClick={clearCart}>Clear Cart</button>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
