"use server";

import { OrderData } from "@/lib/types";
import { checkExistingOrder, createOrder } from "./order";
import { cookies } from "next/headers";
import { getCloudflareContext } from "@opennextjs/cloudflare";

type PaystackInitialization = {
  email: string | undefined;
  amount: number;
  callbackUrl?: string;
  metadata?: Record<string, string>;
};

type PaystackInitializeResponse = {
  status: boolean;
  message: string;
  data?: { authorization_url: string; access_code: string; reference: string; status?: string };
};

type PaystackVerifyResponse = {
  status: boolean;
  message: string;
  data?: { status: string; reference: string };
};

export const handlePaystackPurchase = async ({
  email,
  amount,
}: PaystackInitialization) => {
  try {
    const { env } = getCloudflareContext();
    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: amount * 100, // Paystack expects amount in kobo (smallest currency unit)
          currency: "GHS",
          callback_url:
            process.env.NODE_ENV === "production"
              ? `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/payment-success`
              : `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
          channels: ["card", "bank_transfer", "ussd", "mobile_money"],
        }),
      }
    );

    const { data } = (await response.json()) as PaystackInitializeResponse;
    return {
      success: true,
      data,
      authorizationUrl: data?.authorization_url,
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

    const { env } = getCloudflareContext();

    // Verify payment with Paystack
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = (await response.json()) as PaystackVerifyResponse;

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
    const payment_status = transactionStatus === "success" ? "paid" : "failed";

    // ✅ Step 1: Check if the order already exists in the database
    const existingOrder = await checkExistingOrder(paystack_reference);

    if (existingOrder) {
      return {
        success: existingOrder.payment_status === "paid",
        status: existingOrder.payment_status,
        message: "Order already exists and has been processed",
        orderId: existingOrder.id,
      };
    }

    // ✅ Step 2: If no existing order, proceed with order creation
    const orderResponse = await createOrder({
      ...orderData,
      paystack_reference,
      payment_status,
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
