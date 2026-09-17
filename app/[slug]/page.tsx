import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SeoLandingPage from "../SeoLandingPage";
import { getSeoPage, seoPages } from "../seoPages";

const siteUrl = "https://planostvsky.com.br";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return seoPages.map((page) => ({ slug: page.slug }));
}


export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) return {};

  const url = `${siteUrl}/${page.slug}/`;
  return {
    title: page.title,
    description: page.description,
    keywords: [page.navLabel, "SKY TV", "TV por assinatura", "assinar SKY", "planos SKY"],
    alternates: { canonical: url },
    robots: { index: true, follow: true },
    openGraph: { type: "website", locale: "pt_BR", siteName: "Planos TV SKY", url, title: page.title, description: page.description },
    twitter: { card: "summary", title: page.title, description: page.description },
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = getSeoPage(slug);
  if (!page) notFound();
  return <SeoLandingPage page={page} />;
}
