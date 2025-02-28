"use client";

import { AdminOrderItemT, AdminOrderT, OrderItem, Product } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Check } from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<AdminOrderT>[] = [
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
      const formattedDate = `${date.getDate()} ${date.toLocaleString("en-US", {
        month: "short",
      })}, ${date.getFullYear()}`;
      return <div>{formattedDate}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "order_items",
    // header: "Status",
    header: () => <div className="">Items Ordered</div>,
    cell: ({ row }) => {
      const itemsOrdered = row.original.order_items as AdminOrderItemT[];

      return (
        <div
          className={`text-left flex gap-2 items-center font-medium  rounded-lg  tracking-normal px-3 py-2 w-max`}
        >
          <span>{itemsOrdered.length}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "payment_status",
    // header: "Status",
    header: () => <div className="">Status</div>,
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
