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
import { Row } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

export function OrderStatusButton({
  id,
  initialStatus,
}: {
  id: string | undefined;
  initialStatus: string;
}) {
  const { orders, updateOrderStatus } = useOrderStore();
  const [isLoading, setIsLoading] = useState(false);

  // Use Zustand's state if updated, otherwise use initial status
  const status = id ? orders[id] ?? initialStatus : initialStatus;

  const handleStatusChange = async (newStatus: string) => {
    if (!id) return;

    try {
      setIsLoading(true);

      // Call API to update order status
      await updateOrderAPI(id, newStatus);

      // Update Zustand state (this will trigger a re-render in the table)
      updateOrderStatus(id, newStatus);

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
      >
        <div
          className={`${
            status === "pending"
              ? "bg-yellow-500/10 "
              : status === "paid"
              ? "bg-green-100"
              : status === "delivered"
              ? "bg-blue-800/20"
              : ""
          } text-left flex gap-1 items-center font-medium rounded-[8px] border-3 border-black/10 px-2 py-1 w-max ${
            isLoading ? "opacity-70" : ""
          }`}
        >
          <span
            className={`${
              status === "pending"
                ? "text-yellow-800"
                : status === "paid"
                ? "text-green-800"
                : "text-blue-800"
            } font-medium capitalize`}
          >
            {isLoading ? (
              <div className="px-2 w-max flex items-center justify-center">
                <p className="text-sm">Updating</p>
                <UseAnimations
                  animation={loading}
                  size={16}
                  strokeColor="black"
                  autoplay={true}
                />
              </div>
            ) : (
              status
            )}
          </span>
          {!isLoading && <ChevronDown className="h-4 w-4" />}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="mt-2 w-52 bg-white rounded-[8px] shadow-md z-[100]"
        align="end"
        side="bottom"
      >
        <DropdownMenuCheckboxItem
          checked={status === "pending"}
          className="hover:bg-black/5 cursor-pointer"
          onCheckedChange={() => handleStatusChange("pending")}
          disabled={isLoading}
        >
          Pending
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={status === "delivered"}
          className="hover:bg-black/5 cursor-pointer"
          onCheckedChange={() => handleStatusChange("delivered")}
          disabled={isLoading}
        >
          Delivered
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
