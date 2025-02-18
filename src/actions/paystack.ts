import { Dispatch, SetStateAction } from "react";
import { PaystackProps } from "./../../node_modules/react-paystack/dist/types.d";

type PaystackInitialization = {
  email: string;
  amount: number;
  setStoreStuff: Dispatch<SetStateAction<PaystackProps | null | undefined>>;
  callbackUrl?: string;
};

export const handlePaystackPurchase = async ({
  email,
  amount,
  setStoreStuff,
}: PaystackInitialization) => {
  if (!email) {
    alert("Please enter your email address.");
    return;
  }

  const response = await fetch(
    "https://api.paystack.co/transaction/initialize",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY!}`,
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
  return data;
};
