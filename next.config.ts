import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "profileimages.torn.com",
        pathname: '/**',
  }]},
  reactStrictMode: false,
  /* config options here */
};

export default nextConfig;
