import Link from "next/link";
import Stack from "./Stack";

export default function Footer() {
  return (
    <footer className="w-full bg-ink text-paper">
      <Stack orientation="vertical" gap="large" container="default" className="py-16">
        <Stack
          orientation="horizontal"
          className="w-full flex-col items-start justify-between gap-10 md:flex-row"
        >
          <div className="max-w-sm space-y-4">
            <p className="eyebrow text-paper/60">Join the list</p>
            <p className="font-body text-paper/70">
              New drops, restocks and the occasional discount — straight to
              your inbox.
            </p>
            <form className="flex max-w-sm border-b border-paper/30 pb-2">
              <input
                type="email"
                required
                placeholder="Email address"
                className="w-full bg-transparent font-body text-sm text-paper placeholder:text-paper/40 outline-none"
              />
              <button
                type="submit"
                className="font-sans text-xs font-semibold uppercase tracking-wide text-paper/80 hover:text-paper"
              >
                Sign up
              </button>
            </form>
          </div>

          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <p className="font-sans text-xs font-semibold uppercase tracking-wide text-paper/40">
                Shop
              </p>
              <Link href={"/products"} className="font-body text-paper/80 hover:text-paper">
                All Products
              </Link>
              <Link href={"/about"} className="font-body text-paper/80 hover:text-paper">
                About
              </Link>
              <Link href={"/orders"} className="font-body text-paper/80 hover:text-paper">
                Track Order
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-sans text-xs font-semibold uppercase tracking-wide text-paper/40">
                Follow
              </p>
              <Link href={"https://instagram.com"} className="font-body text-paper/80 hover:text-paper">
                Instagram
              </Link>
              <Link href={"/"} className="font-body text-paper/80 hover:text-paper">
                Facebook
              </Link>
              <Link href={"/"} className="font-body text-paper/80 hover:text-paper">
                TikTok
              </Link>
            </div>
          </div>
        </Stack>

        <div className="flex w-full flex-col items-start justify-between gap-6 border-t border-paper/15 pt-8 md:flex-row md:items-end">
          <p className="font-body text-sm text-paper/40">
            © {new Date().getFullYear()} Oman Kwesi. All rights reserved.
          </p>
        </div>

        <h2 className="select-none font-display uppercase leading-[0.8] tracking-tight text-paper/10 text-[18vw] md:text-[14vw]">
          OM — K
        </h2>
      </Stack>
    </footer>
  );
}
