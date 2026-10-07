import { plans } from "./planData";

export const mercantilPlans = plans
  .filter((plan) => plan.name === "SUPER HD" || plan.name === "TOP HD")
  .map((plan) => ({
    ...plan,
    promo: "Mensalidade com pagamento à vista do 2º ao 4º mês. No 1º mês, você paga somente o Mercantil.",
  }));

export const mercantilEquipment = [
  {
    id: "kit-hd",
    name: "KIT MERCANTIL HD",
    detail: "Com antena",
    description: "Escolha o kit com aparelho HD e antena.",
    priceCents: 14990,
    hasAntenna: true,
  },
  {
    id: "hd",
    name: "MERCANTIL HD",
    detail: "Sem antena",
    description: "Escolha o aparelho HD sem a antena.",
    priceCents: 8990,
    hasAntenna: false,
  },
] as const;

export type MercantilEquipment = (typeof mercantilEquipment)[number];
export type MercantilPlan = (typeof mercantilPlans)[number];
export type MercantilPayment = "cash" | "installments";
export const mercantilInstallmentCount = 10;

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const formatMercantilPrice = (cents: number) => currency.format(cents / 100);

export const getMercantilInstallmentCents = (equipment: MercantilEquipment) =>
  equipment.priceCents / mercantilInstallmentCount;

export function getMercantilQuote(
  equipment: MercantilEquipment,
  plan: MercantilPlan,
  payment: MercantilPayment = "cash",
) {
  // Os preços dos planos vêm da mesma fonte usada na página principal.
  // A soma é feita em centavos para evitar imprecisão de ponto flutuante.
  const monthlyCents = Number(plan.price.replace(",", ""));
  const regularMonthlyCents = Number(plan.oldPrice.replace(",", ""));
  const equipmentInstallmentCents = getMercantilInstallmentCents(equipment);
  const isInstallments = payment === "installments";
  const equipmentFirstMonthCents = isInstallments ? equipmentInstallmentCents : equipment.priceCents;
  const equipmentLaterMonthsCents = isInstallments ? equipmentInstallmentCents : 0;
  // A primeira cobrança inclui somente o aparelho; o plano começa no 2º mês.
  const planFirstMonthCents = 0;

  return {
    equipmentCents: equipment.priceCents,
    equipmentInstallmentCents,
    equipmentFirstMonthCents,
    payment,
    installmentCount: isInstallments ? mercantilInstallmentCount : 1,
    monthlyCents,
    planFirstMonthCents,
    firstMonthCents: equipmentFirstMonthCents + planFirstMonthCents,
    monthsTwoToFourCents: equipmentLaterMonthsCents + monthlyCents,
    monthsFiveToTenCents: equipmentLaterMonthsCents + regularMonthlyCents,
    regularMonthlyCents,
  };
}

export function getMercantilMessage(
  equipment: MercantilEquipment,
  plan: MercantilPlan,
  payment: MercantilPayment = "cash",
) {
  const quote = getMercantilQuote(equipment, plan, payment);
  const isInstallments = payment === "installments";

  return [
    "Olá, quero contratar SKY na modalidade Mercantil.",
    `Aparelho: ${equipment.name} (${equipment.detail.toLowerCase()}) — valor total ${formatMercantilPrice(quote.equipmentCents)}.`,
    isInstallments
      ? `Pagamento do aparelho: ${mercantilInstallmentCount}x de ${formatMercantilPrice(quote.equipmentInstallmentCents)} sem juros no cartão de crédito.`
      : `Pagamento do aparelho: ${formatMercantilPrice(quote.equipmentCents)} à vista.`,
    `Plano: ${plan.name}.`,
    "Pagamento da assinatura: à vista.",
    "Mensalidade do plano no 1º mês: sem cobrança.",
    `1ª mensalidade do plano (2º mês): ${formatMercantilPrice(quote.monthlyCents)}.`,
    `Total do 1º mês (somente ${isInstallments ? "1ª parcela do aparelho" : "aparelho"}): ${formatMercantilPrice(quote.firstMonthCents)}.`,
    `Do 2º ao 4º mês: ${formatMercantilPrice(quote.monthsTwoToFourCents)}/mês${isInstallments ? " (plano + parcela do aparelho)" : ""}.`,
    ...(isInstallments
      ? [
          `Do 5º ao ${mercantilInstallmentCount}º mês: ${formatMercantilPrice(quote.monthsFiveToTenCents)}/mês (mensalidade regular do plano + parcela do aparelho).`,
          `A partir do ${mercantilInstallmentCount + 1}º mês: ${formatMercantilPrice(quote.regularMonthlyCents)}/mês (somente o plano; aparelho quitado).`,
        ]
      : [`A partir do 5º mês: ${formatMercantilPrice(quote.regularMonthlyCents)}/mês.`]),
    plan.promo,
    "Quero comprar o aparelho antes de ativar o plano. Pode confirmar a disponibilidade e as condições para meu endereço?",
  ].join("\n");
}

