/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["192.168.1.207", "localhost:3000"],
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react", "lucide-react", "framer-motion"],
  },
};

module.exports = nextConfig;
