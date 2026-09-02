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

export default function CreateProductSlide() {
  const queryClient = useQueryClient(); // Add this line

  const categories = ["Dress", "Shoe", "Glasses"];
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
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);

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
          className="fixed inset-0 bg-slate-800 opacity-30"
        ></div>
      )}
      <div
        className={`overflow-y-scroll max-w-[450px] p-6 w-full border fixed z-[99] right-0 h-full top-0 bg-white transform ${
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
          <label htmlFor="product_name" className="space-y-3 py-3">
            <p>What is the name of this Product?</p>
            <div id="product_name">
              {/* <input
                type="text"
                name="name"
                className=" border border-gray-400 p-3 text-lg w-full rounded-md"
                placeholder="Product Name"
              /> */}
              <Input
                type="text"
                name="name"
                required
                className="h-auto p-3"
                placeholder="Product Name"
              />
            </div>
          </label>

          <div className="space-y-3 h-full py-3">
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
                      required
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

          <label htmlFor="product_description" className="space-y-3 py-3">
            <p>Please descibe your Product</p>
            <div>
              <textarea
                id="product_description"
                name="description"
                required
                className=" border border-gray-200 p-3 text-lg w-full rounded-md min-h-[100px] shadow-sm"
                placeholder="Product Description"
              />
            </div>
          </label>

          {/* stock and price */}
          <div className="flex justify-center gap-3 py-3">
            <label htmlFor="product_price" className="space-y-3">
              <p>Product Price</p>
              <div className="flex items-center gap-2 border border-gray-200 shadow-sm p-3 text-lg w-full rounded-md focus:outline-none focus:border-transparent">
                <span>GHC</span>
                <input
                  id="product_price"
                  type="number"
                  name="price"
                  required
                  className="text-lg w-full focus:outline-none focus:border-transparent "
                  placeholder="Product Price"
                />
              </div>
            </label>
            <label htmlFor="compare_price" className="space-y-3">
              <p>Compare Price</p>
              <div className="flex items-center gap-2 border border-gray-200 shadow-sm p-3 text-lg w-full rounded-[4px] focus:outline-none focus:border-gray-900/50">
                <span>GHC</span>
                <input
                  id="compare_price"
                  type="number"
                  name="compare_price"
                  className="text-lg w-full focus:outline-none focus:border-transparent "
                  placeholder="Compare Price"
                />
              </div>
            </label>
          </div>
          <label htmlFor="stock" className="space-y-3">
            <p>Available in Stock</p>
            <div>
              <input
                id="stock"
                type="number"
                name="stock"
                required
                className=" border border-gray-200 shadow-sm p-3 text-lg w-full rounded-md"
                placeholder="Product Description"
                defaultValue={`100`}
              />
            </div>
          </label>

          <label htmlFor="product_type" className="space-y-3 py-3">
            <p>Select Product Category</p>
            <div id="product_type">
              <select
                name="category"
                required
                className=" border border-gray-200 shadow-sm p-3 text-lg w-full rounded-md"
              >
                {categories.map((category) => (
                  <option key={category} value={category.toLowerCase()}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </label>

          <label htmlFor="product_sizes" className="space-y-3 py-3">
            <p>Available Sizes (comma-separated)</p>
            <div>
              <input
                id="product_sizes"
                type="text"
                required
                name="sizes"
                className="border border-gray-200 shadow-sm p-3 text-lg w-full rounded-md"
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
