"use client";

import {
  CaretRight,
  Invoice,
  ShoppingBagOpen,
  SquaresFour,
} from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";

const SidebarNav = () => {
  const currentPath = usePathname();

  const isActive = useMemo(() => {
    return {
      dashboard: currentPath === "/admin/dashboard",
      products: currentPath === "/admin/products",
      orders: currentPath === "/admin/orders",
    };
  }, [currentPath]);

  return (
    <nav>
      <header className="w-full h-screen min-w-[300px] p-5 pb-10 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-semibold mb-8 line-clamp-1 p-5">
            GEN Studio
          </h1>

          <div className="links flex flex-col gap-y-3">
            <Link href="/admin/dashboard" prefetch>
              <button
                className={`w-full py-4 px-5 rounded-lg items-center hover:bg-slate-50 flex gap-2 transition duration-300 ${
                  isActive.dashboard && "bg-slate-50"
                }`}
              >
                <SquaresFour
                  size={22}
                  weight={isActive.dashboard ? "fill" : "regular"}
                />
                <p>Dashboard</p>
              </button>
            </Link>
            <Link href="/admin/products" prefetch>
              <button
                className={`w-full py-4 px-5 rounded-lg items-center hover:bg-slate-50 flex gap-2 transition duration-300 ${
                  isActive.products && "bg-slate-50"
                }`}
              >
                <ShoppingBagOpen
                  size={22}
                  weight={isActive.products ? "fill" : "regular"}
                />
                <p>Products</p>
              </button>
            </Link>
            <Link href="/admin/orders" prefetch>
              <button
                className={`w-full py-4 px-5 rounded-lg items-center hover:bg-slate-50 flex gap-2 transition duration-300 ${
                  isActive.orders && "bg-slate-50"
                }`}
              >
                <Invoice
                  size={22}
                  weight={isActive.orders ? "fill" : "regular"}
                />
                <p>Orders</p>
              </button>
            </Link>
          </div>
        </div>

        <div className=" relative flex w-full my-4  h-[64px] p-3 gap-3 rounded-xl justify-between items-center cursor-pointer group before:absolute before:inset-0 before:bg-slate-50 before:rounded-xl before:hover:scale-105 before:transition before:duration-200">
          <div className=" relative w-full h-full flex gap-3 ">
            <div className=" h-full ">
              <div className="bg-slate-400 aspect-square h-full rounded-full"></div>
            </div>
            <div className="relative">
              <h3>Ecommerce Store</h3>
              <Link href={`/s/home`}>
                <span className="border-b border-slate-800">website.com</span>
              </Link>
            </div>
          </div>
          <div className="absolute transition duration-200 right-4 top-1/2 -translate-y-[50%] group-hover:translate-x-[-4px]">
            <CaretRight size={22} />
          </div>
        </div>
      </header>
    </nav>
  );
};

export default SidebarNav;
