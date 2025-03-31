"use client";

import CreateProductSlide from "@/app/admin/products/components/ProductSlide";

import { DataTable } from "./components/DataTable";
import { columns } from "./components/Column";
import { Product } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/utils/supabase";
import { useEffect } from "react";
import { useProductStore, useSelectedState } from "@/store";
import ProductDisplaySlide from "./components/ProductDIsplaySLide";
import CreateButton from "./components/CreateButton";

export default function Products() {
  const { fetchProducts } = useProductStore();
  const { selectedProduct } = useSelectedState();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => await fetchProducts(),
  });

  return (
    <div className=" p-5 h-full">
      <div className="flex justify-between">
        <h1 className="text-4xl mb-6">All products</h1>
        <CreateButton action="create" text="Add new products" />
      </div>
      {/* <ProductDisplay products={products} /> */}
      <DataTable columns={columns} data={products} />
      <CreateProductSlide />
      <ProductDisplaySlide product={selectedProduct} />
    </div>
  );
}
