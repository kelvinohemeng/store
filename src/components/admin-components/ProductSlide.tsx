"use client";

import { submitNewProduct } from "@/actions/product";
import { useProductSlideState, useProductStore } from "@/store";
import { useRef, useState } from "react";
import ProductButton from "./ProductButton";
import imageCompression from "browser-image-compression";

export default function CreateProductSlide() {
  const categories = ["Electronics", "Fashion", "Home & Kitchen"];
  // const [selectedCategory, setSelectedCategory] = useState("");

  // const handleCategoryChange = (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   setSelectedCategory(event.target.value);
  // };

  const { state, setState } = useProductSlideState();
  const ref = useRef<HTMLFormElement>(null);
  const { fetchProducts, setisLoading } = useProductStore();
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);

    if (images.length + files.length > 3) {
      alert("You can only select up to 3 files.");
      return;
    }

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
      setisLoading(true);

      // const category = formData.get("category") as string;

      // Append all selected images to the FormData
      images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });
      // reset values

      await submitNewProduct(formData);

      fetchProducts();
    } catch (err: any) {
      alert(`Failed to create product: ${err.message}`);
    } finally {
      setState("");
      setImages([]);
      setPreviewUrls([]);
      setisLoading(false);
      ref?.current?.reset();
    }
  };
  return (
    <>
      {state == "create" && (
        <div
          onClick={() => setState("")}
          className="fixed inset-0 bg-slate-800 opacity-70"
        ></div>
      )}
      <div
        className={`max-w-[450px] p-6 w-full border fixed z-[99] right-0 h-full top-0 bg-white transform ${
          state === "create" ? "translate-x-[0%]" : "translate-x-[100%]"
        } transition-all duration-300`}
      >
        <div className="py-4 flex justify-end">
          <button onClick={() => setState("")}>
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
            <p>Select images for Products</p>
            <div id="product_image" className="flex gap-4">
              {/* Image Preview Section */}
              {/* {previewUrls.length > 0 && ( )} */}
              <div className="flex flex-wrap gap-3">
                {previewUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative aspect-square h-[90px] group transition duration-200 bg-slate-950 rounded-lg overflow-hidden"
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
                <label htmlFor="images" className=" flex flex-col gap-4">
                  <div className=" !cursor-pointer flex items-center justify-center relative h-[90px]  aspect-square bg-white  border-slate-400 rounded-lg before:absolute before:inset-0 before:bg-slate-100 before:rounded-xl before:hover:scale-110 before:transition before:duration-200">
                    <input
                      id="images"
                      type="file"
                      name="images"
                      multiple
                      accept="image/*"
                      className=" w-full h-full opacity-0 pointer-events-none absolute"
                      onChange={handleFileChange}
                    />
                    <div className="w-full h-full z-[99] grid place-items-center">
                      <span className="text-4xl">+</span>
                    </div>
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
                className=" border border-gray-400 p-3 text-lg w-full rounded-md"
                placeholder="Product Description"
              />
            </div>
          </label>
          <label htmlFor="product_description" className="space-y-3">
            <p>What is the price of the product</p>
            <div id="product_description">
              <input
                type="text"
                name="description"
                className=" border border-gray-400 p-3 text-lg w-full rounded-md"
                placeholder="Product Description"
                defaultValue={`GHC `}
              />
            </div>
          </label>
          <label htmlFor="product_type" className="space-y-3">
            <p>Select a category for your Product</p>
            <div id="product_type">
              <select
                name="category"
                className=" border border-gray-400 p-3 text-lg w-full rounded-md"
              >
                {categories.map((category) => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </label>
          <ProductButton />
        </form>
      </div>
    </>
  );
}
