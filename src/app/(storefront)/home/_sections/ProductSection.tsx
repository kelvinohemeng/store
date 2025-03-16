import { Product } from "@/lib/types";
import ProductCard from "../components/ProductCard";

export default function ProductSection({ products }: { products: Product[] }) {
  return (
    <section className=" w-full min-h-screen py-[64px] px-5 space-y-6">
      <h4 className="">New Arrivals</h4>
      <div className=" grid grid-cols-3 gap-4">
        {products.map((product, index) => (
          <ProductCard index={index} product={product} />
        ))}
      </div>
    </section>
  );
}
