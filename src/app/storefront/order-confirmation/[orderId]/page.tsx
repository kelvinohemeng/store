// import { Order } from "@/lib/types";

export default async function OrderConfirmation({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const orderId = (await params).orderId;

  async function fetchOrder(id: string) {
    const response = await fetch("http://ecomara.netlify.app/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }), // ✅ Send ID in body
    });

    const data = await response.json();
    console.log("Fetched order:", data);
    return data.order;
  }

  const order = await fetchOrder(orderId);

  return (
    <div>
      <h1>Order Confirmation</h1>
      <p>Order ID: {orderId}</p>
      <pre>{JSON.stringify(order, null, 2)}</pre>
      <p>{order?.status}</p>
    </div>
  );
}
