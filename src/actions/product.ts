"use server";

import { eq } from "drizzle-orm";
import { getDb, getBucket, getR2PublicUrl } from "@/db";
import { products } from "@/db/schema";
import { Product } from "@/lib/types";
import { isCurrentUserDemo } from "@/actions/auth";

const DEMO_BLOCKED_MESSAGE =
  "This is the public demo account — write actions are disabled here. Everything else is fully explorable!";

// upload multiple images to R2, returning their public URLs
async function uploadProductImages(files: File[]): Promise<string[]> {
  const bucket = getBucket();
  const publicUrl = getR2PublicUrl();
  const uploadedImageUrls: string[] = [];
  const seen = new Set<string>();

  for (const file of files) {
    if (seen.has(file.name)) continue;
    seen.add(file.name);

    const fileExt = file.name.split(".").pop() || "jpeg";
    const fileName = `product_${Date.now()}_${Math.random()
      .toString(36)
      .slice(2)}.${fileExt}`;
    const key = `products/${fileName}`;

    await bucket.put(key, await file.arrayBuffer(), {
      httpMetadata: { contentType: file.type || "application/octet-stream" },
    });

    uploadedImageUrls.push(`${publicUrl}/${key}`);
  }

  return uploadedImageUrls;
}

// derive the R2 object key back out of a public URL we generated above
function keyFromImageUrl(imageUrl: string): string | null {
  const publicUrl = getR2PublicUrl();
  if (!imageUrl.startsWith(`${publicUrl}/`)) return null;
  return imageUrl.slice(publicUrl.length + 1);
}

// create/submit a new product
export const submitNewProduct = async (formData: FormData) => {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price") as string;
  const compare_price = formData.get("compare_price") as string;
  const quantity = formData.get("stock") as string;
  const imageFiles = formData.getAll("images") as File[];
  const category = formData.get("category") as string;
  const sizes = formData.get("sizes") as string;

  if (!imageFiles.length) {
    return { success: false, error: "At least one image is required" };
  }

  if (await isCurrentUserDemo()) {
    return { success: false, error: DEMO_BLOCKED_MESSAGE };
  }

  try {
    const imageUrls = await uploadProductImages(imageFiles);
    const db = getDb();

    const [data] = await db
      .insert(products)
      .values({
        product_name: name,
        product_description: description,
        product_type: category,
        image_url: imageUrls,
        product_price: Number(price),
        quantity: Number(quantity),
        sizes: sizes ? sizes.split(",") : [],
        compare_price: compare_price ? Number(compare_price) : null,
      })
      .returning();

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
  if (id === undefined) {
    return { success: false, error: "Missing product id" };
  }

  if (await isCurrentUserDemo()) {
    return { success: false, error: DEMO_BLOCKED_MESSAGE };
  }

  try {
    const db = getDb();
    const bucket = getBucket();

    const [product] = await db
      .select({ image_url: products.image_url })
      .from(products)
      .where(eq(products.id, Number(id)));

    if (product?.image_url?.length) {
      for (const imageUrl of product.image_url) {
        const key = keyFromImageUrl(imageUrl);
        if (key) await bucket.delete(key);
      }
    }

    await db.delete(products).where(eq(products.id, Number(id)));

    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// update product from table
export async function updateProduct(
  productId: string | number | undefined,
  formData: FormData
) {
  if (productId === undefined) {
    return { success: false, error: "Missing product id" };
  }

  if (await isCurrentUserDemo()) {
    return { success: false, error: DEMO_BLOCKED_MESSAGE };
  }

  try {
    const bucket = getBucket();
    const db = getDb();

    const existingImages = formData.getAll("existingImages") as string[];
    const imagesToDelete = formData.getAll("imagesToDelete") as string[];
    const newImageFiles = formData.getAll("newImages") as File[];

    for (const imageUrl of imagesToDelete) {
      const key = keyFromImageUrl(imageUrl);
      if (key) await bucket.delete(key);
    }

    const newImageUrls = newImageFiles.length
      ? await uploadProductImages(newImageFiles)
      : [];

    const finalImageUrls = [...existingImages, ...newImageUrls];
    const sizes = formData.get("sizes") as string;
    const sizesArray = sizes
      .split(",")
      .map((size) => size.trim())
      .filter((size) => size !== "");

    const price = formData.get("price") ? Number(formData.get("price")) : null;
    const comparePrice = formData.get("compare_price")
      ? Number(formData.get("compare_price"))
      : null;
    const quantity = formData.get("stock") ? Number(formData.get("stock")) : 0;

    await db
      .update(products)
      .set({
        product_name: formData.get("name") as string,
        product_description: formData.get("description") as string,
        product_type: formData.get("type") as string,
        image_url: finalImageUrls,
        product_price: price ?? 0,
        quantity: quantity,
        sizes: sizesArray,
        compare_price: comparePrice,
      })
      .where(eq(products.id, Number(productId)));

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

// fetch all products (replaces the old client-side Supabase fetchProducts)
export async function getProducts(): Promise<Product[]> {
  const db = getDb();
  const rows = await db.select().from(products);
  return rows as unknown as Product[];
}

export async function getProductById(
  id: string | number
): Promise<Product | null> {
  const db = getDb();
  const [row] = await db
    .select()
    .from(products)
    .where(eq(products.id, Number(id)));
  return (row as unknown as Product) ?? null;
}
