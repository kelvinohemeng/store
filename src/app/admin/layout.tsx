"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  const currentPath = usePathname();
  return (
    <div className="bg-[#fefefe] text-black h-screen ">
      <div className=" h-full">
        <h1 className="text-4xl font-semibold">
          {currentPath.split("/").at(-1)}
        </h1>
      </div>
      <div className=" flex h-[70%]">
        {/* <header className="w-full max-w-[200px] border-t border-r min-h-full border-slate-400">
          <Link href={"/admin/dashboard"}>
            <button className=" w-full py-4 px-2 border-b border-slate-400 flex ">
              <p> Dashboard</p>
            </button>
          </Link>
          <Link href={"/admin/products"}>
            <button className=" w-full py-4 px-2 border-b border-slate-400 flex ">
              <p> Products</p>
            </button>
          </Link>
          <Link href={"/admin/orders"}>
            <button className=" w-full py-4 px-2 border-b border-slate-400 flex ">
              <p> Orders</p>
            </button>
          </Link>
        </header> */}
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default layout;
