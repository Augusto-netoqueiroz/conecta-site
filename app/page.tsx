import Image from "next/image";
import Link from "next/link";

const phone = "5561981954746";

const wa = (message: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

const plans = [
  { name: "Top I", complement: "Amazon Prime + Premiere", image: "/img/Top.webp", equipment: "1 equipamento HD", icons: ["amazon-prime-circle.webp", "premiere-circle.webp", "espn-circle.webp"] },
  { name: "Top Connect II", complement: "Amazon Prime incluso", image: "/img/Top2.webp", equipment: "2 equipamentos HD", icons: ["amazon-prime-circle.webp", "gloob-circle.webp", "globo-novelas-circle.webp"] },
  { name: "Sky Connect", complement: "Conteúdo para a família toda", image: "/img/Sky-Connect.webp", equipment: "Até 4 equipamentos", icons: ["amazon-prime-circle.webp", "disneymais-circle.webp", "hbo-circle.webp"] },
];

const faqItems = [
  { question: "A instalação é grátis?", answer: "A gratuidade está sujeita às condições da oferta e à disponibilidade no endereço. A equipe confirma antes da contratação." },
  { question: "Como consultar os planos da minha região?", answer: "Envie o CEP pelo WhatsApp. Você receberá somente as opções disponíveis para o seu endereço." },
  { question: "É possível instalar em mais de uma TV?", answer: "Sim. Há planos com equipamentos adicionais. Informe quantos pontos precisa durante o atendimento." },
  { question: "Quais documentos são necessários?", answer: "O especialista informa os dados necessários conforme o plano escolhido e conduz a contratação com você." },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://portal-de-tv.augusto-netoqueiroz0.chatgpt.site/#organization",
      name: "Contrate TV",
      url: "https://portal-de-tv.augusto-netoqueiroz0.chatgpt.site/",
      logo: "https://portal-de-tv.augusto-netoqueiroz0.chatgpt.site/img/logomarca.webp",
      telephone: "+55 61 98195-4746",
      description: "Parceiro autorizado para contratação de planos SKY.",
      areaServed: "BR",
    },
    {
      "@type": "Product",
      "@id": "https://portal-de-tv.augusto-netoqueiroz0.chatgpt.site/#planos-sky",
      name: "Planos SKY",
      brand: { "@type": "Brand", name: "SKY" },
      category: "TV por assinatura",
      description: "Planos de TV por assinatura SKY com equipamentos e instalação conforme disponibilidade regional.",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [{ "@type": "ListItem", position: 1, name: "Início", item: "https://portal-de-tv.augusto-netoqueiroz0.chatgpt.site/" }],
    },
  ],
};

