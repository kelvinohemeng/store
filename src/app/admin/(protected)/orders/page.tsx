"use client";

import { getAllOrders } from "@/actions/order";
import { OrderData } from "@/lib/types";
import { DataTable } from "./components/DataTable";
import { columns } from "./components/Columns";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/app/admin/_admin-components/PageHeader";

export default function Orders() {
  const { data: orders } = useQuery<OrderData[]>({
    queryKey: ["orders"],
    queryFn: async () => await getAllOrders(),
  });

  return (
    <div className="pb-20 min-h-full">
      <PageHeader eyebrow="Sales" title="Orders" />
      <DataTable columns={columns} data={orders} />
    </div>
  );
}