export const mercantilFaqs = [
  {
    question: "Como funciona a contratação Mercantil?",
    answer: "A compra do aparelho Mercantil é obrigatória para ativar a assinatura nesta modalidade. Dentro do card do Mercantil escolhido, selecione a forma de pagamento do aparelho e o plano SUPER HD ou TOP HD. A assinatura tem pagamento à vista; o aparelho pode ser comprado à vista ou em 10x sem juros no cartão de crédito. O atendimento confirma os detalhes pelo WhatsApp.",
  },
  {
    question: "Posso comprar o aparelho em 10x sem juros?",
    answer: "Sim. O KIT MERCANTIL HD com antena pode ser pago em 10x de R$ 14,99 e o MERCANTIL HD sem antena em 10x de R$ 8,99, sem juros no cartão de crédito. Os valores totais são R$ 149,90 e R$ 89,90, respectivamente. Você também pode escolher o pagamento à vista.",
  },
  {
    question: "O aparelho será cobrado todos os meses?",
    answer: "Se pagar à vista, o primeiro mês inclui somente o valor integral do aparelho; a partir do segundo mês, você paga apenas o plano. Se escolher 10x sem juros, no primeiro mês você paga somente a primeira parcela do aparelho. Do 2º ao 10º mês, o resumo soma a parcela do aparelho com a mensalidade do plano. A partir do 11º mês, o aparelho está quitado e resta somente a mensalidade do plano, conforme a oferta.",
  },
  {
    question: "Como é calculado o total do primeiro mês?",
    answer: "No primeiro mês, você paga somente o Mercantil escolhido: o valor integral do aparelho à vista ou a primeira parcela na opção de 10x sem juros. Não há cobrança do plano nesse mês. A mensalidade começa no segundo mês, conforme os valores indicados no resumo.",
  },
  {
    question: "Qual é a diferença entre as duas opções?",
    answer: "O KIT MERCANTIL HD inclui antena e custa R$ 149,90. O MERCANTIL HD sem antena custa R$ 89,90. Se você já tem antena, confirme com o atendimento a compatibilidade para utilizar a opção sem antena.",
  },
  {
    question: "Os planos têm os mesmos preços do pós-pago?",
    answer: "Sim. SUPER HD e TOP HD mantêm os valores, canais e benefícios da página principal. A assinatura Mercantil tem pagamento à vista. No primeiro mês, você paga apenas o aparelho. O plano é cobrado do 2º ao 4º mês pelo valor promocional e, a partir do 5º mês, pela mensalidade regular. As parcelas do aparelho são somadas até o 10º mês quando essa opção é escolhida.",
  },
  {
    question: "Como confirmo a instalação e a disponibilidade?",
    answer: "Depois de escolher o aparelho e o plano, envie o resumo pelo WhatsApp e informe seu CEP. O atendimento confirma disponibilidade, instalação, equipamentos e condições comerciais antes da contratação.",
  },
] as const;
