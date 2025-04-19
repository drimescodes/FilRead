/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'gateway.lighthouse.storage',
      'res.cloudinary.com',
      'lh3.googleusercontent.com',
    ],
  },
};

export default nextConfig;