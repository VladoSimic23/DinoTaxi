import { createClient } from "next-sanity";
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: "7140ac76",
  dataset: "production",
  apiVersion: "2024-03-22",
  useCdn: false,
});

import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const builder = createImageUrlBuilder(client)
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
