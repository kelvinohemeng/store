import { PrimaryBtn } from "../_storeComponents/Buttons";
import Stack from "@/components/global-components/Stack";
import Image from "next/image";

export const metadata = {
  title: "About — Oman Kwesi",
  description:
    "Oman Kwesi is a Ghana-based fashion store — dresses, traditional wear, shoes and glasses, chosen piece by piece.",
};

export default function AboutPage() {
  return (
    <div className="pt-nav-flush">
      {/* Split intro */}
      <section className="w-full">
        <Stack
          orientation="horizontal"
          container="full-width"
          className="min-h-[80vh] flex-col md:flex-row"
        >
          <div className="relative w-full flex-1 bg-studio h-[50vh] md:h-[80vh]">
            <Image
              src="/assets/heroimg.jpg"
              alt="Oman Kwesi"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="flex w-full flex-1 flex-col justify-center gap-6 px-5 py-16 md:px-16">
            <p className="eyebrow">Meet Oman Kwesi</p>
            <h1 className="font-display uppercase tracking-tight text-e-9xl leading-[0.95] md:text-e-12xl">
              Dressed with intent, not impulse.
            </h1>
            <p className="font-body text-ink/70 max-w-md text-lg">
              Oman Kwesi started as a small edit of dresses, traditional
              wear, shoes and glasses for people who don't want to look like
              everyone else. Every piece is picked for how it wears in
              real life, not just how it photographs.
            </p>
            <PrimaryBtn link="/products" className="w-fit">
              Shop the edit
            </PrimaryBtn>
          </div>
        </Stack>
      </section>

      {/* Values / how we work */}
      <section className="w-full bg-ink text-paper py-24 px-5 md:py-32 md:px-10 lg:px-16">
        <Stack orientation="vertical" gap="large" container="default">
          <p className="eyebrow text-paper/60">How we work</p>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-14">
            <div className="space-y-4 border-t border-paper/20 pt-8">
              <h3 className="font-sans text-e-6xl font-semibold tracking-tight">
                01. Curated, not stocked
              </h3>
              <p className="font-body text-paper/70 max-w-xs">
                We select in small batches — dresses, tradition, shoes,
                glasses — rather than chasing every trend at once.
              </p>
            </div>
            <div className="space-y-4 border-t border-paper/20 pt-8">
              <h3 className="font-sans text-e-6xl font-semibold tracking-tight">
                02. Made for GHC checkout
              </h3>
              <p className="font-body text-paper/70 max-w-xs">
                Prices in GHC, checkout through Paystack — built for the
                West African market from day one.
              </p>
            </div>
            <div className="space-y-4 border-t border-paper/20 pt-8">
              <h3 className="font-sans text-e-6xl font-semibold tracking-tight">
                03. Real sizing, real photos
              </h3>
              <p className="font-body text-paper/70 max-w-xs">
                No stock imagery. What you see on the product page is what
                ships to your door.
              </p>
            </div>
          </div>
        </Stack>
      </section>

      {/* Closing statement */}
      <section className="w-full py-24 px-5 md:py-32 md:px-10 lg:px-16">
        <Stack orientation="vertical" container="default" className="items-center text-center">
          <p className="eyebrow">Our promise</p>
          <p className="font-display uppercase tracking-tight text-e-8xl leading-[0.95] md:text-e-11xl max-w-4xl">
            Fewer pieces. Better ones.
          </p>
          <PrimaryBtn link="/products" className="mt-4">
            Explore Products
          </PrimaryBtn>
        </Stack>
      </section>
    </div>
  );
}
