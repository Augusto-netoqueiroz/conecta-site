import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://portal-de-tv.augusto-netoqueiroz0.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-08-20T00:00:00-03:00");

  return [
    { url: `${siteUrl}/`, lastModified: updated, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/politica-de-privacidade`, lastModified: updated, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/termos-de-uso`, lastModified: updated, changeFrequency: "yearly", priority: 0.3 },
  ];
}
