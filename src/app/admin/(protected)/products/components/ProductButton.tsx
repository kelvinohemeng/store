"use client";

import { Trash } from "@phosphor-icons/react";
import { useFormStatus } from "react-dom";
import { useUserData } from "@/store";

export default function ProductButton({
  text = "Create new product",
  pendingText = "Adding Products...",
  type = "default",
}: {
  text?: string;
  pendingText?: string;
  type?: "default" | "primary" | "secondary" | "destructive";
}) {
  const states = {
    default: "bg-gray-200 hover:bg-gray-300 text-black",
    primary: "bg-black hover:bg-black/70 text-white",
    secondary: "bg-white hover:bg-gray-100 text-gray-800",
    destructive: "bg-red-500 hover:bg-red-600 text-white",
  };

  const { pending } = useFormStatus();
  const { user } = useUserData();
  const isDemo = !!user?.isDemo;

  return (
    <button
      className={`w-full ${
        states[type]
      } text-white py-4 rounded-[4px] flex items-center justify-center gap-2 transition-all duration-200 ${
        pending ? "opacity-80" : ""
      } ${isDemo ? "opacity-50 cursor-not-allowed" : ""}`}
      type="submit"
      disabled={pending || isDemo}
      title={isDemo ? "Disabled in demo mode" : undefined}
    >
      {pending && (
        <div className="w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}
      {isDemo ? (
        <span>Disabled in demo mode</span>
      ) : pending ? (
        <span>{pendingText}</span>
      ) : (
        <span className=" flex gap-3 items-center">
          {type === "destructive" ? <Trash size={16} weight="bold" /> : ""}
          {text}
        </span>
      )}
    </button>
  );
}
