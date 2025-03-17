"use client";

import { PaystackProduct, Product } from "@/lib/types";
import { useCartStore, useSlide } from "@/store";
import { Plus } from "@phosphor-icons/react";
import Link from "next/link";

type ProdcutCardT = {
  product: Product;
  index: number | string;
};
const ProductCard = ({ product, index }: ProdcutCardT) => {
  const { addItem } = useCartStore();
  const { setState } = useSlide();

  const handleAddToCart = () => {
    addItem(product);
    setState("cart");
  };

  // const handleQuickAdd = () => {
  //   // Use default size (first in array) if available
  //   const defaultSize =
  //     product.sizes && product.sizes.length > 0 ? product.sizes[0] : undefined;

  //   addItem(product, { size: defaultSize });
  // };

  return (
    <div className="relative aspect-[3.2/4] ">
      <button
        onClick={handleAddToCart}
        className="z-10 group/cart  flex items-center gap-2 absolute top-2 right-2 "
      >
        <div className="relative flex items-center gap-3 w-[28px] h-[26px] overflow-hidden rounded-full bg-black/20 p-2 text-white text-sm transition-all duration-300  group-hover/cart:w-[110px]">
          <div className="aspect-square border bg-white grid place-items-center rounded-full">
            <Plus size={12} color="black" weight="bold" />
          </div>
          <span className="text-nowrap">Add to Cart</span>
        </div>
      </button>
      <Link href={`/products/${product.id}`} className="  w-full group/card">
        <div key={index} className="relative flex flex-col h-full">
          <img
            className="flex h-full object-cover"
            src={product.image_url[0]}
            alt={"product Image"}
          />
          <h6>{product.product_name}</h6>
          <div className="flex gap-2">
            <p>$ {((product.product_price * 100) / 100).toFixed(2)}</p>
            {product?.compare_price > 0 && (
              <p className=" line-through">
                {((product.compare_price * 100) / 100).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
