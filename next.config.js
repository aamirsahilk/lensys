/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
        // port: '',
        // pathname: '/account123/**',
      },
      {
        protocol: 'https',
        hostname: 'techmatrick.com',
        // port: '',
        // pathname: '/account123/**',
      },
    ],
  },
}

module.exports = nextConfig
