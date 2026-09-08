import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SitePage from "../../SitePage";
import { cities } from "../../cities";

const siteUrl = "https://planostvsky.com.br";

type CityPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return cities.map((city) => ({ slug: city.slug }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const city = cities.find((item) => item.slug === slug);

  if (!city) return {};

  const url = `${siteUrl}/cidade/${city.slug}`;

  return {
    title: city.seoTitle,
    description: city.seoDescription,
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: {
      title: city.seoTitle,
      description: city.seoDescription,
      url,
      siteName: "Planos TV SKY",
      locale: "pt_BR",
      type: "website",
      images: [
        {
          url: `${siteUrl}/img/campaign/hero-sky-desktop-v2.webp`,
          width: 1600,
          height: 533,
          alt: `Planos SKY em ${city.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: city.seoTitle,
      description: city.seoDescription,
      images: [`${siteUrl}/img/campaign/hero-sky-desktop-v2.webp`],
    },
  };
}

export default async function CityPage({ params }: CityPageProps) {
  const { slug } = await params;
  const city = cities.find((item) => item.slug === slug);

  if (!city) notFound();

  return <SitePage cityName={city.name} citySlug={city.slug} cityData={city} />;
}
