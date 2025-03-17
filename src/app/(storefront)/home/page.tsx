import Hero from "./_sections/Hero";
import ProductSection from "./_sections/ProductSection";
import ProductTypes from "./_sections/ProductTypes";

export default function HomePage() {
  return (
    // <div className="min-h-full flex flex-col bg-black/10">
    //   <h3>This is your storefront, {storeUser?.email}</h3>

    // </div>
    <>
      <Hero />
      <ProductSection />
      <ProductTypes />
      <ProductSection />
    </>
  );
}
