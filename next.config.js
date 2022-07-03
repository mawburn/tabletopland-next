/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['storage.googleapis.com', 'cdn.shopify.com'],
  },
}

module.exports = nextConfig
