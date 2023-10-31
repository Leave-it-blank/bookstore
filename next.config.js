/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    // limit of 25 deviceSizes values
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // limit of 25 imageSizes values
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // limit of 50 domains values
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source2procure.shop",
      },
      {
        protocol: "https",
        hostname: "bookstore.leaveitblank.co",
      },
      {
        protocol: "http",
        hostname:  "bookstore.leaveitblank.co",
      },
      {
        protocol: "https",
        hostname:  "*.leaveitblank.co",
      },
    ],
  },
 
}

module.exports = nextConfig
