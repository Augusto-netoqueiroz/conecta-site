import Image from "next/image";
import Link from "next/link";
import TrackedLink from "./TrackedLink";
import type { SeoPage } from "./seoPages";
import { seoPages } from "./seoPages";

const phone = "5561981954746";
const siteUrl = "https://planostvsky.com.br";
const wa = (message: string) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

function structuredData(page: SeoPage) {
  const pageUrl = `${siteUrl}/${page.slug}/`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: "Planos TV SKY",
        inLanguage: "pt-BR",
        publisher: { "@id": `${siteUrl}/#organization` },
      },
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: page.title,
        description: page.description,
        inLanguage: "pt-BR",
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: page.title,
        serviceType: "Consulta e contratação de TV por assinatura",
        provider: {
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: "Planos TV SKY",
          legalName: "STARTELECOM TELECOMUNICACOES LTDA",
          taxID: "10.863.171/0001-06",
          telephone: "+55 61 98195-4746",
          url: `${siteUrl}/`,
        },
        areaServed: { "@type": "Country", name: "Brasil" },
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: page.faqs.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: page.navLabel, item: pageUrl },
        ],
      },
    ],
  };
}

export default function SeoLandingPage({ page }: { page: SeoPage }) {
  const relatedPages = seoPages.filter((item) => item.slug !== page.slug);

  return (
    <main className="seo-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(page)).replace(/</g, "\\u003c") }} />
      <header className="commercial-header">
        <div className="container header-row">
          <Link className="commercial-brand" href="/" aria-label="Planos TV SKY — início">
            <Image src="/img/campaign/logo-sky.png" alt="SKY" width={320} height={205} unoptimized />
            <span>PARCEIRO AUTORIZADO</span>
          </Link>
          <nav className="desktop-nav" aria-label="Navegação da página">
            <Link href="/planos-sky-tv/">PLANOS</Link>
            <Link href="/precos-planos-sky/">PREÇOS</Link>
            <Link href="/canais-sky/">CANAIS</Link>
            <Link href="/instalacao-sky/">INSTALAÇÃO</Link>
          </nav>
          <div className="header-actions">
            <TrackedLink className="call-header-cta" href={`tel:+${phone}`} eventName="click_phone" eventData={{ placement: "seo_header", page: page.slug }}>
              <span>☎</span><span>Ligue</span>
            </TrackedLink>
            <TrackedLink className="green-header-cta" href={wa(page.whatsappMessage)} target="_blank" rel="noopener noreferrer" eventName="click_whatsapp" eventData={{ placement: "seo_header", page: page.slug }}>
              <Image src="/img/whatsapp-icon.webp" alt="" width={18} height={18} unoptimized /><span>WhatsApp</span>
            </TrackedLink>
          </div>
        </div>
      </header>

      <div className="container seo-breadcrumb" aria-label="Navegação estrutural">
        <Link href="/">Início</Link><span aria-hidden="true">/</span><span>{page.navLabel}</span>
      </div>

      <section className="seo-hero">
        <div className="container seo-hero-grid">
          <div>
            <span className="seo-eyebrow">{page.eyebrow}</span>
            <h1>{page.title}</h1>
            <p>{page.intro}</p>
            <div className="seo-hero-actions">
              <TrackedLink href={wa(page.whatsappMessage)} target="_blank" rel="noopener noreferrer" eventName="click_whatsapp" eventData={{ placement: "seo_hero", page: page.slug }}>CONSULTAR PELO WHATSAPP</TrackedLink>
              <Link href="/#planos">VER PLANOS</Link>
            </div>
          </div>
          <ul className="seo-highlights">
            {page.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
        </div>
      </section>

      <section className="seo-content">
        <div className="container seo-content-grid">
          <article>
            {page.sections.map((section) => (
              <section className="seo-article-section" key={section.title}>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
              </section>
            ))}
          </article>
          <aside className="seo-contact-card">
            <span>ATENDIMENTO AUTORIZADO</span>
            <h2>Consulte a condição para o seu endereço</h2>
            <p>Informe seu CEP e confirme plano, preço, canais, pagamento e instalação antes de contratar.</p>
            <TrackedLink href={wa(page.whatsappMessage)} target="_blank" rel="noopener noreferrer" eventName="click_whatsapp" eventData={{ placement: "seo_sidebar", page: page.slug }}>FALAR NO WHATSAPP</TrackedLink>
            <small>Este é um canal de parceiro autorizado, não o site oficial da SKY.</small>
          </aside>
        </div>
      </section>

      <section className="seo-faq" aria-labelledby="seo-faq-title">
        <div className="container seo-faq-grid">
          <div><span>DÚVIDAS FREQUENTES</span><h2 id="seo-faq-title">Respostas sobre {page.navLabel.toLowerCase()}</h2></div>
          <div className="faq-list">
            {page.faqs.map((item, index) => <details open={index === 0} key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="seo-related" aria-labelledby="seo-related-title">
        <div className="container">
          <span>GUIAS SKY</span><h2 id="seo-related-title">Continue sua pesquisa</h2>
          <div className="seo-related-grid">
            {relatedPages.map((item) => <Link href={`/${item.slug}/`} key={item.slug}><strong>{item.navLabel}</strong><small>{item.description}</small><b aria-hidden="true">→</b></Link>)}
          </div>
        </div>
      </section>

      <footer className="commercial-footer">
        <div className="container seo-footer-row">
          <div className="footer-logo"><Image src="/img/campaign/logo-sky.png" alt="SKY" width={320} height={205} unoptimized /><span>PARCEIRO AUTORIZADO</span></div>
          <div><strong>ATENDIMENTO</strong><TrackedLink href={wa(page.whatsappMessage)} target="_blank" rel="noopener noreferrer" eventName="click_whatsapp" eventData={{ placement: "seo_footer", page: page.slug }}>WhatsApp: (61) 98195-4746</TrackedLink></div>
          <div><strong>INFORMAÇÕES</strong><Link href="/politica-de-privacidade/">Política de privacidade</Link><Link href="/termos-de-uso/">Termos de uso</Link></div>
        </div>
        <div className="container footer-legal"><span>© 2026 Contrate TV. Todos os direitos reservados.</span><span>STARTELECOM TELECOMUNICACOES LTDA — CNPJ: 10.863.171/0001-06</span><span>Canal de parceiro autorizado. Este não é o site oficial da SKY.</span></div>
      </footer>

      <TrackedLink className="whatsapp-float" href={wa(page.whatsappMessage)} target="_blank" rel="noopener noreferrer" aria-label="Consultar pelo WhatsApp" eventName="click_whatsapp" eventData={{ placement: "seo_floating_button", page: page.slug }}>
        <Image src="/img/whatsapp-icon.webp" alt="" role="presentation" width={100} height={100} unoptimized /><span>Assinar</span>
      </TrackedLink>
    </main>
  );
}
