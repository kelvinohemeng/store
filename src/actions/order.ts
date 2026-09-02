"use server";
// Creating the orders

import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { getDb } from "@/db";
import { orders, orderItems } from "@/db/schema";
import { OrderData } from "@/lib/types";

// fields required
// Name
// Email
// Product/Product
// Quantity
// Delivery location Details
// Payment status

export const storePendingOrder = async (orderData: OrderData) => {
  const cookieStore = await cookies();
  cookieStore.set("pendingOrder", JSON.stringify(orderData), {
    httpOnly: true, // Server-only access
    secure: process.env.NODE_ENV === "production", // Use secure in production
    path: "/",
  });

  return { success: true };
};

export const checkExistingOrder = async (paystackReference: string) => {
  try {
    const db = getDb();
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.paystack_reference, paystackReference));

    return order ?? null;
  } catch (error) {
    console.error("Unexpected error checking existing order:", error);
    return null;
  }
};

export async function createOrder(orderData: OrderData) {
  try {
    const db = getDb();

    const [order] = await db
      .insert(orders)
      .values({
        customer_name: orderData.customer_name,
        email: orderData.email!,
        paystack_reference: orderData.paystack_reference,
        delivery_address: orderData.delivery_address,
        payment_status: orderData.payment_status,
        total_amount: orderData.total_amount,
        order_note: orderData.order_note ?? "Order Note from Customer",
      })
      .returning();

    if (!order) throw new Error("Order creation failed: No order returned.");

    console.log("Order created:", order);

    if (orderData.order_items.length) {
      await db.insert(orderItems).values(
        orderData.order_items.map((item) => ({
          order_id: order.id,
          product_id: item.product_id ? Number(item.product_id) : null,
          price: item.price,
          quantity: item.quantity,
          variants: item.variants,
        }))
      );
    }

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create order",
    };
  }
}

export async function getOrdersByEmail(email: string) {
  try {
    const db = getDb();
    const rows = await db.query.orders.findMany({
      where: eq(orders.email, email),
      with: { order_items: { with: { product: true } } },
    });

    return { success: true, orders: rows };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { success: false, error: "Failed to fetch orders" };
  }
}

export async function updateOrderStatus(
  orderId: string | number,
  order_status: "pending" | "delivered" | any
) {
  try {
    const db = getDb();
    await db
      .update(orders)
      .set({ order_status })
      .where(eq(orders.id, Number(orderId)));

    return { success: true };
  } catch (error) {
    console.error("Error updating order status:", error);
    return { success: false, error: "Failed to update order status" };
  }
}

export async function getAllOrders() {
  try {
    const db = getDb();
    const rows = await db.query.orders.findMany({
      with: { order_items: { with: { product: true } } },
    });

    return (rows as unknown as OrderData[]) || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
}
