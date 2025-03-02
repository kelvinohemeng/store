"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/actions/auth"; // Import Supabase client
import Link from "next/link";
import { useUserData } from "@/store";

export default function LoginPage() {
  const { setUser } = useUserData();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (formData: FormData) => {
    setError("");

    try {
      // Call the login function here
      const response = await loginUser(formData);

      if (response.success) {
        router.push("/home");
        setUser(response.userData);
      } else {
        setError(response.error);
      }
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form action={handleLogin} className="flex flex-col space-y-4">
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
