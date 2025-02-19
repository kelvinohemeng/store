import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qysorjsrzyfvzxicbnut.supabase.co",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
