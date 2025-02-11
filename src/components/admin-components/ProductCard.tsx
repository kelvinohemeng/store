import { Product } from "@/lib/types";
import Image from "next/image";
import React from "react";

const ProductCard = ({
  product,
  index,
}: {
  product: Product;
  index: number;
}) => {
  const imageUrl = product.image_url?.[0];

  return (
    <div
      key={index}
      className="w-full max-w-[250px] p-4 border border-slate-200 bg-white rounded-xl flex flex-col gap-4"
    >
      <div className="max-w-[250px] aspect-square">
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
        <p className=" line-clamp-3">{product.product_description}</p>
        <p>Price: {product.product_price}</p>
        <p>In Stock: {product.stock}</p>
      </div>
    </div>
  );
};

export default ProductCard;
