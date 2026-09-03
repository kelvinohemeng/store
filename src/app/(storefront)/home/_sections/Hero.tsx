import Stack from "@/components/global-components/Stack";
import { PrimaryBtn } from "../../_storeComponents/Buttons";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full h-screen pt-nav-flush">
      <div className="relative bg-ink/10 w-full h-full p-6 md:p-10">
        <Image
          className="object-center object-cover"
          src="/assets/heroimg.jpg"
          alt="Oman Kwesi — dresses, traditional wear, shoes and glasses"
          fill
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <Stack
          orientation="vertical"
          className="relative items-start h-full justify-between gap-6 z-10"
          container="default"
        >
          <div>
            <h1 className="display-1">
              WORN <br /> WITH <br /> INTENT
            </h1>
            <PrimaryBtn link={`/products`} className="mt-6">
              Explore Products
            </PrimaryBtn>
          </div>
          <div className="w-full">
            <p className="text-white max-w-xl font-body">
              Dresses, traditional wear, shoes and glasses — chosen for people
              who dress like it matters. New pieces every week, shipped across
              Ghana and beyond.
            </p>
          </div>
        </Stack>
      </div>
    </section>
  );
}
