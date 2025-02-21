"use client";

import { useCartStore, useSlide, useUserData } from "@/store";
import { MagnifyingGlass, ShoppingBag } from "@phosphor-icons/react";
import UserProfile from "../UserProfile";

export default function Navigation() {
  const { user: storedUser } = useUserData();
  const { setState } = useSlide();
  const { totalItems } = useCartStore();

  const totalCartItems = totalItems();

  return (
    <header className="bg-white z-[999] ">
      <nav className="flex justify-between p-5 pr-8 border-b">
        <div className="flex items-center gap-2">
          <ShoppingBag size={20} weight="fill" />
          <h2 className="text-2xl font-['poppins']">ecomme</h2>
        </div>
        <div className="flex items-center gap-3 ">
          <span>
            <MagnifyingGlass size={24} weight="regular" />
          </span>
          <div
            onClick={() => setState("cart")}
            className="activate-cart relative cursor-pointer"
          >
            <ShoppingBag size={20} weight="regular" />
            <div className="absolute top-0 right-0 -translate-y-[50%] translate-x-[50%] w-[20px] h-[20px] bg-red-500 border-white grid place-items-center text-white rounded-full border-[3px]">
              <span className="text-xs leading-[100%]">{totalCartItems}</span>
            </div>
          </div>
          {storedUser && <UserProfile user={storedUser} />}
        </div>
      </nav>
    </header>
  );
}
