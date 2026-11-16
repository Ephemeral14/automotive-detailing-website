import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Providers } from "@/components/Providers";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Noir Auto Studio — Premium Automotive Detailing",
    template: "%s — Noir Auto Studio",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "automotive detailing",
    "paint correction",
    "ceramic coating",
    "paint protection film",
    "luxury car detailing",
    "interior detailing",
  ],
  authors: [{ name: "Portfolio demonstration project" }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: "en_US",
    url: "/",
    title: "Noir Auto Studio — Premium Automotive Detailing",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Noir Auto Studio — Premium Automotive Detailing",
    description: siteConfig.description,
  },
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#090909",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      id="top"
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[100] -translate-y-24 bg-champagne px-5 py-3 text-xs font-semibold tracking-[0.2em] text-noir uppercase transition-transform focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <Providers>
          <Header />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
