"use client";

import { useCartStore, useSlide } from "@/store";
import CartItem from "./CartItem";
import PayStackCheckout from "./PayStackCheckout";
import { AnimatePresence, LayoutGroup } from "motion/react";
import Image from "next/image";

const CartSlide = () => {
  const { state, setState } = useSlide();
  const { items, totalItems, totalPrice, _hasHydrated } = useCartStore();
  // This panel is always in the DOM (just translated off-screen via CSS
  // when closed), so everything it renders from the persisted cart —
  // count, item list, checkout total — is part of the initial SSR markup
  // too. Fall back to "empty" until the client has actually rehydrated
  // from localStorage, same guard as Navigation.tsx's cart badge.
  const displayItems = _hasHydrated ? items : [];
  const cartItemCount = _hasHydrated ? totalItems() : 0;
  const cartTotal = _hasHydrated ? totalPrice() : 0;

  return (
    <div className="fixed z-[999] h-dvh" tabIndex={-1}>
      {state == "cart" && (
        <div
          onClick={() => setState("")}
          aria-hidden="true"
          className="fixed inset-0 bg-ink/40"
        ></div>
      )}
      <div
        className={`max-w-[450px] w-full h-full border border-ink/20 fixed flex flex-col z-[9] right-0 top-0 bg-paper transform ${
          state === "cart" ? "translate-x-[0%]" : "translate-x-[100%]"
        } transition-all duration-300`}
      >
        <div className="flex justify-between items-center border-b border-ink/15 p-8 pt-12">
          <h5 className="font-sans font-semibold text-xl text-ink">
            {cartItemCount} Item{cartItemCount === 1 ? "" : "s"} in Cart
          </h5>
          <button
            className="border border-ink px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-ink hover:bg-ink hover:text-paper transition-colors"
            onClick={() => setState("")}
          >
            Close
          </button>
        </div>
        <LayoutGroup>
          <div className="overflow-y-auto overflow-x-hidden h-full max-h-full cart bg-paper">
            {displayItems.length > 0 ? (
              <div className="flex flex-col divide-y divide-ink/10">
                <AnimatePresence mode="popLayout">
                  {displayItems.map((item) => (
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
            ) : (
              <div className="flex h-full w-full items-center justify-center p-8">
                <p className="font-body text-ink/50">Your cart is empty.</p>
              </div>
            )}
          </div>
        </LayoutGroup>

        <div className="p-6 border-t border-ink/15 space-y-4 h-fit">
          <PayStackCheckout amount={cartTotal} orderItems={displayItems} />
          <div className="flex items-center justify-center gap-2 h-fit">
            <p className="font-body text-xs text-ink/40">Powered with</p>
            <Image
              className="w-auto h-auto max-w-[100px] opacity-70"
              src="/assets/paystack_logo.png"
              alt="Paystack"
              width={1200}
              height={288}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSlide;
