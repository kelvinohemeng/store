"use client";

import ProductDisplay from "@/app/admin/products/components/archieves/ProductDisplay";
import ProductDisplaySlide from "@/app/admin/products/components/ProductDIsplaySLide";
import CreateProductSlide from "@/app/admin/products/components/ProductSlide";

import { DataTable } from "./components/DataTable";
import { columns } from "./components/Column";
import { Product } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/utils/supabase";

export default function Products() {
  // const { products, fetchProducts } = useProductStore();
  // const { selectedProduct } = useSelectedState();

  // const getAllProducts = async () => {
  //   await fetchProducts();
  // };

  // useEffect(() => {
  //   getAllProducts();
  // }, [products]);
  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => await fetchProducts(),
  });

  return (
    <div className=" p-5 h-full">
      <h1 className="text-4xl mb-6">All products</h1>
      {/* <ProductDisplay products={products} /> */}
      <DataTable columns={columns} data={product} />
      <CreateProductSlide />
      {/* <ProductDisplaySlide product={selectedProduct} /> */}
    </div>
  );
}
