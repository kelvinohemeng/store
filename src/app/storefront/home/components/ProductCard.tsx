"use client";

import { PaystackProduct, Product } from "@/lib/types";
import { useCartStore } from "@/store";

type ProdcutCardT = {
  product: Product;
};
const ProductCard = ({ product }: ProdcutCardT) => {
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(product);
  };

  //   const handleBuy = () => {
  //     window.location.href = `https://paystack.com/buy/${product.slug}`;
  //   };

  return (
    <div className="product-card">
      <img
        className="max-w-[250px]"
        src={product.image_url[0]}
        alt={product.image_url[0]}
      />
      <h3>{product.product_name}</h3>
      <p>$ {((product.product_price * 100) / 100).toFixed(2)}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
