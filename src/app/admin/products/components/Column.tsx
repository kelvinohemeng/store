"use client";

import { Product } from "@/lib/types";
import { Check } from "@phosphor-icons/react";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "product_name", // Define product_name as a column
    header: "Product Name",
    enableHiding: true, // Allow hiding the column
  },
  {
    id: "name_and_image",
    header: "Name",
    cell: ({ row }) => {
      const productName: string = row.original.product_name;
      const images: string[] = row.original.image_url || [];

      return (
        <div className="flex items-center justify-start max-w-max gap-2">
          {images.length > 0 ? (
            <div className="flex gap-2">
              <img
                src={images[0]}
                alt={`Image of ${productName}`}
                className="max-w-[40px] w-full aspect-square rounded-md"
              />
            </div>
          ) : (
            <div className="max-w-[40px] w-full aspect-square rounded-md bg-slate-400">
              No images
            </div>
          )}
          <span>{productName}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "product_price",
    header: () => <div className="">Price</div>,
    cell: ({ row }) => {
      const ProductPrice: number = row.getValue("product_price");

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(ProductPrice);

      return <div className=" font-medium">{formatted}</div>;
    },
  },

  {
    accessorKey: "product_description",
    header: "Product Description",
  },
  {
    accessorKey: "product_status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("product_status");
      return (
        <div className="text-left flex gap-2 items-center font-medium bg-green-100 rounded-lg text-green-800 tracking-normal px-3 py-2 w-max">
          <Check size={12} color="#166534" weight="bold" />
          <span>{status}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-right">In Stock</div>,
    cell: ({ row }) => {
      const quantity: number = row.getValue("quantity");
      return <div className="text-right font-medium">{quantity}</div>;
    },
  },

  //   {
  //     accessorKey: "payment_status",
  //     // header: "Status",
  //     header: () => <div className="text-right">Status</div>,
  //     cell: ({ row }) => {
  //       const status: string = row.getValue("payment_status");

  //       return <div className="text-right font-medium">{status}</div>;
  //     },
  //   },
  //   {
  //     accessorKey: "order_items",
  //     header: () => <div className="text-right">Amount</div>,
  //     cell: ({ row }) => {
  //       const orderItems: OrderItem<Product>[] = row.getValue("order_items");
  //       const totalAmount = orderItems.reduce((sum, item) => sum + item.price, 0); // Calculate total amount

  //       const formatted = new Intl.NumberFormat("en-US", {
  //         style: "currency",
  //         currency: "USD",
  //       }).format(totalAmount);

  //       return <div className="text-right font-medium">{formatted}</div>;
  //     },
  //   },
];
