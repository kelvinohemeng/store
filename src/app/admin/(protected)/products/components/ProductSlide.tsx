"use client";

import { submitNewProduct } from "@/actions/product";
import { useSlide } from "@/store";
import { useRef, useState } from "react";
import ProductButton from "./ProductButton";
import imageCompression from "browser-image-compression";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { invalidateQueryKey } from "@/Helpers";
import { toast } from "react-toastify";
import { SlideHeading } from "@/components/_slideComponents";

export default function CreateProductSlide() {
  const queryClient = useQueryClient(); // Add this line

  const categories = ["Apparel", "Shoe", "Glasses"];
  // const [selectedCategory, setSelectedCategory] = useState("");

  // const handleCategoryChange = (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   setSelectedCategory(event.target.value);
  // };

  const { state, setState } = useSlide();
  const ref = useRef<HTMLFormElement>(null);
  // const { fetchProducts, setisLoading } = useProductStore();
  const [images, setImages] = useState<File[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);

  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  // Tracked per-file but not rendered anywhere yet — no progress-bar UI
  // exists to read it. Kept (rather than dropped) so wiring one up later is
  // additive instead of re-threading this tracking back in.
  const [, setUploadProgress] = useState<number[]>([]);

  // function to handle size changes
  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sizeArray = event.target.value.split(",").map((size) => size.trim());
    setSizes(sizeArray);
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;

    const files = Array.from(event.target.files);

    if (images.length + files.length > 3) {
      alert("You can only select up to 3 files.");
      return;
    }

    // Initialize progress for new uploads
    setUploadProgress((prev) => [...prev, ...files.map(() => 0)]);

    // Compress images before uploading
    const compressedImages = await Promise.all(
      files.map(async (file, index) => {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
          onProgress: (progress: number) => {
            setUploadProgress((prev) => {
              const newProgress = [...prev];
              newProgress[images.length + index] = progress;
              return newProgress;
            });
          },
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
    setImages((prev) => prev.filter((_, i) => i !== index));
    setUploadProgress((prev) => prev.filter((_, i) => i !== index));
  };

  const submitAction = async (formData: FormData) => {
    try {
      // const category = formData.get("category") as string;

      // Append all selected images to the FormData
      images.forEach((image, index) => {
        formData.append(`images[${index}]`, image);
      });

      formData.append("sizes", JSON.stringify(sizes));

      await submitNewProduct(formData);
      toast.success("Product created successfully");
      //
    } catch (err: any) {
      alert(`Failed to create product: ${err.message}`);
      toast.error("Error creating product, please try again later");
    } finally {
      setState("");
      setImages([]);
      setPreviewUrls([]);
      ref?.current?.reset();
      await invalidateQueryKey(queryClient, "products");
    }
  };
  return (
    <>
      {state == "create" && (
        <div
          onClick={() => setState("")}
          className="fixed inset-0 bg-neutral-900/30 z-[98]"
        ></div>
      )}
      <div
        className={`overflow-y-scroll max-w-[450px] p-6 w-full border-l border-neutral-200 fixed z-[99] right-0 h-full top-0 bg-white transform ${
          state === "create" ? "translate-x-[0%]" : "translate-x-[100%]"
        } transition-all duration-300`}
      >
        <SlideHeading title="Create a New Product" />
        <form
          ref={ref}
          action={submitAction}
          className="min-w-full flex flex-col gap-4"
        >
          <label htmlFor="product_name" className="space-y-2 py-2">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Product Name
            </p>
            <div id="product_name">
              <Input
                type="text"
                name="name"
                required
                className="h-auto p-2.5 text-sm"
                placeholder="Product Name"
              />
            </div>
          </label>

          <div className="space-y-2 h-full py-2">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Select images for Products
            </p>
            <div id="product_image" className="flex gap-4">
              <div className="flex flex-wrap gap-3">
                {previewUrls.map((url, index) => (
                  <div
                    key={index}
                    className="relative aspect-square h-[90px] group transition duration-200 bg-neutral-900 rounded-md overflow-hidden"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element --
                        transient local blob: preview of a not-yet-uploaded
                        file; not a remote/static asset next/image can
                        optimize, and it's gone as soon as the form submits */}
                    <img
                      src={url}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover group-hover:opacity-80"
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
                <label htmlFor="images" className="flex flex-col gap-4 cursor-pointer">
                  <div className="flex items-center justify-center relative h-[90px] aspect-square border border-dashed border-neutral-300 rounded-md text-neutral-400 hover:border-neutral-400 transition-colors">
                    <input
                      id="images"
                      type="file"
                      name="images"
                      multiple
                      required
                      accept="image/*"
                      className="w-full h-full opacity-0 pointer-events-none absolute"
                      onChange={handleFileChange}
                    />
                    <div className="w-full h-full z-[99] grid place-items-center">
                      <span className="text-2xl">+</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <label htmlFor="product_description" className="space-y-2 py-2">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Product Description
            </p>
            <div>
              <textarea
                id="product_description"
                name="description"
                required
                className="border border-neutral-200 p-2.5 text-sm w-full rounded-md min-h-[100px] focus:border-neutral-900/60 outline-none"
                placeholder="Product Description"
              />
            </div>
          </label>

          {/* stock and price */}
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
                  required
                  className="text-sm w-full focus:outline-none focus:border-transparent"
                  placeholder="Product Price"
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
                required
                className="border border-neutral-200 p-2.5 text-sm w-full rounded-md focus:border-neutral-900/60 outline-none"
                placeholder="Product Description"
                defaultValue={`100`}
              />
            </div>
          </label>

          <label htmlFor="product_type" className="space-y-2 py-2">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Select Product Category
            </p>
            <div id="product_type">
              <select
                name="category"
                required
                className="border border-neutral-200 p-2.5 text-sm w-full rounded-md focus:border-neutral-900/60 outline-none"
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
                required
                name="sizes"
                className="border border-neutral-200 p-2.5 text-sm w-full rounded-md focus:border-neutral-900/60 outline-none"
                placeholder="e.g., S, M, L, XL"
                onChange={handleSizeChange}
              />
            </div>
          </label>

          <ProductButton type="primary" />
        </form>
      </div>
    </>
  );
}
