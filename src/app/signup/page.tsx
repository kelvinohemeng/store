"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/utils/supabase"; // Import Supabase client
import Link from "next/link";
import { signupUser } from "@/actions/auth";

const SignupPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      {/* {error && <p className="text-red-500">{error}</p>} */}
      <form action={signupUser} className="flex flex-col space-y-4">
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
          Sign Up
        </button>
      </form>
      <p>
        Already have an account?
        <Link
          className="border-b pb-1 text-blue-600 border-blue-600"
          href={"/login"}
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;
