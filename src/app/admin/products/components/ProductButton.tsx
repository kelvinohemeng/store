"use client";

import { useFormStatus } from "react-dom";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

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
    default: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    primary: "bg-green-500 hover:bg-green-600 text-white",
    secondary: "bg-white hover:bg-gray-100 text-gray-800",
    destructive: "bg-red-500 hover:bg-red-600 text-white",
  };

  const { pending } = useFormStatus();
  return (
    <button
      className={`w-full ${
        states[type]
      } text-white py-4 rounded-md flex items-center justify-center gap-2 transition-all duration-200 ${
        pending ? "opacity-80" : ""
      }`}
      type="submit"
      disabled={pending}
    >
      <div
        className={`transition-opacity duration-200 ${
          pending ? "opacity-100 block" : "opacity-0 hidden"
        }`}
      >
        <UseAnimations
          animation={loading}
          size={20}
          strokeColor="white"
          autoplay={true}
        />
      </div>
      {pending ? <span>{pendingText}</span> : <span>{text}</span>}
    </button>
  );
}
