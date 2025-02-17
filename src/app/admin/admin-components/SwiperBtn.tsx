import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import SwiperInstance from "swiper";

export interface SwiperButtonProps {
  swiperRef: React.RefObject<SwiperInstance | null>; // Define the type for swiperRef
}

export const NextButton = ({ swiperRef }: SwiperButtonProps) => {
  return (
    <div
      onClick={() => swiperRef.current?.slideNext()}
      className=" cursor-pointer bg-white border text-black py-2 px-4 flex items-center justify-center aspect-square rounded-full transition"
    >
      <ArrowRight width={20} height={20} weight="bold" />
    </div>
  );
};

export const PrevButton = ({ swiperRef }: SwiperButtonProps) => {
  return (
    <div
      onClick={() => swiperRef.current?.slidePrev()}
      className=" cursor-pointer bg-white border text-black py-2 px-4 flex items-center justify-center aspect-square rounded-full transition"
    >
      <ArrowLeft width={20} height={20} weight="bold" />
    </div>
  );
};
