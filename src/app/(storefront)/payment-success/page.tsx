"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { verifyPayment } from "@/actions/paystack";
import Link from "next/link";
import { useCartStore } from "@/store";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const { clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  useEffect(() => {
    async function checkPayment() {
      const reference = searchParams.get("reference");
      if (!reference) return;

      const response = await verifyPayment(reference);

      if (response) {
        setMessage("Payment successful! Your order has been placed.");
        clearCart();
        // router.push("/order-confirmation"); // Redirect to order confirmation page
      } else {
        setMessage("Payment verification failed. Please contact support.");
      }

      setLoading(false);
    }

    checkPayment();
  }, [searchParams, router]);

  return (
    <div>
      <span>{loading ? "Verifying payment..." : message}</span>
      <Link href={"/home"}>
        <button className=" px-4 py-2 border">Continue Shopping</button>
      </Link>
    </div>
  );
}
