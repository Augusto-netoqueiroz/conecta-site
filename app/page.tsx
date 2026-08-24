import Image from "next/image";
import Link from "next/link";

const phone = "5561981954746";
const wa = (message: string) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

const plans = [
  { name: "Top I", tag: "FUTEBOL + ENTRETENIMENTO", complement: "Amazon Prime e Premiere em destaque", image: "/img/Top.webp", features: ["1 equipamento HD", "Acesso ao SKY+", "Programação para toda a família"] },
  { name: "Top Connect II", tag: "MAIS PONTOS DE TV", complement: "Uma opção completa para a casa toda", image: "/img/Top2.webp", features: ["2 equipamentos HD", "Amazon Prime incluso*", "Acesso ao SKY+"] },
  { name: "SKY Connect", tag: "EXPERIÊNCIA COMPLETA", complement: "Mais conteúdo, mais telas e mais diversão", image: "/img/Sky-Connect.webp", features: ["Opções com até 4 pontos", "Filmes, séries e esportes", "Acesso ao SKY+"] },
];

const channels = [
  { src: "/img/campaign/logo-premiere.png", alt: "Premiere" },
  { src: "/img/campaign/canal-globo.jpg", alt: "TV Globo" },
  { src: "/img/campaign/canal-sportv2.jpg", alt: "SporTV 2" },
  { src: "/img/campaign/canal-ge-tv.png", alt: "GE TV" },
  { src: "/img/campaign/canal-xsports.png", alt: "X Sports" },
  { src: "/img/campaign/canal-discovery.png", alt: "Discovery" },
  { src: "/img/campaign/canal-home-health.png", alt: "Discovery Home & Health" },
  { src: "/img/campaign/canal-warner.png", alt: "Warner TV" },
  { src: "/img/campaign/canal-tnt.png", alt: "TNT" },
  { src: "/img/campaign/canal-discovery-kids.png", alt: "Discovery Kids HD" },
];

