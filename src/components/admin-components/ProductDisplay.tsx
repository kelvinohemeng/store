import { Product } from "@/lib/types";
import Image from "next/image";
import { useEffect } from "react";
import ProductCard from "./ProductCard";

export default function ProductDisplay({ products }: { products: Product[] }) {
  useEffect(() => {
    console.log(products);
  }, []);
  return (
    <>
      {products.map((product, index) => {
        // add a fallback image incase image does not exist
        return <ProductCard index={index} product={product} />;
      })}
    </>
  );
}
