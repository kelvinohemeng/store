import Banner from "@/app/admin/admin-components/Banner";
import SidebarNav from "@/app/admin/admin-components/SidebarNav";
import React, { ReactNode } from "react";

const AdminRoot = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[#fefefe] text-black h-screen flex overflow-hidden">
      <SidebarNav />

      {/* //navigation */}

      {/* //content */}
      <div className="w-full flex flex-col h-full">
        <Banner />
        <div className="w-full h-[0.5px] bg-slate-600 opacity-50" />
        <div className="bg-slate-50 bg-opacity-50 p-8 overflow-y-scroll h-full !overflow-x-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminRoot;
