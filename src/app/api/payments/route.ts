// app/api/paystack.ts

import { NextResponse } from "next/server";
// // import fetch from "node-fetch";

export async function POST(request: Request) {
  const { email, amount } = await request.json();

  try {
    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount,
          callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/callback`,
        }),
      }
    );

    if (!response.ok) throw new Error("Failed to initialize transaction");

    const data = await response.json();
    return NextResponse.json({ authorizationUrl: data.data.authorization_url });
  } catch (error) {
    console.error("Error initializing transaction:", error);
    return NextResponse.json(
      { error: "Failed to initialize transaction" },
      { status: 500 }
    );
  }
}
