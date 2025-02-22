import { Product } from "@/lib/types";
import { supabase } from "@/lib/utils/supabase";
import { redirect } from "next/navigation";

export default async function ProductDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { data: product, error } = await supabase
    .from("Products")
    .select("*")
    .eq("id", (await params).slug)
    .single<Product>();

  if (error || !product) {
    redirect("/error");
  }

  // const slugID = (await params).slug;

  return (
    <div>
      <h1>Product Details Page {product?.product_name}</h1>
    </div>
  );
}
