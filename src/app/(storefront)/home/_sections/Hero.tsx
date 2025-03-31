import Stack from "@/components/global-components/Stack";
import { PrimaryBtn } from "../../_storeComponents/Buttons";

export default function Hero() {
  return (
    <section className="w-full h-screen pt-[62px]">
      <div className="relative bg-black/10 w-full h-full p-10">
        <img
          className="absolute inset-0 object-center object-cover w-full h-full"
          src="/assets/heroimg.jpg"
          alt=""
        />
        <Stack
          orientation="vertical"
          className="relative items-end gap-6 justify-start z-10"
          container="full-width"
        >
          <h1 className="text-white display-1">
            OMAN <br /> KWESI
          </h1>
          <PrimaryBtn link={`/products`}>Explore Products</PrimaryBtn>
        </Stack>
      </div>
    </section>
  );
}
