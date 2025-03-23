"use client";

import { updateOrderStatus } from "@/actions/order";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/Helpers";
import {
  AdminOrderItemT,
  AdminOrderT,
  OrderData,
  OrderItem,
  Product,
} from "@/lib/types";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import { OrderStatusButton } from "./OrderStatusButton";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

type Checked = DropdownMenuCheckboxItemProps["checked"];

export const columns: ColumnDef<OrderData>[] = [
  {
    accessorKey: "customer_name",
    header: "Customer Name",
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      const dateString: string = row.getValue("created_at");
      const date = new Date(dateString);
      const formattedDate = formatDate(date);
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "order_items_admin",
    // header: "Status",
    header: () => <div className="">Items Ordered</div>,
    cell: ({ row }) => {
      const itemsOrdered = row.original.order_items as OrderItem[];

      return (
        <div
          className={`text-left flex gap-2 items-center font-medium  rounded-lg  tracking-normal py-2 w-max`}
        >
          <div className="flex gap-1 border border-black/20 p-0.5 rounded-[8px]">
            {itemsOrdered.map((item, index) => (
              <img
                className="w-[25px] aspect-square rounded-[6px] border border-slate-300"
                src={item.product?.image_url[0]}
                alt=""
              />
            ))}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "order_status",
    // header: "Status",
    header: () => <div className="">Order Status</div>,
    cell: ({ row }) => {
      const status: string = row.original.order_status;
      // Add a key with the status to force re-render when status changes
      // Also pass the id explicitly to ensure proper updating
      return (
        <OrderStatusButton
          row={row}
          initialStatus={status}
          id={row.original.id}
          key={`order-status-${row.original.id}-${status}`}
        />
      );
    },
  },
  {
    accessorKey: "payment_status",
    // header: "Status",
    header: () => <div className="">Payment Status</div>,
    cell: ({ row }) => {
      const status: string = row.getValue("payment_status");
      return (
        <div
          className={`${
            status === "pending"
              ? "bg-yellow-100 "
              : status === "paid"
              ? "bg-green-100"
              : ""
          }text-left flex gap-2 items-center font-medium  rounded-lg  tracking-normal px-3 py-2 w-max`}
        >
          <span
            className={`${
              status === "pending"
                ? " text-orange-800"
                : status === "paid"
                ? " text-green-800"
                : ""
            } font-medium`}
          >
            {status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "order_items",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const orderItems: AdminOrderItemT[] = row.getValue("order_items");
      const totalAmount = orderItems.reduce((sum, item) => sum + item.price, 0); // Calculate total amount

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(totalAmount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
