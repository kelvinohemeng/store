"use client";

import { useProductSlideState } from "@/store";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode } from "react";

const AdminRoot = ({ children }: { children: ReactNode }) => {
  const { setState } = useProductSlideState();

  const currentPath = usePathname();
  return (
    <div className="bg-[#fefefe] text-black flex flex-col">
      <div className=" flex h-full ">
        {/* //navigation */}
        <header className="w-full max-w-[300px] border-t border-r min-h-full border-slate-400 p-5">
          <h1 className="text-2xl font-semibold mb-8 line-clamp-1">
            Ara Willson Ecommerce Store
          </h1>
          <div className="links p-2 flex flex-col gap-y-3">
            <Link href={"/admin/dashboard"}>
              <button className=" w-full py-4 px-5 border  rounded-lg border-slate-400 flex ">
                <p> Dashboard</p>
              </button>
            </Link>
            <Link href={"/admin/products"}>
              <button className=" w-full py-4 px-5 border  rounded-lg border-slate-400 flex ">
                <p> Products</p>
              </button>
            </Link>
            <Link href={"/admin/orders"}>
              <button className=" w-full py-4 px-5 border  rounded-lg border-slate-400 flex ">
                <p> Orders</p>
              </button>
            </Link>
          </div>
        </header>

        {/* //content */}
        <div className="w-full flex flex-col">
          <div className=" flex flex-col justify-center p-8 py-12">
            <div className="flex justify-between">
              <div>
                <h1 className="text-4xl font-semibold capitalize mb-6">
                  Your {currentPath.split("/").at(-1)}
                </h1>
                <p className="text-base mb-3">
                  Add a ew products to your online store,{" "}
                </p>
              </div>
              <button
                onClick={() => setState(true)}
                className="w-fit h-fit px-5 py-2 bg-green-500 text-white font-semibold rounded-lg flex gap-3 text-lg"
              >
                <span>Add new products</span>
                <span>+</span>
              </button>
            </div>
          </div>
          <div className="w-full h-[1px] bg-slate-600 border-opacity-70" />
          <div className="p-8 overflow-y-scroll !overflow-x-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRoot;
