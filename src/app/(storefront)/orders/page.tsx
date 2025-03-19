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
      <h1>Your Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders && orders.length > 0 ? (
        <div className=" flex flex-col gap-6">
          {orders.map((order) => (
            // <Link href={`/product/${order.order_items[0].product.id}`}>
            <div
              key={order.id}
              className=" flex flex-col border p-4 w-full gap-4"
            >
              <span>Order #{order.id.toString().slice(0, 5)}... - </span>
              <span>{order.paymentStatus}</span>
              <span>{order.paystack_reference}</span>
              <div className="flex gap-3">
                {order.order_items.map((item) => (
                  <div key={item.id}>
                    <p>{item.id}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {item.price}</p>
                    <p>Item: {item.product?.product_name}</p>
                    <Image
                      src={
                        item.product
                          ? item.product.image_url[0]
                          : "/assets/h.jpg"
                      }
                      alt={item.product_name}
                      width={50}
                      height={50}
                    />
                  </div>
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
