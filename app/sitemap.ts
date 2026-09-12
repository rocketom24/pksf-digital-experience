import type { MetadataRoute } from "next";
import { siteUrl } from "@/data/site";

/**
 * `/sitemap.xml`.
 *
 * One entry, because the concept is one page — every section of it is an anchor
 * on `/`, and anchors are not separate URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
