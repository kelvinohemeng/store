import Hero from "./_sections/Hero";
import ProductSection from "./_sections/ProductSection";
import ProductTypes from "./_sections/ProductTypes";
import { getProducts } from "@/actions/product";

// Fetched here, on the server, so the New Arrivals/Featured grids are
// present in the initial HTML instead of an empty flash of "Loading
// products…" until the client store catches up — see the `initialProducts`
// comment in ProductSection for how the two stay in sync.
export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <Hero />
      <ProductSection
        title="New Arrivals"
        variant="new"
        initialProducts={products}
      />
      <ProductTypes initialProducts={products} />
      <ProductSection
        title="Featured"
        variant="featured"
        initialProducts={products}
      />
    </>
  );
}
