"use client";
import { updateOrderStatus } from "@/actions/order";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderData, OrderItem } from "@/lib/types";
import { showError, showSuccess } from "@/lib/utils/toastUtils";
import { useQueryClient } from "@tanstack/react-query";
import { Row } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

export function OrderStatusButton({
  initialStatus,
  id,
  row,
}: {
  initialStatus: string;
  id?: string | number | undefined;
  row?: Row<OrderData> | undefined;
}) {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState(initialStatus);
  const [isLoading, setIsLoading] = useState(false);

  // Update local state when initialStatus prop changes
  useEffect(() => {
    setStatus(initialStatus);
  }, [initialStatus]);

  const handleStatusChange = async (newStatus: string) => {
    if (!id) return;

    try {
      setIsLoading(true);
      const Id = id ?? row?.original?.id;

      // Update local state first for immediate UI feedback
      setStatus(newStatus);

      // Call the API to update the status
      await updateOrderStatus(Id, newStatus);

      // Update the cache directly instead of invalidating
      if (row && row.original) {
        // Create a copy of the original data
        const updatedOrder = { ...row.original, order_status: newStatus };

        // Update the row data directly in the cache
        queryClient.setQueryData(["orders"], (oldData: any) => {
          if (!oldData) return oldData;

          // If the data is an array, find and update the specific order
          if (Array.isArray(oldData)) {
            return oldData.map((item) =>
              item.id === Id ? { ...item, order_status: newStatus } : item
            );
          }

          // If the data has a pages structure (for infinite queries)
          if (oldData.pages) {
            return {
              ...oldData,
              pages: oldData.pages.map((page: any) => ({
                ...page,
                data: Array.isArray(page.data)
                  ? page.data.map((item: any) =>
                      item.id === Id
                        ? { ...item, order_status: newStatus }
                        : item
                    )
                  : page.data,
              })),
            };
          }

          return oldData;
        });
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
      // Revert to original status on error
      setStatus(initialStatus);
      showError("Failed to update order status");
    } finally {
      setIsLoading(false);
      showSuccess("Order Status Updated Successfully");
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
              ? "bg-blue-100 bg-blue-800/20"
              : ""
          }text-left flex gap-1 items-center font-medium rounded-[8px] border tracking-normal px-2 py-1 w-max ${
            isLoading ? "opacity-70" : ""
          }`}
        >
          <span
            className={`${
              status === "pending"
                ? "text-yellow-800"
                : status === "paid"
                ? "text-green-800"
                : status === "delivered"
                ? "text-blue-800 "
                : ""
            } font-medium`}
          >
            {isLoading ? (
              <div className="px-2 py-1 w-max flex items-center justify-center">
                <p>Updating</p>
                <UseAnimations
                  animation={loading}
                  size={18}
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
