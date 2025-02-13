// components/storefront/CheckoutButton.tsx
"use client";

import { supabase } from "@/lib/utils/supabase";
import { useCartStore } from "@/store";
import { useState } from "react";

export const CheckoutButton = () => {
  const [loading, setLoading] = useState(false);
  const { items, totalPrice } = useCartStore();
  const total = totalPrice();

  const initializePayment = async () => {
    setLoading(true);
    try {
      // First create your order in Supabase
      const { data: order } = await supabase
        .from("Orders")
        .insert({
          total,
          items: items.map((item) => ({ product_id: item.id, quantity: 1 })),
          status: "pending",
        })
        .select()
        .single();

      // Initialize Paystack payment
      const response = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: total,
          email: "customer@example.com", // Replace with actual email
          orderId: order?.id,
        }),
      });

      const { data } = await response.json();
      window.location.href = data.authorization_url;
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Payment initialization failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={initializePayment}
      disabled={loading || items.length === 0}
      className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 disabled:opacity-50"
    >
      {loading ? "Processing..." : "Proceed to Payment"}
    </button>
  );
};
