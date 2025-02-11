"use client";

import { submitNewProduct } from "@/actions";
import { useProductSlideState, useProductStore } from "@/store";
import { useRef, useState } from "react";
import ProductButton from "./ProductButton";
import imageCompression from "browser-image-compression";

export default function CreateProductSlide() {
  const { state, setState } = useProductSlideState();
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
    } finally {
      setState(false);
    }
  };
  return (
    <div
      className={`max-w-[450px] p-6 w-full border absolute right-0 h-full top-0 bg-white transform ${
        state ? "translate-x-[0%]" : "translate-x-[100%]"
      } transition-all duration-300`}
    >
      <div className="py-4 flex justify-end">
        <button onClick={() => setState(false)}>
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
          <p>What is the name of this Product?</p>
          <div id="product_name">
            <input
              type="text"
              name="name"
              className=" border border-gray-400 p-3 text-lg w-full rounded-md"
              placeholder="Product Name"
            />
          </div>
        </label>
        <div className="space-y-3 h-full">
          <label htmlFor="images" className=" flex flex-col gap-4">
            <p>Select images for Products</p>
            <div id="product_image" className="flex gap-4">
              {/* Image Preview Section */}
              {/* {previewUrls.length > 0 && ( )} */}
              <div className="flex flex-wrap gap-3">
                {previewUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative aspect-square h-[90px] group transition duration-200 bg-slate-950 rounded-md"
                  >
                    <img
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

                <span className=" !cursor-pointer grid place-items-center relative h-[90px]  aspect-square border border-slate-400 rounded-lg">
                  <input
                    id="images"
                    type="file"
                    name="images"
                    multiple
                    accept="image/*"
                    className=" absolute top-0 left-0 w-full h-full inset-0 opacity-0"
                    onChange={handleFileChange}
                  />
                  <span className="text-4xl">+</span>
                </span>
              </div>
            </div>
          </label>
        </div>
        <label htmlFor="product_description" className="space-y-3">
          <p>Please descibe your Product</p>
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
          <p>Select a category for your Product</p>
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
