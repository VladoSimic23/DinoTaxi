import { Metadata } from "next";
import { client, urlFor } from "../../../sanity/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60; // ISR cache every minute

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// Generate Static Params for SSG support
export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "service"][].slug.current`);
  return slugs.map((slug: string) => ({
    slug,
  }));
}

// Generate Dynamic Metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = await client.fetch(
    `{
    "service": *[_type == "service" && slug.current == $slug][0],
    "config": *[_type == "siteConfig"][0]
  }`,
    { slug },
  );

  const { service, config } = data;

  if (!service) {
    return { title: "Service Not Found" };
  }

  const title =
    service.seoTitle ||
    `${service.title} | ${config?.title || "Dubrovnik Taxi"}`;
  const description =
    service.seoDescription ||
    service.shortDescription ||
    "Discover our premium transfer services in Dubrovnik.";

  const ogImage = service.mainImage
    ? urlFor(service.mainImage).width(1200).height(630).url()
    : config?.ogImage
      ? urlFor(config.ogImage).width(1200).height(630).url()
      : "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `${config?.url || "https://www.dubrovniktaxicab.com"}/services/${slug}`,
      images: ogImage ? [{ url: ogImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
    alternates: {
      canonical: `${config?.url || "https://www.dubrovniktaxicab.com"}/services/${slug}`,
    },
  };
}

export default async function ServiceDetailsPage({ params }: Props) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const data = await client.fetch(
    `{
    "service": *[_type == "service" && slug.current == $slug][0],
    "config": *[_type == "siteConfig"][0]
  }`,
    { slug },
  );

  const { service, config } = data;

  if (!service) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    provider: {
      "@type": "LocalBusiness",
      name: config?.title || "Dubrovnik Taxi",
      url: config?.url || "https://www.dubrovniktaxicab.com",
    },
    url: `${config?.url || "https://www.dubrovniktaxicab.com"}/services/${slug}`,
  };

  const portableTextComponents = {
    types: {
      image: ({
        value,
      }: {
        value: { asset?: { _ref: string }; alt?: string };
      }) => {
        if (!value?.asset?._ref) return null;
        return (
          <div className="relative w-full h-[400px] my-8 rounded-xl overflow-hidden bg-neutral-800">
            <Image
              src={urlFor(value).url()}
              alt={value.alt || service.title}
              fill
              className="object-cover"
            />
          </div>
        );
      },
    },
  };

  return (
    <div className="flex-grow pt-[65px] pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center bg-neutral-900">
        {service.mainImage && (
          <Image
            src={urlFor(service.mainImage).url()}
            alt={service.title}
            fill
            fetchPriority="high"
            className="object-cover opacity-60"
            priority
          />
        )}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
            {service.title}
          </h1>
          {service.shortDescription && (
            <p className="text-xl md:text-2xl text-neutral-200">
              {service.shortDescription}
            </p>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <Link
          href="/services"
          className="inline-flex items-center text-yellow-500 font-semibold mb-8 hover:text-yellow-600 transition-colors"
        >
          &larr; Back to all services
        </Link>

        {service.content ? (
          <article className="prose prose-lg prose-invert max-w-none prose-headings:font-bold prose-headings:text-white prose-a:text-yellow-500 hover:prose-a:text-yellow-400 prose-img:rounded-xl">
            <PortableText
              value={service.content}
              components={portableTextComponents}
            />
          </article>
        ) : (
          <div className="text-neutral-400 text-lg">
            <p>More details about this service will be available soon.</p>
          </div>
        )}

        <div className="mt-16 pt-10 border-t border-neutral-800 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to book this service?
          </h2>
          <Link
            href="/#booking"
            className="inline-block bg-yellow-500 text-black font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-yellow-400 transition-transform transform hover:-translate-y-1"
          >
            Book Now
          </Link>
        </div>
      </section>
    </div>
  );
}
