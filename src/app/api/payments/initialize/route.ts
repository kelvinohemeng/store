import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { amount, email, orderId } = await req.json();

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        amount: amount * 100, // Paystack uses kobo
        email,
        reference: orderId,
        // callback_url: `${process.env.NEXTAUTH_URL}/order-confirmation/${orderId}`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Paystack initialization error:", error);
    return NextResponse.json(
      { error: "Payment initialization failed" },
      { status: 500 }
    );
  }
}
