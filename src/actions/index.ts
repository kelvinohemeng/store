"use server";

import { supabase } from "@/lib/utils/supabase";

// create/submit a new product
export const submitNewProduct = async (formData: FormData) => {
  const name = formData.get("name");
  const description = formData.get("description");
  const type = formData.get("type");
  const imageFiles = formData.getAll("images") as File[]; // Get multiple images
  const category = formData.get("category") as string; // Get the category value

  if (!imageFiles.length) {
    return { success: false, error: "At least one image is required" };
  }

  // Upload multiple images and return their URLs
  const uploadProductImages = async (files: File[]) => {
    const uploadedImageUrls: string[] = [];

    const uniqueFiles = new Map(); // To prevent duplicates

    for (const file of files) {
      const fileExt = file.name.split(".").pop() || "jpeg";

      if (uniqueFiles.has(file.name)) continue;
      uniqueFiles.set(file.name, true);

      const fileName = `product_${Date.now()}_${Math.random()
        .toString(36)
        .slice(2)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      //upload file
      const { data, error } = await supabase.storage
        .from("product_images")
        .upload(filePath, file, { cacheControl: "3600", upsert: false });

      if (error) {
        console.error("Upload Error:", error.message);
        throw new Error(`Image upload failed: ${error.message}`);
      }

      // Get the public URL
      const imageUrl = supabase.storage
        .from("product_images")
        .getPublicUrl(filePath).data.publicUrl;

      uploadedImageUrls.push(imageUrl);
    }

    return uploadedImageUrls;
  };

  try {
    const imageUrls = await uploadProductImages(imageFiles);

    // Insert into database (store as JSON array)
    const { data, error } = await supabase
      .from("Products")
      .insert([
        {
          product_name: name,
          product_description: description,
          product_type: category,
          image_url: imageUrls, // Store array of image URLs
        },
      ])
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (e) {
    console.error("Error creating product:", e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
};

// delete product from table
export const deleteProduct = async (id: string | number | undefined) => {
  const { error } = await supabase.from("Products").delete().eq("id", id);
};

//update product from table

export const updateProduct = async (
  id: string | number | undefined,
  formData: FormData
) => {
  if (!id) return { success: false, error: "Product ID is required" };

  const name = formData.get("name");
  const description = formData.get("description");
  const type = formData.get("type");
  const imageFiles = formData.getAll("images") as File[];
  const removedImages = formData.getAll("removedImages") as string[];
  const existingImages = formData.getAll("existingImages") as string[];

  try {
    const deletePromises = removedImages.map(async (url) => {
      // Extract path from URL (adjust based on your URL structure)
      const path = url.split("/product_images/")[1];
      const { error } = await supabase.storage
        .from("product_images")
        .remove([path]);

      if (error) console.error("Delete failed for:", path, error.message);
    });

    await Promise.all(deletePromises);

    let newImageUrls: string[] = [];
    if (imageFiles.length > 0) {
      newImageUrls = await uploadProductImages(imageFiles);
    }

    const { data, error } = await supabase
      .from("Products")
      .update({
        product_name: name,
        product_description: description,
        product_type: type,
        image_url: [...existingImages, ...newImageUrls],
      })
      .eq("id", id)
      .select();

    if (error) throw error;
    return { success: true, data };
  } catch (e) {
    console.error("Update failed:", e);
    return {
      success: false,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
};

const uploadProductImages = async (files: File[]) => {
  const uploadedImageUrls: string[] = [];
  const uniqueFiles = new Map();

  for (const file of files) {
    const fileExt = file.name.split(".").pop() || "jpeg";
    if (uniqueFiles.has(file.name)) continue;
    uniqueFiles.set(file.name, true);

    const fileName = `product_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2)}.${fileExt}`;
    const filePath = `products/${fileName}`;

    const { error } = await supabase.storage
      .from("product_images")
      .upload(filePath, file, { cacheControl: "3600", upsert: false });

    if (error) throw new Error(`Image upload failed: ${error.message}`);

    const imageUrl = supabase.storage
      .from("product_images")
      .getPublicUrl(filePath).data.publicUrl;

    uploadedImageUrls.push(imageUrl);
  }

  return uploadedImageUrls;
};

// const updateExistingProductImages = async (paths: string[]) => {
//   const { data, error } = await supabase.storage
//     .from("product_images")
//     .update("public/avatar1.png", replacedFiles, {
//       cacheControl: "3600",
//       upsert: true,
//     });
// };
