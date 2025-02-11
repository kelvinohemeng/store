"use server";

import { supabase } from "@/lib/utils/supabase";

export const submitNewProduct = async (formData: FormData) => {
  const name = formData.get("name");
  const description = formData.get("description");
  const type = formData.get("type");
  const imageFiles = formData.getAll("images") as File[]; // Get multiple images

  if (!imageFiles.length) {
    return { success: false, error: "At least one image is required" };
  }

  // Upload multiple images and return their URLs
  const uploadProductImages = async (files: File[]) => {
    const uploadedImageUrls: string[] = [];

    for (const file of files) {
      const fileExt = file.name.split(".").pop();
      const fileName = `product_${Date.now()}_${Math.random()
        .toString(36)
        .slice(2)}.${fileExt}`;
      const filePath = `products/${fileName}`;

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
          product_type: type,
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
