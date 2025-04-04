"use client";

import { storePendingOrder } from "@/actions/order";
import { handlePaystackPurchase } from "@/actions/paystack";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/Helpers";
import { OrderData, Product } from "@/lib/types";
// components/Checkout.tsx
import { useCartStore, useUserData } from "@/store";
import { useEffect, useState } from "react";

const PayStackCheckout = ({
  amount,
  orderItems,
}: {
  amount: number;
  orderItems: Product[];
}) => {
  const [orderNoteLocal, setOrderNoteLocal] = useState("");
  const formatedAmount = formatCurrency(amount);
  const { clearCart } = useCartStore();
  const { user: storedUser, setUser } = useUserData();

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

      window.location.href = payStackResponse.authorizationUrl;
    } else {
      alert(payStackResponse.error);
    }
  };

  useEffect(() => {
    console.log(storedUser);
  }, []);

  return (
    <div className="space-y-3">
      <p className="text-xl font-semibold">Subotal: GHC {formatedAmount}</p>
      <div className="">
        <form action={handlePayment} className="checkout flex flex-col gap-1">
          <label htmlFor="email">
            <div className="pb-2">
              <p>Please provide your email</p>
            </div>
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              defaultValue={storedUser?.email}
              className="p-4 h-auto px-6"
              disabled={storedUser?.email ? true : false}
            />
          </label>

          <button
            disabled={orderItems.length > 0 ? false : true}
            className={`${
              orderItems.length > 0 ? "cursor-pointer" : "cursor-not-allowed"
            } border-green-200 border-[3px] py-4 text-center bg-green-600 text-white font-semibold w-full rounded-[8px]`}
          >
            Proceed to Payment
          </button>
        </form>
        <button
          onClick={() => clearCart()}
          className=" border-slate-200 border-[3px] py-4 text-center bg-black text-white font-semibold w-full rounded-[8px]"
        >
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default PayStackCheckout;
