/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "assets.aceternity.com" },
      { hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "glad-lion-holy.ngrok-free.app" },
      { protocol: "https", hostname: "inventory-management-client-three.vercel.app" },
      { hostname: "images.pexels.com" },
    ],
  },
};

export default nextConfig;
