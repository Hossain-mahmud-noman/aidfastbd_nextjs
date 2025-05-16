
/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "www.aidfastbd.com",
      },
      {
        protocol: 'https',
        hostname: "api.aidfastbd.com",
      },
      {
        protocol: 'https',
        hostname: "cdn-icons-png.flaticon.com",
      },
      {
        protocol: 'https',
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
