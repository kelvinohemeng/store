"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signupUser } from "@/actions/auth";
import Stack from "@/components/global-components/Stack";
import AuthFormButton from "../(storefront)/_storeComponents/AuthFormButton";

// Add a simple spinner component
const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const SignupPage = () => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (formData: FormData) => {
    setError(null);

    try {
      const response = await signupUser(formData);

      if (response.success) {
        router.replace("/home");
      } else {
        setError(response.error);
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <Stack
      orientation="horizontal"
      gap="large"
      container="full-width"
      className="min-h-screen !px-0 bg-gray-50"
    >
      {/* Brand section */}
      <div className="hidden md:flex md:flex-col md:justify-start text-white w-full bg-green-50 p-12 h-screen  bg-[url('https://qysorjsrzyfvzxicbnut.supabase.co/storage/v1/object/public/product_images/products/product_1742119652629_i3lpaxqwn1a.jpg')] bg-no-repeat bg-cover">
        <h1 className="display-1 font-bold tracking-tight">
          OMAN <br /> KWESI
        </h1>
        <p className="mt-6 text-white text-4xl tracking-tighter max-w-3xl">
          Join the fashion of Oman Kweesi with our exclusive membership.
        </p>
      </div>

      {/* Signup form section */}
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto px-6 py-12">
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Create Account
          </h1>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}

          <form action={handleSignup} className="flex flex-col space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                required
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              />
            </div>

            <AuthFormButton title="Register" />
          </form>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{" "}
            <Link
              className="text-black hover:text-black/70 font-medium"
              href="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </Stack>
  );
};

export default SignupPage;
