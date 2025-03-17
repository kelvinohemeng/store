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
      <nav className="flex justify-between p-5 pr-8 border-b">
        <div className="flex items-center gap-3">
          <Link href={"/home"}>
            <span className="">Home</span>
          </Link>
          <Link href={"/about"}>
            <span className="">About</span>
          </Link>
          <Link href={"/products"}>
            <span className="">Products</span>
          </Link>
        </div>
        <Link href={"/home"}>
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} weight="fill" />
            <h2 className="text-2xl font-['poppins']">ecomme</h2>
          </div>
        </Link>

        <div className="flex items-center gap-3 ">
          <div>
            <MagnifyingGlass size={24} weight="regular" />
          </div>

          <div
            onClick={() => setState("cart")}
            className="activate-cart relative cursor-pointer"
          >
            <ShoppingBag size={20} weight="regular" />
            <div className="absolute top-0 right-0 -translate-y-[50%] translate-x-[50%] w-[20px] h-[20px] bg-red-500 border-white grid place-items-center text-white rounded-full border-[3px]">
              <p className="text-xs leading-[100%]">{totalCartItems}</p>
            </div>
          </div>

          {storedUser && <UserProfile user={storedUser} />}

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
