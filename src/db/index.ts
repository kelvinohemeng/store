import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema";

export function getDb() {
  const { env } = getCloudflareContext();
  return drizzle(env.DB, { schema });
}

export function getBucket() {
  const { env } = getCloudflareContext();
  return env.PRODUCT_IMAGES;
}

export function getR2PublicUrl() {
  const { env } = getCloudflareContext();
  return env.R2_PUBLIC_URL;
}
