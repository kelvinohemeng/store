import { getAllOrders } from "@/actions/order";
import { Button } from "@/components/ui/button";
import { formatCurrencyGHC } from "@/Helpers";
import PageHeader from "@/app/admin/_admin-components/PageHeader";
import Link from "next/link";
import React from "react";

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-6 bg-white border border-neutral-200 rounded-lg w-full flex flex-col gap-3">
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
        {label}
      </p>
      <h5 className="text-2xl font-semibold tracking-tight text-neutral-900">
        {value}
      </h5>
    </div>
  );
}

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
    <div className="pb-20 min-h-full">
      <PageHeader eyebrow="Overview" title="Dashboard" />

      <div className="grid grid-cols-3 gap-4">
        <StatCard label="Total Amount Earned" value={formatAmount} />
        <StatCard label="Items Ordered" value={orders.length} />
        <StatCard label="Delivered Orders" value={deliveredOrders.length} />
      </div>

      <Button asChild className="mt-4">
        <Link href="https://dashboard.paystack.com/#/dashboard">
          Paystack Dashboard
        </Link>
      </Button>
    </div>
  );
}
