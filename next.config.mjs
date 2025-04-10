
// /** @type {import('next').NextConfig} */

// const nextConfig = {};

// export default nextConfig;

// next.config.mjs


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
    ],
  },
};

export default nextConfig;
