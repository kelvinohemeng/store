"use client";

import { submitNewProduct } from "@/actions";
import { useProductStore } from "@/store";
import { useRef, useState } from "react";
import ProductButton from "./ProductButton";
import imageCompression from "browser-image-compression";

export default function CreateProductSlide() {
  const ref = useRef<HTMLFormElement>(null);
  const { fetchProducts } = useProductStore();
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);

    // Compress images before uploading
    const compressedImages = await Promise.all(
      files.map(async (file) => {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        };
        return await imageCompression(file, options);
      })
    );

    const newPreviews = compressedImages.map((file) =>
      URL.createObjectURL(file)
    );

    setImages((prev) => [...prev, ...compressedImages]);
    setPreviewUrls((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const submitAction = async (formData: FormData) => {
    try {
      // Append all selected images to the FormData
      images.forEach((image) => formData.append("images", image));

      ref?.current?.reset();

      // reset values
      setImages([]);
      setPreviewUrls([]);
      await submitNewProduct(formData);

      fetchProducts();
    } catch (err: any) {
      alert("Failed to create product");
    }
  };
  return (
    <div className="max-w-[450px] p-6 w-full border absolute right-0 h-full top-0 bg-white">
      <div className="py-4 flex justify-end">
        <button>
          <p>close menu</p>
        </button>
      </div>
      <h1 className="text-2xl mb-6">Create a New Product</h1>
      <hr />
      <form
        ref={ref}
        action={submitAction}
        className="mt-6 min-w-full flex flex-col gap-4 "
      >
        <label htmlFor="product_name" className="space-y-3">
          <span>What is the name of this Product?</span>
          <div id="product_name">
            <input
              type="text"
              name="name"
              className=" border border-gray-400 p-3 text-lg w-full rounded-md"
              placeholder="Product Name"
            />
          </div>
        </label>
        <label htmlFor="product_image" className="space-y-3">
          <span>What is the name of this Product?</span>
          <div id="product_image">
            <input
              type="file"
              name="images"
              multiple
              accept="image/*"
              className=" border border-gray-400 p-3 text-lg w-full rounded-md"
              onChange={handleFileChange}
            />
            {/* Image Preview Section */}
            {previewUrls.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {previewUrls.map((url, index) => (
                  <div key={index} className="relative w-20 h-20">
                    <img
                      src={url}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover rounded-md border"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                      onClick={() => removeImage(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </label>
        <label htmlFor="product_description" className="space-y-3">
          <span>Please descibe your Product</span>
          <div id="product_description">
            <input
              type="text"
              name="description"
              className=" border border-gray-400 p-3 text-lg w-full rounded-md"
              placeholder="Product Description"
            />
          </div>
        </label>
        <label htmlFor="product_type" className="space-y-3">
          <span>Select a category for your Product</span>
          <div id="product_type">
            <input
              type="text"
              name="type"
              className=" border border-gray-400 p-3 text-lg w-full rounded-md"
              placeholder="Product Type"
            />
          </div>
        </label>
        <ProductButton />
      </form>
    </div>
  );
}
