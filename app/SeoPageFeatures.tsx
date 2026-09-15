import Link from "next/link";
import TrackedLink from "./TrackedLink";
import Image from "next/image";
import { plans } from "./planData";
import {
  popChannels,
  superChannels,
  topChannels,
} from "./channelData";
const phone = "5561981954746";

const wa = (message: string) =>
  `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

type Plan = (typeof plans)[number];

function SeoPlanCard({
  plan,
  featured = false,
  heroOffer = false,
}: {
  plan: Plan;
  featured?: boolean;
  heroOffer?: boolean;
}) {
  const isPop = plan.channelKey === "pop";
  const channelPreview = plan.mainChannels.slice(0, 8);
  const benefits = plan.benefits.slice(0, 5);

  return (
    <article
      className={`reference-plan seo-reference-plan${
        featured ? " recommended" : ""
      }`}
    >
      {featured && (
        <div className="recommended-label">
          OFERTA EM DESTAQUE
        </div>
      )}

      <div className="plan-red-top">
        <div className="plan-name">
          <span>SKY PÓS-PAGO</span>
          <strong className={heroOffer ? "seo-hero-plan-name" : undefined}>
  {heroOffer ? (
    <>
      POP COM
      <br />
      PREMIERE
    </>
  ) : (
    plan.name
  )}
</strong>

<b className="plan-highlight">{plan.highlight}</b>

{heroOffer ? (
  <>
    <p className="plan-summary">Canais locais em HD</p>
    <p className="plan-summary">+ Futebol ao vivo</p>
  </>
) : isPop ? (
  <p className="plan-summary seo-pop-premiere-top">
    POP + PREMIERE
  </p>
) : null}

{!heroOffer &&
  plan.summary.map((line) => (
    <p className="plan-summary" key={line}>
      {line}
    </p>
  ))}
        </div>

        {plan.badge && (
          <span className="plan-top-badge">{plan.badge}</span>
        )}
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

        {!heroOffer && (
  <ul className="plan-benefits">
    {benefits.map((benefit) => (
      <li key={benefit}>{benefit}</li>
    ))}
  </ul>
)}

        <div className="plan-channel-preview">
          <strong className="plan-channel-title">
            Principais canais
          </strong>

          <div className="plan-channel-icons">
            {channelPreview.map(([src, alt]) => (
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

          <Link
            className="plan-more-channels"
            href="/canais-sky/#grade"
          >
            VER MAIS CANAIS
          </Link>
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
          href={wa(`Olá, quero consultar a oferta do plano SKY ${plan.name} para o meu CEP.`)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Consultar o plano ${plan.name} pelo WhatsApp`}
          eventName="click_plan"
          eventData={{ plan: plan.name, placement: "seo_plan_card" }}
        >
          CONSULTAR PLANO
        </TrackedLink>
{heroOffer && (
  <TrackedLink
    className="seo-more-plans"
    href="/#planos"
    eventName="click_view_plans"
    eventData={{ placement: "seo_plan_card" }}
  >
    CONSULTAR MAIS PLANOS
  </TrackedLink>
)}
      </div>
    </article>
  );
}

export function SeoPopPremiereOffer({
  pageSlug: _pageSlug,
}: {
  pageSlug: string;
}) {
  const popPlan = plans.find((plan) => plan.channelKey === "pop")!;

  return (
    <div className="seo-pop-offer-wrap">
      <SeoPlanCard
        plan={popPlan}
        heroOffer
      />
    </div>
  );
}

const money = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

const number = (value: string) => Number(value.replace(",", "."));

