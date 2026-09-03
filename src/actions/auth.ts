"use server";

import { getAuth } from "@/lib/auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { StoreUser } from "@/store";
import { isDemoEmail } from "@/lib/demo";

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
    isDemo: isDemoEmail(user.email),
  };
}

// Guard for admin server actions that write data (create/update/delete
// product, change order status, ...). Call at the top of the action and
// bail out on `true` — keeps the public demo account (see src/lib/demo.ts)
// browsable but read-only, even if someone bypasses the disabled buttons
// and calls the action directly.
export async function isCurrentUserDemo(): Promise<boolean> {
  // `headers()` must be awaited *before* getAuth() runs — getAuth() reaches
  // getCloudflareContext() synchronously, and that call is only valid once
  // Next has already registered this request as dynamic. Awaiting headers()
  // first, into its own variable, guarantees that ordering (see the same
  // fix applied throughout this file).
  const requestHeaders = await headers();
  const session = await getAuth().api.getSession({ headers: requestHeaders });
  return isDemoEmail(session?.user?.email);
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
    const requestHeaders = await headers();
    await getAuth().api.signOut({ headers: requestHeaders });
    return { success: true };
  } catch (error) {
    return { success: false, error: errorMessage(error, "Logout failed") };
  }
};

// Function to check if a user is authenticated
export const checkUserAuth = async () => {
  const requestHeaders = await headers();
  const session = await getAuth().api.getSession({ headers: requestHeaders });
  return session?.user ?? null;
};

// Server-side session lookup shaped for the client's zustand store. Used to
// seed Navigation/UserProfile/etc. with the real logged-in user on first
// render, instead of leaving them to assume "logged out" until the client's
// async useSession() fetch resolves.
export const getCurrentStoreUser = async (): Promise<StoreUser | null> => {
  const requestHeaders = await headers();
  const session = await getAuth().api.getSession({ headers: requestHeaders });
  return session?.user ? toStoreUser(session.user) : null;
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

  const requestHeaders = await headers();
  const session = await getAuth().api.getSession({ headers: requestHeaders });

  if (session?.user.role !== "admin") {
    redirect("/unauthorized");
  }
  redirect("/admin/dashboard");
};

// check if admin is authenticated
export async function checkAdminAuth() {
  const requestHeaders = await headers();
  const session = await getAuth().api.getSession({ headers: requestHeaders });

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
