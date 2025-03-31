"use client";

import { PaystackButton } from "react-paystack";
import { Product } from "@/lib/types";
import { useCartStore, useSlide } from "@/store";
import { useState } from "react";
import CartItem from "./CartItem";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PayStackCheckout from "./PayStackCheckout";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";

const CartSlide = () => {
  const { state, setState } = useSlide();
  const { items, totalItems, totalPrice } = useCartStore();

  return (
    <div className="fixed z-[999] h-dvh" tabIndex={-1}>
      {state == "cart" && (
        <div
          onClick={() => setState("")}
          className="fixed inset-0 bg-slate-800 opacity-30"
        ></div>
      )}
      <div
        className={`max-w-[450px] w-full h-full border border-black/30 fixed flex flex-col z-[9] right-0 top-0 bg-white transform ${
          state === "cart" ? "translate-x-[0%]" : "translate-x-[100%]"
        } transition-all duration-300`}
      >
        <div className="flex justify-between items-center py-3 mb-5 border-b border-black/30 p-8 pt-12">
          <h5 className="text-xl">{totalItems()} Items in Cart</h5>
          <button
            className="p-4 py-3 font-medium text-base bg-slate-50 rounded-lg"
            onClick={() => setState("")}
          >
            Close
          </button>
        </div>
        <LayoutGroup>
          <div className=" overflow-y-scroll overflow-x-hidden h-full max-h-full cart max-w-[500px] bg-[#fefefe]">
            {items.length > 0 ? (
              <>
                <div className="flex flex-col gap-5">
                  <AnimatePresence mode="popLayout">
                    {items.map((item) => (
                      <CartItem
                        key={`${item.id}-${item.selectedSize}-${
                          item.selectedColor || ""
                        }`}
                        index={item.id}
                        item={item}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="p-8 h-full w-full">
                <p>Your cart is empty.</p>
              </div>
            )}
          </div>
        </LayoutGroup>

        <div className="p-6 border-t border-black/30 space-y-2 h-fit">
          <PayStackCheckout amount={totalPrice()} orderItems={items} />
          <div className="flex items-center justify-center gap-3 h-fit">
            <p>Powered with</p>
            <img
              className="max-w-[120px]"
              src="/assets/paystack_logo.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSlide;
