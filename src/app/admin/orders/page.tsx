"use client";

import { getAllOrders } from "@/actions/order";
import { AdminOrderT, OrderData } from "@/lib/types";
import { DataTable } from "./components/DataTable";
import { Payment, columns } from "./components/Columns";
import { useQuery } from "@tanstack/react-query";

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
    <div className="  pt-5 pb-20 min-h-full">
      <h1 className="text-4xl mb-6">Order List</h1>
      <DataTable columns={columns} data={orders} />
    </div>
  );
}
