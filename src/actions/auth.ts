"use server";

import { getAuth } from "@/lib/auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { StoreUser } from "@/store";

function errorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

function toStoreUser(user: {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  role?: string | null;
}): StoreUser {
  return {
    id: user.id,
    email: user.email,
    display_name: user.name,
    role: user.role ?? "user",
    created_at: user.createdAt.toISOString(),
  };
}

// Function to log in a user
export const loginUser = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const result = await getAuth().api.signInEmail({ body: { email, password } });
    if (!result.user) {
      return { success: false, error: "Login failed" };
    }
    return { success: true, userData: toStoreUser(result.user), error: null };
  } catch (error) {
    return { success: false, error: errorMessage(error, "Login failed") };
  }
};

// Function to log out a user
export const logoutUser = async () => {
  try {
    await getAuth().api.signOut({ headers: await headers() });
    return { success: true };
  } catch (error) {
    return { success: false, error: errorMessage(error, "Logout failed") };
  }
};

// Function to check if a user is authenticated
export const checkUserAuth = async () => {
  const session = await getAuth().api.getSession({ headers: await headers() });
  return session?.user ?? null;
};

// Function to log in admin
export const loginAdmin = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await getAuth().api.signInEmail({ body: { email, password } });
  } catch (error) {
    throw new Error(errorMessage(error, "Login failed"));
  }

  const session = await getAuth().api.getSession({ headers: await headers() });

  if (session?.user.role !== "admin") {
    redirect("/unauthorized");
  }
  redirect("/admin/dashboard");
};

// check if admin is authenticated
export async function checkAdminAuth() {
  const session = await getAuth().api.getSession({ headers: await headers() });

  if (!session) {
    return { isAuthenticated: false, isAdmin: false };
  }

  return { isAuthenticated: true, isAdmin: session.user.role === "admin" };
}

// Function to sign up a user
export const signupUser = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const result = await getAuth().api.signUpEmail({
      body: { email, password, name: email.split("@")[0] },
    });
    if (!result.user) {
      return { success: false, error: "Signup failed" };
    }
    return { success: true, userData: toStoreUser(result.user), error: null };
  } catch (error) {
    return { success: false, error: errorMessage(error, "Signup failed") };
  }
};
