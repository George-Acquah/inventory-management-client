/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "assets.aceternity.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "glad-lion-holy.ngrok-free.app" },
      { hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
