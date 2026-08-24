import Image from "next/image";
import Link from "next/link";

const phone = "5561981954746";
const wa = (message: string) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

const plans = [
  {
    name: "POP",
    complement: "com Amazon Prime e Premiere",
    badges: ["AMAZON PRIME", "PREMIERE", "SKY+", "TV HD"],
    benefits: ["Canais de TV por assinatura e TV aberta", "1 equipamento HD para sua casa", "Acesso ao SKY+ em plano elegível", "Conteúdo para toda a família"],
  },
  {
    name: "SUPER II",
    complement: "com Amazon Prime",
    badges: ["AMAZON PRIME", "+100 CANAIS", "SKY+", "2 EQUIP."],
    benefits: ["Mais opções de entretenimento", "2 equipamentos HD", "Filmes, séries, notícias e esporte", "Benefícios conforme a oferta vigente"],
  },
  {
    name: "TOP CONNECT II",
    complement: "com Amazon Prime",
    badges: ["AMAZON PRIME", "+160 CANAIS", "SKY+", "2 EQUIP."],
    benefits: ["Programação completa para a casa", "2 equipamentos HD", "Esportes e canais premium em destaque", "Acesso ao SKY+ em plano elegível"],
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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": "https://contratetv.com.br/#organization", name: "Contrate TV", url: "https://contratetv.com.br/", logo: "https://contratetv.com.br/img/campaign/logo-sky.png", telephone: "+55 61 98195-4746", description: "Canal de parceiro autorizado para contratação de planos SKY.", areaServed: "BR" },
    { "@type": "Product", "@id": "https://contratetv.com.br/#planos-sky", name: "Planos SKY", brand: { "@type": "Brand", name: "SKY" }, category: "TV por assinatura", description: "Planos SKY com equipamentos, benefícios e instalação conforme disponibilidade regional." },
    { "@type": "FAQPage", mainEntity: faqItems.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Início", item: "https://contratetv.com.br/" }] },
  ],
};

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />

      <header className="commercial-header">
        <div className="container header-row">
          <a className="commercial-brand" href="#inicio" aria-label="SKY — parceiro autorizado"><Image src="/img/campaign/logo-sky.png" alt="SKY" width={320} height={205} priority unoptimized /><span>PARCEIRO AUTORIZADO</span></a>
          <nav aria-label="Menu principal"><a href="#inicio">SKY TV</a><a href="#planos">SKY PÓS-PAGO</a><a href="#sky-plus">SKY+</a><a href="#programacao">PROGRAMAÇÃO</a><a href="#duvidas">DÚVIDAS</a></nav>
          <a className="green-header-cta" href={wa("Olá, quero assinar SKY e consultar as ofertas do meu CEP.")} target="_blank" rel="noopener noreferrer"><span className="phone-mark">☎</span><span>Assinar pelo WhatsApp</span></a>
        </div>
      </header>

      <section className="offer-hero" id="inicio">
        <picture><source media="(max-width: 680px)" srcSet="/img/campaign/hero-sky-mobile.png" /><Image src="/img/campaign/hero-sky-desktop.png" alt="Campanha de futebol SKY" fill priority unoptimized sizes="100vw" /></picture>
        <div className="container offer-hero-inner">
          <div className="offer-box">
            <span>OFERTA PARA NOVOS CLIENTES</span>
            <h1>Futebol, filmes e diversão na sua SKY.</h1>
            <p>Consulte os planos disponíveis para sua região e escolha a programação ideal para a casa toda.</p>
            <a href={wa("Olá, quero consultar as ofertas SKY disponíveis para o meu endereço.")} target="_blank" rel="noopener noreferrer">CONSULTAR OFERTA <b>→</b></a>
            <small>Condições sujeitas à disponibilidade e análise no CEP.</small>
          </div>
        </div>
      </section>

      <section className="reference-plans" id="planos">
        <div className="container">
          <div className="center-heading"><span>PLANOS SKY PÓS-PAGO</span><h2>A SKY certa para todos os momentos</h2><p>Compare os destaques e consulte as condições comerciais disponíveis para o seu endereço.</p></div>
          <div className="reference-plan-grid">
            {plans.map((plan, index) => (
              <article className={`reference-plan ${index === 0 ? "recommended" : ""}`} key={plan.name}>
                {index === 0 && <div className="recommended-label">OFERTA EM DESTAQUE</div>}
                <div className="plan-red-top">
                  <div className="plan-name"><span>SKY PÓS-PAGO</span><strong>{plan.name}</strong><p>{plan.complement}</p></div>
                  <div className="benefit-badges">{plan.badges.map((badge) => <span key={badge}>{badge}</span>)}</div>
                </div>
                <div className="plan-white-body">
                  <h3>O que tem de legal</h3>
                  <ul>{plan.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
                  <div className="consult-price"><span>Condição especial</span><strong>Consulte</strong><small>oferta disponível no seu CEP</small></div>
                  <a className="plan-main-cta" href={wa(`Olá, quero consultar a oferta do plano SKY ${plan.name} para o meu CEP.`)} target="_blank" rel="noopener noreferrer">CONSULTAR PLANO</a>
                  <a className="plan-whatsapp" href={wa(`Olá, tenho interesse no plano SKY ${plan.name}.`)} target="_blank" rel="noopener noreferrer"><span>☏</span> ASSINAR POR WHATSAPP</a>
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
          <div className="streaming-copy"><span>SKY+ INCLUSO EM PLANOS SELECIONADOS</span><h2>Sua programação também vai com você.</h2><p>Assista a filmes, séries, esportes e canais ao vivo do seu plano SKY pelo celular, computador ou dispositivos compatíveis.</p><ul><li>Conteúdo ao vivo e sob demanda</li><li>Acesso em múltiplas telas</li><li>Programação do plano em um só lugar</li></ul><a href={wa("Olá, quero um plano com acesso ao SKY+.")} target="_blank" rel="noopener noreferrer">QUERO SKY+ <b>→</b></a></div>
          <div className="streaming-visual"><Image className="skyplus-mark" src="/img/campaign/logo-sky-plus.png" alt="SKY+" width={649} height={649} unoptimized /><Image src="/img/campaign/sky-plus-devices.webp" alt="SKY+ na televisão, notebook e celular" width={626} height={417} unoptimized /></div>
        </div>
      </section>

      <section className="programming-showcase" id="programacao">
        <div className="container">
          <div className="center-heading"><span>ENTRETENIMENTO COMPLETO</span><h2>Os melhores canais em um só lugar</h2><p>Esportes, filmes, séries, variedades, notícias e programação infantil para todos os momentos.</p></div>
          <div className="brand-channel-grid">{channelLogos.map(([src, alt]) => <div key={alt}><Image src={src} alt={alt} width={220} height={160} unoptimized /></div>)}</div>
          <a className="channels-cta" href={wa("Olá, quero consultar a grade de canais dos planos SKY.")} target="_blank" rel="noopener noreferrer">CONSULTAR GRADE DE CANAIS</a>
        </div>
      </section>

      <section className="contract-steps"><div className="container"><div className="center-heading light"><span>COMO CONTRATAR</span><h2>Assine SKY sem complicação</h2></div><ol><li><b>01</b><strong>Escolha o plano</strong><p>Veja qual opção combina com a sua casa.</p></li><li><b>02</b><strong>Informe seu CEP</strong><p>Receba somente as condições da sua região.</p></li><li><b>03</b><strong>Finalize o cadastro</strong><p>A equipe acompanha a contratação com você.</p></li><li><b>04</b><strong>Agende a instalação</strong><p>Escolha a melhor data para receber o técnico.</p></li></ol></div></section>

      <section className="reference-faq" id="duvidas"><div className="container faq-layout"><div><span>DÚVIDAS FREQUENTES</span><h2>Antes de assinar</h2><p>Se precisar de ajuda, fale diretamente com nosso atendimento autorizado.</p></div><div className="faq-list">{faqItems.map((item, index) => <details open={index === 0} key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></div></section>

      <section className="sales-closing"><div className="container sales-closing-row"><div><span>PARCEIRO AUTORIZADO SKY</span><h2>Consulte agora a melhor opção para sua casa.</h2></div><a href={wa("Olá, quero assinar SKY. Pode consultar os planos disponíveis para mim?")} target="_blank" rel="noopener noreferrer">ASSINAR PELO WHATSAPP <b>→</b></a></div></section>

      <footer className="commercial-footer"><div className="container footer-grid"><div className="footer-logo"><Image src="/img/campaign/logo-sky.png" alt="SKY" width={320} height={205} unoptimized /><span>PARCEIRO AUTORIZADO</span></div><div><strong>PLANOS DA SKY</strong><a href="#planos">Pós-pago</a><a href="#sky-plus">SKY+</a><a href="#programacao">Programação</a></div><div><strong>INFORMAÇÕES</strong><Link href="/politica-de-privacidade">Política de privacidade</Link><Link href="/termos-de-uso">Termos de uso</Link><a href="#duvidas">Dúvidas frequentes</a></div><div><strong>ATENDIMENTO</strong><a href={wa("Olá, quero mais informações sobre os planos SKY.")} target="_blank" rel="noopener noreferrer">WhatsApp: (61) 98195-4746</a><span>Atendimento para todo o Brasil</span></div></div><div className="container footer-legal"><span>© 2026 Contrate TV. Todos os direitos reservados.</span><span>Canal de parceiro autorizado. Este não é o site oficial da SKY.</span></div></footer>

      <a className="whatsapp-float" href={wa("Olá, vim pelo site e quero assinar SKY.")} target="_blank" rel="noopener noreferrer" aria-label="Assinar SKY pelo WhatsApp"><Image src="/img/whatsapp-icon.webp" alt="" role="presentation" width={100} height={100} unoptimized /><span>Assinar</span></a>
    </main>
  );
}
