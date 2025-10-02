/** @type {import('next').NextConfig} */
const nextConfig = {
  // Compress responses
  compress: true,
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // Performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
}

module.exports = nextConfig