import { MetadataRoute } from "next";
import { client } from "./sanity/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const config = await client.fetch(`*[_type == "siteConfig"][0]`);
  const baseUrl = (config?.url || "https://www.dubrovniktaxicab.com").replace(
    /\/$/,
    "",
  );

  // Povuci sve usluge iz Sanity-ja
  const services = await client.fetch(
    `*[_type == "service" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`,
  );

  const serviceUrls = services.map(
    (service: { slug: string; _updatedAt: string }) => ({
      url: `${baseUrl}/services/${service.slug}`,
      lastModified: new Date(service._updatedAt || new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }),
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    ...serviceUrls,
  ];
}
