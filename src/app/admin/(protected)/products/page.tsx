"use client";

import CreateProductSlide from "@/app/admin/(protected)/products/components/ProductSlide";

import { DataTable } from "./components/DataTable";
import { columns } from "./components/Column";
import { Product } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { useProductStore, useSelectedState } from "@/store";
import ProductDisplaySlide from "./components/ProductDIsplaySLide";
import CreateButton from "./components/CreateButton";
import PageHeader from "@/app/admin/_admin-components/PageHeader";

export default function Products() {
  const { fetchProducts } = useProductStore();
  const { selectedProduct } = useSelectedState();

  const { data: products } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => await fetchProducts(),
  });

  return (
    <div className="h-full">
      <PageHeader
        eyebrow="Catalog"
        title="Products"
        actions={<CreateButton action="create" text="Add new product" />}
      />
      <DataTable columns={columns} data={products} />
      <CreateProductSlide />
      <ProductDisplaySlide product={selectedProduct} />
    </div>
  );
}
