import { Product } from "@/lib/types";
import ProductCard from "../components/ProductCard";

export default function ProductTypes({ products }: { products: Product[] }) {
  if (!products) {
    return null; // or return a loading state
  }

  // Group products by their type
  const productTypes = {
    dresses: products.filter((product) => product.product_type === "dress"),
    shoes: products.filter((product) => product.product_type === "shoe"),
    glasses: products.filter((product) => product.product_type === "glasses"),
  };

  return (
    <section className=" gap-8 px-5 my-[64px] h-auto">
      <div className="relative grid grid-cols-2 gap-4 py-[64px] h-screen">
        {Object.entries(productTypes).map(
          ([type, items]) =>
            items.length > 0 && (
              <div key={type} className={`relative min-h-full w-full ${""}`}>
                <h2 className="absolute top-[24px] left-[24px] text-white text-2xl font-semibold capitalize p-5">
                  {type}
                </h2>
                <img
                  className="w-full h-full object-cover object-center"
                  src={items[0].image_url[0]}
                  alt=""
                />
              </div>
            )
        )}
      </div>
    </section>
  );
}
