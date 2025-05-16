/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/photos/**',
      },
    ],
  },
  // Add port configuration
  serverRuntimeConfig: {
    port: 8000,
  },
  env: {
    PORT: 8000,
  },
}

module.exports = nextConfig
