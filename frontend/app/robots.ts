import { MetadataRoute } from "next";
import { client } from "./sanity/client";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const config = await client.fetch(`*[_type == "siteConfig"][0]`);
  const baseUrl = config?.url || "https://www.dubrovniktaxicab.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Keep app internals private, but do not block Next.js assets used for rendering.
      disallow: ["/api/", "/studio/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
