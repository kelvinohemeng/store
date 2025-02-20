"use client";

import { useProductStore, useUserData } from "@/store";
import React, { useEffect } from "react";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/lib/types";

import { redirect } from "next/navigation";

import { supabase } from "@/lib/utils/supabase";

const page = () => {
  const { products, setProducts, fetchProducts } = useProductStore();
  const { user: storeUser, setUser } = useUserData();

  const { data } = useQuery<Product[]>({
    queryKey: ["product-view"],
    queryFn: fetchProducts,
    initialData: products,
  });

  async function getUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
      redirect("/login");
    }
    setUser(data.user);
    return data.user;
  }

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  useEffect(() => {
    console.log({ user, storeUser });
  }, [user]);

  return (
    <div className="min-h-full flex">
      <div>
        <h1>This is your storefront, {storeUser?.email}</h1>
        {products.map((product, index) => (
          <ProductCard index={index} product={product} />
        ))}
      </div>
      <Cart />
    </div>
  );
};

export default page;
