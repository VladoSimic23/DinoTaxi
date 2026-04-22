import { MapPin, Mail } from "lucide-react";
import Link from "next/link";
import WhatsAppButton from "../components/WhatsAppButton";
import HeaderNav from "../components/HeaderNav";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { client, urlFor } from "../sanity/client";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const config = await client.fetch(`*[_type == "siteConfig"][0]`);

  if (!config) {
    return {
      title: "Dubrovnik Taxi Cab",
      description: "Reliable and fast taxi service in Dubrovnik.",
      icons: {
        icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
      },
    };
  }

  const ogImageUrl = config.ogImage ? urlFor(config.ogImage).url() : undefined;

  return {
    title:
      config.title || "Dubrovnik Taxi Cab | Airport Transfers & City Rides",
    description:
      config.description ||
      "Premium and reliable taxi service in Dubrovnik, Croatia. Fixed prices, comfortable cars, and professional local drivers. Book easily via WhatsApp.",
    keywords: config.keywords || [
      "dubrovnik taxi",
      "taxi dubrovnik",
      "dubrovnik airport transfer",
      "dubrovnik cab",
      "uber dubrovnik alternative",
    ],
    authors: [{ name: "Dubrovnik Taxi Cab" }],
    creator: "Dubrovnik Taxi Cab",
    publisher: "Dubrovnik Taxi Cab",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(config.url || "https://www.dubrovniktaxicab.com"),
    openGraph: {
      title: config.title,
      description: config.description,
      url: config.url || "https://www.dubrovniktaxicab.com",
      siteName: config.title,
      images: ogImageUrl ? [{ url: ogImageUrl }] : [],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
    alternates: {
      canonical: config.url || "https://www.dubrovniktaxicab.com",
    },
    icons: {
      icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const config = await client.fetch(`*[_type == "siteConfig"][0]`);
  const cleanPhone = config?.whatsappNumber?.replace(/[^0-9]/g, "") || "";
  const phoneDisplay = "+385 99 775 7500";
  const phoneHref = `tel:${phoneDisplay.replace(/\s+/g, "")}`;
  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent("Hello! I would like to book a taxi in Dubrovnik.")}`;

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="antialiased font-sans bg-neutral-900 text-white flex flex-col min-h-screen">
        {/* HEADER / NAV */}
        <header className="absolute top-0 w-full z-50 bg-black/60 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link
              href="/"
              className="text-2xl font-black text-white italic tracking-tighter"
            >
              DBV<span className="text-yellow-500">TAXI</span>
            </Link>
            <HeaderNav
              phoneHref={phoneHref}
              phoneDisplay={phoneDisplay}
              whatsappUrl={whatsappUrl}
            />
          </div>
        </header>

        <main className="flex-grow flex flex-col">{children}</main>

        {/* FOOTER */}
        <footer className="bg-black py-12 text-center text-neutral-400 px-6 mt-auto">
          <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-4">
            <p className="mb-2">
              © {new Date().getFullYear()}{" "}
              {config?.title || "Dubrovnik Taxi Cab"}. All rights reserved.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <a
                href="https://www.google.com/search?q=Dubrovnik+Taxi+Cab+-+Airport+Transfers+%26+Private+Tours&kgmid=/g/11z3v_gdbs"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm hover:text-white transition-colors hover:underline group"
              >
                <MapPin
                  size={16}
                  className="text-yellow-500 group-hover:scale-110 transition-transform"
                />
                <p>Dolska ulica, 20000 Dubrovnik, Croatia</p>
              </a>

              <a
                href="mailto:dubrovniktaxicab@gmail.com"
                className="flex items-center gap-2 text-sm hover:text-white transition-colors hover:underline group"
              >
                <Mail
                  size={16}
                  className="text-yellow-500 group-hover:scale-110 transition-transform"
                />
                <p>dubrovniktaxicab@gmail.com</p>
              </a>
            </div>

            <p className="text-sm mt-2">Operating 08 am - 10 pm</p>
          </div>
        </footer>

        {/* Floating WhatsApp Widget */}
        {config?.whatsappNumber && (
          <WhatsAppButton phoneNumber={config.whatsappNumber} />
        )}
      </body>
    </html>
  );
}
