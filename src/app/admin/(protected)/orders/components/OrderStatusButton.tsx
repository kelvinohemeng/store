"use client";
import { updateOrderStatus as updateOrderAPI } from "@/actions/order";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useOrderStore } from "@/store/orders";
import { useUserData } from "@/store";
import { Row } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function OrderStatusButton({
  id,
  initialStatus,
}: {
  id: string | number | undefined;
  initialStatus: string;
}) {
  const { orders, updateOrderStatus } = useOrderStore();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUserData();
  const isDemo = !!user?.isDemo;
  const idKey = id !== undefined ? String(id) : undefined;

  // Use Zustand's state if updated, otherwise use initial status
  const status = idKey ? orders[idKey] ?? initialStatus : initialStatus;

  const tone =
    status === "pending" ? "yellow" : status === "delivered" ? "blue" : "green";

  const handleStatusChange = async (newStatus: string) => {
    if (!idKey) return;

    if (isDemo) {
      toast.info("Disabled in demo mode — order status can't be changed here.");
      return;
    }

    try {
      setIsLoading(true);

      // Call API to update order status
      await updateOrderAPI(idKey, newStatus);

      // Update Zustand state (this will trigger a re-render in the table)
      updateOrderStatus(idKey, newStatus);

      toast.success("Order Status Updated Successfully");
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error("Failed to update order status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="select-none outline-none"
        disabled={isLoading}
        title={isDemo ? "Disabled in demo mode" : undefined}
      >
        <div
          className={cn(
            badgeVariants({ tone }),
            "gap-1.5 pr-1.5 cursor-pointer",
            isLoading && "opacity-70"
          )}
        >
          <span className={cn(`size-1.5 rounded-full shrink-0 bg-current opacity-70`)} />
          {isLoading ? (
            <div className="w-3 h-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            status
          )}
          {!isLoading && <ChevronDown className="h-3 w-3" />}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="mt-2 w-44 bg-white rounded-md border border-neutral-200 shadow-md z-[100]"
        align="end"
        side="bottom"
      >
        <DropdownMenuCheckboxItem
          checked={status === "pending"}
          className="hover:bg-neutral-50 cursor-pointer text-sm"
          onCheckedChange={() => handleStatusChange("pending")}
          disabled={isLoading}
        >
          Pending
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={status === "delivered"}
          className="hover:bg-neutral-50 cursor-pointer text-sm"
          onCheckedChange={() => handleStatusChange("delivered")}
          disabled={isLoading}
        >
          Delivered
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
