import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /* The hero is a 3200px photograph and is the single heaviest thing the
       page loads. AVIF first, WebP for the browsers without it. */
    formats: ["image/avif", "image/webp"],
    /* Two remote origins, both serving files PKSF uploaded itself:
       YouTube's image host for the Watch section's thumbnails, and PKSF's own
       media library for the staff portraits in the Team section. Nothing else
       is loaded from anywhere else. */
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/vi/**" },
      { protocol: "https", hostname: "pksf.org.bd", pathname: "/wp-content/uploads/**" },
    ],
  },
};

export default nextConfig;
