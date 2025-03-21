"use client";

import { getOrdersByEmail } from "@/actions/order";
import { AdminOrderT, OrderData } from "@/lib/types";
import { useUserData } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [orders, setOrders] = useState<OrderData[] | undefined>([]); // Use null for better state handling
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const { user: storedUser } = useUserData();

  // Fetch orders for the logged-in user
  async function fetchOrders() {
    if (!storedUser?.email) return;

    setLoading(true);
    try {
      const result = await getOrdersByEmail(storedUser.email);
      setOrders(result?.orders); // Ensure orders is an array, even if no results
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
    console.log([storedUser?.email, orders]);
  }, [storedUser?.email]); // Only fetch when email is available

  return (
    <div className=" pt-[120px] px-10">
      <h3>Your Orders</h3>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders && orders.length > 0 ? (
        <div className=" flex flex-col gap-6">
          {orders.map((order) => (
            // <Link href={`/product/${order.order_items[0].product.id}`}>
            <div
              key={order.id}
              className=" flex flex-col border p-4 w-full gap-4 rounded-[12px] shadow-sm"
            >
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <span className=" rounded-[6px] border px-2 py-1 text-base bg-black/10 font-semibold">
                    Order #{order.id.toString().slice(0, 5)}...{" "}
                  </span>
                  <p className="font-semibold">
                    <span>Cost</span>: GHC {order.total_amount}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className=" rounded-[6px] px-2 py-1 text-base bg-green-50 text-black/70 border-green-500/40 border-[2px] capitalize font-semibold">
                    {order.order_status == "pending"
                      ? "Pending Delivery"
                      : "Delivered"}
                  </span>
                  <span className=" px-3 py-1 text-white text-base rounded-[6px] border-green-300 border-[3px] bg-green-700 capitalize w-fit">
                    {order.payment_status}
                  </span>
                </div>
              </div>
              <div className="flex gap-5">
                {order.order_items.map((item) => (
                  <Link key={item.id} href={`/products/${item.product?.id}`}>
                    <div className="flex gap-3 items-center p-4 pr-6 border border-black/10 rounded-[6px] shadow-sm hover:bg-black/[2%]">
                      <Image
                        className="object-cover object-top rounded-[4px] aspect-square w-[80px]"
                        src={item.product?.image_url[0] ?? "/assets/h.jpg"}
                        alt={item.product?.product_name ?? "Product Image"}
                        width={50}
                        height={50}
                      />
                      <div className="space-y-1">
                        {/* <p>{item.id}</p> */}
                        <p>
                          <span className="font-semibold">Item Name:</span>{" "}
                          <span>{item.product?.product_name}</span>
                        </p>

                        <p>
                          <span className="font-semibold">Price: </span>
                          GHC {item.price}{" "}
                          {item.product?.compare_price && (
                            <span className="line-through font-semibold opacity-50">
                              GHC {item.product?.compare_price}
                            </span>
                          )}
                        </p>

                        <div className="flex items-center gap-x-2 ">
                          <p>
                            <span className="font-semibold">Quantity:</span>
                            {item.quantity}
                          </p>
                          <span className="">
                            Size:
                            <span className="border px-2 py-1 ">
                              {item.variants?.size}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            // </Link>
          ))}
        </div>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
}
