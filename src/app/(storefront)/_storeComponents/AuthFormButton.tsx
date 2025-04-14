"use client";

import { useFormStatus } from "react-dom";

export default function AuthFormButton({ title, ...rest }: { title: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-black hover:bg-black/70 text-white p-3 rounded-md font-medium transition-colors duration-200 flex justify-center items-center"
      {...rest}
    >
      {pending && (
        <div className="w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}
      {!pending && <span>{title}</span>}
    </button>
  );
}
