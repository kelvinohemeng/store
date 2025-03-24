import { checkAdminAuth } from "@/actions/auth";
import Banner from "@/app/admin/_admin-components/Banner";
import SidebarNav from "@/app/admin/_admin-components/SidebarNav";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";
import ToastProvider from "./_admin-components/ToastProvider";

export default async function AdminRoot({ children }: { children: ReactNode }) {
  const { isAuthenticated, isAdmin } = await checkAdminAuth();

  return (
    <div className="bg-[#fefefe] text-black h-screen flex overflow-hidden">
      {/* Mobile Warning - Only visible on small screens */}
      <div className="md:hidden w-full h-screen flex flex-col items-center justify-center p-6 text-center bg-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-red-500 mb-4 animate-pulse"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h1 className="text-2xl font-bold mb-2">Desktop Only</h1>
        <p className="text-gray-600 mb-4">
          The admin dashboard is only available on desktop screens.
        </p>
        <p className="text-gray-600">
          Please switch to a desktop device for the best experience
        </p>
      </div>

      {/* Desktop Admin Interface - Hidden on mobile */}
      <div className="hidden md:flex w-full h-screen overflow-hidden">
        {/* Show Sidebar Only If Admin Is Authenticated */}
        {isAuthenticated && isAdmin && <SidebarNav />}

        {/* Main Content */}
        <div className="w-full flex flex-col h-full">
          {/* Show Banner Only If Admin Is Authenticated */}
          {/* {isAuthenticated && isAdmin && <Banner />} */}

          <div className="w-full h-[0.5px] bg-slate-600 opacity-50" />

          <div className="bg-[#F7F7F7] bg-opacity-50 p-8 overflow-y-scroll h-full !overflow-x-hidden">
            <ToastProvider>{children}</ToastProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
