/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  experimental: {
    // This is a flag for fixing the issues with the register page.
    missingSuspenseWithCSRBailout: false,
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
