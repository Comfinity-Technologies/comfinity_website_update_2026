import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Self-hosting build. `standalone` emits .next/standalone/server.js with only
     the node_modules the app actually needs — that is the file cPanel/Passenger
     hosts point their "startup file" at, and it avoids installing the full
     dependency tree on the server. `next start` still works locally. */
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
