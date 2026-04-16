import { client, urlFor } from "../sanity/client";
import VehicleSection, { Vehicle } from "../components/VehicleSection";
import FAQAccordion from "../components/FAQAccordion";
import ContactForm from "../components/ContactForm";
import TrustindexWidget from "../components/TrustindexWidget";
import {
  Car,
  Clock,
  ShieldCheck,
  MapPin,
  Map,
  MessageCircle,
  Phone,
  CheckCircle2,
  Mail,
} from "lucide-react";

export const revalidate = 60; // ISR: Osvježava stranicu svakih 60 sekundi kada dođe novi request

// Helper function for dynamic icons based on Sanity string
const getIcon = (name: string) => {
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

export default async function Home() {
  const [page, config, vehicleData] = await Promise.all([
    client.fetch(`*[_type == "homepage"][0]`),
    client.fetch(`*[_type == "siteConfig"][0]`),
    client.fetch(`*[_type == "vehicle"] | order(_createdAt asc){
      name,
      type,
      passengers,
      luggage,
      features,
      description,
      "gallery": gallery[].asset->{url}
    }`),
  ]);

  const cleanPhone = config?.whatsappNumber?.replace(/[^0-9]/g, "") || "";
  const phoneDisplay = "+385 99 775 7500";
  const phoneHref = `tel:${phoneDisplay.replace(/\s+/g, "")}`;
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hello! I would like to book a taxi in Dubrovnik.")}`;

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-6">
        <div>
          <h1 className="text-3xl font-bold mb-4">Site setup in progress</h1>
          <p>
            Please enter data in the Sanity Studio (create a
            &apos;homepage&apos;, &apos;siteConfig&apos;, and
            &apos;vehicle&apos; document) and Publish it.
          </p>
        </div>
      </div>
    );
  }

  const { hero, about, services, faq } = page;

  // JSON-LD Structured Data for LocalBusiness / TaxiService
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: config?.title || "Dubrovnik Taxi Cab",
    image: config?.ogImage ? urlFor(config.ogImage).url() : "",
    "@id": config?.url || "https://www.dubrovniktaxicab.com",
    url: config?.url || "https://www.dubrovniktaxicab.com",
    telephone: `+${cleanPhone}`,
    openingHours: "Mo-Su 08:00-22:00",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Dolska ulica",
      addressLocality: "Dubrovnik",
      postalCode: "20000",
      addressCountry: "HR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 42.6507,
      longitude: 18.0944,
    },
    areaServed: [
      { "@type": "City", name: "Dubrovnik" },
      { "@type": "Airport", name: "Dubrovnik Airport (DBV)" },
      { "@type": "AdministrativeArea", name: "Dubrovnik-Neretva County" },
      { "@type": "Country", name: "Montenegro" }, // Ako radite izlete u Kotor!
    ],
    priceRange: "$$",
  };

  // JSON-LD Structured Data for FAQPage
  const faqJsonLd =
    faq && faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item: { question: string; answer: string }) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
      {/* Inject JSON-LD into the page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 flex items-center min-h-[90vh] overflow-hidden">
        {/* Background Dark Cool Overlay */}
        <div className="absolute inset-0 z-0 bg-neutral-950">
          {/* Subtle gradient pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neutral-800/40 via-neutral-950 to-black"></div>

          {/* Decorative glowing orbs */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>
          <div className="absolute -bottom-32 -left-32 w-[700px] h-[700px] bg-neutral-800/60 rounded-full blur-[150px] pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-yellow-600/5 rounded-full blur-[100px] pointer-events-none"></div>

          {/* Subtle grid pattern to give it a modern texture */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.03]"></div>
        </div>

        <div className="px-6 mx-auto w-full max-w-7xl relative z-10 text-center lg:text-left">
          <div className="max-w-4xl">
            <h1 className="text-5xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              {hero?.heading || "Your Reliable Taxi in Dubrovnik"}
            </h1>
            <h2 className="text-lg lg:text-2xl text-neutral-300 mb-10 leading-relaxed font-light">
              {hero?.subheading ||
                "Fast, safe, and comfortable transfers from the airport to your destination."}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-5 rounded-full font-bold text-lg transition-transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg shadow-green-500/30"
              >
                <MessageCircle size={24} />
                {hero?.ctaText || "Book via WhatsApp"}
              </a>
              <a
                href={phoneHref}
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-5 rounded-full font-bold text-lg transition-transform hover:scale-105 flex items-center justify-center gap-3 whitespace-nowrap"
              >
                <Phone size={24} />
                {phoneDisplay}
              </a>
              <a
                href="#contact"
                className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2"
              >
                <Mail size={24} />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      {about && (
        <section
          className="py-24 bg-neutral-900 border-y border-white/5"
          id="about"
        >
          <div className="max-w-7xl mx-auto px-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-500 text-sm font-semibold mb-6 border border-yellow-500/20">
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                Local Expertise
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">
                {about.title || "About Us"}
              </h2>
              <div className="text-lg text-neutral-300 space-y-6 leading-relaxed mb-10">
                {about.description
                  ?.split("\n")
                  .map((p: string, i: number) => <p key={i}>{p}</p>) ||
                  "We are a premium taxi service operating in Dubrovnik, providing safe and comfortable transfers..."}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "16+ Years Experience",
                    subtitle: "Trusted Service",
                  },
                  {
                    title: "Fluent in English and German",
                    subtitle: "Easy Communication",
                  },
                  { title: "Local Route Expert", subtitle: "Always On Time" },
                  { title: "Fixed Pricing", subtitle: "No Hidden Costs" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-neutral-800/50 border border-neutral-700/50 hover:bg-neutral-800 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-neutral-950 flex items-center justify-center shrink-0 shadow-inner">
                      <CheckCircle2 className="text-green-500" size={20} />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-sm">
                        {item.title}
                      </h3>
                      <span className="text-neutral-400 text-xs">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-neutral-950 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <span className="text-yellow-500 font-semibold uppercase tracking-wider text-sm">
              Reviews
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
              What Our Taxi Clients Say
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
              Real feedback from travelers who used our taxi and transfer
              services in Dubrovnik.
            </p>
          </div>

          <TrustindexWidget />
        </div>
      </section>

      {/* SERVICES SECTION */}
      {services && services.length > 0 && (
        <section className="py-24" id="services">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Our Services & Transfers
              </h2>
              <p className="text-neutral-400 text-lg">
                We offer a variety of transfer services tailored to your needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map(
                (
                  service: {
                    iconName: string;
                    title: string;
                    description: string;
                  },
                  index: number,
                ) => (
                  <div
                    key={index}
                    className="bg-neutral-800 p-8 rounded-2xl shadow-sm hover:shadow-black/50 transition-shadow border border-neutral-700 group"
                  >
                    <div className="bg-neutral-900 border border-neutral-700/50 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      {getIcon(service.iconName)}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-neutral-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </section>
      )}

      {/* VEHICLES SECTION */}
      {vehicleData &&
        vehicleData.length > 0 &&
        vehicleData.map((vehicle: Vehicle, index: number) => (
          <VehicleSection
            key={`vehicle-${index}`}
            vehicle={vehicle}
            index={index}
          />
        ))}

      {/* FAQ SECTION */}
      {faq && faq.length > 0 && (
        <section
          className="py-24 bg-neutral-950 relative overflow-hidden"
          id="faq"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-3xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <span className="text-yellow-500 font-bold tracking-wider uppercase text-sm mb-4 block">
                Have Questions?
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                Frequently Asked{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                  Questions
                </span>
              </h2>
              <p className="text-neutral-400 text-lg">
                Find answers to the most common inquiries about our taxi and
                transfer services in.
              </p>
            </div>

            <FAQAccordion faq={faq} />
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section className="py-24 bg-neutral-900 text-white text-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-yellow-500/10" />
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to book your ride?
          </h2>
          <p className="text-xl text-neutral-300 mb-10">
            Contact us directly on WhatsApp or send us an email. We usually
            reply within minutes!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-full font-bold text-xl transition-transform hover:scale-105 shadow-lg shadow-green-500/30 w-full sm:w-auto justify-center"
            >
              <MessageCircle size={28} />
              WhatsApp
            </a>
            <a
              href="mailto:dubrovniktaxicab@gmail.com?subject=Taxi%20Booking%20Inquiry"
              className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-10 py-5 rounded-full font-bold text-xl transition-all border border-white/10 w-full sm:w-auto justify-center"
            >
              <Mail size={28} />
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT FORM SECTION */}
      <ContactForm />
    </>
  );
}
