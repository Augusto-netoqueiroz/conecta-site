import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/_next/", "/_vinext/"],
    },
    sitemap: "https://planostvsky.com.br/sitemap.xml",
    host: "https://planostvsky.com.br",
  };
}
