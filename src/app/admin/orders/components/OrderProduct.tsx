import { formatCurrencyGHC } from "@/Helpers";
import { OrderItem, Product } from "@/lib/types";

export default function OrderProduct({ orderItem }: { orderItem: OrderItem }) {
  const { product_name, image_url, product_price, quantity } =
    orderItem.product as Product;

  const formattedPrice = formatCurrencyGHC(product_price);
  return (
    <div className="flex gap-2 w-full h-full border border-black/10 p-2 items-center rounded-[8px] hover:bg-black/5">
      <div className="flex flex-col gap-2 w-full">
        <span>{product_name}</span>
        <div className="flex gap-2">
          <span className=" p-2 py-1 border border-black/10 rounded-[4px] bg-white">
            {formattedPrice}
          </span>
          <span className=" p-2 py-1 border border-black/10 rounded-[4px] bg-white">
            {orderItem.quantity} {orderItem.quantity >= 0 ? "piece" : "pieces"}
          </span>
          <span className=" p-2 py-1 border border-black/10 rounded-[4px] bg-white">
            {orderItem.variants?.size}
          </span>
        </div>
      </div>
      <div className="h-[50px] bg-red-400 aspect-square  rounded-[5px] shadow-md overflow-hidden">
        <img
          className="relative w-full h-full object-cover"
          src={image_url[0]}
          alt=""
        />
      </div>
    </div>
  );
}
