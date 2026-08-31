import Image from "next/image";
import Link from "next/link";
import CitySelector from "./CitySelector";
import TrackedLink from "./TrackedLink";

const phone = "5561981954746";
const siteUrl = "https://contratetv.com.br";
const wa = (message: string) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

const plans = [
  {
    name: "POP",
    complement: "com Amazon Prime e Premiere",
    benefits: [
      "50 canais em alta definição de TV por Assinatura e TV Aberta",
      "1 equipamento, além de acesso ao SKY+ sem custo adicional",
      "Inclui Amazon Prime e Premiere HD",
      "Taxa de adesão de R$ 1,90",
    ],
    oldPrice: "99,90",
    price: "49,90",
    promo: "Desconto no cartão de crédito do 1º ao 3º mês.",
  },
  {
    name: "SUPER I",
    complement: "com Amazon Prime",
    benefits: [
      "Mais de 100 canais de TV por Assinatura e TV Aberta",
      "1 equipamento, além de acesso ao SKY+ sem custo adicional",
      "Inclui Prime Video, frete grátis e rápido, Amazon Music e muito mais",
      "Taxa de adesão de R$ 1,90",
    ],
    oldPrice: "99,90",
    price: "49,90",
    promo: "Desconto no cartão de crédito do 1º ao 3º mês.",
  },
  {
    name: "SUPER II",
    complement: "com Amazon Prime",
    benefits: [
      "Mais de 100 canais de TV por Assinatura e TV Aberta",
      "2 equipamentos, além de acesso ao SKY+ sem custo adicional",
      "Inclui Prime Video, frete grátis e rápido, Amazon Music e muito mais",
      "Taxa de adesão de R$ 1,90",
    ],
    oldPrice: "139,90",
    price: "89,90",
    promo: "Desconto no cartão de crédito do 1º ao 3º mês.",
  },
];

const channelLogos = [
  ["/img/campaign/logo-premiere.png", "Premiere"],
  ["/img/campaign/canal-globo.jpg", "TV Globo"],
  ["/img/campaign/canal-sportv2.jpg", "SporTV 2"],
  ["/img/campaign/canal-ge-tv.png", "GE TV"],
  ["/img/campaign/canal-xsports.png", "X Sports"],
  ["/img/campaign/canal-discovery.png", "Discovery"],
  ["/img/campaign/canal-home-health.png", "Discovery Home & Health"],
  ["/img/campaign/canal-warner.png", "Warner TV"],
  ["/img/campaign/canal-tnt.png", "TNT"],
  ["/img/campaign/canal-discovery-kids.png", "Discovery Kids"],
] as const;

const faqItems = [
  { question: "Como consultar os planos disponíveis?", answer: "Chame no WhatsApp e informe seu CEP. A equipe apresenta somente as opções disponíveis para o endereço." },
  { question: "A instalação é grátis?", answer: "A condição depende da oferta vigente e da disponibilidade regional. O consultor confirma tudo antes da contratação." },
  { question: "Posso instalar em mais de uma TV?", answer: "Sim. Existem planos com equipamentos adicionais. Informe quantos pontos deseja conectar durante o atendimento." },
  { question: "O SKY+ está incluso?", answer: "O benefício varia de acordo com o plano contratado. A equipe confirma os acessos incluídos na oferta escolhida." },
  { question: "Este é o site oficial da SKY?", answer: "Não. Este é um canal de parceiro autorizado para comercialização de planos SKY." },
];

type SitePageProps = {
  cityName?: string;
  citySlug?: string;
};

function createStructuredData(cityName?: string, citySlug?: string) {
  const pageUrl = citySlug ? `${siteUrl}/cidade/${citySlug}` : `${siteUrl}/`;
  const areaServed = cityName
    ? { "@type": "AdministrativeArea", name: cityName }
    : { "@type": "Country", name: "Brasil" };

  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "Início", item: `${siteUrl}/` },
  ];

  if (cityName && citySlug) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: `SKY em ${cityName}`,
      item: pageUrl,
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Contrate TV",
        url: `${siteUrl}/`,
        logo: `${siteUrl}/img/campaign/logo-sky.png`,
        telephone: "+55 61 98195-4746",
        description: "Canal de parceiro autorizado para contratação de planos SKY.",
        areaServed,
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#planos-sky`,
        name: cityName ? `Planos SKY em ${cityName}` : "Planos SKY",
        url: pageUrl,
        provider: { "@id": `${siteUrl}/#organization` },
        areaServed,
        serviceType: "TV por assinatura",
        description: cityName
          ? `Consulta de planos SKY, programação e formas de contratação em ${cityName}, conforme disponibilidade no CEP.`
          : "Consulta de planos SKY, programação e formas de contratação, conforme disponibilidade no CEP.",
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: breadcrumbItems,
      },
    ],
  };
}

