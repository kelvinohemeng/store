import { getAllOrders } from "@/actions/order";
import { Button } from "@/components/ui/button";
import { formatCurrencyGHC } from "@/Helpers";
import { useOrderStore } from "@/store/orders";
import Link from "next/link";
import React from "react";

export default async function Dashboard() {
  const orders = await getAllOrders();
  const totalAmountEarned = orders?.reduce(
    (sum, order) => sum + (order.total_amount || 0),
    0
  );

  // Filter orders by a specific property, for example "delivered" status
  const deliveredOrders = orders.filter(
    (order) => order.order_status === "delivered"
  );

  const formatAmount = formatCurrencyGHC(totalAmountEarned);
  return (
    <div className="  pt-5 pb-20 min-h-full">
      <div className="space-y-3">
        <div>
          <h3 className="tracking-tighter">Welcome to your admin Dashboard</h3>
        </div>
        <div className="flex gap-4">
          <div className="w-full space-y-3">
            <div className=" p-10 bg-black/5 w-full rounded-[12px] h-full flex flex-col gap-8 justify-between">
              <p className="  font-medium">Total Amount Earned</p>
              <h5 className="font-semibold tracking-tighter">{formatAmount}</h5>
            </div>
            {/* <a
              href="https://dashboard.paystack.com/#/dashboard"
              // target="_blank"
              className="flex justify-center items-center gap-2 bg-black text-white p-3 rounded-[8px] w-max px-4"
            >
              <button>Go to paystack dashboard</button>
            </a> */}
            <Button asChild>
              <Link href={`https://dashboard.paystack.com/#/dashboard`}>
                Paystack Dashboard
              </Link>
            </Button>
          </div>

          <div className=" p-10 bg-black/5 w-full rounded-[12px] flex flex-col gap-8 justify-between">
            <p className="  font-medium">Items Ordered</p>
            <h5 className="font-semibold tracking-tighter">{orders.length}</h5>
          </div>

          <div className=" p-10 bg-black/5 w-full rounded-[12px] flex flex-col gap-8 justify-between">
            <p className="  font-medium">Delivered Orders</p>
            <h5 className="font-semibold tracking-tighter">
              {deliveredOrders.length}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
