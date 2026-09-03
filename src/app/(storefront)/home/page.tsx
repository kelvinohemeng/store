import Hero from "./_sections/Hero";
import ProductSection from "./_sections/ProductSection";
import ProductTypes from "./_sections/ProductTypes";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProductSection title="New Arrivals" />
      <ProductTypes />
      <ProductSection />
    </>
  );
}
