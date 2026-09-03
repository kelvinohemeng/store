import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  // Next bundles @vercel/og's resvg/yoga wasm (~1.4MB) into the server
  // build unconditionally, as part of its built-in icon/opengraph-image
  // route machinery — even though nothing here uses next/og or defines an
  // opengraph-image/icon route. That wasm alone was enough to push the
  // Worker over the 3 MiB free-plan size limit, so it's excluded here.
  outputFileTracingExcludes: {
    "*": ["./node_modules/next/dist/compiled/@vercel/og/**"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-b7a0c7d505474e7492372e5ed7b48645.r2.dev",
        pathname: "**",
      },
      {
        // Demo product photos (src/db/seed) — swap for real R2-hosted
        // images whenever real product photography is ready.
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
