"use client";
import { useProductStore } from "@/store";
import ProductCard from "../home/components/ProductCard";
import { useEffect, useState } from "react";
import Stack from "@/components/global-components/Stack";
import { Product } from "@/lib/types";
import { AnimatePresence, motion } from "motion/react";

export default function ProductPage() {
  const { products, fetchProducts } = useProductStore();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      if (products.length === 0) {
        await fetchProducts();
      }
      setIsLoading(false);
    };

    loadProducts();
  }, [fetchProducts, products.length]);

  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.product_type.toLowerCase() === activeFilter.toLowerCase()
        )
      );
    }
  }, [products, activeFilter]);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  const filterButtons = ["All", "Dress", "Tradition", "Shoes", "Glasses"];

  return (
    <Stack
      orientation="vertical"
      gap="large"
      container="full-width"
      className="pt-[120px] px-5 md:px-10"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <h2 className="text-2xl md:text-4xl tracking-tighter font-semibold">
          All Products
        </h2>
        <div className="flex flex-wrap gap-3 h-auto items-center">
          {filterButtons.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`px-3 py-1 border rounded-md text-sm md:text-base cursor-pointer transition-all
                ${
                  activeFilter === filter
                    ? "bg-black text-white border-black"
                    : "hover:bg-black/5"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="w-full py-20 text-center">
          <p className="text-xl">Loading products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="w-full py-20 text-center">
          <p className="text-xl">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                layout
                key={product.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.1, 0.25, 1.0],
                  delay: index * 0.05,
                }}
                className=""
              >
                <ProductCard index={index} product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </Stack>
  );
}
