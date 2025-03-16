"use client";

import { useProductStore, useUserData } from "@/store";
import React, { useEffect } from "react";
import ProductCard from "./components/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/lib/types";

import { redirect } from "next/navigation";

import { supabase } from "@/lib/utils/supabase";
import Hero from "./_sections/Hero";
import ProductSection from "./_sections/ProductSection";
import ProductTypes from "./_sections/ProductTypes";

const page = () => {
  const { products, setProducts, fetchProducts } = useProductStore();
  const { user: storeUser } = useUserData();

  const { data } = useQuery<Product[]>({
    queryKey: ["product-view"],
    queryFn: fetchProducts,
    initialData: products,
  });

  return (
    // <div className="min-h-full flex flex-col bg-black/10">
    //   <h3>This is your storefront, {storeUser?.email}</h3>

    // </div>
    <>
      <Hero />
      <ProductSection products={products} />
      <ProductTypes products={products} />
      <ProductSection products={products} />
    </>
  );
};

export default page;
