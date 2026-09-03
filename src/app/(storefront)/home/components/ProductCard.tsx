"use client";

import { Product } from "@/lib/types";
import { useCartStore, useSlide } from "@/store";
import { PlusIcon } from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";

type ProductCardT = {
  product: Product;
  index?: number | string;
};
const ProductCard = ({ product }: ProductCardT) => {
  const { addItem } = useCartStore();
  const { setState } = useSlide();

  const handleAddToCart = () => {
    addItem(product);
    setState("cart");
  };

  return (
    <div className="relative flex flex-col w-full h-full aspect-[2/2.85]">
      <div className="absolute z-10 bg-paper px-2 py-1 ml-2 mt-2 font-sans text-xs font-semibold uppercase tracking-wide text-ink">
        {product.product_type}
      </div>
      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        aria-label={`Add ${product.product_name} to cart`}
        className="z-10 cursor-pointer group/cart absolute top-2 right-2 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
      >
        <div className="relative flex items-center gap-3 w-7 h-7 overflow-hidden bg-ink/70 px-1.5 font-sans text-xs text-paper transition-all duration-300 group-hover/cart:w-27.5">
          <div className="aspect-square border border-ink bg-paper grid place-items-center">
            <PlusIcon size={16} color="black" weight="bold" />
          </div>
          <span className="whitespace-nowrap uppercase tracking-wide">
            Quick Add
          </span>
        </div>
      </button>

      {/* Product Content */}
      <Link
        href={`/products/${product.id}`}
        className="group/card flex flex-col gap-2 h-full"
      >
        {/* Product Image */}
        <div className="relative w-full h-full overflow-hidden bg-studio">
          {product.image_url[1] && (
            <Image
              className="object-cover opacity-0 transition-opacity group-hover/card:opacity-100"
              src={product.image_url[1]}
              alt=""
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            />
          )}
          <Image
            className="object-cover"
            src={product.image_url[0]}
            alt={product.product_name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col">
          <h4 className="font-sans font-semibold text-lg text-ink tracking-tight">
            {product.product_name}
          </h4>
          <div className="flex items-center gap-2 font-body">
            <p className="text-sm font-medium text-ink">
              GHC {product.product_price.toFixed(2)}
            </p>
            {!!product?.compare_price && product.compare_price > 0 && (
              <p className="line-through text-sm  text-ink/50">
                GHC {product.compare_price.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
