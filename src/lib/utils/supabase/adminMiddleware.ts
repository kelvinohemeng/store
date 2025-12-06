import { type SupabaseClient, type User } from "@supabase/supabase-js";

export async function verifyAdmin(supabase: SupabaseClient, user: User | null) {
  // If no user is logged in, they cannot be an admin.
  if (!user) {
    return { adminUser: null };
  }

  // Fetch user role from the database using the existing client
  const { data: userData, error } = await supabase
    .from("user_profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error) {
    console.error("Error fetching admin role:", error);
    return { adminUser: null };
  }

  return { adminUser: userData };
}
