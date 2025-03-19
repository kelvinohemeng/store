"use server";
// Creating the orders

import { AdminOrderItemT, AdminOrderT, OrderData } from "@/lib/types";
import { supabase } from "@/lib/utils/supabase";
import { cookies } from "next/headers";

// fields required
// Name
// Email
// Product/Product
// Quantity
// Delivery location Details
// Payment status

export const storePendingOrder = async (orderData: any) => {
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
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("paystack_reference", paystackReference)
      .single(); // Fetch a single order

    if (error) {
      console.error("Error fetching existing order:", error.message);
      return null;
    }

    return data; // Return the existing order if found
  } catch (error) {
    console.error("Unexpected error checking existing order:", error);
    return null;
  }
};

export async function createOrder(orderData: OrderData) {
  try {
    // First, create the main order record
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: orderData.customer_name,
        email: orderData.email,
        paystack_reference: orderData.paystack_reference,
        delivery_address: orderData.deliveryAddress,
        payment_status: orderData.payment_status,
        total_amount: orderData.totalAmount,
        created_at: new Date().toISOString(),
        order_note: orderData.orderNotes ?? "Order Note from Customer",
      })
      .select("*")
      .single();

    if (orderError)
      throw new Error(`Order creation failed: ${orderError.message}`);
    if (!order) throw new Error("Order creation failed: No order returned.");

    console.log("Order created:", order);

    const orderItems = orderData.order_items.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      price: item.price,
      quantity: item.quantity,
      variants: item.variants,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError)
      throw new Error(`Order items creation failed: ${itemsError.message}`);

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
    const { data: orders, error } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items (
          *,
          product:Products (*)
        )
      `
      )
      .eq("email", email);

    if (error) throw error;
    return { success: true, orders };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { success: false, error: "Failed to fetch orders" };
  }
}

export async function updateOrderStatus(
  orderId: string,
  paymentStatus: "pending" | "completed" | "failed"
) {
  try {
    const { error } = await supabase
      .from("orders")
      .update({ payment_status: paymentStatus })
      .eq("id", orderId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error updating order status:", error);
    return { success: false, error: "Failed to update order status" };
  }
}

export async function getAllOrders() {
  try {
    const { data: orders, error } = await supabase.from("orders").select(
      `
        *,
        order_items (
          *,
          product:Products (*)
        )
      `
    );

    if (error) throw error;

    return (orders as AdminOrderT[]) || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error("Failed to fetch orders");
  }
}
