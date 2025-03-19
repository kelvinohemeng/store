"use server";

import { OrderData } from "@/lib/types";
import { createOrder } from "./order";
import { cookies } from "next/headers";
import { channel } from "diagnostics_channel";

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
          channels: ["card", "bank_transfer", "ussd", "mobile_money"],
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
    const orderData: OrderData = JSON.parse(
      cookieStore.get("pendingOrder")?.value || "{}"
    );

    if (!orderData || !orderData.order_items) {
      console.error("No order data found in cookies");
      return {
        success: false,
        message: "No order data found in cookies",
      };
    }

    // Verify payment with Paystack
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env
            .NEXT_PUBLIC_PAYSTACK_SECRET_KEY!}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    console.log("Paystack verification response:", data);

    // Check if the API response itself was successful
    if (!data.status) {
      console.error("Paystack API error:", data.message);
      return {
        success: false,
        message: `Paystack API error: ${data.message || "Unknown error"}`,
      };
    }

    // Important: Check the actual transaction status from Paystack
    // Paystack uses 'success' for successful transactions
    const transactionStatus = data.data?.status;
    console.log("Transaction status from Paystack:", transactionStatus);

    // Determine payment status based on Paystack's response
    // Paystack transaction statuses: 'success', 'failed', 'abandoned', etc.
    const paymentStatus = transactionStatus === "success" ? "paid" : "failed";

    // Get the reference from Paystack response
    const paystack_reference = data.data?.reference ?? reference;

    // Create the order regardless of payment status
    const orderResponse = await createOrder({
      ...orderData,
      paystack_reference,
      paymentStatus,
    });

    if (!orderResponse.success) {
      return {
        success: false,
        message: "Order creation failed",
        orderId: "no id",
      };
    }

    // Return success based on the actual transaction status from Paystack
    return {
      success: transactionStatus === "success",
      status: transactionStatus,
      message:
        transactionStatus === "success"
          ? "Payment verification was successful"
          : `Payment status: ${transactionStatus}`,
      orderId: orderResponse.orderId,
    };
  } catch (error) {
    console.error("Error verifying payment:", error);
    return {
      success: false,
      status: "error",
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};
