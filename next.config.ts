import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // CRITICAL: Enables the standalone build for Docker
  output: 'standalone',
  
  // Recommended for industrial templates (security & stability)
  reactStrictMode: true,
};

export default nextConfig;