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
    <div className="flex items-center justify-between pb-4 mb-6 border-b border-neutral-200">
      <h1 className="text-lg font-semibold text-neutral-900">{title}</h1>
      <button
        type="button"
        title="Close order details"
        onClick={() => setState(newAction)}
        className="cursor-pointer size-8 flex items-center justify-center border border-neutral-200 rounded-md hover:bg-neutral-50 transition-colors duration-150"
      >
        {title.includes("Update") ? (
          <span className="text-xs font-medium px-1">Back</span>
        ) : (
          <X size={14} color="black" />
        )}
      </button>
    </div>
  );
};

// export default { SlideHeading };
