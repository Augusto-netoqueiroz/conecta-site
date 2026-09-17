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
      pagePath="/planos-4746/"
      whatsappPhone="5561981954746"
      whatsappDisplay="(61) 98195-4746"
    />
  );
}
