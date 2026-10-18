import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { path: "/", priority: 1.0 },
    { path: "/eng", priority: 1.0 },
    { path: "/practice", priority: 0.9 },
    { path: "/about", priority: 0.9 },
    { path: "/cases", priority: 0.9 },
    { path: "/fees", priority: 0.8 },
    { path: "/contacts", priority: 0.8 },
    { path: "/media", priority: 0.6 },
  ];

  return routes.map((r) => ({
    url: `https://plaksinlaw.com${r.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: r.priority,
  }));
}
