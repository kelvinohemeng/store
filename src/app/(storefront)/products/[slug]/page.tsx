import { Product } from "@/lib/types";
import { supabase } from "@/lib/utils/supabase";
import { redirect } from "next/navigation";
import SizeVariantSelector from "../_components/SizeVariantSelector";
import AddToCartButton from "../_components/AddToCartButton";
import Link from "next/link";
import ProductSection from "../../home/_sections/ProductSection";
import Stack from "@/components/global-components/Stack";

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
    redirect("/404");
  }

  // const slugID = (await params).slug;

  return (
    <section className="pt-[84px] h-full">
      <Stack
        orientation="horizontal"
        gap="default"
        container="default"
        className="min-h-full"
      >
        {/* left side */}
        <div className="h-[calc(100vh-120px)] w-full flex-1 flex items-center sticky top-[84px] py-[84px]">
          <div className="space-y-4 ">
            <div className="flex items-center gap-3 w-full">
              <Link
                href={"/"}
                className="text-black/50 font-medium hover:font-semibold hover:text-black/100 transition-all duration-300"
              >
                Home
              </Link>{" "}
              / {}
              <Link
                href={"/products"}
                className="text-black/50 font-medium hover:font-semibold hover:text-black/100 transition-all duration-300"
              >
                Products
              </Link>{" "}
              / <p className="text-black/50 ">{product.product_name}</p>
            </div>

            <div className="space-y-2">
              <button className={`px-4 py-1 text-sm border rounded capitalize`}>
                {product.product_type}
              </button>
              <h3 className="font-semibold tracking-tighter">
                {product?.product_name}
              </h3>
            </div>
            <p>{product?.product_description}</p>
            <SizeVariantSelector product={product} />
            <AddToCartButton product={product} />
          </div>
        </div>

        {/* right side */}
        <div className="w-full flex-1">
          {product?.image_url.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className="max-h-[80vh] w-full object-cover object-top"
            />
          ))}
        </div>
      </Stack>
      <ProductSection title="Continue Shopping" />
    </section>
  );
}
