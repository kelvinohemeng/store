"use client";

import React, { useEffect, useRef, useState } from "react";
import ProductButton from "./ProductButton";
import { useProductSlideState, useProductStore } from "@/store";
import { updateProduct } from "@/actions/product";
import imageCompression from "browser-image-compression";
import { Product } from "@/lib/types";
import Image from "next/image";

const UpdateProductSlide = ({ product }: { product: Product | null }) => {
  const { state, setState } = useProductSlideState();
  const ref = useRef<HTMLFormElement>(null);
  const { fetchProducts, setisLoading } = useProductStore();
  const [images, setImages] = useState<File[]>([]);
  const [initialPreviewUrls, setInitialPreviewUrls] = useState<string[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]); // Track deleted images

  useEffect(() => {
    if (product) {
      setInitialPreviewUrls(product.image_url || []);
      // Initialize other form fields if needed
    }
  }, [product]);

  const allPreviews = [...initialPreviewUrls, ...previewUrls];

  // handle update change
  const handleUpdateImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);

    // Calculate remaining slots (max 3 total)
    const remainingSlots = 3 - initialPreviewUrls.length;

    if (files.length > remainingSlots) {
      alert(`You can only upload ${remainingSlots.toString()} more image(s).`);
      return;
    }

    const compressedImages = await Promise.all(
      files.map(async (file) => {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };
        const compressedBlob = await imageCompression(file, options);

        const fileExt = file.name.split(".").pop() || "jpeg";
        return new File([compressedBlob], `${file.name}`, {
          type: `image/${fileExt}`,
        });
      })
    );

    setImages((prev) => [...prev, ...compressedImages]);

    // Ensure new previews are generated properly
    // const newPreviews = compressedImages.map((file) =>
    //   URL.createObjectURL(file)
    // );
    setPreviewUrls((prev) => [
      ...prev,
      ...compressedImages.map((file) => URL.createObjectURL(file)),
    ]);
  };

  // Ensure removal affects both state variables
  const removeImage = (index: number) => {
    if (index < initialPreviewUrls.length) {
      // Remove from existing images (need server-side handling)
      const removedUrl = initialPreviewUrls[index];
      setRemovedImages((prev) => [...prev, removedUrl]); // Track it
      setInitialPreviewUrls((prev) => prev.filter((_, i) => i !== index));
    } else {
      // Remove from new uploads
      const newIndex = index - initialPreviewUrls.length;
      setImages((prev) => prev.filter((_, i) => i !== newIndex));
      setPreviewUrls((prev) => prev.filter((_, i) => i !== newIndex));
    }
  };

  //server action

  const updateAction = async (formData: FormData) => {
    try {
      setisLoading(true);

      // Append removed images (so the server knows which ones to delete)
      removedImages.forEach((url) => formData.append("removedImages", url));

      // Append all selected images to the FormData
      initialPreviewUrls.forEach((url) =>
        formData.append("existingImages", url)
      );
      images.forEach((image) => {
        formData.append("images", image);
      });
      // reset values
      if (product?.id) {
        await updateProduct(product.id, formData);
        fetchProducts();
        setState("");
      }
    } catch (err: any) {
      alert(`Failed to create product: ${err?.message}`);
    } finally {
      setImages([]);
      setPreviewUrls([]);
      setisLoading(false);
      ref?.current?.reset();
    }
  };

  return (
    <>
      {state === "update" && (
        <div
          onClick={() => setState("")}
          className="fixed inset-0 bg-slate-800 opacity-70"
        ></div>
      )}
      <div
        className={`max-w-[450px] p-6 w-full border absolute z-[99] right-0 h-full top-0 bg-white transform ${
          state === "update" ? "translate-x-[0%]" : "translate-x-[100%]"
        } transition-all duration-300`}
      >
        <div className="py-4 flex justify-end">
          <button onClick={() => setState("")}>
            <p>close menu</p>
          </button>
        </div>
        <h1 className="text-2xl mb-6">Update Product</h1>
        <hr />
        <form
          ref={ref}
          action={updateAction}
          className="mt-6 min-w-full flex flex-col gap-4 "
        >
          <label htmlFor="product_name" className="space-y-3">
            <p>What is the name of this Product?</p>
            <div id="product_name">
              <input
                type="text"
                name="name"
                defaultValue={product?.product_name}
                className=" border border-gray-400 p-3 text-lg w-full rounded-md"
              />
            </div>
          </label>
          <div className="space-y-3 h-full">
            <p>Select images for Products</p>
            <div id="product_image" className="flex gap-4">
              {/* Image Preview Section */}
              {/* {previewUrls.length > 0 && ( )} */}
              <div className="flex flex-wrap gap-3">
                {allPreviews.map((url, index) => (
                  <div
                    key={index}
                    className="relative aspect-square h-[90px] group transition duration-200 bg-slate-950 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={url}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover border group-hover:opacity-80"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 bg-red-500 text-white text-sm h-5 w-5 rounded-full opacity-0 group-hover:opacity-100"
                      onClick={() => removeImage(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <label htmlFor="images" className=" flex flex-col gap-4">
                  <div className=" !cursor-pointer flex items-center justify-center relative h-[90px]  aspect-square border border-slate-400 rounded-lg">
                    <input
                      id="images"
                      type="file"
                      name="images"
                      multiple
                      accept="image/*"
                      className=" w-full h-full opacity-0 pointer-events-none absolute"
                      onChange={handleUpdateImageChange}
                    />
                    <span className="text-4xl">+</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <label htmlFor="product_description" className="space-y-3">
            <p>Please descibe your Product</p>
            <div id="product_description">
              <input
                type="text"
                name="description"
                defaultValue={product?.product_description}
                className=" border border-gray-400 p-3 text-lg w-full rounded-md"
                placeholder="Product Description"
              />
            </div>
          </label>
          <label htmlFor="product_type" className="space-y-3">
            <p>Select a category for your Product</p>
            <div id="product_type">
              <input
                type="text"
                name="type"
                defaultValue={product?.product_type}
                className=" border border-gray-400 p-3 text-lg w-full rounded-md"
                placeholder="Product Type"
              />
            </div>
          </label>
          <ProductButton
            text="Update Product"
            pendingText="Your Product is Updating"
          />
        </form>
      </div>
    </>
  );
};

export default UpdateProductSlide;
