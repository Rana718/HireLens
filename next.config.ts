import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "randomuser.me",
         },
      ],
   },
   // eslint: {
   //    ignoreDuringBuilds: true,
   // },
};

export default nextConfig;
