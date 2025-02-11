import { Product } from "@/lib/types";
import Image from "next/image";
import React from "react";

const ProductCard = ({
  product,
  index,
}: {
  product: Product;
  index?: number;
}) => {
  const imageUrl = product.image_url?.[0];

  return (
    <div
      key={product.id}
      className="w-full max-w-[250px] p-4 border border-slate-300 bg-white rounded-xl flex flex-col gap-4 transition hover:translate-y-[-12px] cursor-pointer"
    >
      <div className=" max-w-[250px] aspect-square bg-red-400 overflow-hidden rounded-md">
        <Image
          src={imageUrl}
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-full object-cover rounded-md"
          alt={product.product_name}
        />
      </div>

      <div>
        <h2 className="text-2xl pb-3">{product.product_name}</h2>
        <p className=" line-clamp-3 text-[18px] mb-2 text-slate-700">
          {product.product_description}
        </p>
        <div className="flex flex-wrap gap-2">
          <div className="p-2 py-1 text-white bg-green-400 rounded-lg w-full max-w-[40px] grid place-items-center">
            <span>$ {product.product_price}</span>
          </div>
          <div className="p-2 py-1 border rounded-lg w-full max-w-[120px] border-slate-400 grid place-items-center">
            <p>In Stock: {product.stock}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
