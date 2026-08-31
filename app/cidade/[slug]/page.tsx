import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SitePage from "../../SitePage";
import { cities } from "../../cities";

const siteUrl = "https://contratetv.com.br";

export function generateStaticParams() {
  return cities.map((city) => ({
    slug: city.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const city = cities.find((item) => item.slug === params.slug);

  if (!city) {
    return {};
  }

  const url = `${siteUrl}/cidade/${city.slug}`;
  const title = `SKY em ${city.name} | Planos SKY`;
  const description = `Conheça os planos SKY, programação e formas de contratação em ${city.name}. Consulte as condições disponíveis para o seu CEP.`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Contrate TV",
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: `${siteUrl}/img/campaign/hero-sky-desktop.png`,
          alt: `Planos SKY em ${city.name}`,
        },
      ],
    },
  };
}

export default function CityPage({
  params,
}: {
  params: { slug: string };
}) {
  const city = cities.find((item) => item.slug === params.slug);

  if (!city) {
    notFound();
  }

  return <SitePage cityName={city.name} citySlug={city.slug} />;
}
