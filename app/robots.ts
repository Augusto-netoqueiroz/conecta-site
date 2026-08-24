import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/", "/_vinext/"],
    },
    sitemap: "https://portal-de-tv.augusto-netoqueiroz0.chatgpt.site/sitemap.xml",
    host: "https://portal-de-tv.augusto-netoqueiroz0.chatgpt.site",
  };
}
