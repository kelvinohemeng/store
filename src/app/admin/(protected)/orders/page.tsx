"use client";

import { getAllOrders } from "@/actions/order";
import { AdminOrderT, OrderData } from "@/lib/types";
import { DataTable } from "./components/DataTable";
import { Payment, columns } from "./components/Columns";
import { useQuery } from "@tanstack/react-query";
import PageHeader from "@/app/admin/_admin-components/PageHeader";

export default function Orders() {
  // const allOrders = await getAllOrders();
  // const { orders } = await allOrders;

  const {
    data: orders,
    isLoading,
    isError,
    refetch,
  } = useQuery<OrderData[]>({
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
