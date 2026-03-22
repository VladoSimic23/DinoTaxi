import { client } from "./sanity/client";

export default async function robots() {
  const config = await client.fetch(`*[_type == "siteConfig"][0]`);
  const baseUrl = config?.url || "https://www.dubrovniktaxicab.com";

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}