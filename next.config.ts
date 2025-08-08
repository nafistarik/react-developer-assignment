// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["i.imgur.com","placehold.co"], // allow images from i.imgur.com
  },
};

export default nextConfig;
