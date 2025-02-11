"use client";

import ProductDisplay from "@/components/admin-components/ProductDisplay";
import CreateProductSlide from "@/components/admin-components/ProductSlide";
import { useProductStore } from "@/store";
import { useEffect } from "react";

const Products = () => {
  const { products, fetchProducts } = useProductStore();
  const getAllProducts = async () => {
    await fetchProducts();
  };

  useEffect(() => {
    getAllProducts();
  }, [products]);

  return (
    <div className=" p-5 h-full overflow-x-hidden overflow-y-scroll">
      <h1 className="text-4xl mb-6">All products</h1>
      <ProductDisplay products={products} />
      <CreateProductSlide />
    </div>
  );
};

export default Products;
