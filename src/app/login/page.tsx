"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAdmin, loginUser, logoutUser, signupUser } from "@/actions/auth"; // Import your admin login function
import { supabase } from "@/lib/utils/supabase"; // Import Supabase client
import Link from "next/link";

export default function LoginPage() {
  //   const router = useRouter();

  //   const handleLogin = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     setError("");

  //     try {
  //       // Call the login function here
  //       await loginUser();
  //       router.push("/storefront/home"); // Redirect after successful login
  //     } catch (error) {
  //       setError((error as Error).message);
  //     }
  //   };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {/* {error && <p className="text-red-500">{error}</p>} */}
      <form action={loginUser} className="flex flex-col space-y-4">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Login
        </button>
      </form>
      <p>
        Don't have an account?
        <Link
          className="border-b pb-1 text-blue-600 border-blue-600"
          href={"/signup"}
        >
          Signup
        </Link>
      </p>
    </div>
  );
}
