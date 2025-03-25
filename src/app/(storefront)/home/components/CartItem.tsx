"use client";

import { Product } from "@/lib/types";
import { useCartStore } from "@/store";
import { Minus, Plus, X } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

function CartItem({ item, index }: { item: Product; index: number | string }) {
  const { addItem, removeItem, removeItemById, items } = useCartStore();

  // Local state for variant selection in cart
  const [isSelectingSize, setIsSelectingSize] = useState(false);
  const [selectedSize, setSelectedSize] = useState(item.selectedSize || "");

  // Update local state when item changes
  useEffect(() => {
    setSelectedSize(item.selectedSize || "");
  }, [item.selectedSize]);

  const getVariantKey = (item: Product, size: string) =>
    `${item.id}-${size}-${item.selectedColor || ""}`;

  // Handle size selection
  const handleSizeSelect = (size: string) => {
    // Compute the variant key for the new size
    const variantKey = getVariantKey(item, size);

    // Find an existing cart item that matches this variant
    const existingVariant = items.find((cartItem) => {
      const cartItemKey = `${cartItem.id}-${cartItem.selectedSize}-${
        cartItem.selectedColor || ""
      }`;
      return cartItemKey === variantKey;
    });

    if (existingVariant) {
      // If a matching variant exists, merge quantities
      const newQuantity = existingVariant.quantity + item.quantity;
      const updatedVariant = { ...existingVariant, quantity: newQuantity };

      // Remove the current quick add item (which might have no size) and update the existing variant
      // Pass the current item's selectedSize to properly identify the variant
      removeItemById(item.id, item.selectedSize);
      addItem(updatedVariant, { size });

      console.log("Merged quantities. New quantity:", newQuantity);
    } else {
      // No matching variant exists: treat it as a new variant
      const updatedItem = { ...item, selectedSize: size };
      // Pass the current item's selectedSize to properly identify the variant

      removeItemById(item.id, item.selectedSize);
      addItem(updatedItem, { size });

      console.log("Created new variant:", size);
    }

    setIsSelectingSize(false);
  };

  return (
    <motion.div
      layout
      key={index}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }} // Animate out when removed
      transition={{ duration: 0.3 }}
      className="flex gap-3 py-3 p-8 rounded-xl"
    >
      <div className="flex items-center gap-4 rounded-[6px] overflow-hidden">
        <img
          className="max-w-[120px] aspect-[1/1.6] w-full object-cover object-center"
          src={item.image_url[0]}
          alt=""
        />
      </div>

      <div className="flex flex-col justify-between w-full min-h-full">
        <div className="flex justify-between">
          <p>{item.product_name}</p>
          <p>GHC {item.product_price.toFixed(2)}</p>
        </div>

        <div className="flex flex-col gap-2">
          {/* Size selector */}
          <div className="flex flex-col">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Size</span>
              {!isSelectingSize && (
                <button
                  onClick={() => setIsSelectingSize(true)}
                  className="text-xs text-blue-500 underline cursor-pointer hover:text-blue-700 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                >
                  Change
                </button>
              )}
            </div>

            {isSelectingSize ? (
              <div className="flex flex-wrap gap-2 mt-1">
                {item.sizes &&
                  item.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelect(size)}
                      className={`px-2 py-1 text-xs border-black/50 rounded cursor-pointer ${
                        size === selectedSize
                          ? "bg-black text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
              </div>
            ) : (
              <span className="font-medium">
                {item.selectedSize || "Select a size"}
              </span>
            )}
          </div>

          {/* Color display */}
          {item.selectedColor && (
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">Color</span>
              <span className="font-medium">{item.selectedColor}</span>
            </div>
          )}

          {/* Quantity controls */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 bg-black/5 rounded-[4px] px-2 py-1 ">
              <button
                className="cursor-pointer"
                title="add"
                onClick={() =>
                  addItem(item, {
                    size: item.selectedSize,
                    color: item.selectedColor,
                  })
                }
              >
                <Plus size={12} />
              </button>
              <p>{item.quantity}</p>
              <button
                className="cursor-pointer"
                title="minus"
                onClick={() => removeItem(item.id)}
              >
                <Minus size={12} />
              </button>
            </div>
            <button
              title="remove_item"
              className="bg-black/5 rounded-[4px] p-2 cursor-pointer"
              onClick={() => removeItemById(item.id, item.selectedSize)}
            >
              <X size={12} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CartItem;
