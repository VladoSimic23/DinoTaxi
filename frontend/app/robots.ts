import { MetadataRoute } from "next";
import { client } from "./sanity/client";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const config = await client.fetch(`*[_type == "siteConfig"][0]`);
  const baseUrl = config?.url || "https://www.dubrovniktaxicab.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", "/studio/"], // Zabrani crawlerima pristup API-ju i eventualnom lokalnom studiju
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
