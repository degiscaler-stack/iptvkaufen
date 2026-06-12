import type { Metadata } from "next";
import WhatsAppFloatButton from "@/components/WhatsAppFloatButton";
import "./globals.css";

export const metadata: Metadata = {
  title: "IPTV Kaufen Deutschland | Premium IPTV Anbieter",
  description:
    "IPTV kaufen in Deutschland. Über 22.000 Sender, Filme, Serien und Fußball in Ultra HD auf allen Geräten.",
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
      <body>
        {children}
        <WhatsAppFloatButton />
      </body>
    </html>
  );
}