export function PlansComparison() {
  return (
    <section className="seo-feature container" id="comparar">
      <div className="seo-section-heading">
        <span>PLANOS SKY PÓS-PAGO</span>

        <h2>Escolha o plano que combina com a sua casa</h2>

        <p>
          Compare os planos abaixo pelo número de canais, benefícios,
          pontos e preço. A apresentação segue o mesmo formato visual
          da tela inicial, em uma versão mais direta.
        </p>
      </div>

      <div className="reference-plan-grid seo-plan-reference-grid">
        {plans.map((plan, index) => (
          <SeoPlanCard
            key={plan.name}
            plan={plan}
            featured={index === 0}
          />
        ))}
      </div>

      <div className="seo-tip">
        <h3>POP + PREMIERE para começar</h3>

        <p>
          O POP HD é a opção destacada para quem quer mais de 50
          canais, programação em HD e Premiere na oferta apresentada.
          Consulte o CEP para confirmar disponibilidade e condições.
        </p>

        <TrackedLink
          href={wa(
            "Olá, quero consultar o plano POP HD com Premiere para o meu CEP.",
          )}
          target="_blank"
          rel="noopener noreferrer"
          eventName="click_whatsapp"
          eventData={{
            plan: "POP HD",
            placement: "seo_pop_tip",
          }}
        >
          CONSULTAR POP + PREMIERE
        </TrackedLink>
      </div>
    </section>
  );
}

