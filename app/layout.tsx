import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Header from "@/components/Header";
import { SEO_TITLES } from "@/lib/seo-titles";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://iptvkaufenx.de"),
  title: SEO_TITLES.siteDefault,
  description:
    "Informationen zu IPTV in Deutschland: Technik, Apps, Geräte, M3U, Einrichtung und Fehlerbehebung – erklärt von iptvkaufenX.",
  verification: {
    google: "EsW591o2eN7U4ge2cczx0ALhDErtq_qrj0F75xBbky0",
    other: {
      "p:domain_verify": "7d01ab8f433912538f06aea343555cea",
    },
  },
  icons: {
    icon: "/brand/iptv-kaufen-favicon.webp",
    shortcut: "/brand/iptv-kaufen-favicon.webp",
    apple: "/brand/iptv-kaufen-favicon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={inter.variable}>
      <body className={inter.className}>
        <GoogleAnalytics />
        <Header />
        {children}
        <Footer />
        <Script id="statcounter-config" strategy="lazyOnload">
          {`
            var sc_project=13342730;
            var sc_invisible=1;
            var sc_security="8375ed00";
          `}
        </Script>
        <Script
          id="statcounter-counter"
          src="https://www.statcounter.com/counter/counter.js"
          strategy="lazyOnload"
        />
        <noscript>
          <div className="statcounter">
            <a title="Web Analytics" href="https://statcounter.com/" target="_blank" rel="noopener noreferrer">
              <img
                className="statcounter"
                src="https://c.statcounter.com/13342730/0/8375ed00/1/"
                alt="Web Analytics"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </a>
          </div>
        </noscript>
      </body>
    </html>
  );
}
