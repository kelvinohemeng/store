import { checkAdminAuth } from "@/actions/auth";
import Banner from "@/app/admin/_admin-components/Banner";
import SidebarNav from "@/app/admin/_admin-components/SidebarNav";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function AdminRoot({ children }: { children: ReactNode }) {
  const { isAuthenticated, isAdmin } = await checkAdminAuth();

  return (
    <div className="bg-[#fefefe] text-black h-screen flex overflow-hidden">
      {/* Show Sidebar Only If Admin Is Authenticated */}
      {isAuthenticated && isAdmin && <SidebarNav />}

      {/* Main Content */}
      <div className="w-full flex flex-col h-full">
        {/* Show Banner Only If Admin Is Authenticated */}
        {/* {isAuthenticated && isAdmin && <Banner />} */}

        <div className="w-full h-[0.5px] bg-slate-600 opacity-50" />

        <div className="bg-[#F7F7F7] bg-opacity-50 p-8 overflow-y-scroll h-full !overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
