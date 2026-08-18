import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.VERCEL_STATIC_EXPORT ? "export" : undefined,
  typescript: {
    ignoreBuildErrors: Boolean(process.env.VERCEL_STATIC_EXPORT),
  },
};

export default nextConfig;
