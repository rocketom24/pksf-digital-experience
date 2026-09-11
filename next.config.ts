import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* The hero is a 3200px photograph and is the single heaviest thing the
       page loads. AVIF first, WebP for the browsers without it. */
    formats: ["image/avif", "image/webp"],
    /* YouTube thumbnails, for the Watch section. The files are PKSF's own
       uploads and are served from YouTube's image host; this is the only
       remote origin the page loads an image from. */
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
    ],
  },
};

export default nextConfig;
