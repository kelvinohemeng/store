import { getAllOrders } from "@/actions/order";
import DisplayOrders from "./components/DisplayOrders";
import { Order } from "@/lib/types";

export default async function Orders() {
  const allOrders = await getAllOrders();
  const { orders } = allOrders;
  return (
    <div className=" bg-slate-100 pt-5 pb-20 min-h-full">
      <h1 className="text-4xl mb-6">Order List</h1>
      <DisplayOrders orders={orders} />
    </div>
  );
}
