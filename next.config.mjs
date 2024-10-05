/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-image-hosting-domain.com'],  // Ensure this domain is correct for your project
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

export default nextConfig;
