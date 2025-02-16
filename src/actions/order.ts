// Creating the orders

import { Order } from "@/lib/types";
import { supabase } from "@/lib/utils/supabase";

// fields required
// Name
// Email
// Product/Product
// Quantity
// Delivery location Details
// Payment status

// Define TypeScript interfaces for our order data
interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

interface OrderData {
  customerName: string;
  email: string;
  items: OrderItem[];
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentStatus: "pending" | "completed" | "failed";
}

export async function createOrder(orderData: OrderData) {
  try {
    // First, create the main order record
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: orderData.customerName,
        email: orderData.email,
        delivery_address: orderData.deliveryAddress,
        payment_status: orderData.paymentStatus,
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Then, create order items for each product
    const orderItems = orderData.items.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      quantity: item.quantity,
      price: item.price,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error: "Failed to create order" };
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
          product:products (*)
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

export async function getAllOrders(): Promise<{
  success: boolean;
  orders?: Order[];
  error?: string;
}> {
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
    return { success: true, orders: orders as Order[] };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { success: false, error: "Failed to fetch orders" };
  }
}
