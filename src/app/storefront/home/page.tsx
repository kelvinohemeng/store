"use client";

import { useProductStore } from "@/store";
import React, { useEffect } from "react";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";

const page = () => {
  const { products, setProducts, fetchProducts } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="min-h-full flex">
      <div>
        <h1>This is your store front, what user or customers see.</h1>
        {products.length &&
          products.map((product, index) => <ProductCard product={product} />)}
      </div>
      <Cart />
    </div>
  );
};

export default page;
