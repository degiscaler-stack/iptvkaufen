import type { Metadata } from "next";
import Script from "next/script";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RecentPurchaseNotification from "@/components/RecentPurchaseNotification";
import WhatsAppFloatButton from "@/components/WhatsAppFloatButton";
import { SEO_TITLES } from "@/lib/seo-titles";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://iptvkaufenx.de"),
  title: SEO_TITLES.siteDefault,
  description:
    "IPTV kaufen in Deutschland. Über 22.000 Sender, Filme, Serien und Fußball in Ultra HD auf allen Geräten.",
  verification: {
    google: "EsW591o2eN7U4ge2cczx0ALhDErtq_qrj0F75xBbky0",
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
    <html lang="de">
      <head>
        <link rel="preload" href="/images/packages/iptv-kaufen-1-monat.webp" as="image" type="image/webp" />
        <link rel="preload" href="/images/packages/iptv-kaufen-3-monate.webp" as="image" type="image/webp" />
        <link rel="preload" href="/images/packages/iptv-kaufen-6-monate.webp" as="image" type="image/webp" />
        <link rel="preload" href="/images/packages/iptv-kaufen-12-monate.webp" as="image" type="image/webp" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <RecentPurchaseNotification />
        <WhatsAppFloatButton />
        <Script id="statcounter-config" strategy="afterInteractive">
          {`
            var sc_project=13299354;
            var sc_invisible=1;
            var sc_security="f3bcb035";
          `}
        </Script>
        <Script
          id="statcounter-counter"
          src="https://www.statcounter.com/counter/counter.js"
          strategy="afterInteractive"
        />
        <noscript>
          <div className="statcounter">
            <a title="Web Analytics" href="https://statcounter.com/" target="_blank" rel="noopener noreferrer">
              <img
                className="statcounter"
                src="https://c.statcounter.com/13299354/0/f3bcb035/1/"
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
