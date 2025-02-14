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

// ... existing code ...

export async function updateProduct(
  productId: string | number | undefined,
  formData: FormData
) {
  try {
    // Get all the form data
    const existingImages = formData.getAll("existingImages") as string[];
    const imagesToDelete = formData.getAll("imagesToDelete") as string[];
    const newImageFiles = formData.getAll("newImages") as File[];

    // Delete images from storage
    for (const imageUrl of imagesToDelete) {
      const path = imageUrl.split("/products/").pop(); // Get filename from URL
      if (path) {
        const { error: deleteError } = await supabase.storage
          .from("product_images")
          .remove([`products/${path}`]);

        if (deleteError) {
          console.error("Error deleting image:", deleteError);
          throw new Error(`Failed to delete image: ${deleteError.message}`);
        }
      }
    }

    // Upload new images
    const newImageUrls = await Promise.all(
      newImageFiles.map(async (file) => {
        const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const fileName = `product_${Date.now()}_${Math.random()
          .toString(36)
          .slice(2)}.${fileExt}`;
        const filePath = `products/${fileName}`;

        const { data, error: uploadError } = await supabase.storage
          .from("product_images")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          console.error("Error uploading image:", uploadError);
          throw new Error(`Failed to upload image: ${uploadError.message}`);
        }

        // Get public URL
        const {
          data: { publicUrl },
        } = supabase.storage.from("product_images").getPublicUrl(filePath);

        return publicUrl;
      })
    );

    // Combine existing and new image URLs
    const finalImageUrls = [...existingImages, ...newImageUrls];

    // Update product in database
    const { error: updateError } = await supabase
      .from("Products") // Note the capital P in Products
      .update({
        product_name: formData.get("name"),
        product_description: formData.get("description"),
        product_type: formData.get("type"),
        image_url: finalImageUrls,
      })
      .eq("id", productId);

    if (updateError) {
      console.error("Error updating product:", updateError);
      throw new Error(`Database update failed: ${updateError.message}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Update product error:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to update product",
    };
  }
}

// const uploadProductImages = async (files: File[]) => {
//   const uploadedImageUrls: string[] = [];
//   const uniqueFiles = new Map();

//   for (const file of files) {
//     const fileExt = file.name.split(".").pop() || "jpeg";
//     if (uniqueFiles.has(file.name)) continue;
//     uniqueFiles.set(file.name, true);

//     const fileName = `product_${Date.now()}_${Math.random()
//       .toString(36)
//       .slice(2)}.${fileExt}`;
//     const filePath = `products/${fileName}`;

//     const { error } = await supabase.storage
//       .from("product_images")
//       .upload(filePath, file, { cacheControl: "3600", upsert: false });

//     if (error) throw new Error(`Image upload failed: ${error.message}`);

//     const imageUrl = supabase.storage
//       .from("product_images")
//       .getPublicUrl(filePath).data.publicUrl;

//     uploadedImageUrls.push(imageUrl);
//   }

//   return uploadedImageUrls;
// };

// const updateExistingProductImages = async (paths: string[]) => {
//   const { data, error } = await supabase.storage
//     .from("product_images")
//     .update("public/avatar1.png", replacedFiles, {
//       cacheControl: "3600",
//       upsert: true,
//     });
// };
