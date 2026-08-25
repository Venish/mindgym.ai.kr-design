/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  allowedDevOrigins: ["192.168.0.70", "192.168.0.70:3000", "192.168.1.207", "localhost:3000"],
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react", "lucide-react", "framer-motion"],
  },
};

module.exports = nextConfig;
