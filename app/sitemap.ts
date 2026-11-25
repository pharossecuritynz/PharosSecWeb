import type { MetadataRoute } from "next";
import { articles } from "@/lib/resources/articles";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    { path: "", priority: 1 },
    { path: "/exposure-snapshot", priority: 0.9 },
    { path: "/it-provider-security-assurance", priority: 0.8 },
    { path: "/resources", priority: 0.8 },
    { path: "/resources/security-foundations-checklist", priority: 0.8 },
    { path: "/book-a-conversation", priority: 0.7 },
    { path: "/privacy", priority: 0.2 },
    { path: "/terms", priority: 0.2 },
  ];

  return [
    ...staticPaths.map(({ path, priority }) => ({ url: `${SITE_URL}${path}`, priority })),
    ...articles.map((article) => ({
      url: `${SITE_URL}/resources/${article.slug}`,
      lastModified: article.published,
      priority: 0.7,
    })),
  ];
}
