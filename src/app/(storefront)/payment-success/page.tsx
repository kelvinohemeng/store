"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { verifyPayment } from "@/actions/paystack";
import Link from "next/link";
import { useCartStore } from "@/store";

function PaymentSuccess() {
  const searchParams = useSearchParams();
  const { clearCart } = useCartStore();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<{
    success?: boolean;
    message?: string;
    orderId?: string;
  }>({});

  const hasVerified = useRef(false);
  const reference = useMemo(
    () => searchParams.get("reference"),
    [searchParams]
  );

  async function checkPayment() {
    try {
      console.log("Reference from URL:", reference);

      if (!reference) {
        setMessage("No payment reference found");
        setLoading(false);
        return;
      }

      console.log("Verifying payment with reference:", reference);
      const response = await verifyPayment(reference);
      console.log("Verification response:", response);

      setVerificationStatus(response);

      if (response.success) {
        setMessage(
          `Payment successful! Your order #${response.orderId} has been placed.`
        );
        clearCart();
      } else {
        // More detailed error message
        setMessage(
          `Payment verification status: ${response.status || "unknown"}. ${
            response.message
          }`
        );
      }
    } catch (err) {
      console.error("Error during payment verification:", err);
      setMessage(
        "An error occurred during payment verification. Please contact support."
      );
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    if (!reference || hasVerified.current) return;

    hasVerified.current = true;
    checkPayment();
  }, [reference]);

  return (
    <div className="pt-[120px] flex flex-col items-center justify-center max-w-md mx-auto p-6 space-y-6">
      {loading ? (
        <div className="text-center">
          <p className="text-xl font-medium">Verifying payment...</p>
          <p className="text-sm text-gray-500 mt-2">
            Please wait while we confirm your payment
          </p>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <h1
            className={`text-2xl font-bold ${
              verificationStatus.success ? "text-green-600" : "text-red-600"
            }`}
          >
            {verificationStatus.success
              ? "Payment Successful"
              : "Payment Verification Failed"}
          </h1>
          <p className="text-lg">{message}</p>
          {verificationStatus.orderId && verificationStatus.success && (
            <p className="text-md bg-green-50 p-3 rounded">
              Order ID: {verificationStatus.orderId}
            </p>
          )}
        </div>
      )}

      <div className="flex gap-4 mt-8">
        <Link href="/home">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Continue Shopping
          </button>
        </Link>
        {verificationStatus.success && (
          <Link href="/orders">
            <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
              View Orders
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense>
      <PaymentSuccess />
    </Suspense>
  );
}
