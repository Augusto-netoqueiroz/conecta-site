export type SeoPage = {
  slug: string;
  actionLabel: string;
  anchor: string;
  related: string[];
  navLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  highlights: string[];
  faqs: { question: string; answer: string }[];
  whatsappMessage: string;
};

export const seoPages: SeoPage[] = [
  {
    slug: "planos-sky-tv",
    actionLabel: "Comparar os planos",
    anchor: "comparar",
    related: ["canais-sky", "precos-planos-sky", "assinar-sky"],
    navLabel: "Planos SKY TV",
    eyebrow: "COMPARE ANTES DE CONTRATAR",
    title: "Compare os planos SKY TV e escolha pela programação",
    description: "Compare POP, SUPER, TOP e SKY CONNECT pelos canais, benefícios e pontos. Entenda as diferenças entre os pacotes antes de escolher seu plano.",
    intro: "Futebol, filmes ou uma grade mais ampla? Compare abaixo os seis planos cadastrados no site e descubra quais diferenças importam para a sua casa.",
    highlights: ["Opções a partir de mais de 50 canais", "Planos com 1 ou 2 pontos", "Filmes, séries, esportes e programação infantil"],
    faqs: [
      { question: "Qual plano SKY tem mais canais?", answer: "Na comparação apresentada, os planos TOP HD reúnem mais de 170 canais. A composição da grade deve ser confirmada na oferta vigente." },
      { question: "Existe plano SKY para duas TVs?", answer: "Sim. Há opções com dois pontos inclusos. Informe quantas TVs deseja conectar para validar equipamentos e condições." },
      { question: "Como saber qual plano está disponível no meu endereço?", answer: "Envie o CEP no atendimento pelo WhatsApp. A equipe consulta as opções disponíveis para o local." },
    ],
    whatsappMessage: "Olá, quero comparar os planos SKY TV disponíveis para o meu CEP.",
  },
  {
    slug: "assinar-sky",
    actionLabel: "Ver as etapas da contratação",
    anchor: "passo-a-passo",
    related: ["planos-sky-tv", "sky-no-boleto", "instalacao-sky"],
    navLabel: "Assinar SKY",
    eyebrow: "CONTRATAÇÃO PASSO A PASSO",
    title: "Como assinar SKY: da escolha à instalação",
    description: "Saiba quais informações preparar para assinar SKY, o que conferir na proposta e como acompanhar o pedido e o agendamento da instalação.",
    intro: "A contratação começa com o que você quer assistir e termina com a confirmação do plano e da instalação. Use este roteiro para saber o que preparar e o que conferir em cada etapa.",
    highlights: ["Consulta de cobertura pelo CEP", "Atendimento por parceiro autorizado", "Agendamento depois da confirmação do pedido"],
    faqs: [
      { question: "Dá para assinar SKY pelo WhatsApp?", answer: "Sim. O atendimento inicia a consulta pelo WhatsApp, valida o CEP e orienta as etapas para concluir o pedido." },
      { question: "Quais dados preciso informar?", answer: "O atendimento solicita o CEP e, durante a contratação, os dados necessários do titular e do endereço de instalação." },
      { question: "Quando a instalação é agendada?", answer: "O agendamento ocorre após a confirmação do pedido, conforme a agenda técnica disponível para a região." },
    ],
    whatsappMessage: "Olá, quero assinar SKY e consultar a disponibilidade para o meu CEP.",
  },
  {
    slug: "precos-planos-sky",
    actionLabel: "Consultar a tabela de preços",
    anchor: "valores",
    related: ["promocao-sky", "planos-sky-tv", "sky-no-boleto"],
    navLabel: "Preços SKY",
    eyebrow: "VALORES E CONDIÇÕES",
    title: "Preços dos planos SKY: tabela e custo após o desconto",
    description: "Veja a tabela de preços anunciados para POP, SUPER, TOP e SKY CONNECT. Compare mensalidade promocional, valor de referência e exemplo de custo anual.",
    intro: "Compare os valores anunciados para cada plano e entenda o impacto do período promocional no orçamento. A tabela separa o desconto inicial do preço usado como referência no site.",
    highlights: ["Ofertas promocionais por período determinado", "Valores variam conforme plano e região", "Condições confirmadas antes da contratação"],
    faqs: [
      { question: "O preço da SKY é igual em todo o Brasil?", answer: "Não necessariamente. Campanhas e disponibilidade podem variar conforme o endereço e o momento da consulta." },
      { question: "O valor promocional dura para sempre?", answer: "Não. Quando houver desconto por período determinado, a duração e o valor posterior devem ser informados antes da contratação." },
      { question: "Como recebo o preço correto para o meu endereço?", answer: "Informe o CEP e o plano de interesse no atendimento para consultar a condição disponível." },
    ],
    whatsappMessage: "Olá, quero consultar os preços e as condições atuais dos planos SKY para o meu CEP.",
  },
  {
    slug: "promocao-sky",
    actionLabel: "Entender a campanha",
    anchor: "condicoes",
    related: ["precos-planos-sky", "sky-no-boleto", "assinar-sky"],
    navLabel: "Promoções SKY",
    eyebrow: "CONDIÇÕES VIGENTES",
    title: "Promoção SKY: duração do desconto e regras da oferta",
    description: "Entenda a campanha anunciada de desconto no cartão nos quatro primeiros meses, os benefícios e as condições que precisam constar na proposta.",
    intro: "Uma promoção tem começo, duração e condições. Veja como funciona o desconto anunciado no site e quais regras conferir para avaliar a oferta completa.",
    highlights: ["Consulta da campanha vigente", "Condições explicadas antes do pedido", "Planos e benefícios sujeitos à disponibilidade"],
    faqs: [
      { question: "Quais planos participam da promoção SKY?", answer: "A participação depende da campanha vigente e da disponibilidade para o CEP. Consulte o atendimento para receber as opções atuais." },
      { question: "A promoção vale para qualquer cidade?", answer: "A condição pode variar por região. O CEP é usado para validar a oferta aplicável ao endereço." },
      { question: "Como sei quando termina o desconto?", answer: "O período promocional deve constar nas condições apresentadas antes da contratação. Confirme também o valor posterior." },
    ],
    whatsappMessage: "Olá, quero consultar as promoções SKY vigentes para o meu CEP.",
  },
  {
    slug: "canais-sky",
    actionLabel: "Explorar a grade de canais",
    anchor: "grade",
    related: ["planos-sky-tv", "sky-futebol", "assinar-sky"],
    navLabel: "Canais SKY",
    eyebrow: "PROGRAMAÇÃO POR PERFIL",
    title: "Canais SKY: consulte a grade por plano e categoria",
    description: "Consulte os canais cadastrados nos planos POP, SUPER e TOP, organizados por categoria. Veja nomes e logos e compare as grades antes de contratar.",
    intro: "Encontre os canais que você procura nas relações de POP, SUPER e TOP. As categorias abaixo usam o mesmo cadastro dos canais exibidos na página principal.",
    highlights: ["Planos com mais de 50, 100 ou 170 canais", "Esportes, filmes, séries e conteúdo infantil", "Grade confirmada conforme o plano"],
    faqs: [
      { question: "Qual plano SKY tem mais de 100 canais?", answer: "Os planos SUPER HD apresentados no site têm mais de 100 canais. Os planos TOP HD têm mais de 170. Confirme a grade atual da oferta." },
      { question: "Todos os planos têm os mesmos canais?", answer: "Não. A grade varia de acordo com o pacote, e benefícios adicionais também podem ser diferentes." },
      { question: "Como consultar um canal específico?", answer: "Informe ao consultor o nome do canal e o seu CEP para verificar em quais planos disponíveis ele está incluído." },
    ],
    whatsappMessage: "Olá, quero consultar a grade de canais dos planos SKY disponíveis para o meu CEP.",
  },
  {
    slug: "sky-no-boleto",
    actionLabel: "Entender a consulta no boleto",
    anchor: "pagamento",
    related: ["precos-planos-sky", "promocao-sky", "assinar-sky"],
    navLabel: "SKY no boleto",
    eyebrow: "FORMAS DE PAGAMENTO",
    title: "SKY no boleto: como consultar uma nova assinatura",
    description: "Quer contratar SKY no boleto? Entenda a consulta de elegibilidade, a diferença para a promoção no cartão e o que confirmar sobre o pagamento.",
    intro: "Se a sua preferência é pagar por boleto, comece pela confirmação dessa possibilidade. O atendimento precisa verificar quais condições são compatíveis com o seu pedido.",
    highlights: ["Elegibilidade confirmada no atendimento", "Regras podem variar conforme a oferta", "Alternativas apresentadas antes da contratação"],
    faqs: [
      { question: "Todos os planos SKY podem ser pagos no boleto?", answer: "A elegibilidade depende da oferta e da análise do pedido. A equipe confirma as formas de pagamento disponíveis." },
      { question: "Preciso de cartão para assinar SKY?", answer: "As opções de pagamento variam. Informe sua preferência no atendimento para verificar as alternativas disponíveis." },
      { question: "O preço no boleto é o mesmo?", answer: "Condições e descontos podem depender da forma de pagamento. Confirme o valor aplicável antes de contratar." },
    ],
    whatsappMessage: "Olá, quero saber quais planos SKY estão disponíveis com pagamento no boleto para o meu CEP.",
  },
  {
    slug: "instalacao-sky",
    actionLabel: "Preparar a visita técnica",
    anchor: "visita",
    related: ["assinar-sky", "planos-sky-tv", "precos-planos-sky"],
    navLabel: "Instalação SKY",
    eyebrow: "DO PEDIDO AO SINAL",
    title: "Instalação SKY: prepare o imóvel e acompanhe a visita",
    description: "Veja o que preparar em casa ou apartamento para a instalação SKY, como acompanhar o agendamento e o que conferir com o técnico ao final da visita.",
    intro: "Depois de escolher o plano, é hora de preparar o endereço. Veja o que alinhar antes da visita, como acompanhar o atendimento e o que testar quando os equipamentos estiverem instalados.",
    highlights: ["Instalação por equipe credenciada", "Antena e receptor conforme o plano", "Agendamento sujeito à disponibilidade regional"],
    faqs: [
      { question: "A instalação SKY é grátis?", answer: "A condição depende da oferta vigente e do padrão de instalação. O consultor confirma eventuais custos antes da contratação." },
      { question: "Quanto tempo demora para instalar?", answer: "O prazo varia conforme a aprovação do pedido e a agenda técnica da região. A data é confirmada no atendimento." },
      { question: "Posso instalar em mais de uma TV?", answer: "Sim, quando o plano e o pedido incluem pontos adicionais. Informe a quantidade de TVs antes de concluir a contratação." },
    ],
    whatsappMessage: "Olá, quero consultar planos SKY e entender o prazo de instalação para o meu CEP.",
  },
  {
    slug: "sky-futebol",
    actionLabel: "Comparar formas de assistir",
    anchor: "futebol",
    related: ["canais-sky", "planos-sky-tv", "precos-planos-sky"],
    navLabel: "SKY Futebol",
    eyebrow: "ESPORTE NA SUA TV",
    title: "SKY para futebol: canais esportivos, Premiere e acesso",
    description: "Entenda a diferença entre canais esportivos, Premiere e streaming na escolha de um plano SKY para futebol. Saiba o que confirmar sobre jogos e acesso.",
    intro: "Seu campeonato preferido é o ponto de partida. Entenda quais tipos de acesso comparar para escolher um plano de futebol sem confundir uma grade esportiva com a transmissão de todos os jogos.",
    highlights: ["Opções com canais esportivos", "Planos selecionados com Premiere", "Programação sujeita aos direitos de transmissão"],
    faqs: [
      { question: "Qual plano SKY tem Premiere?", answer: "O Premiere pode estar incluído em planos e campanhas selecionadas, como opções apresentadas no POP HD e no SKY CONNECT. Confirme a condição vigente." },
      { question: "A SKY transmite todos os campeonatos?", answer: "Não há garantia de todas as competições. A exibição depende dos canais do plano e dos direitos de transmissão de cada temporada." },
      { question: "Posso assistir futebol pelo SKY+?", answer: "O acesso depende do plano, do benefício incluído e da disponibilidade do conteúdo na plataforma. Confirme no atendimento." },
    ],
    whatsappMessage: "Olá, quero um plano SKY para assistir futebol. Pode consultar as opções para o meu CEP?",
  },
];

export function getSeoPage(slug: string) {
  return seoPages.find((page) => page.slug === slug);
}
