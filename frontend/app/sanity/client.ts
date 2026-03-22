import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "7140ac76", // pravi Project ID iz backenda
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-03-12",
  useCdn: false, // za rezervacije moramo uvijek imat svježe podatke
  token: process.env.SANITY_API_TOKEN, // samo na poslužitelju (API folderu) za upis
});

// Helper za dohvaćanje slika iz Sanityja
const builder = createImageUrlBuilder(client);

type SanityImageSource = Parameters<typeof builder.image>[0];

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
