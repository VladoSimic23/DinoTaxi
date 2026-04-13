import { Metadata } from "next";
import { client, urlFor } from "../../sanity/client";
import Link from "next/link";
import { Car, Clock, ShieldCheck, MapPin, Map } from "lucide-react";
import Image from "next/image";

export const revalidate = 60;

// Helper function for dynamic icons based on Sanity string
const getIcon = (name?: string) => {
  switch (name?.toLowerCase()) {
    case "car":
      return <Car className="w-10 h-10 text-yellow-500" />;
    case "clock":
      return <Clock className="w-10 h-10 text-yellow-500" />;
    case "shield":
      return <ShieldCheck className="w-10 h-10 text-yellow-500" />;
    case "mappin":
      return <MapPin className="w-10 h-10 text-yellow-500" />;
    case "map":
      return <Map className="w-10 h-10 text-yellow-500" />;
    default:
      return <Car className="w-10 h-10 text-yellow-500" />;
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const config = await client.fetch(`*[_type == "siteConfig"][0]`);
  return {
    title: `Our Services | ${config?.title || "Dubrovnik Taxi"}`,
    description:
      "Explore our premium taxi and transfer services in Dubrovnik, Croatia.",
    openGraph: {
      title: `Our Services | ${config?.title || "Dubrovnik Taxi"}`,
      description:
        "Explore our premium taxi and transfer services in Dubrovnik, Croatia.",
      images: config?.ogImage ? [urlFor(config.ogImage).url()] : [],
    },
  };
}

export default async function ServicesPage() {
  const [services, config] = await Promise.all([
    client.fetch(`*[_type == "service"] | order(_createdAt asc) {
      _id,
      title,
      slug,
      shortDescription,
      iconName,
      "mainImageUrl": mainImage.asset->url
    }`),
    client.fetch(`*[_type == "siteConfig"][0]`),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map(
      (
        service: {
          title: string;
          slug?: { current: string };
          shortDescription?: string;
        },
        index: number,
      ) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${config?.url || "https://www.dubrovniktaxicab.com"}/services/${service.slug?.current}`,
        name: service.title,
        description: service.shortDescription,
      }),
    ),
  };

  return (
    <div className="flex-grow pt-32 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-5xl font-black text-white mb-6">Our Services</h1>
          <p className="text-neutral-300 text-lg">
            Choose from a variety of professional transfer options suited for
            your journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(
            (service: {
              _id: string;
              title: string;
              slug?: { current: string };
              shortDescription?: string;
              iconName?: string;
              mainImageUrl?: string;
            }) => (
              <Link
                href={`/services/${service.slug?.current}`}
                key={service._id}
                className="bg-neutral-800 rounded-2xl shadow-md hover:shadow-black/50 transition-all border border-neutral-700 group overflow-hidden block"
              >
                {service.mainImageUrl && (
                  <div className="w-full h-48 relative overflow-hidden bg-neutral-900">
                    <Image
                      src={service.mainImageUrl}
                      alt={service.title}
                      priority
                      fetchPriority="high"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-8">
                  <div className="bg-neutral-900 w-16 h-16 rounded-xl flex items-center justify-center mb-6 border border-neutral-700/50">
                    {getIcon(service.iconName)}
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-yellow-500 transition-colors">
                    {service.title}
                  </h2>
                  <p className="text-neutral-400 leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>
                  <div className="text-yellow-500 font-bold flex items-center gap-2">
                    Read more <span className="text-xl leading-none">→</span>
                  </div>
                </div>
              </Link>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