const faqItems = [
  { question: "A instalação é grátis?", answer: "A gratuidade depende da oferta vigente e da disponibilidade no endereço. A condição é confirmada pelo consultor antes da contratação." },
  { question: "Como descubro os planos disponíveis no meu CEP?", answer: "Chame no WhatsApp e informe seu CEP. A equipe consulta as opções, equipamentos e condições válidas para a sua região." },
  { question: "Posso ter SKY em mais de uma TV?", answer: "Sim. Existem opções com pontos adicionais. Informe quantas TVs deseja conectar para receber a recomendação adequada." },
  { question: "O SKY+ está incluído?", answer: "O acesso ao SKY+ varia conforme o plano e a oferta contratada. O consultor confirma o benefício e as regras antes de concluir o pedido." },
  { question: "Este é o site oficial da SKY?", answer: "Não. Este é um canal de vendas de parceiro autorizado SKY, com atendimento para contratação de planos da operadora." },
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

      <div className="trust-bar"><div className="container trust-bar-inner"><span><b>✓</b> Parceiro autorizado SKY</span><span>Atendimento para todo o Brasil</span><span>Consulte ofertas pelo seu CEP</span></div></div>

      <header className="site-header">
        <div className="container header-inner">
          <a className="sky-brand" href="#inicio" aria-label="Contrate TV — parceiro autorizado SKY"><Image src="/img/campaign/logo-sky.png" alt="SKY" width={320} height={205} priority unoptimized /><span>PARCEIRO AUTORIZADO</span></a>
          <nav aria-label="Menu principal"><a href="#planos">Planos</a><a href="#programacao">Programação</a><a href="#sky-plus">SKY+</a><a href="#duvidas">Dúvidas</a></nav>
          <a className="header-cta" href={wa("Olá, vim pelo site e quero consultar os planos SKY para o meu CEP.")} target="_blank" rel="noopener noreferrer"><span>Falar com um consultor</span><b>→</b></a>
        </div>
      </header>

      <section className="campaign-hero" id="inicio">
        <picture className="hero-art"><source media="(max-width: 680px)" srcSet="/img/campaign/hero-sky-mobile.png" /><Image src="/img/campaign/hero-sky-desktop.png" alt="Jogador de futebol em campanha SKY" fill priority unoptimized sizes="100vw" /></picture>
        <div className="container hero-content"><div className="hero-offer"><span className="campaign-kicker">TV, ESPORTE E STREAMING</span><h1>A sua casa<br />no clima da SKY.</h1><p>Planos com canais para toda a família, equipamentos HD e benefícios para assistir onde quiser.</p><div className="hero-actions"><a className="primary-cta" href={wa("Olá, quero conhecer as ofertas SKY disponíveis para o meu endereço.")} target="_blank" rel="noopener noreferrer">Consultar ofertas <span>→</span></a><a className="text-cta" href="#planos">Ver opções de planos</a></div><small>Ofertas, instalação e benefícios sujeitos à disponibilidade no CEP.</small></div></div>
      </section>

      <section className="proof-strip" aria-label="Vantagens do atendimento"><div className="container proof-grid"><div><b>01</b><p><strong>Atendimento autorizado</strong><span>Compra acompanhada do início ao fim</span></p></div><div><b>02</b><p><strong>Oferta para o seu CEP</strong><span>Você recebe somente opções disponíveis</span></p></div><div><b>03</b><p><strong>Instalação credenciada</strong><span>Agendamento após a contratação</span></p></div><div><b>04</b><p><strong>Suporte na escolha</strong><span>Plano adequado ao seu jeito de assistir</span></p></div></div></section>

      <section className="plans-section" id="planos">
        <div className="container">
          <div className="section-intro plans-intro"><div><span className="eyebrow">ESCOLHA A SUA SKY</span><h2>Um plano para cada casa.</h2></div><p>Os valores e benefícios mudam conforme a região. Escolha uma opção para receber as condições atuais no WhatsApp.</p></div>
          <div className="plans-catalog">{plans.map((plan, index) => <article className={`plan-card ${index === 0 ? "featured" : ""}`} key={plan.name}><div className="plan-media"><Image src={plan.image} alt={`${plan.name} — ${plan.complement}`} width={600} height={337} unoptimized sizes="(max-width: 760px) 100vw, 32vw" />{index === 0 && <span>MAIS PROCURADO</span>}</div><div className="plan-body"><span className="plan-tag">{plan.tag}</span><h3>{plan.name}</h3><p>{plan.complement}</p><ul>{plan.features.map((feature) => <li key={feature}>{feature}</li>)}</ul><a href={wa(`Olá, quero saber valores e disponibilidade do plano ${plan.name} no meu CEP.`)} target="_blank" rel="noopener noreferrer">Consultar este plano <b>→</b></a></div></article>)}</div>
          <p className="legal-note">*Grade de canais, equipamentos, serviços inclusos, valores e condições dependem do plano, da campanha e da disponibilidade regional.</p>
        </div>
      </section>

      <section className="channels-section" id="programacao"><div className="container channels-layout"><div className="channels-copy"><span className="eyebrow light">PROGRAMAÇÃO PARA TODOS</span><h2>Do jogo ao desenho. Do filme à notícia.</h2><p>Encontre esportes, entretenimento, variedades e conteúdo infantil em um só lugar.</p><a href={wa("Olá, quero consultar a grade de canais dos planos SKY.")} target="_blank" rel="noopener noreferrer">Consultar grade do meu plano <span>→</span></a></div><div className="channel-grid" aria-label="Canais e conteúdos em destaque">{channels.map((channel) => <div className="channel-logo" key={channel.alt}><Image src={channel.src} alt={channel.alt} width={220} height={160} unoptimized /></div>)}</div></div></section>

      <section className="skyplus-section" id="sky-plus"><div className="container skyplus-layout"><div className="skyplus-visual"><Image className="skyplus-logo" src="/img/campaign/logo-sky-plus.png" alt="SKY+" width={649} height={649} unoptimized /><Image className="devices" src="/img/campaign/sky-plus-devices.webp" alt="SKY+ disponível na TV, notebook e celular" width={626} height={417} unoptimized /></div><div className="skyplus-copy"><span className="eyebrow light">SUA PROGRAMAÇÃO VAI COM VOCÊ</span><h2>Assista à SKY em mais telas.</h2><p>Com o SKY+, planos elegíveis dão acesso a filmes, séries, canais e conteúdos sob demanda no celular, computador e dispositivos compatíveis.</p><ul><li>Conteúdo ao vivo e sob demanda</li><li>Acesso em dispositivos compatíveis</li><li>Benefício disponível em planos selecionados</li></ul><a className="white-cta" href={wa("Olá, quero saber quais planos têm acesso ao SKY+.")} target="_blank" rel="noopener noreferrer">Quero um plano com SKY+ <span>→</span></a></div></div></section>

      <section className="extras-section"><div className="container extras-layout"><div className="extras-copy"><span className="eyebrow">CONTEÚDO QUE FAZ DIFERENÇA</span><h2>Mais futebol. Mais filmes. Mais escolhas.</h2><p>Consulte as ofertas que combinam a programação SKY com benefícios como Premiere e Amazon Prime.</p><a href={wa("Olá, quero consultar os planos com Premiere e Amazon Prime.")} target="_blank" rel="noopener noreferrer">Ver ofertas disponíveis <span>→</span></a></div><div className="extras-logos"><div><Image src="/img/campaign/logo-premiere.png" alt="Premiere" width={180} height={165} unoptimized /><p><strong>Premiere</strong><span>Para acompanhar o futebol</span></p></div><div><Image src="/img/campaign/logo-amazon-prime.png" alt="Amazon Prime" width={649} height={649} unoptimized /><p><strong>Amazon Prime</strong><span>Filmes, séries e benefícios</span></p></div></div></div></section>

      <section className="how-section"><div className="container how-layout"><div className="how-heading"><span className="eyebrow">COMO CONTRATAR</span><h2>Simples, direto e acompanhado.</h2></div><ol><li><b>1</b><div><strong>Envie seu CEP</strong><p>Chame no WhatsApp e conte quantas TVs deseja conectar.</p></div></li><li><b>2</b><div><strong>Compare as opções</strong><p>Receba planos, benefícios e condições válidas para o endereço.</p></div></li><li><b>3</b><div><strong>Finalize e agende</strong><p>Após a contratação, escolha a melhor data de instalação.</p></div></li></ol></div></section>

      <section className="partner-section"><div className="container partner-layout"><div className="partner-seal"><span>✓</span><p><strong>PARCEIRO</strong><b>AUTORIZADO</b><small>SKY</small></p></div><div><span className="eyebrow light">CONTRATE TV</span><h2>Atendimento autorizado para contratar com tranquilidade.</h2></div><p>Consultamos o seu endereço, explicamos as condições vigentes e acompanhamos o pedido até o agendamento. Este é um canal de parceiro autorizado, não o site oficial da SKY.</p></div></section>

      <section className="faq-section" id="duvidas"><div className="container faq-layout"><div className="faq-heading"><span className="eyebrow">ANTES DE ASSINAR</span><h2>Dúvidas frequentes</h2><p>Faltou alguma informação? A equipe responde pelo WhatsApp.</p></div><div className="faq-list">{faqItems.map((item, index) => <details open={index === 0} key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div></div></section>

      <section className="final-cta"><div className="container final-cta-inner"><div><span>ATENDIMENTO PARA TODO O BRASIL</span><h2>Descubra agora qual SKY combina com a sua casa.</h2></div><a href={wa("Olá, quero consultar os planos SKY disponíveis no meu endereço.")} target="_blank" rel="noopener noreferrer">Consultar pelo WhatsApp <b>→</b></a></div></section>

      <footer className="site-footer"><div className="container footer-main"><div className="footer-brand"><Image src="/img/campaign/logo-sky.png" alt="SKY" width={320} height={205} unoptimized /><span>PARCEIRO AUTORIZADO</span></div><p>Contrate TV — canal de atendimento autorizado para contratação de planos SKY.</p><div><a href="#planos">Planos</a><Link href="/politica-de-privacidade">Política de privacidade</Link><Link href="/termos-de-uso">Termos de uso</Link></div></div><div className="container footer-bottom"><span>© 2026 Contrate TV. Todos os direitos reservados.</span><span>Este é um canal de parceiro autorizado, não o site oficial da SKY.</span></div></footer>

      <a className="whatsapp-float" href={wa("Olá, vim pelo site e quero consultar os planos SKY.")} target="_blank" rel="noopener noreferrer" aria-label="Atendimento pelo WhatsApp"><Image src="/img/whatsapp-icon.webp" alt="" role="presentation" width={100} height={100} unoptimized /><span>Consultar planos</span></a>
    </main>
  );
}
