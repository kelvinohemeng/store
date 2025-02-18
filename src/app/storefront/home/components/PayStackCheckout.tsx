"use client";

import { handlePaystackPurchase } from "@/actions/paystack";
// components/Checkout.tsx
import { useCartStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { PaystackProps } from "react-paystack/dist/types";

const PayStackCheckout = ({ amount }: { amount: number }) => {
  const [storeStuff, setStoreStuff] = useState<PaystackProps | null>();
  const { items } = useCartStore();
  const [email, setEmail] = useState("");

  //   const { data, isLoading, isError, isSuccess } = useQuery({
  //     queryKey: ["paystack_initialization"],
  //     queryFn: async () =>
  //       handlePaystackPurchase({ amount, email, setStoreStuff }),
  //   });

  const handlePayment = async () => {
    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env
            .NEXT_PUBLIC_PAYSTACK_SECRET_KEY!}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: amount * 100, // Paystack expects amount in kobo
          currency: "GHS",
          callback_url: "/payment-success", // Add callback URL
        }),
      }
    );

    const data = await response.json();
    if (data.status) {
      window.open(data.data.authorization_url, "_blank"); // Redirect to Paystack payment page
      setStoreStuff(data);
    } else {
      alert("Failed to initialize payment. Please try again.");
    }
  };

  useEffect(() => {
    console.log(storeStuff);
  });

  return (
    <div>
      <h2>Checkout</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.product_name} - $
            {((item.product_price * 100) / 100).toFixed(2)} x {item.quantity}
          </li>
        ))}
      </ul>
      <p>Total: ${amount.toFixed(2)}</p>
      <input
        name="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handlePayment}>Proceed to Payment</button>
    </div>
  );
};

export default PayStackCheckout;
