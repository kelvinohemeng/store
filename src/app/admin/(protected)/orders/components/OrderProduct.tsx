import { formatCurrencyGHC } from "@/Helpers";
import { OrderItem, Product } from "@/lib/types";
import Image from "next/image";

export default function OrderProduct({ orderItem }: { orderItem: OrderItem }) {
  const { product_name, image_url, product_price } =
    orderItem.product as Product;

  const formattedPrice = formatCurrencyGHC(product_price);
  return (
    <div className="flex gap-3 w-full h-full border border-neutral-200 p-2.5 items-center rounded-md hover:bg-neutral-50 transition-colors">
      <div className="relative size-11 bg-neutral-100 aspect-square rounded-md overflow-hidden shrink-0">
        {image_url[0] && (
          <Image
            className="object-cover"
            src={image_url[0]}
            alt=""
            fill
            sizes="44px"
          />
        )}
      </div>
      <div className="flex flex-col gap-1.5 w-full min-w-0">
        <span className="text-sm font-medium text-neutral-900 truncate">
          {product_name}
        </span>
        <div className="flex flex-wrap gap-1.5">
          <span className="text-xs px-2 py-0.5 border border-neutral-200 rounded-md bg-white text-neutral-600">
            {formattedPrice}
          </span>
          <span className="text-xs px-2 py-0.5 border border-neutral-200 rounded-md bg-white text-neutral-600">
            {orderItem.quantity} {orderItem.quantity >= 0 ? "piece" : "pieces"}
          </span>
          {orderItem.variants?.size && (
            <span className="text-xs px-2 py-0.5 border border-neutral-200 rounded-md bg-white text-neutral-600">
              {orderItem.variants?.size}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
