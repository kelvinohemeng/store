"use client";

import CreateButton from "@/components/admin-components/CreateButton";
import SidebarNav from "@/components/admin-components/SidebarNav";
import { usePathname, useRouter } from "next/navigation";
import React, { ReactNode } from "react";

const AdminRoot = ({ children }: { children: ReactNode }) => {
  const currentPath = usePathname();

  return (
    <div className="bg-[#fefefe] text-black h-screen flex overflow-hidden">
      <SidebarNav />

      {/* //navigation */}

      {/* //content */}
      <div className="w-full flex flex-col h-full">
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
            <CreateButton action="create" text="Add new products" />
          </div>
        </div>
        <div className="w-full h-[0.5px] bg-slate-600 opacity-50" />
        <div className="p-8 overflow-y-scroll h-full !overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminRoot;
