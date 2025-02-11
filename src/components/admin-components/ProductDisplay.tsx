import { Product } from "@/lib/types";
import Image from "next/image";
import { useEffect } from "react";
import ProductCard from "./ProductCard";

import { motion, AnimatePresence } from "motion/react";
import { supabase } from "@/lib/utils/supabase";

export default function ProductDisplay({ products }: { products: Product[] }) {
  useEffect(() => {
    console.log(products);
  }, []);
  return (
    <div className="flex flex-wrap gap-5 justify-start">
      <AnimatePresence>
        {products.map((product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
