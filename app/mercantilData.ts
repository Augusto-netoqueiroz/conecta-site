import { plans } from "./planData";

export const mercantilPlans = plans
  .filter((plan) => plan.name === "SUPER HD" || plan.name === "TOP HD")
  .map((plan) => ({
    ...plan,
    promo: "O pagamento do kit é feito antes do recebimento dos aparelhos. A mensalidade do plano começa no 2º mês, com valor promocional do 2º ao 4º mês e mensalidade regular a partir do 5º mês.",
  }));

export const mercantilEquipment = [
  {
    id: "kit-hd",
    name: "SKY KIT COMPLETO",
    detail: "Com antena",
    description: "Antena SKY, receptor HD e controle remoto.",
    image: "/img/MERCANTIL/ANTENA-SKY.webp",
    priceCents: 14990,
    hasAntenna: true,
  },
  {
    id: "hd",
    name: "SKY RECEPTOR HD",
    detail: "Sem antena",
    description: "Receptor HD e controle remoto para sua antena SKY.",
    image: "/img/MERCANTIL/RECEPTOR-SKY.webp",
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
    `Kit: ${equipment.name} (${equipment.detail.toLowerCase()}).`,
    `Valor do seu kit: ${formatMercantilPrice(quote.equipmentCents)}.`,
    isInstallments
      ? `Pagamento do kit: ${mercantilInstallmentCount}x de ${formatMercantilPrice(quote.equipmentInstallmentCents)} sem juros no cartão de crédito.`
      : `Pagamento do kit: ${formatMercantilPrice(quote.equipmentCents)} à vista.`,
    `Plano: ${plan.name}.`,
    "Pagamento da assinatura: à vista.",
    "O pagamento do kit é feito antes do recebimento dos aparelhos, sem cobrança do plano neste pagamento.",
    `1ª mensalidade do plano (2º mês): ${formatMercantilPrice(quote.monthlyCents)}.`,
    `${isInstallments ? "Pagamento antecipado (1ª parcela do kit)" : "Pagamento à vista do kit"}: ${formatMercantilPrice(quote.firstMonthCents)} — antes do recebimento dos aparelhos.`,
    `Do 2º ao 4º mês: ${formatMercantilPrice(quote.monthsTwoToFourCents)}/mês${isInstallments ? " (plano + parcela do aparelho)" : ""}.`,
    ...(isInstallments
      ? [
          `Do 5º ao ${mercantilInstallmentCount}º mês: ${formatMercantilPrice(quote.monthsFiveToTenCents)}/mês (mensalidade regular do plano + parcela do aparelho).`,
          `A partir do ${mercantilInstallmentCount + 1}º mês: ${formatMercantilPrice(quote.regularMonthlyCents)}/mês (somente o plano; aparelho quitado).`,
        ]
      : [`A partir do 5º mês: ${formatMercantilPrice(quote.regularMonthlyCents)}/mês.`]),
    plan.promo,
    "Quero comprar o kit antes de receber os aparelhos e ativar o plano. Pode confirmar a disponibilidade e as condições para meu endereço?",
  ].join("\n");
}

export const mercantilFaqs = [
  {
    question: "Como funciona a contratação?",
    answer: "Para ativar a assinatura nesta modalidade, você precisa comprar o kit. Dentro do kit escolhido, selecione a forma de pagamento e o plano SUPER HD ou TOP HD. O pagamento do kit é feito antes do recebimento dos aparelhos, à vista ou em 10x sem juros no cartão de crédito. A assinatura tem pagamento à vista e sua mensalidade começa no 2º mês. O atendimento confirma os detalhes pelo WhatsApp.",
  },
  {
    question: "Posso comprar o aparelho em 10x sem juros?",
    answer: "Sim. O SKY KIT COMPLETO com antena pode ser pago em 10x de R$ 14,99 e o SKY RECEPTOR HD sem antena em 10x de R$ 8,99, sem juros no cartão de crédito. Os valores totais são R$ 149,90 e R$ 89,90, respectivamente. Você também pode escolher o pagamento à vista. O pagamento à vista ou da primeira parcela é feito antes do recebimento dos aparelhos.",
  },
  {
    question: "O aparelho será cobrado todos os meses?",
    answer: "Se pagar à vista, você quita o kit antes do recebimento dos aparelhos e, a partir do 2º mês, paga apenas o plano. Se escolher 10x sem juros, o pagamento antecipado inclui somente a primeira parcela do kit. Do 2º ao 10º mês, o resumo soma a parcela do kit com a mensalidade do plano. A partir do 11º mês, o kit está quitado e resta somente a mensalidade do plano, conforme a oferta.",
  },
  {
    question: "Quando preciso pagar meu kit?",
    answer: "O pagamento é feito antes do recebimento dos aparelhos. À vista, você paga o valor integral do kit escolhido. Na opção de 10x sem juros, o pagamento antecipado corresponde à primeira parcela. O plano não é cobrado neste pagamento; sua mensalidade começa no 2º mês, conforme os valores indicados no resumo.",
  },
  {
    question: "Qual é a diferença entre as duas opções?",
    answer: "O SKY KIT COMPLETO inclui antena e receptor HD e custa R$ 149,90. O SKY RECEPTOR HD sem antena custa R$ 89,90 e é indicado para quem já tem antena SKY instalada. Confirme com o atendimento a compatibilidade da sua antena antes de contratar a opção sem antena.",
  },
  {
    question: "Os planos têm os mesmos preços do pós-pago?",
    answer: "Sim. SUPER HD e TOP HD mantêm os valores, canais e benefícios da página principal. A assinatura Mercantil tem pagamento à vista. O pagamento antecipado inclui apenas o kit, sem cobrança do plano. O plano é cobrado do 2º ao 4º mês pelo valor promocional e, a partir do 5º mês, pela mensalidade regular. As parcelas do kit são somadas até o 10º mês quando essa opção é escolhida.",
  },
  {
    question: "Como confirmo a instalação e a disponibilidade?",
    answer: "Depois de escolher o aparelho e o plano, envie o resumo pelo WhatsApp e informe seu CEP. O atendimento confirma disponibilidade, instalação, equipamentos e condições comerciais antes da contratação.",
  },
] as const;
