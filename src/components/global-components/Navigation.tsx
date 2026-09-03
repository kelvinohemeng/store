"use client";

import { useCartStore, useSlide, useUserData } from "@/store";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import UserProfile from "../UserProfile";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
  const { user: storedUser } = useUserData();
  const { setState } = useSlide();
  const { totalItems } = useCartStore();
  const path = usePathname();
  const router = useRouter();
  const adminRoutes = path.startsWith("/admin");

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const totalCartItems = totalItems();

  if (adminRoutes) return null;

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    setSearchOpen(false);
  };

  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/products", label: "Shop" },
    { href: "/about", label: "About" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-[999] bg-paper">
      <nav className="flex items-center justify-between border-b border-ink/15 px-5 py-4 md:px-8">
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className="font-sans text-sm font-semibold uppercase tracking-wide text-ink/70 transition-colors hover:text-ink">
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        <Link href={"/home"}>
          <h2 className="font-display text-2xl uppercase tracking-tight text-ink md:text-3xl">
            OM — K
          </h2>
        </Link>

        <div className="flex items-center gap-4">
          <div className="relative flex items-center">
            {searchOpen ? (
              <form onSubmit={submitSearch} className="flex items-center">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products…"
                  className="w-[160px] border-b border-ink bg-transparent py-1 font-body text-sm text-ink placeholder:text-ink/40 outline-none md:w-[220px]"
                />
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="ml-2 grid h-6 w-6 place-items-center"
                  aria-label="Close search"
                >
                  <XIcon size={16} />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                className="grid h-6 w-6 place-items-center"
              >
                <MagnifyingGlassIcon size={20} weight="regular" />
              </button>
            )}
          </div>

          {storedUser && <UserProfile user={storedUser} />}

          <button
            onClick={() => setState("cart")}
            aria-label="Cart"
            className="activate-cart relative flex h-7 min-w-7 items-center justify-center border border-ink px-1.5 font-sans text-xs font-semibold text-ink"
          >
            {totalCartItems}
          </button>

          {!storedUser && (
            <Link
              href={"/login"}
              className="border border-ink bg-ink px-4 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-paper hover:bg-ink/85"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
