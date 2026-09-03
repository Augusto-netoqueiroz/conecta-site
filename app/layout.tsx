import type { Metadata } from "next";
import Analytics from "./Analytics";
import CookieConsent from "./CookieConsent";
import MetaPixel from "./MetaPixel";
import "./globals.css";

const siteUrl = "https://planostvsky.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Planos SKY TV por Assinatura | Consulte Ofertas e Grade de Canais",
  description: "Confira os planos SKY Pós-Pago e SKY+ com canais em HD, futebol ao vivo, filmes e séries. Consulte cobertura para o seu CEP e assine pelo WhatsApp.",
  keywords: [
    "SKY TV",
    "planos SKY",
    "TV por assinatura",
    "TV a cabo",
    "SKY pós-pago",
    "SKY com Premiere",
    "assinar SKY",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  applicationName: "Planos TV SKY",
  category: "telecommunications",
  creator: "Planos TV SKY",
  icons: {
    icon: [{ url: "/img/campaign/logo-sky.png", type: "image/png" }],
    shortcut: "/img/campaign/logo-sky.png",
    apple: "/img/campaign/logo-sky.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: `${siteUrl}/`,
    siteName: "Planos TV SKY",
    title: "Planos SKY TV por Assinatura | Ofertas Exclusivas",
    description: "Mais de 100 canais em HD, esportes ao vivo, Premiere e filmes. Consulte valores para sua cidade e assine direto pelo WhatsApp.",
    images: [{ url: "/img/campaign/hero-sky-desktop-v2.webp", width: 1600, height: 533, alt: "Planos SKY TV" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Planos SKY TV por Assinatura | Ofertas Exclusivas",
    description: "Canais em HD, futebol ao vivo e filmes com SKY+ incluso. Consulte seu CEP.",
    images: ["/img/campaign/hero-sky-desktop-v2.webp"],
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
