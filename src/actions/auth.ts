"use server";

// import { supabase } from "@/lib/utils/supabase";
import { createSupabaseSSRClient } from "@/lib/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Function to log in a user
export const loginUser = async (formData: FormData) => {
  const supabaseSSR = await createSupabaseSSRClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: loggedInUser, error } =
    await supabaseSSR.auth.signInWithPassword(data);

  if (error) {
    return { success: false, error: error.message };
  }
  revalidatePath("/s/home", "page");
  return { success: true, loggedInUser, error: null };
};

// Function to log out a user
export const logoutUser = async () => {
  const supabaseSSR = await createSupabaseSSRClient();

  const { error } = await supabaseSSR.auth.signOut();

  if (error) {
    return { success: false, error: error.message };
  } else {
    revalidatePath("/s/home", "page");
    redirect("/s/home");
    // return { success: true, error: null };
  }
};

// Function to check if a user is authenticated
export const checkUserAuth = async () => {
  const supabaseSSR = await createSupabaseSSRClient();

  const {
    data: { user },
    error,
  } = await supabaseSSR.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return user;
};

// Function to log in admin
export const loginAdmin = async (formData: FormData) => {
  const supabaseSSR = await createSupabaseSSRClient();

  const loginData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const {
    data: { user },
    error,
  } = await supabaseSSR.auth.signInWithPassword(loginData);

  if (error) {
    throw new Error(error.message);
  }

  // // Check if the user is the admin (you can implement your own logic here)
  // if (user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
  //   throw new Error("Unauthorized access");
  // }

  // Fetch the user's role
  const { data: userData, error: roleError } = await supabaseSSR
    .from("users")
    .select("role")
    .eq("id", user?.id)
    .single();

  if (roleError || !userData || userData.role !== "admin") {
    return { success: false, error: "Unauthorized access" };
  }

  return { success: true, user, error: null };
};

//check if admin is authenticated
export async function checkAdminAuth() {
  const supabase = await createSupabaseSSRClient();

  // Get the current authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { isAuthenticated: false, isAdmin: false };
  }

  // Fetch the user role from Supabase
  const { data: userData, error } = await supabase
    .from("user_profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || !userData || userData.role !== "admin") {
    return { isAuthenticated: true, isAdmin: false };
  }

  return { isAuthenticated: true, isAdmin: true };
}

// Function to sign up a user
export const signupUser = async (formData: FormData) => {
  const supabaseSSR = await createSupabaseSSRClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const {
    data: { user },
    error,
  } = await supabaseSSR.auth.signUp(data);

  if (error) {
    throw new Error(error.message);
  }

  // if (user) {
  //   // Manually insert user into the `users` table with a default role
  //   const { error: insertError } = await supabase.from("users").insert([
  //     {
  //       id: user.id, // Matches auth.users.id
  //       email: user.email,
  //       role: "user", // Default role, can be changed later
  //     },
  //   ]);

  //   if (insertError) {
  //     throw new Error(insertError.message);
  //   }
  // }

  revalidatePath("/s/orders", "page");
  redirect("/s/orders");
};

// Function to log in with OAuth providers
export const loginWithOAuth = async (provider: "google" | "github") => {
  const supabaseSSR = await createSupabaseSSRClient();

  const { data, error } = await supabaseSSR.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/callback`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data.url; // Redirect user to this URL for OAuth login
};
