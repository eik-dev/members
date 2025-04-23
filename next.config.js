/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'blob',
        hostname: '*',
      },
    ],
  },
}

module.exports = nextConfig 