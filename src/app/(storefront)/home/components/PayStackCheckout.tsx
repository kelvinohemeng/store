"use client";

import { createOrder } from "@/actions/order";
import { handlePaystackPurchase } from "@/actions/paystack";
import { Input } from "@/components/ui/input";
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
  const { items } = useCartStore();
  const { user: storedUser, setUser } = useUserData();

  // const { data, isLoading, isError, isSuccess } = useQuery({
  //   queryKey: ["paystack_initialization"],
  //   queryFn: async () =>
  //     handlePaystackPurchase({ amount, email: "test@example.com" }),
  // });

  const handlePayment = async () => {
    const email = storedUser?.email;
    if (!email) {
      alert("Please enter your email address.");
    }

    const payStackResponse = await handlePaystackPurchase({
      amount,
      email,
      metadata: {
        name: "John Doe",
        phone: "+233123456789",
      },
    });

    if (payStackResponse.success) {
      // Store orderData in cookies (not in Zustand)
      document.cookie = `pendingOrder=${JSON.stringify({
        customerName: storedUser?.display_name,
        email: storedUser?.email,
        items: orderItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.product_price,
        })),
      })}; path=/; Secure`;

      window.location.href = payStackResponse.authorizationUrl;
    } else {
      alert(payStackResponse.error);
    }

    const orderData: OrderData = {
      customerName: storedUser?.email,
      email: storedUser?.email,
      paymentStatus: payStackResponse?.data?.status,
      totalAmount: amount,
      items: orderItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.product_price,
        productName: item.product_name,
        productImage: item.image_url?.[0],
        selectedVariants: {
          size: item.selectedSize, // You'll need to track these in your cart
          color: item.selectedColor, // You'll need to track these in your cart
        },
      })),
    };

    //function to create a new order
    await createOrder(orderData);
  };

  useEffect(() => {
    console.log(storedUser);
  }, []);

  return (
    <div className="spac-y-3">
      <p className="text-xl font-semibold">Subotal: ${amount.toFixed(2)}</p>
      <form action={handlePayment} className="checkout space-y-4 py-4">
        <label htmlFor="email" className="space-y-2">
          <span>Please provide your email</span>
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            defaultValue={storedUser?.email}
            className="p-4 h-auto px-6"
            disabled={storedUser?.email ? true : false}
          />
        </label>

        <button className=" border-green-200 border-[3px] py-4 text-center bg-green-500 text-white w-full rounded-[8px]">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default PayStackCheckout;
