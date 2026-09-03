"use client";

import { Trash } from "@phosphor-icons/react";
import { useFormStatus } from "react-dom";
import { useUserData } from "@/store";
import { Button, ButtonProps } from "@/components/ui/button";

const variantMap: Record<
  "default" | "primary" | "secondary" | "destructive",
  ButtonProps["variant"]
> = {
  default: "secondary",
  primary: "default",
  secondary: "outline",
  destructive: "destructive",
};

export default function ProductButton({
  text = "Create new product",
  pendingText = "Adding Products...",
  type = "default",
}: {
  text?: string;
  pendingText?: string;
  type?: "default" | "primary" | "secondary" | "destructive";
}) {
  const { pending } = useFormStatus();
  const { user } = useUserData();
  const isDemo = !!user?.isDemo;

  return (
    <Button
      className="w-full h-11"
      variant={variantMap[type]}
      type="submit"
      disabled={pending || isDemo}
      title={isDemo ? "Disabled in demo mode" : undefined}
    >
      {pending && (
        <div className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {isDemo ? (
        <span>Disabled in demo mode</span>
      ) : pending ? (
        <span>{pendingText}</span>
      ) : (
        <span className="flex gap-2 items-center">
          {type === "destructive" ? <Trash size={16} weight="bold" /> : ""}
          {text}
        </span>
      )}
    </Button>
  );
}
