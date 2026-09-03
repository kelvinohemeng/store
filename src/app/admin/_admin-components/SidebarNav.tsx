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

const navItems = [
  { key: "dashboard", href: "/admin/dashboard", label: "Dashboard", icon: SquaresFour },
  { key: "products", href: "/admin/products", label: "Products", icon: ShoppingBagOpen },
  { key: "orders", href: "/admin/orders", label: "Orders", icon: Invoice },
] as const;

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
    <nav className="shrink-0 border-r border-neutral-200 bg-white">
      <header className="w-[240px] h-screen p-4 flex flex-col justify-between">
        <div>
          <h1 className="text-base font-semibold tracking-tight px-3 py-2 mb-4 line-clamp-1">
            GEN Studio
          </h1>

          <p className="px-3 text-xs font-medium uppercase tracking-wide text-neutral-400 mb-2">
            Store
          </p>

          <div className="links flex flex-col gap-y-0.5">
            {navItems.map(({ key, href, label, icon: Icon }) => (
              <Link href={href} prefetch key={key}>
                <button
                  className={`w-full py-2 px-3 rounded-md items-center hover:bg-neutral-100 flex gap-2.5 text-sm transition-colors duration-150 ${
                    isActive[key]
                      ? "bg-neutral-100 text-neutral-900 font-medium"
                      : "text-neutral-600"
                  }`}
                >
                  <Icon
                    size={18}
                    weight={isActive[key] ? "fill" : "regular"}
                    className={isActive[key] ? "text-neutral-900" : "text-neutral-500"}
                  />
                  <p>{label}</p>
                </button>
              </Link>
            ))}
          </div>
        </div>

        <Link
          href="/home"
          className="group flex items-center justify-between gap-2 rounded-md border border-neutral-200 p-2.5 hover:bg-neutral-50 transition-colors duration-150"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="size-8 rounded-full bg-neutral-200 shrink-0" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-900 truncate">
                Ecommerce Store
              </p>
              <span className="text-xs text-neutral-500 truncate block">
                website.com
              </span>
            </div>
          </div>
          <CaretRight
            size={16}
            className="text-neutral-400 shrink-0 transition-transform duration-150 group-hover:translate-x-0.5"
          />
        </Link>
      </header>
    </nav>
  );
};

export default SidebarNav;
