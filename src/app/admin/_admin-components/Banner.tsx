"use client";

import { usePathname } from "next/navigation";
import React from "react";

const Banner = () => {
  const currentPath = usePathname();
  return (
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
      </div>
    </div>
  );
};

export default Banner;
