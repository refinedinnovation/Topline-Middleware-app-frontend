/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*", // Any request starting with /api will be rewritten
        destination: "http://localhost:4041/api/v1/:path*", // Target API URL
      },
    ];
  },
};

module.exports = nextConfig;

