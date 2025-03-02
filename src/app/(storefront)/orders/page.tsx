"use client";

import { getOrdersByEmail } from "@/actions/order";
import { AdminOrderT } from "@/lib/types";
import { useUserData } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [orders, setOrders] = useState<AdminOrderT[] | undefined>([]); // Use null for better state handling
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
    console.log(storedUser?.email);
  }, [storedUser?.email]); // Only fetch when email is available

  return (
    <div>
      <h1>Your Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders && orders.length > 0 ? (
        <div className=" flex flex-col gap-6">
          {(orders as AdminOrderT[]).map((order) => (
            // <Link href={`/product/${order.order_items[0].product.id}`}>
            <div key={order.id} className=" flex gap-4">
              <span>Order #{order.id.toString().slice(0, 5)}... - </span>
              <span>{order.payment_status}</span>
              <div>
                {order.order_items.map((product) => (
                  <div key={product.id}>
                    <p>{product.id}</p>
                    <p>Quantity: {product.quantity}</p>
                    <p>Price: {product.price}</p>
                    <p>Item: {product.product.product_name}</p>
                    <Image
                      src={product.product.image_url[0]}
                      alt={product.product.product_name}
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
