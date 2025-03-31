"use client";

import { useProductStore } from "@/store";
import { QueryClient, useQuery } from "@tanstack/react-query";

export default function LoadProducts() {
  const { products, setProducts, fetchProducts } = useProductStore();

  const { data, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    initialData: products,
  });
  return null;
}
