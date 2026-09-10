export type SeoPageSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type SeoPage = {
  slug: string;
  navLabel: string;
  eyebrow: string;
  title: string;
  description: string;
  intro: string;
  highlights: string[];
  sections: SeoPageSection[];
  faqs: { question: string; answer: string }[];
  whatsappMessage: string;
};

export const seoPages: SeoPage[] = [
  {
    slug: "planos-sky-tv",
    navLabel: "Planos SKY TV",
    eyebrow: "COMPARE ANTES DE CONTRATAR",
    title: "Planos SKY TV: compare opções, canais e benefícios",
    description: "Compare planos SKY TV, quantidade de canais, pontos, conteúdos e benefícios. Consulte a disponibilidade e as condições para o seu CEP.",
    intro: "A melhor escolha depende do tipo de programação que a sua casa acompanha, da quantidade de televisores e dos benefícios que você quer reunir. Veja os principais critérios para comparar os planos SKY com clareza antes de consultar uma oferta.",
    highlights: ["Opções a partir de mais de 50 canais", "Planos com 1 ou 2 pontos", "Filmes, séries, esportes e programação infantil"],
    sections: [
      {
        title: "Como comparar os planos SKY",
        paragraphs: ["Comece pela quantidade de pontos e pelos canais indispensáveis para a família. Depois, compare os conteúdos adicionais e confirme quais benefícios fazem parte da condição disponível no seu endereço."],
        bullets: ["POP HD: alternativa de entrada com canais locais e futebol", "SUPER HD: mais de 100 canais, com filmes, séries e esportes", "TOP HD: mais de 170 canais e uma grade mais ampla", "SKY CONNECT: pacote completo com TV, streaming e esportes"],
      },
      {
        title: "Um ou dois pontos de TV?",
        paragraphs: ["Planos identificados com “II” incluem dois pontos na configuração apresentada no site. Se você precisa assistir em mais ambientes, informe a quantidade de televisores durante o atendimento para receber a opção compatível."],
      },
      {
        title: "Confirme a oferta pelo CEP",
        paragraphs: ["Disponibilidade, valores, equipamentos e benefícios podem variar por endereço e campanha. A consulta do CEP evita comparar uma condição que não esteja disponível para a sua região."],
      },
    ],
    faqs: [
      { question: "Qual plano SKY tem mais canais?", answer: "Na comparação apresentada, os planos TOP HD reúnem mais de 170 canais. A composição da grade deve ser confirmada na oferta vigente." },
      { question: "Existe plano SKY para duas TVs?", answer: "Sim. Há opções com dois pontos inclusos. Informe quantas TVs deseja conectar para validar equipamentos e condições." },
      { question: "Como saber qual plano está disponível no meu endereço?", answer: "Envie o CEP no atendimento pelo WhatsApp. A equipe consulta as opções disponíveis para o local." },
    ],
    whatsappMessage: "Olá, quero comparar os planos SKY TV disponíveis para o meu CEP.",
  },
  {
    slug: "assinar-sky",
    navLabel: "Assinar SKY",
    eyebrow: "CONTRATAÇÃO PASSO A PASSO",
    title: "Como assinar SKY e consultar disponibilidade pelo CEP",
    description: "Veja como assinar SKY: escolha o plano, consulte o CEP, confirme os dados e agende a instalação com atendimento de parceiro autorizado.",
    intro: "Para contratar sem perder tempo, tenha em mãos o CEP do endereço de instalação e uma ideia dos canais e pontos que deseja. O atendimento confirma a cobertura e apresenta somente as condições disponíveis para o local.",
    highlights: ["Consulta de cobertura pelo CEP", "Atendimento por parceiro autorizado", "Agendamento depois da confirmação do pedido"],
    sections: [
      {
        title: "1. Escolha o perfil do plano",
        paragraphs: ["Defina se a prioridade é economia, mais de 100 canais, futebol, filmes e séries ou uma combinação mais completa. Isso ajuda o consultor a filtrar as opções adequadas."],
      },
      {
        title: "2. Informe o CEP de instalação",
        paragraphs: ["A consulta do CEP verifica a disponibilidade técnica e comercial para o endereço. Também é o momento de informar quantos pontos de TV serão necessários."],
      },
      {
        title: "3. Confirme dados, condições e instalação",
        paragraphs: ["Antes de concluir, confira o nome do plano, mensalidade, período promocional, forma de pagamento, equipamentos, canais e eventuais custos. Com o pedido aprovado, a instalação credenciada é agendada."],
        bullets: ["Documento e dados do titular", "Endereço completo da instalação", "Forma de pagamento escolhida", "Data disponível para o atendimento técnico"],
      },
    ],
    faqs: [
      { question: "Dá para assinar SKY pelo WhatsApp?", answer: "Sim. O atendimento inicia a consulta pelo WhatsApp, valida o CEP e orienta as etapas para concluir o pedido." },
      { question: "Quais dados preciso informar?", answer: "O atendimento solicita o CEP e, durante a contratação, os dados necessários do titular e do endereço de instalação." },
      { question: "Quando a instalação é agendada?", answer: "O agendamento ocorre após a confirmação do pedido, conforme a agenda técnica disponível para a região." },
    ],
    whatsappMessage: "Olá, quero assinar SKY e consultar a disponibilidade para o meu CEP.",
  },
  {
    slug: "precos-planos-sky",
    navLabel: "Preços SKY",
    eyebrow: "VALORES E CONDIÇÕES",
    title: "Preços dos planos SKY: o que comparar na mensalidade",
    description: "Entenda os preços dos planos SKY, período promocional, mensalidade, pontos, benefícios e condições que devem ser confirmadas antes de contratar.",
    intro: "O preço anunciado é apenas uma parte da comparação. Para entender quanto o plano representa no orçamento, verifique o período promocional, o valor posterior, os pontos de TV e tudo o que está incluído.",
    highlights: ["Ofertas promocionais por período determinado", "Valores variam conforme plano e região", "Condições confirmadas antes da contratação"],
    sections: [
      {
        title: "Preço promocional e mensalidade posterior",
        paragraphs: ["Algumas campanhas oferecem desconto nos primeiros meses. Confirme por quanto tempo o desconto é válido e qual será o valor da mensalidade depois desse período. Assim, a comparação não fica limitada ao preço inicial."],
      },
      {
        title: "O que pode alterar o valor",
        paragraphs: ["Quantidade de canais, pontos adicionais, equipamentos, conteúdos agregados e forma de pagamento podem influenciar a condição final."],
        bullets: ["Pacote e quantidade de canais", "Um ou dois pontos de TV", "Conteúdos e serviços incluídos", "Campanha vigente no momento da consulta"],
      },
      {
        title: "Peça o resumo da oferta",
        paragraphs: ["Antes de contratar, solicite a confirmação do plano, do preço promocional, da mensalidade posterior, da forma de pagamento e das condições de instalação. Ofertas estão sujeitas à disponibilidade, análise e alterações comerciais."],
      },
    ],
    faqs: [
      { question: "O preço da SKY é igual em todo o Brasil?", answer: "Não necessariamente. Campanhas e disponibilidade podem variar conforme o endereço e o momento da consulta." },
      { question: "O valor promocional dura para sempre?", answer: "Não. Quando houver desconto por período determinado, a duração e o valor posterior devem ser informados antes da contratação." },
      { question: "Como recebo o preço correto para o meu endereço?", answer: "Informe o CEP e o plano de interesse no atendimento para consultar a condição disponível." },
    ],
    whatsappMessage: "Olá, quero consultar os preços e as condições atuais dos planos SKY para o meu CEP.",
  },
  {
    slug: "promocao-sky",
    navLabel: "Promoções SKY",
    eyebrow: "CONDIÇÕES VIGENTES",
    title: "Promoção SKY: consulte ofertas disponíveis para o seu CEP",
    description: "Consulte promoção SKY, período de desconto, planos participantes, benefícios e disponibilidade. Confirme as condições vigentes para o seu CEP.",
    intro: "Promoções podem mudar conforme a campanha, a região, a forma de pagamento e o plano escolhido. Por isso, a oferta precisa ser consultada e confirmada no momento da contratação.",
    highlights: ["Consulta da campanha vigente", "Condições explicadas antes do pedido", "Planos e benefícios sujeitos à disponibilidade"],
    sections: [
      {
        title: "Como identificar uma boa promoção",
        paragraphs: ["Compare o preço durante e depois da promoção, a grade do plano, a quantidade de pontos e os benefícios incluídos. Uma oferta adequada é aquela que combina economia com a programação que você realmente assiste."],
      },
      {
        title: "O que confirmar no atendimento",
        paragraphs: ["Solicite um resumo claro das condições antes de concluir o cadastro."],
        bullets: ["Planos participantes e disponibilidade no CEP", "Duração e regras do desconto", "Mensalidade depois do período promocional", "Equipamentos, instalação e forma de pagamento"],
      },
      {
        title: "Validade e disponibilidade",
        paragraphs: ["As condições podem ser alteradas ou encerradas sem aviso prévio. A confirmação feita pelo consultor no momento do pedido é a referência para a contratação."],
      },
    ],
    faqs: [
      { question: "Quais planos participam da promoção SKY?", answer: "A participação depende da campanha vigente e da disponibilidade para o CEP. Consulte o atendimento para receber as opções atuais." },
      { question: "A promoção vale para qualquer cidade?", answer: "A condição pode variar por região. O CEP é usado para validar a oferta aplicável ao endereço." },
      { question: "Como sei quando termina o desconto?", answer: "O período promocional deve constar nas condições apresentadas antes da contratação. Confirme também o valor posterior." },
    ],
    whatsappMessage: "Olá, quero consultar as promoções SKY vigentes para o meu CEP.",
  },
  {
    slug: "canais-sky",
    navLabel: "Canais SKY",
    eyebrow: "PROGRAMAÇÃO POR PERFIL",
    title: "Canais SKY: entenda a grade e escolha seu plano",
    description: "Conheça as categorias de canais SKY e saiba como conferir filmes, séries, esportes, notícias, conteúdo infantil e canais abertos de cada plano.",
    intro: "A quantidade total ajuda na comparação, mas a presença dos canais preferidos é o critério mais importante. Confira as categorias de programação e peça a grade atualizada do plano antes de contratar.",
    highlights: ["Planos com mais de 50, 100 ou 170 canais", "Esportes, filmes, séries e conteúdo infantil", "Grade confirmada conforme o plano"],
    sections: [
      {
        title: "Categorias de programação",
        paragraphs: ["Os pacotes podem reunir canais abertos e por assinatura em HD. A composição varia conforme o plano e pode incluir diferentes opções de entretenimento."],
        bullets: ["Esportes e futebol", "Filmes e séries", "Notícias e variedades", "Programação infantil e conteúdo para a família"],
      },
      {
        title: "Mais canais ou os canais certos?",
        paragraphs: ["Um plano maior oferece uma grade mais ampla, mas nem sempre é necessário para todos. Faça uma lista dos canais indispensáveis e compare-a com a grade do pacote escolhido."],
      },
      {
        title: "A grade pode mudar",
        paragraphs: ["A disponibilidade de canais e conteúdos pode sofrer alterações. Consulte a relação atualizada e confirme se serviços adicionais ou canais premium fazem parte da oferta."],
      },
    ],
    faqs: [
      { question: "Qual plano SKY tem mais de 100 canais?", answer: "Os planos SUPER HD apresentados no site têm mais de 100 canais. Os planos TOP HD têm mais de 170. Confirme a grade atual da oferta." },
      { question: "Todos os planos têm os mesmos canais?", answer: "Não. A grade varia de acordo com o pacote, e benefícios adicionais também podem ser diferentes." },
      { question: "Como consultar um canal específico?", answer: "Informe ao consultor o nome do canal e o seu CEP para verificar em quais planos disponíveis ele está incluído." },
    ],
    whatsappMessage: "Olá, quero consultar a grade de canais dos planos SKY disponíveis para o meu CEP.",
  },
  {
    slug: "sky-no-boleto",
    navLabel: "SKY no boleto",
    eyebrow: "FORMAS DE PAGAMENTO",
    title: "Plano SKY no boleto: consulte elegibilidade e regras",
    description: "Saiba como consultar plano SKY no boleto, quais condições precisam ser confirmadas e como verificar as formas de pagamento disponíveis para o seu pedido.",
    intro: "A forma de pagamento disponível depende da análise e das regras comerciais da oferta. Se você prefere boleto, informe isso logo no início do atendimento para receber somente opções compatíveis.",
    highlights: ["Elegibilidade confirmada no atendimento", "Regras podem variar conforme a oferta", "Alternativas apresentadas antes da contratação"],
    sections: [
      {
        title: "Como consultar SKY no boleto",
        paragraphs: ["Envie o CEP e informe que deseja pagar por boleto. O consultor verifica os planos elegíveis, a disponibilidade para o endereço e os dados necessários para dar continuidade ao pedido."],
      },
      {
        title: "O que precisa ser confirmado",
        paragraphs: ["Não presuma que toda promoção aceita a mesma forma de pagamento. Confirme as regras da condição apresentada."],
        bullets: ["Plano elegível para boleto", "Data de vencimento e emissão", "Preço promocional e valor posterior", "Regras em caso de atraso"],
      },
      {
        title: "Pagamento e ativação",
        paragraphs: ["O atendimento orienta as etapas aplicáveis à oferta escolhida. Nunca realize pagamentos para dados não confirmados no canal de contratação e confira as informações do pedido antes de concluir."],
      },
    ],
    faqs: [
      { question: "Todos os planos SKY podem ser pagos no boleto?", answer: "A elegibilidade depende da oferta e da análise do pedido. A equipe confirma as formas de pagamento disponíveis." },
      { question: "Preciso de cartão para assinar SKY?", answer: "As opções de pagamento variam. Informe sua preferência no atendimento para verificar as alternativas disponíveis." },
      { question: "O preço no boleto é o mesmo?", answer: "Condições e descontos podem depender da forma de pagamento. Confirme o valor aplicável antes de contratar." },
    ],
    whatsappMessage: "Olá, quero saber quais planos SKY estão disponíveis com pagamento no boleto para o meu CEP.",
  },
  {
    slug: "instalacao-sky",
    navLabel: "Instalação SKY",
    eyebrow: "DO PEDIDO AO SINAL",
    title: "Instalação SKY: antena, receptor, prazo e agendamento",
    description: "Entenda como funciona a instalação SKY, com consulta de cobertura, agendamento, antena, receptor, cabos e orientações para receber o técnico.",
    intro: "Depois da confirmação do pedido, a instalação é agendada conforme a disponibilidade técnica da região. Preparar o acesso ao imóvel e alinhar os pontos de TV ajuda o atendimento a acontecer com mais tranquilidade.",
    highlights: ["Instalação por equipe credenciada", "Antena e receptor conforme o plano", "Agendamento sujeito à disponibilidade regional"],
    sections: [
      {
        title: "O que faz parte da instalação",
        paragraphs: ["O técnico avalia o local adequado para a antena, instala os equipamentos previstos no pedido e configura os pontos contratados. Qualquer necessidade fora do padrão deve ser informada e confirmada previamente."],
        bullets: ["Antena em local com condições técnicas", "Receptor compatível com o plano", "Cabeamento padrão para os pontos contratados", "Teste de sinal e orientação inicial"],
      },
      {
        title: "Prazo e agendamento",
        paragraphs: ["A data depende da aprovação do pedido e da agenda disponível no endereço. O prazo exato é informado durante o atendimento; mantenha os dados de contato atualizados para receber as orientações."],
      },
      {
        title: "Como preparar o imóvel",
        paragraphs: ["Garanta o acesso de um adulto responsável, indique onde ficam as TVs e informe previamente restrições de condomínio ou acesso ao telhado. Em imóvel alugado, verifique se há necessidade de autorização."],
      },
    ],
    faqs: [
      { question: "A instalação SKY é grátis?", answer: "A condição depende da oferta vigente e do padrão de instalação. O consultor confirma eventuais custos antes da contratação." },
      { question: "Quanto tempo demora para instalar?", answer: "O prazo varia conforme a aprovação do pedido e a agenda técnica da região. A data é confirmada no atendimento." },
      { question: "Posso instalar em mais de uma TV?", answer: "Sim, quando o plano e o pedido incluem pontos adicionais. Informe a quantidade de TVs antes de concluir a contratação." },
    ],
    whatsappMessage: "Olá, quero consultar planos SKY e entender o prazo de instalação para o meu CEP.",
  },
  {
    slug: "sky-futebol",
    navLabel: "SKY Futebol",
    eyebrow: "ESPORTE NA SUA TV",
    title: "SKY Futebol: canais esportivos e planos para quem acompanha jogos",
    description: "Veja como escolher um plano SKY para futebol, comparar canais esportivos, Premiere e competições disponíveis antes de contratar.",
    intro: "Para escolher um plano voltado a futebol, não basta olhar a quantidade total de canais. Liste os campeonatos que acompanha e confirme quais canais, pacotes ou benefícios transmitem esses conteúdos na oferta disponível.",
    highlights: ["Opções com canais esportivos", "Planos selecionados com Premiere", "Programação sujeita aos direitos de transmissão"],
    sections: [
      {
        title: "Como escolher um plano para futebol",
        paragraphs: ["Compare a presença de canais esportivos, conteúdos nacionais e internacionais e a necessidade de pacotes adicionais. A programação de cada competição depende dos direitos de transmissão vigentes."],
        bullets: ["Canais esportivos incluídos no pacote", "Disponibilidade do Premiere", "Quantidade de pontos para assistir em ambientes diferentes", "Acesso a conteúdos pelo SKY+, quando incluído"],
      },
      {
        title: "Premiere e conteúdos adicionais",
        paragraphs: ["O Premiere aparece em planos e condições selecionadas. Confirme se o benefício está incluído, por quanto tempo e se há alguma regra específica na oferta consultada."],
      },
      {
        title: "Confira o jogo que você quer assistir",
        paragraphs: ["Grades e direitos de transmissão mudam. Antes de contratar por causa de uma competição, pergunte especificamente pelo campeonato, canal e temporada que interessam a você."],
      },
    ],
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
