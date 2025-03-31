"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/actions/auth";
import Link from "next/link";
import { useUserData } from "@/store";
import Stack from "@/components/global-components/Stack";
import AuthFormButton from "../(storefront)/_storeComponents/AuthFormButton";

export default function LoginPage() {
  const { setUser } = useUserData();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (formData: FormData) => {
    setError("");

    try {
      const response = await loginUser(formData);

      if (response.success) {
        router.replace("/home");
        setUser(response.userData);
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
      className="min-h-screen !p-0 bg-gray-50"
    >
      {/* Brand section */}
      <div className="hidden md:flex md:flex-col md:justify-start text-white w-full bg-green-50 p-12 h-screen  bg-[url('https://qysorjsrzyfvzxicbnut.supabase.co/storage/v1/object/public/product_images/products/product_1742119652629_i3lpaxqwn1a.jpg')] bg-no-repeat bg-cover">
        <h1 className="display-1 font-bold tracking-tight">
          OMAN <br /> KWESI
        </h1>
        <p className="mt-6 text-white text-4xl tracking-tighter">
          Wear it proud
        </p>
      </div>

      {/* Login form section */}
      <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto pr-8 py-12">
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-6 text-center">Welcome Back</h1>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
              {error}
            </div>
          )}

          <form action={handleLogin} className="flex flex-col space-y-5">
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
                placeholder="Enter your password"
                required
                className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
              />
            </div>

            <AuthFormButton title="Login" />
          </form>

          <p className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              className="text-black hover:text-black/70 font-medium"
              href="/signup"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </Stack>
  );
}
