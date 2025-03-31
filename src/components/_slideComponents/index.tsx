"use client";
import { Action } from "@/lib/types";
import { useSlide } from "@/store";
import { X } from "@phosphor-icons/react";
import React from "react";

type SHeadingT = {
  title: string;
  action: Action;
};

export const SlideHeading = ({ title, action }: SHeadingT) => {
  const { setState } = useSlide();
  const newAction = title.includes("Update") ? "view" : "";

  return (
    <div className="flex items-center my-6">
      <div className="w-full">
        <h1 className="text-2xl font-semibold">{title}</h1>
      </div>
      <button
        type="button"
        title="Close order details"
        onClick={() => setState(newAction)}
        className="cursor-pointer p-3 border border-black/10 shadow-md rounded-[8px] hover:opacity-70 hover:scale-[95%] transition-all duration-300 origin-center"
      >
        {title.includes("Update") ? <p>Back</p> : <X size={16} color="black" />}
      </button>
    </div>
  );
};

// export default { SlideHeading };
