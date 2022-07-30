/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.tabletop.media', 'cdn.shopify.com'],
  },
}

module.exports = nextConfig
