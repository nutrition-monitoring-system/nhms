/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: "https",
        hostname: 'flowbite.com'
      }
    ],
  },
};
