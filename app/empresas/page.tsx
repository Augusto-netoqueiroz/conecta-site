import type { Metadata } from "next";
import EmpresasPage from "../EmpresasPage";

const siteUrl = "https://planostvsky.com.br";

export const metadata: Metadata = {
  title: "SKY Empresas | TV por Assinatura para Empresas",
  description:
    "Soluções SKY para hotéis, hospitais, bares, academias, escolas, órgãos públicos, offshore, mineradoras e outros negócios. Consulte condições pelo WhatsApp.",
  alternates: { canonical: `${siteUrl}/empresas/` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Planos TV SKY",
    url: `${siteUrl}/empresas/`,
    title: "SKY Empresas | Soluções para o seu negócio",
    description:
      "TV por assinatura para empresas com atendimento consultivo e soluções para diferentes segmentos.",
    images: [
      {
        url: "/img/EMPRESAS/hero-empresa-desktop.png",
        width: 1600,
        height: 700,
        alt: "SKY Empresas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SKY Empresas | Soluções para o seu negócio",
    description:
      "Consulte soluções SKY para hotéis, hospitais, restaurantes, academias, escolas e outros segmentos.",
    images: ["/img/EMPRESAS/hero-empresa-desktop.png"],
  },
};

export default function EmpresasRoute() {
  return <EmpresasPage />;
}
