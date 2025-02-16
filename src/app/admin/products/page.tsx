"use client";

import ProductDisplay from "@/app/admin/products/components/ProductDisplay";
import ProductDisplaySlide from "@/app/admin/products/components/ProductDIsplaySLide";
import CreateProductSlide from "@/app/admin/products/components/ProductSlide";
import { useProductStore, useSelectedState } from "@/store";
import { useEffect } from "react";

const Products = () => {
  const { products, fetchProducts } = useProductStore();
  const { selectedProduct } = useSelectedState();

  const getAllProducts = async () => {
    await fetchProducts();
  };

  useEffect(() => {
    getAllProducts();
  }, [products]);

  return (
    <div className=" p-5 h-full">
      <h1 className="text-4xl mb-6">All products</h1>
      <ProductDisplay products={products} />
      <CreateProductSlide />
      <ProductDisplaySlide product={selectedProduct} />
    </div>
  );
};

export default Products;
