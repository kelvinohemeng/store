"use server";

import { OrderData } from "@/lib/types";
import { checkExistingOrder, createOrder } from "./order";
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

    if (!data.status) {
      console.error("Paystack API error:", data.message);
      return {
        success: false,
        message: `Paystack API error: ${data.message || "Unknown error"}`,
      };
    }

    // Get the transaction status and reference
    const transactionStatus = data.data?.status;
    const paystack_reference = data.data?.reference ?? reference;
    const paymentStatus = transactionStatus === "success" ? "paid" : "failed";

    // ✅ Step 1: Check if the order already exists in the database
    const existingOrder = await checkExistingOrder(paystack_reference);

    if (existingOrder) {
      console.log("Order already exists:", existingOrder);
      return {
        success: existingOrder.paymentStatus === "paid",
        status: existingOrder.paymentStatus,
        message: "Order already exists and has been processed",
        orderId: existingOrder.orderId,
      };
    }

    // ✅ Step 2: If no existing order, proceed with order creation
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
