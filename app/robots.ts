import type { MetadataRoute } from "next";
import { isProductionDeployment, siteUrl } from "@/data/site";

/**
 * `/robots.txt`.
 *
 * Production is open to crawlers: the concept is one page and there is nothing
 * on it to hold back.
 *
 * A preview deployment is the whole site on a second hostname, so it is closed
 * completely rather than left to compete with production for its own results.
 */
export default function robots(): MetadataRoute.Robots {
  if (!isProductionDeployment) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
