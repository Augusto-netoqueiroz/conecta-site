import type { Metadata } from "next";
import MercantilPage from "../MercantilPage";

export const metadata: Metadata = {
  title: "Equipamentos e Planos SKY | Kit Completo ou Receptor HD",
  description: "Escolha seu equipamento HD, compare os planos SKY e confira o pagamento antes de receber os aparelhos.",
  alternates: { canonical: "/mercantil/" },
  robots: { index: false, follow: true },
};

export default function Mercantil30() {
  return (
    <MercantilPage
      pageId="mercantil30"
      whatsappPhone="556182254730"
      whatsappDisplay="(61) 8225-4730"
    />
  );
}
