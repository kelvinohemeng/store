"use client";

import { Product } from "@/lib/types";
import { useCartStore, useSlide } from "@/store";
import { Plus } from "@phosphor-icons/react";
import Link from "next/link";

type ProdutCardT = {
  product: Product;
  index?: number | string;
};
const ProductCard = ({ product, index }: ProdutCardT) => {
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
        className="z-10 cursor-pointer group/cart absolute top-2 right-2 flex items-center gap-2"
      >
        <div className="relative flex items-center gap-3 w-[28px] h-[26px] overflow-hidden bg-ink/70 p-2 font-sans text-xs text-paper transition-all duration-300 group-hover/cart:w-[110px]">
          <div className="aspect-square border border-ink bg-paper grid place-items-center">
            <Plus size={16} color="black" weight="bold" />
          </div>
          <span className="whitespace-nowrap uppercase tracking-wide">
            Quick Add
          </span>
        </div>
      </button>

      {/* Product Content */}
      <Link
        href={`/products/${product.id}`}
        className="group/card flex flex-col gap-4 h-full"
      >
        {/* Product Image */}
        <div className="relative w-full h-full overflow-hidden bg-studio">
          <img
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity group-hover/card:opacity-100"
            src={product.image_url[1]}
            alt=""
          />
          <img
            className="w-full h-full object-cover"
            src={product.image_url[0]}
            alt={product.product_name}
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col gap-1">
          <h4 className="font-sans font-semibold text-lg text-ink">
            {product.product_name}
          </h4>
          <div className="flex items-center gap-2 font-body">
            <p className="font-medium text-ink">
              GHC {product.product_price.toFixed(2)}
            </p>
            {!!product?.compare_price && product.compare_price > 0 && (
              <p className="line-through text-ink/40">
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
