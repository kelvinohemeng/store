"use server";

import { OrderData } from "@/lib/types";
import { createOrder } from "./order";
import { cookies } from "next/headers";

// import { Dispatch, SetStateAction } from "react";
// import { PaystackProps } from "./../../node_modules/react-paystack/dist/types.d";

type PaystackInitialization = {
  email: string | undefined;
  amount: number;
  callbackUrl?: string;
  metadata: {};
};

export const handlePaystackPurchase = async ({
  email,
  amount,
  metadata,
}: PaystackInitialization) => {
  try {
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
          amount: 1,
          currency: "GHS",
          callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`, // Redirect after payment
        }),
      }
    );

    const { data } = await response.json();
    return {
      success: true,
      data,
      authorizationUrl: data.authorization_url,
    };
  } catch (error) {
    console.error("Paystack initialization error:", error);
    return { success: false, error: "Payment initialization failed" };
  }
};

export const verifyPayment = async (reference: string) => {
  const cookieStore = await cookies();
  try {
    const orderData = JSON.parse(
      cookieStore.get("pendingOrder")?.value || "{}"
    );

    if (!orderData || !orderData.items) {
      throw new Error("No order data found.");
    }

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env
            .NEXT_PUBLIC_PAYSTACK_SECRET_KEY!}`, // Replace with your Paystack secret key
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    const paymentStatus =
      data.status && data.data.status === "success" ? "paid" : "failed";

    const orderResponse = await createOrder({
      ...orderData,
      paymentStatus,
    });

    if (!orderResponse.success) {
      throw new Error("Order creation failed.");
    }

    if (paymentStatus === "failed") {
      return { success: false, message: "Payment failed, order not created" };
    }

    return { success: true, orderId: orderResponse.orderId };
  } catch (error) {
    console.error("Error verifying payment:", error);
    return false;
  }
};
