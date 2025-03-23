import { OrderItem } from "@/lib/types";

export default function OrderProduct({ orderItem }: { orderItem: OrderItem }) {
  const { product } = orderItem;
  return (
    <div className="flex flex-col gap-2 max-w-[150px] w-full h-full">
      <img
        className=" max-h-[300px] h-full w-full object-cover rounded-[4px]"
        src={product?.image_url[0]}
        alt=""
      />
      <span>{product?.product_name}</span>
      <span>GHC {product?.product_price}</span>
    </div>
  );
}