export default function Home() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <div className="promo-bar"><div className="container promo-inner"><span>Parceiro autorizado SKY</span><span>Contratação segura para todo o Brasil</span><span>Instalação grátis*</span></div></div>

      <header className="header">
        <div className="container header-inner">
          <a href="#inicio" className="brand-lockup" aria-label="Contrate TV — parceiro autorizado SKY"><Image src="/img/logomarca.webp" alt="Logotipo SKY e Amazon Prime Video" width={450} height={93} priority unoptimized /><span>PARCEIRO AUTORIZADO</span></a>
          <nav aria-label="Menu principal"><a href="#planos">Planos</a><a href="#vantagens">Por que assinar</a><a href="#duvidas">Dúvidas</a></nav>
          <a className="header-contact" href={wa("Olá, vim pelo site e quero conhecer os planos disponíveis.")} target="_blank" rel="noopener noreferrer"><Image src="/img/whatsapp-icon.webp" alt="" role="presentation" width={100} height={100} unoptimized /><span><small>Atendimento rápido</small>Falar no WhatsApp</span></a>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="container hero-layout">
          <div className="hero-copy">
            <span className="partner-label"><b>✓</b> PARCEIRO AUTORIZADO SKY</span>
            <h1>SKY na sua casa.<br /><em>Do seu jeito.</em></h1>
            <p className="hero-subtitle">Escolha seu plano com atendimento especializado e receba antena, receptor HD e instalação no seu endereço.</p>
            <ul className="hero-list"><li><b>✓</b> Filmes, séries, esportes e canais infantis</li><li><b>✓</b> Instalação feita por técnico credenciado</li><li><b>✓</b> Planos com Amazon Prime e SKY+</li></ul>
            <a className="main-button" href={wa("Olá, quero assinar SKY. Pode me mostrar os planos para o meu endereço?")} target="_blank" rel="noopener noreferrer">Ver ofertas para meu CEP <span>→</span></a>
            <p className="microcopy">Envie seu CEP e consulte as ofertas disponíveis na sua região.</p>
          </div>
          <div className="hero-campaign">
            <picture>
              <source media="(max-width: 680px)" srcSet="/img/Banner_SKY_Inst-mobile.webp" />
              <Image src="/img/banner_SKY_inst.webp" alt="Programação esportiva SKY" width={1600} height={937} priority unoptimized sizes="(max-width: 980px) 100vw, 53vw" />
            </picture>
            <div className="hero-product"><Image src="/img/aparelhotv.webp" alt="Antena, receptor HD e controle remoto SKY" width={1200} height={699} priority unoptimized sizes="(max-width: 980px) 100vw, 55vw" /></div>
            <div className="install-stamp"><small>CONDIÇÃO PARA NOVOS CLIENTES</small><strong>Instalação<br />grátis*</strong><span>Consulte disponibilidade</span></div>
          </div>
        </div>
      </section>

      <section className="quick-benefits" id="vantagens">
        <div className="container quick-grid">
          <div><span className="benefit-index">01</span><p><strong>Programação SKY</strong><span>Filmes, esporte, notícias e diversão</span></p></div>
          <div><span className="benefit-index">02</span><p><strong>Instalação credenciada</strong><span>Agendamento após a contratação</span></p></div>
          <div><span className="benefit-index">03</span><p><strong>Compra acompanhada</strong><span>Da escolha do plano ao agendamento</span></p></div>
        </div>
      </section>

      <section className="programming">
        <div className="container programming-inner">
          <div className="programming-title"><span>PROGRAMAÇÃO COMPLETA</span><h2>Tem sempre algo bom passando.</h2></div>
          <picture><Image src="/img/footer-canais.webp" alt="Logotipos de canais disponíveis nos planos SKY" width={1594} height={108} unoptimized sizes="(max-width: 980px) 100vw, 820px" /></picture>
        </div>
      </section>

      <section className="authorized">
        <div className="container authorized-layout">
          <div className="authorized-mark"><span>✓</span><strong>PARCEIRO<br />AUTORIZADO</strong><small>SKY</small></div>
          <div className="authorized-copy"><span>CONTRATE TV</span><h2>Atendimento autorizado para você contratar com tranquilidade.</h2></div>
          <p>Consultamos a disponibilidade no seu CEP, apresentamos as condições vigentes e acompanhamos o pedido até o agendamento da instalação.</p>
        </div>
      </section>

      <section className="plans" id="planos">
        <div className="container">
          <div className="section-heading"><div><span>ESCOLHA SUA SKY</span><h2>Planos para cada jeito de assistir.</h2></div><p>Compare os destaques e fale com um consultor para receber os valores e as condições disponíveis no seu endereço.</p></div>
          <div className="plan-list">
            {plans.map((plan, index) => (
              <article className="plan-row" key={plan.name}>
                <div className="plan-number">0{index + 1}</div>
                <Image className="plan-image" src={plan.image} alt={`${plan.name} — ${plan.complement}`} width={600} height={337} unoptimized sizes="(max-width: 680px) 100vw, 230px" />
                <div className="plan-info"><h3>{plan.name}</h3><p>{plan.complement}</p><div className="mini-icons" aria-label="Serviços e canais em destaque">{plan.icons.map(icon => <Image src={`/img/${icon}`} alt="" role="presentation" width={64} height={64} unoptimized key={icon} />)}</div></div>
                <div className="plan-details"><span>+160 canais</span><span>{plan.equipment}</span><span>Acesso ao SKY+</span></div>
                <a href={wa(`Olá, quero saber valores e disponibilidade do plano ${plan.name}.`)} target="_blank" rel="noopener noreferrer">Ver condições <b>→</b></a>
              </article>
            ))}
          </div>
          <p className="conditions">*Consulte condições comerciais, disponibilidade, grade de canais e regras da instalação para o seu endereço.</p>
        </div>
      </section>

      <section className="installation">
        <div className="container installation-layout">
          <div className="installation-image"><Image src="/img/homem-antena-recort.webp" alt="Técnico credenciado instalando antena SKY" width={1460} height={1067} unoptimized sizes="(max-width: 980px) 100vw, 48vw" /></div>
          <div className="installation-copy">
            <span>DA CONTRATAÇÃO À INSTALAÇÃO</span><h2>Você escolhe o plano. A gente cuida do resto.</h2>
            <ol><li><b>1</b><p><strong>Chame no WhatsApp</strong>Informe seu CEP e quantos pontos de TV precisa.</p></li><li><b>2</b><p><strong>Confira as opções</strong>Você recebe os planos válidos para o seu endereço.</p></li><li><b>3</b><p><strong>Agende a instalação</strong>Após contratar, escolha o melhor dia para receber o técnico.</p></li></ol>
          </div>
        </div>
      </section>

      <section className="service">
        <div className="container service-layout">
          <div className="service-copy"><span className="service-label">ATENDIMENTO AUTORIZADO</span><h2>Você fala com quem conhece SKY.</h2><p>Informe seu CEP, quantas TVs deseja conectar e o que mais gosta de assistir. A gente compara as opções e explica cada condição antes de você decidir.</p><a href={wa("Olá, preciso de ajuda para escolher um plano SKY.")} target="_blank" rel="noopener noreferrer">Falar com um consultor <span>→</span></a></div>
          <div className="service-product"><div className="sky-wordmark">SKY<sup>®</sup></div><Image src="/img/aparelhotv.webp" alt="Antena, receptor e controle remoto SKY" width={1200} height={699} unoptimized sizes="(max-width: 980px) 100vw, 55vw" /><p><b>TV por assinatura SKY</b><span>Equipamentos e instalação conforme o plano contratado.</span></p></div>
        </div>
      </section>

      <section className="faq" id="duvidas">
        <div className="container faq-layout">
          <div className="faq-title"><span>DÚVIDAS FREQUENTES</span><h2>Antes de assinar</h2><p>Se ainda faltar alguma informação, fale com a equipe pelo WhatsApp.</p></div>
          <div className="faq-items">
            {faqItems.map((item, index) => <details open={index === 0} key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="closing"><div className="container closing-inner"><div><span>ATENDIMENTO PARA TODO O BRASIL</span><h2>Consulte agora os planos para o seu endereço.</h2></div><a className="main-button light" href={wa("Olá, quero consultar os planos SKY disponíveis no meu endereço.")} target="_blank" rel="noopener noreferrer">Chamar no WhatsApp <span>→</span></a></div></section>

      <footer className="footer"><div className="container footer-main"><div className="footer-brand"><Image src="/img/logomarca.webp" alt="Logotipo SKY e Amazon Prime Video" width={450} height={93} unoptimized /><span>PARCEIRO AUTORIZADO</span></div><p>Contrate TV — atendimento autorizado para contratação de planos SKY.</p><div><a href="#planos">Planos</a><Link href="/politica-de-privacidade">Privacidade</Link><Link href="/termos-de-uso">Termos</Link></div></div><div className="container footer-bottom"><span>© 2026 Contrate TV. Todos os direitos reservados.</span><span>Este é um canal de parceiro autorizado, não o site oficial da SKY.</span></div></footer>

      <a className="whatsapp-float" href={wa("Olá, vim pelo site e gostaria de mais informações.")} target="_blank" rel="noopener noreferrer" aria-label="Atendimento pelo WhatsApp"><Image src="/img/whatsapp-icon.webp" alt="" role="presentation" width={100} height={100} unoptimized /><span>Falar no WhatsApp</span></a>
    </main>
  );
}
