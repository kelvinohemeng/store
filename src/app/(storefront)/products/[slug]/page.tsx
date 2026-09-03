import { getProductById } from "@/actions/product";
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
  const product = await getProductById((await params).slug);

  if (!product) {
    redirect("/404");
  }

  return (
    <section className="pt-[84px] h-full">
      <Stack
        orientation="horizontal"
        gap="medium"
        container="default"
        className="min-h-full flex-col px-5 md:flex-row md:px-10 lg:px-16"
      >
        {/* left side */}
        <div className="h-full md:h-[calc(100vh-120px)] w-full flex-1 flex items-center md:sticky md:top-[84px] py-10 md:py-[84px]">
          <div className="w-full space-y-6">
            <div className="flex items-center gap-2 font-body text-sm">
              <Link
                href={"/home"}
                className="text-ink/50 hover:text-ink transition-colors duration-300"
              >
                Home
              </Link>
              <span className="text-ink/30">/</span>
              <Link
                href={"/products"}
                className="text-ink/50 hover:text-ink transition-colors duration-300"
              >
                Products
              </Link>
              <span className="text-ink/30">/</span>
              <p className="text-ink/50">{product.product_name}</p>
            </div>

            <div className="space-y-3">
              <span className="inline-block border border-ink/30 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wide text-ink/60">
                {product.product_type}
              </span>
              <h1 className="font-display uppercase tracking-tight text-e-9xl leading-[0.95] md:text-e-11xl">
                {product?.product_name}
              </h1>
            </div>

            <div className="flex items-center gap-3 font-body text-xl">
              <p className="font-semibold text-ink">
                GHC {product.product_price.toFixed(2)}
              </p>
              {!!product?.compare_price && product.compare_price > 0 && (
                <p className="line-through text-ink/40">
                  GHC {product.compare_price.toFixed(2)}
                </p>
              )}
            </div>

            <p className="font-body text-ink/70 max-w-md">
              {product?.product_description}
            </p>

            <div className="space-y-6 border-t border-ink/15 pt-6">
              <SizeVariantSelector product={product} />
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="w-full flex-1 space-y-1 pb-10 md:pb-0">
          {product?.image_url.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={product.product_name}
              className="max-h-[80vh] w-full bg-studio object-cover object-top"
            />
          ))}
        </div>
      </Stack>
      <ProductSection title="Continue Shopping" />
    </section>
  );
}
