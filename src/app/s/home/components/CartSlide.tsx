"use client";

import { Product } from "@/lib/types";
import { useCartStore, useSlide } from "@/store";
import { useState } from "react";
import CartItem from "./CartItem";
import PayStackCheckout from "./PayStackCheckout";

const CartSlide = () => {
  const { state, setState } = useSlide();
  const { items, clearCart } = useCartStore();

  const totalPrice = useCartStore((state) => state.totalPrice());
  return (
    <div className="relative z-[999]" tabIndex={-1}>
      {state == "cart" && (
        <div
          onClick={() => setState("")}
          className="fixed inset-0 bg-slate-800 opacity-30"
        ></div>
      )}
      <div
        className={`overflow-y-scroll max-w-[450px] w-full border fixed z-[9] right-0 h-full top-0 bg-white transform ${
          state === "cart" ? "translate-x-[0%]" : "translate-x-[100%]"
        } transition-all duration-300`}
      >
        <div className="cart max-w-[500px] px-8 py-8 w-full right-0 min-h-dvh bg-[#fefefe]">
          <div className="flex justify-between py-3 mb-5 border-b">
            <h2 className="text-2xl">Cart</h2>
            <button
              className="p-4 py-3 font-medium text-base bg-slate-50 rounded-lg"
              onClick={() => setState("")}
            >
              Close
            </button>
          </div>
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
      </div>
    </div>
  );
};

export default CartSlide;
