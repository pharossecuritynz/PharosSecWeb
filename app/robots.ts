import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // API routes and the form thank-you page have no search value.
      disallow: ["/api/", "/book-a-conversation/thanks"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
