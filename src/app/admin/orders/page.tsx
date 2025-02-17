import { getAllOrders } from "@/actions/order";
import DisplayOrders from "./components/DisplayOrders";
import { Order } from "@/lib/types";
import { DataTable } from "./components/DataTable";
import { Payment, columns } from "./components/Columns";

export default async function Orders() {
  const allOrders = await getAllOrders();
  const { orders } = await allOrders;

  return (
    <div className="  pt-5 pb-20 min-h-full">
      <h1 className="text-4xl mb-6">Order List</h1>
      {/* <DisplayOrders orders={orders} /> */}
      <DataTable columns={columns} data={orders} />
    </div>
  );
}
