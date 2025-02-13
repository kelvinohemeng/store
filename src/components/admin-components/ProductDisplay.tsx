import { Product } from "@/lib/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

import { motion, AnimatePresence } from "motion/react";
import { useProductStore, useSelectedState } from "@/store";
import CreateButton from "./CreateButton";

export default function ProductDisplay({ products }: { products: Product[] }) {
  const { setSelectedProduct } = useSelectedState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(products);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Wait for 2 seconds before deciding if there are no products

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="grid grid-cols-4 gap-5 h-full justify-start">
      {isLoading ? (
        Array(4)
          .fill(0)
          .map((_, index) => (
            <div key={`skeleton_${index}`}>
              <ProductCard key={index} isLoading />
            </div>
          ))
      ) : products.length === 0 ? (
        <div className=" col-span-full h-full flex flex-col items-center justify-center gap-3">
          <p className="col-span-4 text-center text-gray-500">
            You have no products, please create a new product
          </p>
          <CreateButton action="create" text="Add new products" />
        </div>
      ) : (
        products.map((product, index) => (
          <AnimatePresence>
            {product.quantity > 0 ? (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProduct(product)} // Store product on click
              >
                <ProductCard key={product.id} product={product} />
              </motion.div>
            ) : (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProduct(product)} // Store product on click
              >
                <ProductCard key={product.id} product={product} outOfStock />
              </motion.div>
            )}
          </AnimatePresence>
        ))
      )}
    </div>
  );
}
