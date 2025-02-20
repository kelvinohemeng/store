"use client";

import { handlePaystackPurchase } from "@/actions/paystack";
import { Input } from "@/components/ui/input";
import { Product } from "@/lib/types";
// components/Checkout.tsx
import { useCartStore, useUserData } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { PaystackProps } from "react-paystack/dist/types";

const PayStackCheckout = ({
  amount,
  orderItems,
}: {
  amount: number;
  orderItems: Product[];
}) => {
  // const [storeStuff, setStoreStuff] = useState<PaystackProps | null>();
  const { items } = useCartStore();
  const { user: storedUser, setUser } = useUserData();

  //   const { data, isLoading, isError, isSuccess } = useQuery({
  //     queryKey: ["paystack_initialization"],
  //     queryFn: async () =>
  //       handlePaystackPurchase({ amount, email, setStoreStuff }),
  //   });

  const handlePayment = async () => {
    const email = storedUser?.email;
    if (!email) {
      alert("Please enter your email address.");
    }

    const payStackResponse = await handlePaystackPurchase({ amount, email });

    if (payStackResponse.success) {
      window.open(payStackResponse.authorizationUrl, "_blank");
    } else {
      alert(payStackResponse.error);
    }

    // const orderData = {
    //   customerName: storedUser?.email,
    //   email: storedUser?.email,
    //   deliveryAddress: "123 Main St, City",
    //   paymentStatus: data?.status, // Change this based on your logic
    //   items: items.map((item) => ({
    //     productId: item.id,
    //     quantity: item.quantity,
    //     price: item.product_price, // Ensure price is correct
    //   })),
    // };
  };

  useEffect(() => {
    console.log(storedUser);
  }, []);

  return (
    <div>
      <h2>Checkout</h2>
      {/* <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.product_name} - $
            {((item.product_price * 100) / 100).toFixed(2)} x {item.quantity}
          </li>
        ))}
      </ul> */}
      <p>Total: ${amount.toFixed(2)}</p>
      <form action={handlePayment} className="checkout space-y-4 py-4">
        <label htmlFor="email">
          <span>Please provide your email</span>
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            defaultValue={storedUser?.email}
            className="p-4 h-auto px-6"
            disabled
          />
        </label>

        <button className=" border-green-200 border-[3px] py-4 text-center bg-green-500 text-white w-full rounded-lg">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default PayStackCheckout;
