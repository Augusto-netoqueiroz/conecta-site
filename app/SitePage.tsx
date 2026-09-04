import Image from "next/image";
import Link from "next/link";
import CitySelector from "./CitySelector";
import TrackedLink from "./TrackedLink";
import ChannelsModal from "./ChannelsModal";
import { popMainChannels, superMainChannels, topMainChannels } from "./channelData";
const phone = "5561981954746";
const siteUrl = "https://planostvsky.com.br";
const wa = (message: string) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
const promo = "Desconto no cartão de crédito do 1º ao 4º mês.";
const standardLogos = [["nfl-card-logo.webp","NFL"],["prime-card-logo.webp","Amazon Prime"],["sky-card-logo.webp","SKY+"]] as const;
const popLogos = [["nfl-card-logo.webp","NFL"],["prime-card-logo.webp","Amazon Prime"],["Premiere-card-logo.png","Premiere"],["sky-card-logo.webp","SKY+"]] as const;
const connectLogos = [["nfl-card-logo.webp","NFL"],["prime-card-logo.webp","Amazon Prime"],["Premiere-card-logo.png","Premiere"],["hbo-card-logo.webp","HBO"],["telecine-card-logo.webp","Telecine"],["paramount-card-logo.png","Paramount+"],["disney-card-logo.webp","Disney+"],["espn-card-logo.png","ESPN"],["sky-card-logo.webp","SKY+"]] as const;
const standardBenefits = (channels: number) => [`Mais de ${channels} canais de TV por Assinatura e TV Aberta!`,"Programação em HD","Inclui Amazon Prime","Inclui NFL","Inclui SKY+"];
const plans = [
  { name:"POP HD", highlight:"+50 CANAIS", summary:["Canais locais em HD","+ Futebol ao vivo"], logos:popLogos, mainChannels:popMainChannels, channelKey:"pop", benefits:["Mais de 50 canais de TV por Assinatura e TV Aberta!","Programação em HD","Inclui Amazon Prime","Inclui Premiere e NFL","Inclui SKY+"], oldPrice:"99,90", price:"69,90", promo },
  { name:"SUPER HD", highlight:"+100 CANAIS", summary:["Filmes • Séries • Esportes"], logos:standardLogos, mainChannels:superMainChannels, channelKey:"super", benefits:standardBenefits(100), oldPrice:"89,90", price:"59,90", promo },
  { name:"SUPER HD II", highlight:"+100 CANAIS", summary:["Filmes • Séries • Esportes"], badge:"2 PONTOS INCLUSOS", logos:standardLogos, mainChannels:superMainChannels, channelKey:"super", benefits:standardBenefits(100), oldPrice:"109,90", price:"79,90", promo },
  { name:"TOP HD", highlight:"+170 CANAIS", summary:["Filmes • Séries • Esportes"], logos:standardLogos, mainChannels:topMainChannels, channelKey:"top", benefits:standardBenefits(170), oldPrice:"129,90", price:"99,90", promo },
  { name:"TOP HD II", highlight:"+170 CANAIS", summary:["Filmes • Séries • Esportes"], badge:"2 PONTOS INCLUSOS", logos:standardLogos, mainChannels:topMainChannels, channelKey:"top", benefits:standardBenefits(170), oldPrice:"149,90", price:"119,90", promo },
  { name:"SKY CONNECT", highlight:"PACOTE COMPLETO", summary:["TV • Streaming • Esportes"], badge:"EXPERIÊNCIA COMPLETA", logos:connectLogos, mainChannels:topMainChannels, channelKey:"connect", benefits:["Inclui Amazon Prime","Inclui Premiere, HBO e Telecine","Inclui Paramount+ e Disney+","Inclui ESPN","Inclui NFL e SKY+"], oldPrice:"399,90", price:"369,90", promo },
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
type SitePageProps = { cityName?: string; citySlug?: string };
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
        name: "Planos TV SKY",
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
    <a
      className="commercial-brand"
      href="#inicio"
      aria-label="SKY — parceiro autorizado"
    >
      <Image
        src="/img/campaign/logo-sky.png"
        alt="SKY"
        width={320}
        height={205}
        unoptimized
      />
      <span>PARCEIRO AUTORIZADO</span>
    </a>
    <nav className="desktop-nav" aria-label="Menu principal">
      <a href="#inicio">SKY TV</a>
      <a href="#planos">SKY PÓS-PAGO</a>
      <a href="#sky-plus">SKY+</a>
      <a href="#programacao">PROGRAMAÇÃO</a>
      <a href="#duvidas">DÚVIDAS</a>
    </nav>
    <div className="header-actions">
      <TrackedLink
        className="call-header-cta"
        href={`tel:+${phone}`}
        eventName="click_phone"
        eventData={{
          placement: "header",
          city: cityName || "geral",
        }}
      >
        <span>☎</span>
        <span>Ligue</span>
      </TrackedLink>
      <TrackedLink
        className="green-header-cta"
        href={wa(`Olá, quero assinar SKY${citySuffix}.`)}
        target="_blank"
        rel="noopener noreferrer"
        eventName="click_whatsapp"
        eventData={{
          placement: "header",
          city: cityName || "geral",
        }}
      >
        <Image
          src="/img/whatsapp-icon.webp"
          alt=""
          width={18}
          height={18}
          unoptimized
        />
        <span>WhatsApp</span>
      </TrackedLink>
    </div>
    <details className="mobile-menu">
      <summary aria-label="Abrir menu">
        <span></span>
        <span></span>
        <span></span>
      </summary>
      <div className="mobile-menu-panel">
        <a href="#inicio">SKY TV</a>
        <a href="#planos">SKY PÓS-PAGO</a>
        <a href="#sky-plus">SKY+</a>
        <a href="#programacao">PROGRAMAÇÃO</a>
        <a href="#duvidas">DÚVIDAS</a>
      </div>
    </details>
  </div>
</header>
      <section className="offer-hero" id="inicio">
        <picture>
  <source
    media="(max-width: 680px)"
    srcSet="/img/campaign/hero-sky-mobile-v2.webp"
  />
  <img
    src="/img/campaign/hero-sky-desktop-v2.webp"
    alt="Oferta SKY com Amazon Prime e Premiere"
    width="1600"
    height="533"
    loading="eager"
    fetchPriority="high"
    decoding="async"
  />
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
                  <div className="plan-name"><span>SKY PÓS-PAGO</span><strong>{plan.name}</strong><b className="plan-highlight">{plan.highlight}</b>{plan.summary.map((line) => <p className="plan-summary" key={line}>{line}</p>)}</div>
                  {plan.badge && <span className="plan-top-badge">{plan.badge}</span>}
                </div>
                <div className="plan-white-body">
                  <h3>O que vem em seu plano:</h3>
<div className="plan-logo-grid">
  {plan.logos.map(([src, alt]) => (
    <div className="plan-logo-item" key={src}>
      <Image
        src={`/img/campaign/${src}`}
        alt={alt}
        width={160}
        height={90}
        unoptimized
      />
    </div>
  ))}
</div>
<ul className="plan-benefits">
  {plan.benefits.map((benefit) => (
    <li key={benefit}>{benefit}</li>
  ))}
</ul>
<div className="plan-channel-preview">
  <strong className="plan-channel-title">Principais canais</strong>
  <div className="plan-channel-icons">
    {plan.mainChannels.map(([src, alt]) => (
      <Image
        key={alt}
        src={src}
        alt={alt}
        width={90}
        height={50}
        unoptimized
      />
    ))}
  </div>
  <button className="plan-more-channels" type="button" data-channel-key={plan.channelKey}>VER MAIS CANAIS</button>
</div>
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
      <ChannelsModal />
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
          <div className="streaming-visual"><Image src="/img/campaign/sky-plus-devices-v2.webp" alt="SKY+ na televisão, notebook e celular" width={626} height={417} unoptimized /></div>
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
      </TrackedLink><span>Atendimento para todo o Brasil</span>
      <div className="footer-social">
  <span>Siga-nos</span>
  <div>
    <a href="https://www.instagram.com/skystar_telecom/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
      <Image className="instagram-icon" src="/img/instagram-icon-96.webp" alt="" width={36} height={36} unoptimized />
    </a>
    <a href="https://www.facebook.com/profile.php?id=61577597452297" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
      <Image className="facebook-icon" src="/img/facebook-icon-96.webp" alt="" width={36} height={36} unoptimized />
    </a>
  </div>
</div>
      </div></div><div className="container footer-legal"><span>© 2026 Contrate TV. Todos os direitos reservados.</span><span>Canal de parceiro autorizado. Este não é o site oficial da SKY.</span></div></footer>
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
