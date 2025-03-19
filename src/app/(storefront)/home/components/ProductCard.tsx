"use client";

import { PaystackProduct, Product } from "@/lib/types";
import { useCartStore, useSlide } from "@/store";
import { Plus } from "@phosphor-icons/react";
import Link from "next/link";

type ProdutCardT = {
  product: Product;
  index: number | string;
};
const ProductCard = ({ product, index }: ProdutCardT) => {
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
    <div className="relative flex flex-col h-full">
      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className="z-10 group/cart absolute top-2 right-2 flex items-center gap-2"
      >
        <div className="relative flex items-center gap-3 w-[28px] h-[26px] overflow-hidden rounded-full bg-black/20 p-2 text-white text-sm transition-all duration-300 group-hover/cart:w-[110px]">
          <div className="aspect-square border bg-white grid place-items-center rounded-full">
            <Plus size={12} color="black" weight="bold" />
          </div>
          <span className="whitespace-nowrap">Add to Cart</span>
        </div>
      </button>

      {/* Product Content */}
      <Link
        href={`/products/${product.id}`}
        className="group/card flex flex-col h-full"
      >
        {/* Product Image */}
        <div className="relative w-full h-full overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={product.image_url[0]}
            alt="Product Image"
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col gap-2 p-2">
          <h6 className="font-semibold text-lg">{product.product_name}</h6>
          <div className="flex items-center gap-2">
            <p className="font-medium">$ {product.product_price.toFixed(2)}</p>
            {product?.compare_price > 0 && (
              <p className="line-through text-gray-500">
                $ {product.compare_price.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
