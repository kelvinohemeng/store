"use client";

import React, { useRef, useState } from "react";
import ProductButton from "./ProductButton";
import { useSlide } from "@/store";
import { updateProduct } from "@/actions/product";
import imageCompression from "browser-image-compression";
import { Product } from "@/lib/types";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import { invalidateQueryKey } from "@/Helpers";
import { SlideHeading } from "@/components/_slideComponents";
import { toast } from "react-toastify";

const UpdateProductSlide = ({
  product,
}: {
  product: Product | undefined | null;
}) => {
  const queryClient = useQueryClient();

  const categories = ["Shoe", "Apparel", "Glasses"];
  const { state, setState } = useSlide();
  const ref = useRef<HTMLFormElement>(null);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>(
    product?.image_url || []
  );
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);

  // Reset the image draft when a different product is loaded into this
  // slide-over. Adjusted during render (React's recommended pattern for
  // "reset state when a prop changes") rather than in a useEffect, so the
  // reset is visible on the same render instead of causing a cascading
  // re-render — see https://react.dev/learn/you-might-not-need-an-effect
  const [lastProductId, setLastProductId] = useState(product?.id);
  if (product?.id !== lastProductId) {
    setLastProductId(product?.id);
    setExistingImages(product?.image_url || []);
  }

  // function to handle size changes
  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sizeArray = event.target.value.split(",").map((size) => size.trim());
    setSizes(sizeArray);
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);
    const totalImages = existingImages.length + newImages.length + files.length;

    if (totalImages > 3) {
      alert(
        `You can only have up to 3 images total. You can add ${
          3 - existingImages.length - newImages.length
        } more.`
      );
      return;
    }

    try {
      const compressedImages = await Promise.all(
        files.map(async (file) => {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1024,
            useWebWorker: true,
          };

          const compressedBlob = await imageCompression(file, options);
          const fileExtension =
            file.name.split(".").pop()?.toLowerCase() || "jpg";

          // Create a new filename with timestamp to avoid duplicates
          const timestamp = Date.now();
          const newFilename = `product-image-${timestamp}.${fileExtension}`;

          return new File([compressedBlob], newFilename, {
            type: `image/${fileExtension}`,
          });
        })
      );

      setNewImages((prev) => [...prev, ...compressedImages]);
    } catch (error) {
      console.error("Error processing images:", error);
      alert("Failed to process images. Please try again.");
    }
  };

  const removeExistingImage = (index: number) => {
    const imageUrl = existingImages[index];
    setImagesToDelete((prev) => [...prev, imageUrl]);
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const updateAction = async (formData: FormData) => {
    try {
      // Add images to be deleted
      imagesToDelete.forEach((url) => {
        formData.append("imagesToDelete", url);
      });

      // Add remaining existing images
      existingImages.forEach((url) => {
        formData.append("existingImages", url);
      });

      // Add new images
      newImages.forEach((file) => {
        formData.append("newImages", file);
      });

      if (!product?.id) {
        throw new Error("Product ID is missing");
      }

      //add new sizes
      formData.append("sizes", sizes.join(", "));

      const result = await updateProduct(product.id, formData);

      if (!result.success) {
        throw new Error(result.error);
      }

      setState("");

      // Reset states
      setNewImages([]);
      setExistingImages([]);
      setImagesToDelete([]);

      toast.success("Product updated successfully");
    } catch (err: any) {
      console.error("Update error:", err);
      alert(`Failed to update product: ${err?.message}`);
      toast.error("Failed to update product");
    } finally {
      ref.current?.reset();
      await invalidateQueryKey(queryClient, "products");
    }
  };

  return (
    <>
      {state === "update" && (
        <div
          onClick={() => setState("")}
          className="fixed inset-0 bg-neutral-900/30 z-[98]"
        ></div>
      )}
      <div
        className={`overflow-y-scroll max-w-[450px] p-6 w-full border-l border-neutral-200 absolute z-[99] right-0 h-full top-0 bg-white transform ${
          state === "update" ? "translate-x-[0%]" : "translate-x-[100%]"
        } transition-all duration-300`}
      >
        <SlideHeading title="Update Product" />

        <form
          ref={ref}
          action={updateAction}
          className="mt-2 min-w-full flex flex-col gap-4"
        >
          <label htmlFor="product_name" className="space-y-2 py-2">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Product Name
            </p>
            <div id="product_name">
              <input
                type="text"
                name="name"
                defaultValue={product?.product_name}
                className="border border-neutral-200 focus:border-neutral-900/60 outline-none p-2.5 text-sm w-full rounded-md"
              />
            </div>
          </label>

          <div className="space-y-2 h-full py-2">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Product Images (Max 3)
            </p>
            <div
              id="product_image"
              className="p-4 border border-neutral-200 rounded-md flex gap-4"
            >
              <div className="flex flex-wrap gap-3">
                {/* Existing Images */}
                {existingImages.map((url, index) => (
                  <div
                    key={`existing-${index}`}
                    className="relative aspect-square h-[90px] group transition duration-200 bg-neutral-900 rounded-md overflow-hidden"
                  >
                    <Image
                      src={url}
                      alt={`Product ${index + 1}`}
                      fill
                      className="object-cover group-hover:opacity-80"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white text-sm h-5 w-5 rounded-full opacity-0 group-hover:opacity-100"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                {/* New Images */}
                {newImages.map((file, index) => (
                  <div
                    key={`new-${index}`}
                    className="relative aspect-square h-[90px] group transition duration-200 bg-neutral-900 rounded-md overflow-hidden"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element --
                        transient local blob: preview of a not-yet-uploaded
                        file; not a remote/static asset next/image can
                        optimize, and it's gone as soon as the form submits */}
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`New upload ${index + 1}`}
                      className="w-full h-full object-cover group-hover:opacity-80"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white text-sm h-5 w-5 rounded-full opacity-0 group-hover:opacity-100"
                    >
                      ✕
                    </button>
                  </div>
                ))}

                {/* Upload Button */}
                {existingImages.length + newImages.length < 3 && (
                  <label className="flex flex-col gap-4 cursor-pointer">
                    <div className="flex items-center justify-center relative h-[90px] aspect-square border border-dashed border-neutral-300 rounded-md text-neutral-400 hover:border-neutral-400 transition-colors">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        className="w-full h-full opacity-0 absolute cursor-pointer"
                      />
                      <span className="text-2xl">+</span>
                    </div>
                  </label>
                )}
              </div>
            </div>
          </div>

          <label htmlFor="product_description" className="space-y-2 py-2">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Product Description
            </p>
            <div id="product_description">
              <textarea
                name="description"
                defaultValue={product?.product_description}
                className="border border-neutral-200 focus:border-neutral-900/60 outline-none p-2.5 text-sm w-full min-h-[120px] rounded-md h-auto resize-none"
              />
            </div>
          </label>

          <div className="flex justify-center gap-3 py-2">
            <label htmlFor="product_price" className="space-y-2 w-full">
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                Product Price
              </p>
              <div className="flex items-center gap-2 border border-neutral-200 p-2.5 text-sm w-full rounded-md focus-within:border-neutral-900/60">
                <span className="text-neutral-500">GHC</span>
                <input
                  id="product_price"
                  type="number"
                  name="price"
                  className="text-sm w-full focus:outline-none focus:border-transparent"
                  placeholder="Product Price"
                  defaultValue={product?.product_price?.toString()}
                />
              </div>
            </label>
            <label htmlFor="compare_price" className="space-y-2 w-full">
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
                Compare Price
              </p>
              <div className="flex items-center gap-2 border border-neutral-200 p-2.5 text-sm w-full rounded-md focus-within:border-neutral-900/60">
                <span className="text-neutral-500">GHC</span>
                <input
                  id="compare_price"
                  type="number"
                  name="compare_price"
                  className="text-sm w-full focus:outline-none focus:border-transparent"
                  placeholder="Compare Price"
                  defaultValue={product?.compare_price?.toString()}
                />
              </div>
            </label>
          </div>

          <label htmlFor="stock" className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Available in Stock
            </p>
            <div>
              <input
                id="stock"
                type="number"
                name="stock"
                className="border border-neutral-200 p-2.5 text-sm w-full rounded-md outline-none focus:border-neutral-900/60"
                placeholder="How many products are available"
                defaultValue={product?.quantity?.toString()}
              />
            </div>
          </label>

          <label htmlFor="product_type" className="space-y-2 py-2">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Select Product Type
            </p>
            <div id="product_type">
              <select
                name="type"
                className="border border-neutral-200 p-2.5 text-sm w-full rounded-md outline-none focus:border-neutral-900/60"
                defaultValue={product?.product_type}
              >
                {categories.map((category) => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label htmlFor="product_sizes" className="space-y-2 py-2">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Available Sizes (comma-separated)
            </p>
            <div>
              <input
                id="product_sizes"
                type="text"
                name="sizes"
                className="border border-neutral-200 p-2.5 text-sm w-full rounded-md focus:border-neutral-900/60 outline-none"
                placeholder="e.g., S, M, L, XL"
                defaultValue={product?.sizes?.join(", ")}
                onChange={handleSizeChange}
              />
            </div>
          </label>

          <ProductButton
            text="Update Product"
            pendingText="Updating Product..."
            type="primary"
          />
        </form>
      </div>
    </>
  );
};

export default UpdateProductSlide;
