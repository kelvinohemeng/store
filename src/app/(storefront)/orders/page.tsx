"use client";

import { getOrdersByEmail } from "@/actions/order";
import { OrderData } from "@/lib/types";
import { useUserData } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [orders, setOrders] = useState<OrderData[] | undefined>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user: storedUser } = useUserData();

  useEffect(() => {
    if (!storedUser?.email) return;

    // Guard against setting state from a stale request if the signed-in
    // user changes (or this unmounts) before the fetch resolves.
    let cancelled = false;

    async function loadOrders(email: string) {
      setLoading(true);
      try {
        const result = await getOrdersByEmail(email);
        if (!cancelled) setOrders(result?.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        if (!cancelled) setOrders([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadOrders(storedUser.email);

    return () => {
      cancelled = true;
    };
  }, [storedUser?.email]);

  return (
    <div className="pt-nav-section px-5 md:px-10 pb-20">
      <div className="border-b border-ink/15 pb-6 mb-10">
        <p className="eyebrow">Account</p>
        <h1 className="font-display uppercase tracking-tight text-e-9xl md:text-e-11xl">
          Your Orders
        </h1>
      </div>

      {loading ? (
        <p className="font-body text-ink/60">Loading orders…</p>
      ) : orders && orders.length > 0 ? (
        <div className="flex flex-col gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col gap-4 border border-ink/20 p-5 md:p-6"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="border border-ink/30 px-2 py-1 font-sans text-xs font-semibold uppercase tracking-wide text-ink/70">
                    Order #{order.id?.toString().slice(0, 5)}
                  </span>
                  <p className="font-sans font-semibold text-ink">
                    GHC {order.total_amount}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="border border-ink/30 px-2 py-1 font-sans text-xs font-semibold uppercase tracking-wide text-ink/60">
                    {order.order_status == "pending"
                      ? "Pending Delivery"
                      : "Delivered"}
                  </span>
                  <span className="bg-ink px-2 py-1 font-sans text-xs font-semibold uppercase tracking-wide text-paper">
                    {order.payment_status}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                {order.order_items.map((item) => (
                  <Link key={item.id} href={`/products/${item.product?.id}`}>
                    <div className="flex items-center gap-3 border border-ink/15 p-3 pr-6 hover:bg-ink/[3%]">
                      <Image
                        className="aspect-square w-[64px] bg-studio object-cover object-top"
                        src={item.product?.image_url[0] ?? "/assets/h.jpg"}
                        alt={item.product?.product_name ?? "Product Image"}
                        width={64}
                        height={64}
                      />
                      <div className="space-y-1 font-body text-sm">
                        <p className="font-sans font-semibold text-ink">
                          {item.product?.product_name}
                        </p>
                        <p className="text-ink/70">
                          GHC {item.price}{" "}
                          {item.product?.compare_price && (
                            <span className="line-through text-ink/40">
                              GHC {item.product?.compare_price}
                            </span>
                          )}
                        </p>
                        <div className="flex items-center gap-3 text-ink/60">
                          <span>Qty: {item.quantity}</span>
                          {item.variants?.size && (
                            <span className="border border-ink/30 px-1.5">
                              {item.variants.size}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="font-body text-ink/60">No orders found.</p>
      )}
    </div>
  );
}
