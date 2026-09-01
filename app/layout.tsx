import type { Metadata } from "next";
import Analytics from "./Analytics";
import CookieConsent from "./CookieConsent";
import MetaPixel from "./MetaPixel";
import "./globals.css";

const siteUrl = "https://contratetv.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Contrate TV | Parceiro autorizado SKY",
    template: "%s | Contrate TV",
  },
  description: "Consulte planos SKY, cobertura e condições de instalação com atendimento de parceiro autorizado.",
  alternates: { canonical: "/" },
  applicationName: "Contrate TV",
  category: "telecommunications",
  creator: "Contrate TV",
  icons: {
    icon: [{ url: "/img/campaign/logo-sky.png", type: "image/png" }],
    shortcut: "/img/campaign/logo-sky.png",
    apple: "/img/campaign/logo-sky.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Contrate TV",
    title: "Contrate TV | Parceiro autorizado SKY",
    description: "Planos SKY, cobertura e instalação com atendimento de parceiro autorizado.",
    images: [{ url: "/img/og-sky-home.jpg", width: 1200, height: 630, alt: "Contrate TV — parceiro autorizado SKY" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contrate TV | Parceiro autorizado SKY",
    description: "Consulte planos SKY e condições para o seu endereço.",
    images: ["/img/og-sky-home.jpg"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body>
        <MetaPixel />
        <Analytics />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
