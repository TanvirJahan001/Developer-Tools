/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['developer-tools-alpha.vercel.app'], // Add your domain
  },
};

export default nextConfig;

