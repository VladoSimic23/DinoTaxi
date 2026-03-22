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
    };
  }

  const ogImageUrl = config.ogImage ? urlFor(config.ogImage).url() : undefined;

  return {
    title: config.title || "Dubrovnik Taxi Cab | Airport Transfers & City Rides",
    description: config.description || "Premium and reliable taxi service in Dubrovnik, Croatia. Fixed prices, comfortable cars, and professional local drivers. Book easily via WhatsApp.",
    keywords: config.keywords || ["dubrovnik taxi", "taxi dubrovnik", "dubrovnik airport transfer", "dubrovnik cab", "uber dubrovnik alternative"],
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
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
    alternates: {
      canonical: config.url || "https://www.dubrovniktaxicab.com",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="antialiased font-sans text-gray-900 bg-white">
        {children}
      </body>
    </html>
  );
}
