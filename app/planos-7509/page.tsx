import type { Metadata } from "next";
import SitePage from "../SitePage";

export const metadata: Metadata = {
  title: "Planos SKY Personalizáveis",
  description: "Personalize seu plano SKY escolhendo pontos de TV e opcionais a la carte.",
  alternates: { canonical: "/planos/" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <SitePage
      customizablePlans
      pagePath="/planos-7509/"
      whatsappPhone="5511920487509"
      whatsappDisplay="(11) 92048-7509"
    />
  );
}