export default function SitePage({ cityName, citySlug }: SitePageProps) {
  const structuredData = createStructuredData(cityName, citySlug);
  const citySuffix = cityName ? ` em ${cityName}` : "";
  const cepContext = cityName ? ` em ${cityName}` : " para o meu CEP";

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />

      <header className="commercial-header">
        <div className="container header-row">
          <a className="commercial-brand" href="#inicio" aria-label="SKY — parceiro autorizado"><Image src="/img/campaign/logo-sky.png" alt="SKY" width={320} height={205} priority unoptimized /><span>PARCEIRO AUTORIZADO</span></a>
          <nav aria-label="Menu principal"><a href="#inicio">SKY TV</a><a href="#planos">SKY PÓS-PAGO</a><a href="#sky-plus">SKY+</a><a href="#programacao">PROGRAMAÇÃO</a><a href="#duvidas">DÚVIDAS</a></nav>
          <div className="header-actions">
            <TrackedLink
              className="call-header-cta"
              href={`tel:+${phone}`}
              eventName="click_phone"
              eventData={{ placement: "header", city: cityName || "geral" }}
            >
              <span>☎</span>
              <span>Ligue</span>
            </TrackedLink>
            <TrackedLink
              className="green-header-cta"
              href={wa(`Olá, quero assinar SKY e consultar as ofertas${cityName ? citySuffix : " do meu CEP"}.`)}
              target="_blank"
              rel="noopener noreferrer"
              eventName="click_whatsapp"
              eventData={{ placement: "header", city: cityName || "geral" }}
            >
              <Image src="/img/whatsapp-icon.webp" alt="" width={18} height={18} unoptimized />
              <span>WhatsApp</span>
            </TrackedLink>
          </div>
        </div>
      </header>
      <section className="offer-hero" id="inicio">
        <picture>
          <source media="(max-width: 680px)" srcSet="/img/campaign/hero-sky-mobile-v2.png" />
          <Image src="/img/campaign/hero-sky-desktop-v2.png" alt="Oferta SKY com Amazon Prime e Premiere" fill priority unoptimized sizes="100vw" />
        </picture>
        <TrackedLink
          className="hero-banner-whatsapp"
          href={wa(`Olá, quero assinar SKY${citySuffix}.`)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Assine agora pelo WhatsApp"
          eventName="click_whatsapp"
          eventData={{ placement: "hero_banner", city: cityName || "geral" }}
        />
      </section>

      <section className="reference-plans" id="planos">
        <div className="container">
          <div className="center-heading"><span>PLANOS SKY PÓS-PAGO</span><h2>A SKY certa para todos os momentos</h2><p>{cityName ? `Compare os destaques e consulte as condições comerciais disponíveis em ${cityName}.` : "Compare os destaques e consulte as condições comerciais disponíveis para o seu endereço."}</p></div>
          <div className="reference-plan-grid">
            {plans.map((plan, index) => (
              <article className={`reference-plan ${index === 1 ? "recommended" : ""}`} key={plan.name}>
                {index === 1 && <div className="recommended-label">OFERTA EM DESTAQUE</div>}
                <div className="plan-red-top">
                  <div className="plan-name"><span>SKY PÓS-PAGO</span><strong>{plan.name}</strong><p>{plan.complement}</p></div>
                </div>
                <div className="plan-white-body">
                  <h3>O que tem de legal</h3>
                  <ul>{plan.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
                  <div className="consult-price">
  <span>
    De <s>R$ {plan.oldPrice}</s> por
  </span>

  <strong>
    R$ {plan.price}
    <small>/mês</small>
  </strong>

  <small>{plan.promo}</small>
</div>
                  <TrackedLink
                    className="plan-main-cta"
                    href={wa(`Olá, quero consultar a oferta do plano SKY ${plan.name}${cepContext}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    eventName="click_plan"
                    eventData={{ plan: plan.name, city: cityName || "geral", placement: "plan_primary" }}
                  >
                    CONSULTAR PLANO
                  </TrackedLink>
                  <TrackedLink
                    className="plan-whatsapp"
                    href={wa(`Olá, tenho interesse no plano SKY ${plan.name}${citySuffix}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    eventName="click_plan"
                    eventData={{ plan: plan.name, city: cityName || "geral", placement: "plan_whatsapp" }}
                  >
                    <span>☏</span> ASSINAR POR WHATSAPP
                  </TrackedLink>
                </div>
              </article>
            ))}
          </div>
          <p className="offer-disclaimer">Ofertas sujeitas à disponibilidade, análise e alterações comerciais. Confirme valores, grade, equipamentos e condições no atendimento.</p>
        </div>
      </section>

      <section className="included-strip"><div className="container included-row"><div><strong>Instalação credenciada</strong><span>Agendamento após a contratação</span></div><div><strong>Equipamento HD</strong><span>Conforme o plano escolhido</span></div><div><strong>Atendimento autorizado</strong><span>Acompanhamento do pedido</span></div></div></section>

      <section className="streaming-feature" id="sky-plus">
        <div className="container streaming-layout">
          <div className="streaming-copy"><span>SKY+ INCLUSO EM PLANOS SELECIONADOS</span><h2>Sua programação também vai com você.</h2><p>Assista a filmes, séries, esportes e canais ao vivo do seu plano SKY pelo celular, computador ou dispositivos compatíveis.</p><ul><li>Conteúdo ao vivo e sob demanda</li><li>Acesso em múltiplas telas</li><li>Programação do plano em um só lugar</li></ul><TrackedLink
              href={wa(`Olá, quero um plano com acesso ao SKY+${citySuffix}.`)}
              target="_blank"
              rel="noopener noreferrer"
              eventName="click_whatsapp"
              eventData={{ placement: "sky_plus", city: cityName || "geral" }}
            >
              QUERO SKY+ <b>→</b>
            </TrackedLink></div>
          <div className="streaming-visual"><Image src="/img/campaign/sky-plus-devices-v2.png" alt="SKY+ na televisão, notebook e celular" width={626} height={417} unoptimized /></div>
        </div>
      </section>

      <section className="programming-showcase" id="programacao">
        <div className="container">
          <div className="center-heading"><span>ENTRETENIMENTO COMPLETO</span><h2>Os melhores canais em um só lugar</h2><p>Esportes, filmes, séries, variedades, notícias e programação infantil para todos os momentos.</p></div>
          <div className="brand-channel-grid">{channelLogos.map(([src, alt]) => <div key={alt}><Image src={src} alt={alt} width={220} height={160} unoptimized /></div>)}</div>
          <TrackedLink
            className="channels-cta"
            href={wa(`Olá, quero consultar a grade de canais dos planos SKY${citySuffix}.`)}
            target="_blank"
            rel="noopener noreferrer"
            eventName="click_whatsapp"
            eventData={{ placement: "channels", city: cityName || "geral" }}
          >
            CONSULTAR GRADE DE CANAIS
          </TrackedLink>
        </div>
      </section>

      <section className="contract-steps"><div className="container"><div className="center-heading light"><span>COMO CONTRATAR</span><h2>Assine SKY sem complicação</h2></div><ol><li><b>01</b><strong>Escolha o plano</strong><p>Veja qual opção combina com a sua casa.</p></li><li><b>02</b><strong>Informe seu CEP</strong><p>Receba somente as condições da sua região.</p></li><li><b>03</b><strong>Finalize o cadastro</strong><p>A equipe acompanha a contratação com você.</p></li><li><b>04</b><strong>Agende a instalação</strong><p>Escolha a melhor data para receber o técnico.</p></li></ol></div></section>

      <CitySelector currentCityName={cityName} />

      <section className="reference-faq" id="duvidas"><div className="container faq-layout"><div><span>DÚVIDAS FREQUENTES</span><h2>Antes de assinar</h2><p>Se precisar de ajuda, fale diretamente com nosso atendimento autorizado.</p></div><div className="faq-list">{faqItems.map((item, index) => <details open={index === 0} key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></div></section>

      <section className="sales-closing"><div className="container sales-closing-row"><div><span>PARCEIRO AUTORIZADO SKY</span><h2>{cityName ? `Consulte agora a melhor opção SKY em ${cityName}.` : "Consulte agora a melhor opção para sua casa."}</h2></div><TrackedLink
        href={wa(`Olá, quero assinar SKY${citySuffix}. Pode consultar os planos disponíveis para mim?`)}
        target="_blank"
        rel="noopener noreferrer"
        eventName="click_whatsapp"
        eventData={{ placement: "sales_closing", city: cityName || "geral" }}
      >
        ASSINAR PELO WHATSAPP <b>→</b>
      </TrackedLink></div></section>

      <footer className="commercial-footer"><div className="container footer-grid"><div className="footer-logo"><Image src="/img/campaign/logo-sky.png" alt="SKY" width={320} height={205} unoptimized /><span>PARCEIRO AUTORIZADO</span></div><div><strong>PLANOS DA SKY</strong><a href="#planos">Pós-pago</a><a href="#sky-plus">SKY+</a><a href="#programacao">Programação</a></div><div><strong>INFORMAÇÕES</strong><Link href="/politica-de-privacidade">Política de privacidade</Link><Link href="/termos-de-uso">Termos de uso</Link><a href="#duvidas">Dúvidas frequentes</a></div><div><strong>ATENDIMENTO</strong><TrackedLink
        href={wa(`Olá, quero mais informações sobre os planos SKY${citySuffix}.`)}
        target="_blank"
        rel="noopener noreferrer"
        eventName="click_whatsapp"
        eventData={{ placement: "footer", city: cityName || "geral" }}
      >
        WhatsApp: (61) 98195-4746
      </TrackedLink><span>Atendimento para todo o Brasil</span></div></div><div className="container footer-legal"><span>© 2026 Contrate TV. Todos os direitos reservados.</span><span>Canal de parceiro autorizado. Este não é o site oficial da SKY.</span></div></footer>

      <TrackedLink
        className="whatsapp-float"
        href={wa(`Olá, vim pelo site e quero assinar SKY${citySuffix}.`)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Assinar SKY pelo WhatsApp"
        eventName="click_whatsapp"
        eventData={{ placement: "floating_button", city: cityName || "geral" }}
      >
        <Image src="/img/whatsapp-icon.webp" alt="" role="presentation" width={100} height={100} unoptimized />
        <span>Assinar</span>
      </TrackedLink>
    </main>
  );
}
