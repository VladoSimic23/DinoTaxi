import { client } from "./sanity/client";

export default async function sitemap() {
  const config = await client.fetch(`*[_type == "siteConfig"][0]`);
  const baseUrl = config?.url || "https://www.dubrovniktaxicab.com";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}