// next.config.ts
import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "image2url.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
