import Image from "next/image";
import Link from "next/link";
import TrackedLink from "./TrackedLink";
import HospitalityPlanBuilder from "./HospitalityPlanBuilder";
import ChannelsModal from "./ChannelsModal";
import "./empresas.css";
import "./empresas-formulario.css";

const phone = "5561982484817";
const displayPhone = "(61) 98248-4817";
const siteUrl = "https://planostvsky.com.br";

const wa = (message: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

const segments = [
  {
    title: "Hotéis e Pousadas",
    image: "/img/EMPRESAS/hotel-empresa.png",
    text: "Soluções para quartos, recepção e áreas comuns, de acordo com a quantidade de pontos do estabelecimento.",
    message: "Olá, quero conhecer as opções SKY Empresas para hotel ou pousada. Gostaria de consultar valores e condições.",
  },
  {
    title: "Clínicas e Hospitais",
    image: "/img/EMPRESAS/hospital-empresa.PNG",
    text: "Programação para recepções, quartos, salas de espera e ambientes de atendimento.",
    message: "Olá, quero conhecer as opções SKY Empresas para clínica ou hospital. Gostaria de consultar valores e condições.",
  },
  {
    title: "Bares e Restaurantes",
    image: "/img/EMPRESAS/bar-empresa.png",
    text: "Entretenimento e esportes para melhorar a experiência dos clientes no seu estabelecimento.",
    message: "Olá, quero conhecer as opções SKY Empresas para bar ou restaurante. Gostaria de consultar valores e condições.",
  },
  {
    title: "Academias e Clubes",
    image: "/img/EMPRESAS/academia-empresa.png",
    text: "Conteúdo para áreas de treino, convivência, recepção e espaços compartilhados.",
    message: "Olá, quero conhecer as opções SKY Empresas para academia ou clube. Gostaria de consultar valores e condições.",
  },
  {
    title: "Escolas e Universidades",
    image: "/img/EMPRESAS/escola-empresa.png",
    text: "Soluções para espaços educacionais, áreas de convivência, recepção e ambientes institucionais.",
    message: "Olá, quero conhecer as opções SKY Empresas para escola ou universidade. Gostaria de consultar valores e condições.",
  },
  {
    title: "Órgãos Públicos",
    image: "/img/EMPRESAS/publico-empresa.PNG",
    text: "Atendimento consultivo para ambientes institucionais e estruturas com múltiplos pontos.",
    message: "Olá, quero conhecer as opções SKY Empresas para órgão público. Gostaria de consultar valores e condições.",
  },
  {
    title: "Cruzeiros e Embarcações",
    image: "/img/EMPRESAS/cruzeiro-empresa.png",
    text: "Consulte soluções disponíveis para embarcações e operações que precisam de entretenimento a bordo.",
    message: "Olá, quero conhecer as opções SKY Empresas para cruzeiro ou embarcação. Gostaria de consultar valores e condições.",
  },
  {
    title: "Offshore",
    image: "/img/EMPRESAS/offshore-empresa.png",
    text: "Soluções para operações offshore, áreas de descanso, convivência e alojamento.",
    message: "Olá, quero conhecer as opções SKY Empresas para operação offshore. Gostaria de consultar valores e condições.",
  },
  {
    title: "Mineradoras",
    image: "/img/EMPRESAS/mineradora-empresa.png",
    text: "Atendimento para alojamentos, áreas administrativas e espaços de convivência em operações de mineração.",
    message: "Olá, quero conhecer as opções SKY Empresas para mineradora. Gostaria de consultar valores e condições.",
  },
] as const;

const faqItems = [
  {
    question: "Quais empresas podem contratar SKY Empresas?",
    answer:
      "A solução pode atender diferentes segmentos, como hotéis, hospitais, bares, academias, escolas, órgãos públicos, operações offshore e mineradoras. A disponibilidade e as condições dependem do projeto e da região.",
  },
  {
    question: "O valor é o mesmo para todos os negócios?",
    answer:
      "Não. A proposta pode variar conforme o segmento, quantidade de pontos, estrutura do local, endereço e condições comerciais vigentes.",
  },
  {
    question: "É possível instalar em vários quartos ou ambientes?",
    answer:
      "Sim. O consultor avalia a quantidade de pontos necessária e apresenta a configuração adequada para o estabelecimento.",
  },
  {
    question: "Como recebo uma proposta?",
    answer:
      "Use o montador para informar quantidade de pontos, prazo, plano e opcionais. Depois, envie a configuração pelo WhatsApp para receber a proposta e confirmar as condições comerciais.",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/empresas/#webpage`,
      url: `${siteUrl}/empresas/`,
      name: "SKY Empresas",
      description:
        "Soluções SKY para empresas, hotéis, hospitais, bares, academias, escolas, órgãos públicos, offshore e mineradoras.",
      inLanguage: "pt-BR",
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/empresas/#service`,
      name: "SKY Empresas",
      serviceType: "TV por assinatura para empresas",
      areaServed: { "@type": "Country", name: "Brasil" },
      provider: {
        "@type": "Organization",
        name: "Planos TV SKY",
        url: `${siteUrl}/`,
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

export default function EmpresasPage() {
  return (
    <main className="empresas-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />

      <header className="commercial-header">
        <div className="container header-row">
          <Link className="commercial-brand" href="/" aria-label="SKY — parceiro autorizado">
            <Image src="/img/campaign/logo-sky.png" alt="SKY" width={320} height={205} unoptimized />
            <span>PARCEIRO AUTORIZADO</span>
          </Link>

          <nav className="desktop-nav" aria-label="Menu principal">
            <a href="#montar-plano">MONTAR PLANO</a>
            <a href="#segmentos">SEGMENTOS</a>
            <a href="#como-funciona">COMO FUNCIONA</a>
            <a href="#duvidas">DÚVIDAS</a>
          </nav>

          <div className="header-actions">
            <TrackedLink className="call-header-cta" href="tel:08003631234" eventName="click_phone" eventData={{ placement: "empresas_header" }}>
              <span>☎</span>
              <span>Ligue</span>
            </TrackedLink>

            <TrackedLink className="green-header-cta" href={wa("Olá, quero conhecer as opções SKY Empresas.")} target="_blank" rel="noopener noreferrer" eventName="click_whatsapp" eventData={{ placement: "empresas_header" }}>
              <Image src="/img/whatsapp-icon.webp" alt="" width={18} height={18} unoptimized />
              <span>WhatsApp</span>
            </TrackedLink>
          </div>

          <details className="mobile-menu">
            <summary aria-label="Abrir menu">
              <span></span><span></span><span></span>
            </summary>
            <div className="mobile-menu-panel">
              <a href="#montar-plano">MONTAR PLANO</a>
              <a href="#segmentos">SEGMENTOS</a>
              <a href="#como-funciona">COMO FUNCIONA</a>
              <a href="#duvidas">DÚVIDAS</a>
            </div>
          </details>
        </div>
      </header>

      <section className="empresas-hero" aria-label="SKY Empresas">
        <picture>
          <source media="(max-width: 680px)" srcSet="/img/EMPRESAS/hero-empresa-mobile.png" />
          <img
            src="/img/EMPRESAS/hero-empresa-desktop.png"
            alt="SKY Empresas, soluções de TV por assinatura para negócios"
            width="1600"
            height="700"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </section>

      <section className="empresas-quick" id="solucoes">
        <div className="container empresas-quick-grid">
          <div><strong>Atendimento consultivo</strong><span>Uma solução pensada para o perfil do seu negócio.</span></div>
          <div><strong>Múltiplos pontos</strong><span>Configurações para diferentes ambientes e estruturas.</span></div>
          <div><strong>Condições por projeto</strong><span>Valores e elegibilidade variam conforme o ambiente e a modalidade comercial.</span></div>
        </div>
      </section>

      <section className="empresas-intro">
        <div className="container empresas-intro-grid">
          <div>
            <span>SKY EMPRESAS</span>
            <h1>TV por assinatura para o seu negócio</h1>
          </div>
          <div>
            <p>
              Leve entretenimento, informação e esporte para clientes, hóspedes, pacientes,
              equipes e visitantes. O atendimento é personalizado de acordo com o segmento,
              estrutura e quantidade de pontos necessários.
            </p>
            <TrackedLink href="#segmentos" eventName="click_view_plans" eventData={{ placement: "empresas_intro" }}>
              ESCOLHER MEU NEGÓCIO
            </TrackedLink>
          </div>
        </div>
      </section>


      <section className="empresas-segments" id="segmentos">
        <div className="container">
          <div className="empresas-heading">
            <span>SOLUÇÕES POR SEGMENTO</span>
            <h2>Escolha o tipo do seu negócio</h2>
            <p>Escolha o seu segmento. Em cada card você pode montar o plano ou falar diretamente pelo WhatsApp.</p>
          </div>

          <div className="empresas-segment-grid">
            {segments.map((segment) => (
              <article className="empresas-segment-card" key={segment.title}>
                <div className="empresas-segment-image">
                  <Image
                    src={segment.image}
                    alt={segment.title}
                    width={720}
                    height={480}
                    sizes="(max-width: 680px) 100vw, (max-width: 980px) 50vw, 33vw"
                    loading="lazy"
                    unoptimized
                  />
                </div>
                <div className="empresas-segment-body">
                  <h3>{segment.title}</h3>
                  <p>{segment.text}</p>
                  <div className="empresas-card-actions">
                    <HospitalityPlanBuilder segment={segment.title} phone={phone} />
                    <TrackedLink href={wa(segment.message)} target="_blank" rel="noopener noreferrer" eventName="click_whatsapp" eventData={{ placement: "empresas_segment", segment: segment.title }}>
                      <Image src="/img/whatsapp-icon.webp" alt="" width={18} height={18} unoptimized />
                      <span>CONSULTAR ESTE SEGMENTO</span>
                    </TrackedLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="empresas-offer">
        <div className="container empresas-offer-card">
          <div>
            <span>CONDIÇÕES PARA EMPRESAS</span>
            <h2>Uma proposta de acordo com a estrutura do seu negócio</h2>
            <p>Informe seu segmento, cidade e quantidade aproximada de pontos ou quartos. O consultor verifica as condições disponíveis para o seu projeto.</p>
          </div>
          <TrackedLink href={wa("Olá, quero consultar valores SKY Empresas para o meu negócio.")} target="_blank" rel="noopener noreferrer" eventName="click_whatsapp" eventData={{ placement: "empresas_offer" }}>
            CONSULTAR VALORES
          </TrackedLink>
        </div>
      </section>

      <section className="empresas-steps" id="como-funciona">
        <div className="container">
          <div className="empresas-heading empresas-heading-light">
            <span>COMO CONTRATAR</span>
            <h2>Do primeiro contato à instalação</h2>
          </div>
          <ol>
            <li><b>01</b><strong>Monte sua configuração</strong><p>Informe ambiente, quantidade de pontos, prazo, plano e opcionais.</p></li>
            <li><b>02</b><strong>Revise o resumo</strong><p>Confira a seleção e os valores quando houver tabela comercial aplicável.</p></li>
            <li><b>03</b><strong>Solicite a proposta</strong><p>Envie a configuração pronta para o atendimento pelo WhatsApp.</p></li>
            <li><b>04</b><strong>Confirme as condições</strong><p>O consultor valida elegibilidade, disponibilidade e condições comerciais do projeto.</p></li>
          </ol>
        </div>
      </section>

      <section className="empresas-faq" id="duvidas">
        <div className="container empresas-faq-grid">
          <div>
            <span>DÚVIDAS FREQUENTES</span>
            <h2>Antes de contratar</h2>
            <p>Se ainda tiver alguma dúvida, fale diretamente com nosso atendimento.</p>
          </div>
          <div className="faq-list">
            {faqItems.map((item, index) => (
              <details open={index === 0} key={item.question}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="empresas-closing">
        <div className="container empresas-closing-card">
          <div>
            <span>SKY EMPRESAS</span>
            <h2>Vamos montar uma solução para o seu negócio?</h2>
            <p>Converse pelo WhatsApp e receba atendimento de acordo com o seu segmento.</p>
          </div>
          <TrackedLink href={wa("Olá, quero falar com um consultor SKY Empresas.")} target="_blank" rel="noopener noreferrer" eventName="click_whatsapp" eventData={{ placement: "empresas_closing" }}>
            <Image src="/img/whatsapp-icon.webp" alt="" width={20} height={20} unoptimized />
            <span>FALAR COM UM CONSULTOR</span>
          </TrackedLink>
        </div>
      </section>

      <p className="container empresas-disclaimer">
        Condições sujeitas à elegibilidade, disponibilidade regional, análise e oferta comercial vigente.
        Os valores automáticos desta página se aplicam somente às condições DTH Hospitality indicadas no montador e devem ser confirmados durante o atendimento.
      </p>

      <footer className="commercial-footer">
        <div className="container empresas-footer-grid">
          <div className="footer-logo">
            <Image src="/img/campaign/logo-sky.png" alt="SKY" width={320} height={205} unoptimized />
            <span>PARCEIRO AUTORIZADO</span>
          </div>
          <div>
            <strong>SKY EMPRESAS</strong>
            <a href="#segmentos">Segmentos</a>
            <a href="#como-funciona">Como contratar</a>
            <a href="#duvidas">Dúvidas frequentes</a>
          </div>
          <div>
            <strong>INFORMAÇÕES</strong>
            <Link href="/politica-de-privacidade/">Política de privacidade</Link>
            <Link href="/termos-de-uso/">Termos de uso</Link>
          </div>
          <div>
            <strong>ATENDIMENTO</strong>
            <TrackedLink href={wa("Olá, quero mais informações sobre SKY Empresas.")} target="_blank" rel="noopener noreferrer" eventName="click_whatsapp" eventData={{ placement: "empresas_footer" }}>
              WhatsApp: {displayPhone}
            </TrackedLink>
            <span>Atendimento para todo o Brasil</span>
          </div>
        </div>
        <div className="container footer-legal">
          <span>© 2026 Contrate TV. Todos os direitos reservados.</span>
          <span>STARTELECOM TELECOMUNICACOES LTDA — CNPJ: 10.863.171/0001-06</span>
          <span>Canal de parceiro autorizado. Este não é o site oficial da SKY.</span>
        </div>
      </footer>

      <ChannelsModal />

      <TrackedLink className="whatsapp-float" href={wa("Olá, quero conhecer as opções SKY Empresas.")} target="_blank" rel="noopener noreferrer" aria-label="Falar sobre SKY Empresas pelo WhatsApp" eventName="click_whatsapp" eventData={{ placement: "empresas_floating_button" }}>
        <Image src="/img/whatsapp-icon.webp" alt="" role="presentation" width={100} height={100} unoptimized />
        <span>Empresas</span>
      </TrackedLink>
    </main>
  );
}
