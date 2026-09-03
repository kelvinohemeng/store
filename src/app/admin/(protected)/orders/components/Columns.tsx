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
import { formatCurrencyGHC, formatDate } from "@/Helpers";
import {
  AdminOrderItemT,
  AdminOrderT,
  OrderData,
  OrderItem,
  Product,
} from "@/lib/types";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { OrderStatusButton } from "./OrderStatusButton";
import { Badge } from "@/components/ui/badge";

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
        <div className="flex -space-x-2">
          {itemsOrdered.map((item, index) => (
            <img
              key={index}
              className="w-[26px] aspect-square rounded-full border-2 border-white ring-1 ring-neutral-200 object-cover"
              src={item.product?.image_url[0]}
              alt=""
            />
          ))}
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
        <Badge tone={status === "paid" ? "green" : "yellow"} dot>
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "order_items",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const totalAmount = row.original.total_amount;

      const formatted = formatCurrencyGHC(totalAmount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
