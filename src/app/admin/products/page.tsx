"use client";

import ProductDisplay from "@/components/admin-components/ProductDisplay";
import ProductDisplaySlide from "@/components/admin-components/ProductDIsplaySLide";
import CreateProductSlide from "@/components/admin-components/ProductSlide";
import UpdateProductSlide from "@/components/admin-components/UpdateProductSlide";
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
