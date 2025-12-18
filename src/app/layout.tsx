import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://seosentinel.online'),
  title: "SEO Sentinel - Free Website Spam Score Checker & DA Analysis",
  description: "Check any website's Spam Score and Domain Authority (DA) instantly. free AI-powered SEO analysis, toxicity detection, and backlink audit tool.",
  keywords: ["spam score checker", "check website spam", "domain authority checker", "da pa checker", "seo toxicity check", "google penalty checker", "website safety check"],
  authors: [{ name: "SEO Sentinel" }],
  creator: "SEO Sentinel",
  publisher: "SEO Sentinel",
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://seosentinel.online',
    title: 'SEO Sentinel - Website Spam Score Checker',
    description: 'Protect your rankings. Detect toxic SEO signals and check Domain Authority instantly.',
    siteName: 'SEO Sentinel',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'SEO Sentinel Dashboard'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Sentinel - Website Spam Score Checker',
    description: 'Instantly check website spam score and Domain Authority.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'G-SEO-SENTINEL-VERIFY-2025',
  },
};

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <Navbar />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                "name": "SEO Sentinel",
                "applicationCategory": "SEO Tool",
                "operatingSystem": "Web",
                "offers": {
                  "@type": "Offer",
                  "price": "0",
                  "priceCurrency": "USD"
                },
                "description": "Free AI-powered website spam checker and domain authority analysis tool.",
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.8",
                  "ratingCount": "1250"
                }
              })
            }}
          />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
