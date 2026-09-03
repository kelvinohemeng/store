"use client";

import { useProductStore } from "@/store";
import { useQuery } from "@tanstack/react-query";

export default function LoadProducts() {
  const { products, fetchProducts } = useProductStore();

  useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    initialData: products,
    // `products` starts as `[]` in the Zustand store — that's not real
    // fetched data, so mark it stale from the epoch. Otherwise, with the
    // client's non-zero default staleTime, React Query treats the empty
    // array as fresh and never fetches the real product list.
    initialDataUpdatedAt: 0,
  });
  return null;
}
