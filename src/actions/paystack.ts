"use server";

// import { Dispatch, SetStateAction } from "react";
// import { PaystackProps } from "./../../node_modules/react-paystack/dist/types.d";

type PaystackInitialization = {
  email: string | undefined;
  amount: number;
  callbackUrl?: string;
};

export const handlePaystackPurchase = async ({
  email,
  amount,
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
          amount: amount * 100, // Paystack expects amount in kobo
          currency: "GHS",
          callback_url: "/payment-success", // Add callback URL
        }),
      }
    );

    const data = await response.json();
    return { success: true, authorizationUrl: data.data.authorization_url };
  } catch (error) {
    console.error("Paystack initialization error:", error);
    return { success: false, error: "Payment initialization failed" };
  }
};
