"use client";

import { useCartStore, useSlide, useUserData } from "@/store";
import { MagnifyingGlass, ShoppingBag } from "@phosphor-icons/react";
import UserProfile from "../UserProfile";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const { user: storedUser } = useUserData();
  const { setState } = useSlide();
  const { totalItems } = useCartStore();
  const path = usePathname();
  const adminRoutes = path.startsWith("/admin");

  const totalCartItems = totalItems();

  if (adminRoutes) return null;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-[999] ">
      <nav className="flex justify-between p-5 pr-8 border-b border-black/30">
        <div className="flex items-center gap-3">
          <Link href={"/home"}>
            <span className="">Home</span>
          </Link>
          {/* <Link href={"/about"}>
            <span className="">Explore</span>
          </Link> */}
          <Link href={"/products"}>
            <span className="">Products</span>
          </Link>
        </div>
        <Link href={"/home"}>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold uppercase">OM — K</h2>
          </div>
        </Link>

        <div className="flex items-center gap-3 ">
          <div>
            <MagnifyingGlass size={24} weight="regular" />
          </div>

          {storedUser && <UserProfile user={storedUser} />}

          <div
            onClick={() => setState("cart")}
            className="activate-cart relative cursor-pointer border rounded-full aspect-square h-full grid place-items-center"
          >
            {totalCartItems}
          </div>

          {!storedUser && (
            <Link
              href={"/login"}
              className=" px-4 py-2 bg-slate-100 rounded-lg"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
