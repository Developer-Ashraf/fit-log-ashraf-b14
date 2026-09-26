import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.magnific.com',
      },
      // যদি অন্য কোনো এক্সটার্নাল ডোমেইন থেকেও ইমেজ আসে, তবে এখানে যোগ করতে পারেন
      {
        protocol: 'https',
        hostname: '**', // অথবা সব ডোমেইন অ্যালাউ করার জন্য (ডেভেলপমেন্টের সুবিধার্থে)
      },
    ],
  },
};

export default nextConfig;
