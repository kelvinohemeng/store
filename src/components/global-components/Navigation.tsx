"use client";

import { useUserData } from "@/store";
import { ShoppingBag } from "@phosphor-icons/react";
import UserProfile from "../UserProfile";

export default function Navigation() {
  const { user: storeUser } = useUserData();

  return (
    <header>
      <nav className="flex">
        <h2 className="text-2xl font-['poppins']">ecomme</h2>
        <ShoppingBag size={20} weight="fill" />
        {storeUser && <UserProfile />}
      </nav>
    </header>
  );
}
