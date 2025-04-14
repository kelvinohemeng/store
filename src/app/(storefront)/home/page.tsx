import dynamic from "next/dynamic";
import Hero from "./_sections/Hero";
import ProductSection from "./_sections/ProductSection";
import ProductTypes from "./_sections/ProductTypes";
import Loader from "../_storeComponents/PreLoader";

export default function HomePage() {
  return (
    <>
      <Loader />
      <Hero />
      <ProductSection title="New Arrivals" />
      <ProductTypes />
      <ProductSection />
    </>
  );
}
