/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "assets.aceternity.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "localhost" },
      { hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
