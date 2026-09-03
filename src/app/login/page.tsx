"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/lib/auth/client";
import Link from "next/link";
import { useUserData } from "@/store";
import { isDemoEmail } from "@/lib/demo";
import Stack from "@/components/global-components/Stack";
import AuthFormButton from "../(storefront)/_storeComponents/AuthFormButton";

export default function LoginPage() {
  const { setUser } = useUserData();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (formData: FormData) => {
    setError("");

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      // Sign in through the real /api/auth/sign-in/email HTTP endpoint (the
      // better-auth client), not the loginUser server action. A Server
      // Action's Set-Cookie has to be forwarded via next/headers, and that
      // forwarding doesn't reliably reach the browser on the OpenNext
      // Cloudflare Workers runtime — the session gets created in D1 but the
      // browser never ends up with the cookie, so the very next
      // getSession() call comes back empty. A normal fetch response's
      // Set-Cookie is handled by the browser's own cookie jar directly, so
      // it isn't subject to that gap.
      const { data, error: signInError } = await signIn.email({
        email,
        password,
      });

      if (signInError || !data?.user) {
        setError(signInError?.message ?? "Login failed");
        return;
      }

      setUser({
        id: data.user.id,
        email: data.user.email,
        display_name: data.user.name,
        role: (data.user as { role?: string }).role ?? "user",
        created_at: new Date(data.user.createdAt).toISOString(),
        isDemo: isDemoEmail(data.user.email),
      });
      router.replace("/home");
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
      <div className="hidden md:flex md:flex-col md:justify-start text-white w-full bg-green-50 p-12 h-screen  bg-[url('/assets/heroimg.jpg')] bg-no-repeat bg-cover">
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
