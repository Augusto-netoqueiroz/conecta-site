import type { Metadata } from "next";
import MercantilPage from "../MercantilPage";
import { mercantilFaqs } from "../mercantilData";

const title = "SKY Mercantil | Escolha seu Aparelho e Plano";
const description = "Escolha o KIT MERCANTIL HD com antena por R$ 149,90 ou o MERCANTIL HD sem antena por R$ 89,90. Compare planos SKY e veja o total do primeiro mês.";
const pageUrl = "https://planostvsky.com.br/mercantil/";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/mercantil/" },
  openGraph: {
    title,
    description,
    url: pageUrl,
    type: "website",
    locale: "pt_BR",
    siteName: "Planos TV SKY",
    images: [{ url: "/img/og-sky-home.jpg", alt: "SKY Mercantil" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/img/og-sky-home.jpg"],
  },
};

export default function Mercantil() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description,
        inLanguage: "pt-BR",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: "https://planostvsky.com.br/" },
          { "@type": "ListItem", position: 2, name: "SKY Mercantil", item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: mercantilFaqs.map(({ question, answer }) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <MercantilPage />
    </>
  );
}
