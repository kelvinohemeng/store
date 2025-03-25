"use client";

import { formatCurrencyGHC } from "@/Helpers";
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
    header: () => <div className=" p-2">Name</div>,
    cell: ({ row }) => {
      const productName: string = row.original.product_name;
      const images: string[] = row.original.image_url || [];

      return (
        <div className="flex items-center justify-start gap-2 p-2">
          {images.length > 0 ? (
            <div className="flex gap-2 rounded-[4px] overflow-hidden">
              <img
                src={images[0]}
                alt={`Image of ${productName}`}
                className="max-w-[40px] w-full aspect-square  object-cover object-center"
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

      const formatted = formatCurrencyGHC(ProductPrice);

      return <div className=" font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "sizes",
    header: () => <div className="">Sizes</div>,
    cell: ({ row }) => {
      const sizes: string[] = row.original.sizes || [];

      return (
        <div className=" font-medium space-x-2">
          {sizes.length > 0 ? (
            sizes.map((size, index) => (
              <span
                key={`${size}_${index}`}
                className=" bg-black/5 rounded-[4px] text-xs px-2 py-1"
              >
                {size}
              </span>
            ))
          ) : (
            <span>-</span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "product_type",
    header: "Category",
    cell: ({ row }) => {
      const cat: string = row.getValue("product_type");
      return (
        <div className="text-left flex gap-2 items-center font-medium bg-black text-white rounded-[4px] tracking-normal px-2 py-1 w-max">
          <span>{cat}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "product_status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("product_status");
      return (
        <div className="text-left flex gap-2 items-center font-medium bg-green-100 rounded-[4px] text-green-900 tracking-medium px-2 pr-3 py-1 w-max">
          <Check size={12} color="#14532d " weight="bold" />
          <span>{status}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-right p-2">In Stock</div>,
    cell: ({ row }) => {
      const quantity: number = row.getValue("quantity");
      return <div className="text-right font-medium p-2">{quantity}</div>;
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
