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
          className="relative items-end h-full justify-between gap-6 z-10"
          container="default"
        >
          <div>
            <h1 className="display-1">
              OMAN <br /> KWESI
            </h1>
            <PrimaryBtn link={`/products`}>Explore Products</PrimaryBtn>
          </div>
          <div className=" w-full">
            <p className="text-white max-w-2xl">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nesciunt
              placeat veritatis officiis hic voluptatem quo voluptate, velit in!
              Quod sed blanditiis optio. Beatae id facilis culpa fugiat
              veritatis fugit eligendi?
            </p>
          </div>
        </Stack>
      </div>
    </section>
  );
}
