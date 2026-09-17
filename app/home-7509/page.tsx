import type { Metadata } from "next";
import SitePage from "../SitePage";

export const metadata: Metadata = {
  title: "Planos SKY TV por Assinatura",
  description: "Consulte planos SKY, canais, ofertas e disponibilidade para seu endereço.",
  alternates: { canonical: "/" },
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <SitePage
      pagePath="/home-7509/"
      whatsappPhone="5511920487509"
      whatsappDisplay="(11) 92048-7509"
    />
  );
}
