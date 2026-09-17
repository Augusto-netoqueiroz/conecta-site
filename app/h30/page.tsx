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
      pagePath="/h30/"
      whatsappPhone="5561982254730"
      whatsappDisplay="(61) 98225-4730"
    />
  );
}
