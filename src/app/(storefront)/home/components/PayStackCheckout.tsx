"use client";

import { storePendingOrder } from "@/actions/order";
import { handlePaystackPurchase } from "@/actions/paystack";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/Helpers";
import { Product } from "@/lib/types";
import { useCartStore, useUserData } from "@/store";
import { useState } from "react";

const PayStackCheckout = ({
  amount,
  orderItems,
}: {
  amount: number;
  orderItems: Product[];
}) => {
  // No UI sets this yet (order_note is always sent empty) — kept as the
  // single read path so wiring up a note field later is a one-line change.
  const [orderNoteLocal] = useState("");
  const formatedAmount = formatCurrency(amount);
  const { clearCart } = useCartStore();
  const { user: storedUser } = useUserData();

  const handlePayment = async () => {
    const email = storedUser?.email;

    const payStackResponse = await handlePaystackPurchase({
      amount: amount,
      email,
      metadata: {
        name: "John Doe",
        phone: "+233123456789",
      },
    });

    if (payStackResponse.success) {
      await storePendingOrder({
        customer_name: storedUser?.email,
        email: storedUser?.email,
        payment_status: payStackResponse?.data?.status,
        total_amount: amount,
        paystack_reference: payStackResponse?.data?.reference,
        order_note: orderNoteLocal,
        delivery_address: {
          city: "",
          state: "",
          country: "",
          street: "",
          postalCode: "",
        },
        order_items: orderItems.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          price: item.product_price,
          product_name: item.product_name,
          product_images: item.image_url ? [item.image_url[0]] : [],
          variants: { size: item.selectedSize },
        })),
      });

      if (payStackResponse.authorizationUrl) {
        window.location.href = payStackResponse.authorizationUrl;
      }
    } else {
      alert(payStackResponse.error);
    }
  };

  return (
    <div className="space-y-3">
      <p className="font-sans font-semibold text-ink">
        Subtotal: GHC {formatedAmount}
      </p>
      <div className="">
        <form action={handlePayment} className="checkout flex flex-col gap-2">
          <label htmlFor="email">
            <div className="pb-2">
              <p className="font-body text-sm text-ink/60">
                Please provide your email
              </p>
            </div>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              defaultValue={storedUser?.email}
              className="p-4 h-auto px-6 border-ink/20 focus-visible:ring-ink/30"
              disabled={storedUser?.email ? true : false}
            />
          </label>

          <button
            disabled={orderItems.length > 0 ? false : true}
            className={`${
              orderItems.length > 0
                ? "cursor-pointer bg-ink hover:bg-ink/85"
                : "cursor-not-allowed bg-ink/40"
            } border border-ink py-3.5 text-center font-sans text-xs font-semibold uppercase tracking-wide text-paper w-full transition-colors`}
          >
            Proceed to Payment
          </button>
        </form>
        <button
          onClick={() => clearCart()}
          className="mt-2 border border-ink/20 py-3.5 text-center font-sans text-xs font-semibold uppercase tracking-wide text-ink/70 w-full hover:bg-ink/5 transition-colors"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default PayStackCheckout;
