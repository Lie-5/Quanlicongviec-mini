import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  turbopack: {
    resolveExtensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      ignored: /node_modules|\.next|\.git|nul/,
    };
    return config;
  },
};

export default nextConfig;
