import { createClient } from "next-sanity";
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: "7140ac76",
  dataset: "production",
  apiVersion: "2024-03-22",
  useCdn: false,
});

const builder = createImageUrlBuilder(client)
type SanityImageSource = Parameters<typeof builder.image>[0];

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