export function PriceGuide() {
  return (
    <section className="seo-feature container" id="valores">
      <div className="seo-section-heading">
        <span>MENSALIDADE LADO A LADO</span>
        <h2>Valores anunciados no site</h2>
        <p>
          Os preços abaixo vêm do mesmo cadastro utilizado na página
          inicial. O desconto anunciado é no cartão de crédito, do 1º
          ao 4º mês; a disponibilidade precisa ser confirmada para o
          pedido.
        </p>
      </div>

      <div
        className="seo-table-wrap"
        tabIndex={0}
        role="region"
        aria-label="Tabela de mensalidades"
      >
        <table className="seo-table">
          <caption>
            Referência comercial do site — valores em reais por mês
          </caption>

          <thead>
            <tr>
              <th scope="col">Plano</th>
              <th scope="col">1º ao 4º mês*</th>
              <th scope="col">Preço de referência**</th>
              <th scope="col">Diferença mensal</th>
            </tr>
          </thead>

          <tbody>
            {plans.map((plan) => (
              <tr key={plan.name}>
                <th scope="row">{plan.name}</th>
                <td>
                  <strong>R$ {plan.price}</strong>
                </td>
                <td>R$ {plan.oldPrice}</td>
                <td>
                  {money(number(plan.oldPrice) - number(plan.price))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="seo-note">
        * Condição anunciada para cartão de crédito. ** Valor exibido
        como referência na oferta; confirme expressamente a mensalidade
        após a promoção. Não representa garantia de preço futuro.
      </p>

      <div className="seo-price-explainer">
        <div>
          <span>EXEMPLO DE COMPARAÇÃO</span>
          <h2>Olhe também para o custo de 12 meses</h2>
          <p>
            Se o SUPER HD permanecer quatro meses a R$ 59,90 e os oito
            seguintes a R$ 89,90, a soma será de{" "}
            <strong>R$ 958,80</strong>, média de{" "}
            <strong>R$ 79,90 por mês</strong>.
          </p>
          <p>
            É uma simulação com os valores de referência, sem reajustes,
            serviços extras ou custos de instalação. Use a proposta
            confirmada para fazer sua conta final.
          </p>
        </div>

        <div className="seo-formula">
          <p>4 × R$ 59,90</p>
          <p>+ 8 × R$ 89,90</p>
          <strong>R$ 958,80 / ano</strong>
        </div>
      </div>
    </section>
  );
}

export function SubscriptionSteps() {
  const steps = [
    [
      "Escolha a programação",
      "Anote os canais que não podem faltar e quantas TVs vão usar o serviço. Ter essas duas respostas ajuda a comparar as opções sem contratar benefícios que você não procura.",
      "/planos-sky-tv/",
      "Comparar os planos",
    ],
    [
      "Consulte o endereço",
      "Comece o atendimento informando o CEP e o número de pontos desejado. O consultor verifica disponibilidade e apresenta as condições aplicáveis ao local.",
      "",
      "",
    ],
    [
      "Confira o resumo do pedido",
      "Antes de confirmar, peça por escrito o nome do plano, preço com e sem desconto, forma de pagamento, duração dos benefícios, eventuais custos e condições de permanência ou cancelamento.",
      "/precos-planos-sky/",
      "Entender a mensalidade",
    ],
    [
      "Acompanhe a instalação",
      "Após a aprovação do pedido, confirme a data e o contato de atendimento. Guarde a proposta e o protocolo para conferir se os equipamentos e pontos instalados correspondem ao combinado.",
      "/instalacao-sky/",
      "Preparar a visita técnica",
    ],
  ];

  return (
    <section className="seo-feature container" id="passo-a-passo">
      <div className="seo-process-layout">
        <div>
          <span className="seo-eyebrow">
            DA ESCOLHA À CONFIRMAÇÃO
          </span>
          <h2>Seu pedido em quatro etapas</h2>
          <p>
            Você pode consultar os planos antes de decidir. O início de
            uma conversa pelo WhatsApp não substitui a confirmação das
            condições do pedido.
          </p>

          <div className="seo-tip">
            <h3>Tenha em mãos</h3>
            <ul>
              <li>CEP e endereço de instalação</li>
              <li>Quantidade de TVs</li>
              <li>Canais e conteúdos preferidos</li>
              <li>Forma de pagamento desejada</li>
            </ul>
          </div>
        </div>

        <ol className="seo-timeline">
          {steps.map(([title, description, href, label], i) => (
            <li key={title}>
              <span>{i + 1}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
                {href && <Link href={href}>{label}</Link>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function PromotionGuide() {
  return (
    <section className="seo-feature container" id="condicoes">
      <div className="seo-offer-board">
        <div>
          <span>CAMPANHA ANUNCIADA NO SITE</span>
          <h2>Desconto nos quatro primeiros meses</h2>
          <p>
            Forma de pagamento anunciada: cartão de crédito.
            Disponibilidade e regras confirmadas durante a contratação.
          </p>
          <Link href="/precos-planos-sky/">
            Ver os valores de cada plano
          </Link>
        </div>

        <ol className="seo-promo-months">
          <li>
            <b>01–04</b>
            <span>Meses com desconto anunciado</span>
          </li>
          <li>
            <b>05+</b>
            <span>
              Confirme a mensalidade seguinte na proposta
            </span>
          </li>
        </ol>
      </div>

      <div className="seo-section-heading">
        <h2>Três condições que merecem sua atenção</h2>
      </div>

      <div className="seo-three-columns">
        <article>
          <h3>Desconto na mensalidade</h3>
          <p>
            É a redução do preço por um período. Compare a economia
            inicial com o valor que será cobrado depois e peça as datas
            de início e fim.
          </p>
        </article>

        <article>
          <h3>Benefícios incluídos</h3>
          <p>
            Streaming e conteúdos adicionais podem ter regras e períodos
            próprios. Confirme acesso, ativação e eventual cobrança após
            o benefício.
          </p>
        </article>

        <article>
          <h3>Instalação e equipamentos</h3>
          <p>
            Desconto no plano não confirma gratuidade da instalação.
            Pergunte quais equipamentos, pontos e serviços técnicos
            estão cobertos pela proposta.
          </p>
        </article>
      </div>

      <div className="seo-tip">
        <h3>A promoção cabe na sua forma de pagamento?</h3>
        <p>
          A oferta no cartão não deve ser usada como promessa de preço
          no boleto. Se essa é sua preferência, consulte a elegibilidade
          antes de fechar o pedido.
        </p>
        <Link href="/sky-no-boleto/">
          Consultar as regras do boleto
        </Link>
      </div>
    </section>
  );
}

export function ChannelDirectory() {
  const groups = [
    ["POP HD", popChannels],
    ["SUPER HD", superChannels],
    ["TOP HD", topChannels],
  ] as const;

  return (
    <section className="seo-feature container" id="grade">
      <div className="seo-section-heading">
        <span>CONSULTE POR PACOTE E CATEGORIA</span>
        <h2>Relação de canais cadastrada no site</h2>
        <p>
          Abra as categorias para encontrar os nomes dos canais. Esta é
          a relação disponível no cadastro do site; ela pode ser parcial
          e não substitui a grade confirmada para o seu endereço.
          Benefícios de streaming não são contabilizados aqui como
          canais lineares.
        </p>
      </div>

      <nav
        className="seo-jump-links"
        aria-label="Ir para grade do plano"
      >
        {groups.map(([name], i) => (
          <a key={name} href={`#grade-${i}`}>
            {name}
          </a>
        ))}
      </nav>

      {groups.map(([name, categories], i) => (
        <section
          className="seo-channel-group"
          id={`grade-${i}`}
          key={name}
        >
          <div className="seo-channel-heading">
            <span>0{i + 1}</span>
            <h2>{name}</h2>
          </div>

          <div className="seo-category-grid">
            {Object.entries(categories).map(([category, channels]) => (
              <details key={category} open>
                <summary>
                  {category}
                  <small>{channels.length} nomes cadastrados</small>
                </summary>

                <ul className="seo-channel-list">
                  {channels.map(
                    ([src, label]: readonly [string, string]) => (
                      <li key={src}>
                        <Image
                          src={src}
                          alt=""
                          width={44}
                          height={44}
                          unoptimized
                          loading="lazy"
                        />
                        <span>{label}</span>
                      </li>
                    ),
                  )}
                </ul>
              </details>
            ))}
          </div>
        </section>
      ))}
    </section>
  );
}

export function PaymentGuide() {
  return (
    <section className="seo-feature container" id="pagamento">
      <div className="seo-payment-layout">
        <article className="seo-payment-main">
          <span className="seo-eyebrow">
            ANTES DE ESCOLHER A OFERTA
          </span>
          <h2>Quero contratar com boleto. Por onde começo?</h2>

          <ol>
            <li>
              <h3>Informe sua preferência</h3>
              <p>
                Na primeira mensagem, diga que procura um plano com
                pagamento no boleto e informe o CEP. Assim a consulta
                já considera essa condição.
              </p>
            </li>

            <li>
              <h3>Receba a confirmação de elegibilidade</h3>
              <p>
                A disponibilidade depende da oferta e da análise do
                pedido. A presença desta página não significa que todo
                plano aceita boleto.
              </p>
            </li>

            <li>
              <h3>Confira o valor aplicável</h3>
              <p>
                Peça a mensalidade específica para boleto, as condições
                de vencimento e os eventuais custos. Os preços
                promocionais no cartão não se aplicam automaticamente.
              </p>
            </li>
          </ol>
        </article>

        <aside className="seo-payment-aside">
          <h2>Você já é cliente?</h2>
          <p>
            Este atendimento é voltado à contratação de planos. Para
            segunda via, negociação de dívida ou alteração de vencimento
            de um contrato existente, use os canais de atendimento
            indicados na sua fatura ou no aplicativo oficial da
            operadora.
          </p>
          <p>
            Não é necessário contratar um plano novo para buscar ajuda
            com uma cobrança existente.
          </p>
        </aside>
      </div>

      <div className="seo-tip">
        <h3>Antes de pagar</h3>
        <p>
          Confira os dados do beneficiário, o valor, o vencimento e a
          relação da cobrança com o pedido confirmado. Se algo divergir
          da proposta, peça esclarecimento pelo canal em que contratou
          antes de concluir o pagamento.
        </p>
      </div>
    </section>
  );
}

export function InstallationGuide() {
  return (
    <section className="seo-feature container" id="visita">
      <div className="seo-install-layout">
        <div>
          <span className="seo-eyebrow">PREPARE O ENDEREÇO</span>
          <h2>O que alinhar antes da visita técnica</h2>
          <p>
            As condições do imóvel ajudam a definir o atendimento.
            Avise sobre restrições de acesso e instalação antes de
            combinar a data.
          </p>

          <ul className="seo-check-list">
            <li>
              <strong>Casa</strong>
              <p>
                Indique onde ficam as TVs e informe dificuldades de
                acesso ao imóvel.
              </p>
            </li>

            <li>
              <strong>Apartamento ou condomínio</strong>
              <p>
                Verifique com a administração as regras de entrada do
                técnico e de colocação dos equipamentos.
              </p>
            </li>

            <li>
              <strong>Imóvel alugado</strong>
              <p>
                Confirme com o responsável pelo imóvel as autorizações
                necessárias para fixação e passagem de cabos.
              </p>
            </li>
          </ul>
        </div>

        <figure className="seo-install-image">
          <Image
            src="/img/homem-antena-recort.webp"
            alt="Profissional com equipamento de instalação de TV"
            width={580}
            height={640}
            unoptimized
          />
          <figcaption>
            Local e condições técnicas são avaliados pela equipe
            credenciada.
          </figcaption>
        </figure>
      </div>

      <div className="seo-three-columns">
        <article>
          <span className="seo-index">ANTES</span>
          <h3>Confirme o agendamento</h3>
          <p>
            Data, endereço, telefone de contato e presença de um adulto
            responsável. O prazo depende da aprovação e da agenda
            regional.
          </p>
        </article>

        <article>
          <span className="seo-index">DURANTE</span>
          <h3>Confira os pontos</h3>
          <p>
            Mostre os ambientes previstos no pedido e peça
            esclarecimento sobre qualquer serviço ou material adicional
            antes de autorizá-lo.
          </p>
        </article>

        <article>
          <span className="seo-index">AO FINAL</span>
          <h3>Teste com o técnico</h3>
          <p>
            Confira imagem, controle remoto e funcionamento dos pontos
            contratados. Guarde o registro do atendimento e peça as
            orientações de uso.
          </p>
        </article>
      </div>
    </section>
  );
}

export function FootballGuide() {
  const sports = Object.entries(topChannels)
    .filter(([category]) => category === "ESPORTES")
    .flatMap(([, channels]) => [...channels]);

  return (
    <section className="seo-feature container" id="futebol">
      <div className="seo-sports-board">
        <div>
          <span>COMECE PELO CAMPEONATO</span>
          <h2>Qual futebol você quer acompanhar?</h2>
          <p>
            Monte sua escolha a partir da competição, da transmissão e
            do acesso incluído. Ter canais esportivos não significa ter
            todos os jogos.
          </p>
        </div>

        <ol>
          <li>
            <b>1</b>
            Informe o campeonato e a temporada
          </li>
          <li>
            <b>2</b>
            Confirme o canal ou serviço que exibe os jogos
          </li>
          <li>
            <b>3</b>
            Verifique se o acesso está incluído no plano
          </li>
        </ol>
      </div>

      <div className="seo-section-heading">
        <h2>Canal esportivo, Premiere e streaming</h2>
        <p>
          São formas de acesso diferentes. A composição precisa ser
          confirmada separadamente na oferta.
        </p>
      </div>

      <div className="seo-three-columns">
        <article>
          <h3>Canais esportivos</h3>
          <p>
            Fazem parte da grade do pacote quando incluídos. A
            programação pode reunir jogos, debates e outros esportes;
            confira a transmissão da partida desejada.
          </p>
        </article>

        <article>
          <h3>Premiere</h3>
          <p>
            É destacado nos benefícios cadastrados para POP HD e SKY
            CONNECT. Verifique campeonatos disponíveis e duração do
            benefício na proposta.
          </p>
        </article>

        <article>
          <h3>SKY+ e outros serviços</h3>
          <p>
            Confirme se o plano permite assistir ao conteúdo desejado
            no aplicativo, quais dispositivos são aceitos e se há
            restrições de acesso simultâneo.
          </p>
        </article>
      </div>

      <section className="seo-tip">
        <h3>Canais cadastrados na categoria Esportes do TOP</h3>

        <ul className="seo-channel-list">
          {sports.map(([src, label]) => (
            <li key={src}>
              <Image
                src={src}
                alt=""
                width={44}
                height={44}
                unoptimized
              />
              <span>{label}</span>
            </li>
          ))}
        </ul>

        <p>
          A relação de canais não é uma agenda de jogos nem uma
          garantia de transmissão de campeonatos.
        </p>

        <Link href="/canais-sky/">
          Consultar outras categorias e pacotes
        </Link>
      </section>
    </section>
  );
}

export default function SeoPageFeatures({ slug }: { slug: string }) {
  switch (slug) {
    case "planos-sky-tv":
      return <PlansComparison />;
    case "assinar-sky":
      return <SubscriptionSteps />;
    case "precos-planos-sky":
      return <PriceGuide />;
    case "promocao-sky":
      return <PromotionGuide />;
    case "canais-sky":
      return <ChannelDirectory />;
    case "sky-no-boleto":
      return <PaymentGuide />;
    case "instalacao-sky":
      return <InstallationGuide />;
    case "sky-futebol":
      return <FootballGuide />;
    default:
      return null;
  }
}
