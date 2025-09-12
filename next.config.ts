import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // 👈 desactiva ESLint en el deploy
  },
};

export default nextConfig;

