import type { Metadata } from "next";
import SitePage from "../SitePage";

const siteUrl = "https://planostvsky.com.br";

export const metadata: Metadata = {
  title: "Planos SKY Personalizáveis | Escolha Pontos e Opcionais",
  description:
    "Personalize seu plano SKY escolhendo pontos de TV e opcionais a la carte. Compare SUPER, TOP e SKY CONNECT com valores atualizados na hora.",
  alternates: { canonical: `${siteUrl}/planos/` },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Planos TV SKY",
    url: `${siteUrl}/planos/`,
    title: "Planos SKY Personalizáveis",
    description:
      "Escolha pontos, opcionais a la carte e veja o valor do plano atualizado na hora.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Planos SKY Personalizáveis",
    description: "Monte seu plano SKY com pontos e opcionais a la carte.",
  },
};

export default function PlanosPage() {
  return <SitePage customizablePlans pagePath="/planos/" />;
}
