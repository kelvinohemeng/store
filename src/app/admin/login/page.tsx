// "use client";

// import { useState } from "react";
import { loginAdmin } from "@/actions/auth"; // Import Supabase client
// import Link from "next/link";
// import { useRouter, redirect } from "next/navigation";
// import { useUserData } from "@/store";
// import { set } from "react-hook-form";

export default async function AdminLogin() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {/* {error && <p className="text-red-500">{error}</p>} */}
      <form action={loginAdmin} className="flex flex-col space-y-4">
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
      <p>Please sign in with your email and the pasword provided by us.</p>
    </div>
  );
}
