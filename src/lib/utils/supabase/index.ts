import { createBrowserClient } from "@supabase/ssr";
// import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseKey);
}

export const supabase = createClient();

export const fetchProducts = async () => {
  try {
    const { data, error } = await supabase.from("Products").select("*");

    if (error) {
      console.error("Error fetching products:", error.message);
      throw new Error("Failed to fetch products");
    }
    return data || [];
  } catch (err: any) {
    console.error("Error fetching products:", err.message);
    throw err;
  }
};
