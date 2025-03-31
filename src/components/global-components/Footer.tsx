import Link from "next/link";
import Stack from "./Stack";

export default function Footer() {
  return (
    <Stack
      orientation="vertical"
      container="full-width"
      className=" h-auto p-5 pb-[44px] bg-black/90 text-white"
    >
      <Stack orientation="vertical" gap="large">
        <h3 className=" capitalize tracking-tighter font-bold">
          Wear it proud
        </h3>
        <Stack
          orientation="horizontal"
          className="w-full justify-between items-start"
        >
          <div className="flex gap-6 items-center text-white/50">
            <div className="flex flex-col gap-2">
              <Link href={`/`}>
                <span>Contact</span>
              </Link>
              <Link href={`/`}>
                <span>Stores</span>
              </Link>
              <Link href={`/`}>
                <span>Categories</span>
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <Link href={`/`}>
                <span>Contact</span>
              </Link>
              <Link href={`/`}>
                <span>Stores</span>
              </Link>
              <Link href={`/`}>
                <span>Categories</span>
              </Link>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <Link href={`https://instagram.com`}>
              <span>Instagram</span>
            </Link>
            <Link href={`/`}>
              <span>Facebook</span>
            </Link>
            <Link href={`/`}>
              <span>Pinterest</span>
            </Link>
          </div>
        </Stack>
        <p className=" text-xl">Copyright © 2023</p>
      </Stack>
    </Stack>
  );
}
