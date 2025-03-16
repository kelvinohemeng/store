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

// Define TypeScript interfaces for our order data

export async function createOrder(orderData: OrderData) {
  const cookieStore = await cookies();
  try {
    cookieStore.set("pendingOrder", JSON.stringify(orderData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    // First, create the main order record
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: orderData.customerName,
        email: orderData.email,
        delivery_address: orderData.deliveryAddress,
        payment_status: orderData.paymentStatus,
        total_amount: orderData.totalAmount,
        created_at: new Date().toISOString(),
        order_notes: orderData.orderNotes,
      })
      .select("*")
      .single();

    if (orderError)
      throw new Error(`Order creation failed: ${orderError.message}`);
    if (!order) throw new Error("Order creation failed: No order returned.");

    // Then, create order items with variant information
    const orderItems = orderData.items.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      quantity: item.quantity,
      price: item.price,
      product_name: item.productName,
      product_image: item.productImage,
      variants: item.selectedVariants, // Store as JSONB in PostgreSQL
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
