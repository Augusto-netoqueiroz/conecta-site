// OUT-26: aba "Planos", coluna E (planos COMODATO e COMBO); aba
// "Form de Contratação DTH", linhas 65/69/73/75 e totais 154/157.
// Os valores são armazenados em centavos para evitar arredondamentos.
export type CorporateTerm = 12 | 24;
export type CorporatePlanId = "super" | "superII" | "top" | "topIII";
export type CorporateOptionalId =
  | "premiere"
  | "telecine"
  | "hbo"
  | "sexyHot"
  | "playboy"
  | "sexPrive";

export type CorporateOptionalSelection = {
  id: CorporateOptionalId;
  points: number;
};

export const CORPORATE_COMMERCIAL = {
  version: "OUT-26",
  validFrom: "2026-10-01T00:00:00-03:00",
  validUntil: "2026-10-31T23:59:59.999-03:00",
  terms: [12, 24] as const,
  discountFirstThreePerPoint: 2000,
  plans: [
    {
      id: "super",
      name: "SUPER HD COMODATO",
      unitPrice: 9990,
      comboUnitPrice: 11990,
    },
    {
      id: "superII",
      name: "SUPER HD II COMODATO",
      unitPrice: 12990,
      comboUnitPrice: 14990,
    },
    {
      id: "top",
      name: "TOP HD COMODATO",
      unitPrice: 14990,
      comboUnitPrice: 16990,
    },
    {
      id: "topIII",
      name: "TOP HD PLUS III COMODATO",
      unitPrice: 18990,
      comboUnitPrice: null,
    },
  ],
} as const;

const optionalCatalog = [
  {
    id: "premiere",
    name: "PREMIERE",
    image: "/img/CANAIS%20A%20LA%20CARTE/logo-premiere-ALA.webp",
    logoWidth: 175,
    logoHeight: 55,
    adult: false,
  },
  {
    id: "telecine",
    name: "TELECINE",
    image: "/img/CANAIS%20A%20LA%20CARTE/logo-telecine-ALA.webp",
    logoWidth: 105,
    logoHeight: 45,
    adult: false,
  },
  {
    id: "hbo",
    name: "HBO",
    image: "/img/CANAIS%20A%20LA%20CARTE/logo-hbo-ALA.webp",
    logoWidth: 105,
    logoHeight: 35,
    adult: false,
  },
  {
    id: "sexyHot",
    name: "SEXY HOT",
    image: "/img/CANAIS%20A%20LA%20CARTE/logo-sexyhot-ALA.webp",
    logoWidth: 125,
    logoHeight: 55,
    adult: true,
  },
  {
    id: "playboy",
    name: "SKY PLAYBOY",
    image: "/img/CANAIS%20A%20LA%20CARTE/logo-playboy-tv-ALA.webp",
    logoWidth: 125,
    logoHeight: 55,
    adult: true,
  },
  {
    id: "sexPrive",
    name: "SEXY PRIVE",
    image: "/img/CANAIS%20A%20LA%20CARTE/logo-sex-prive-ALA.webp",
    logoWidth: 125,
    logoHeight: 55,
    adult: true,
  },
] as const;

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatCorporateMoney(cents: number) {
  return currency.format(cents / 100);
}

export function isCorporatePricingActive(date: Date) {
  const timestamp = date.getTime();
  return (
    timestamp >= new Date(CORPORATE_COMMERCIAL.validFrom).getTime() &&
    timestamp <= new Date(CORPORATE_COMMERCIAL.validUntil).getTime()
  );
}

export function formatCorporateValidityDate() {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
  }).format(new Date(CORPORATE_COMMERCIAL.validUntil));
}

export function getCorporatePlan(id: CorporatePlanId) {
  return CORPORATE_COMMERCIAL.plans.find((plan) => plan.id === id) ?? null;
}

export function getCorporateOptionals(segment: string) {
  // PREMIERE: aba "B2B - OPCIONAIS", linhas 75/79; demais opcionais:
  // linhas 45 (TELECINE) e 98/106/112/114 do formulário de contratação.
  const isBar = segment === "Bares e Restaurantes";
  const isSchool = segment === "Escolas e Universidades";
  const prices: Record<CorporateOptionalId, number> = {
    premiere: isBar ? 34176 : 11392,
    telecine: 3790,
    hbo: 4490,
    sexyHot: 1990,
    playboy: 1990,
    sexPrive: 3490,
  };

  return optionalCatalog
    .filter((optional) => !isSchool || !optional.adult)
    .map((optional) => ({ ...optional, pricePerPoint: prices[optional.id] }));
}

export function calculateCorporateSelection(
  segment: string,
  planId: CorporatePlanId,
  term: CorporateTerm,
  points: number,
  combo: boolean,
  selections: readonly CorporateOptionalSelection[],
) {
  const plan = getCorporatePlan(planId);
  if (
    !plan ||
    !CORPORATE_COMMERCIAL.terms.includes(term) ||
    !Number.isSafeInteger(points) ||
    points < 1 ||
    (combo && plan.comboUnitPrice === null)
  ) {
    return null;
  }

  const unitPrice = combo ? plan.comboUnitPrice! : plan.unitPrice;
  const planSubtotal = unitPrice * points;
  const optionals: Array<{
    id: CorporateOptionalId;
    name: string;
    points: number;
    unitPrice: number;
    subtotal: number;
  }> = [];
  const available = getCorporateOptionals(segment);
  const used = new Set<CorporateOptionalId>();

  for (const selection of selections) {
    const optional = available.find((item) => item.id === selection.id);
    if (
      !optional ||
      used.has(selection.id) ||
      !Number.isSafeInteger(selection.points) ||
      selection.points < 1 ||
      selection.points > points
    ) {
      return null;
    }
    used.add(selection.id);
    optionals.push({
      id: optional.id,
      name: optional.name,
      points: selection.points,
      unitPrice: optional.pricePerPoint,
      subtotal: optional.pricePerPoint * selection.points,
    });
  }

  const optionalsTotal = optionals.reduce((sum, item) => sum + item.subtotal, 0);
  const regularTotal = planSubtotal + optionalsTotal;
  const monthlyDiscountFirstThree =
    CORPORATE_COMMERCIAL.discountFirstThreePerPoint * points;

  return {
    unitPrice,
    planSubtotal,
    optionals,
    optionalsTotal,
    monthlyDiscountFirstThree,
    firstThreeTotal: regularTotal - monthlyDiscountFirstThree,
    regularTotal,
  };
}
