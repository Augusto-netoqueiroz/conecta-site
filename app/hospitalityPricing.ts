export type HospitalityEnvironmentId = "rooms" | "common" | "other";
export type HospitalityTerm = 12 | 24 | 36;
export type HospitalityRangeId =
  | "up20"
  | "up60"
  | "up100"
  | "up200"
  | "over200";
export type HospitalityPlanId =
  | "pop"
  | "popWorld"
  | "super"
  | "top";
export type HospitalityOptionalId =
  | "premiere"
  | "telecine"
  | "hbo"
  | "extra995"
  | "extra1645"
  | "extra3490";

type RangePrices = Record<HospitalityRangeId, number>;
type TermPrices = Partial<Record<HospitalityTerm, RangePrices>>;

export type HospitalityPlanConfig = {
  id: HospitalityPlanId;
  name: string;
  availableTerms: readonly HospitalityTerm[];
  prices: TermPrices;
  discountFirstSixPerPoint: number;
};

export type HospitalityOptionalConfig = {
  id: HospitalityOptionalId;
  name: string;
  pricePerPoint: number;
  image: string;
  logoWidth?: number;
  logoHeight?: number;
  hideForSchools?: boolean;
};

export type HospitalityOptionalSelection = {
  id: HospitalityOptionalId;
  points: number;
};

export type HospitalityPlanCalculation = {
  unitPrice: number;
  planSubtotal: number;
  monthlyDiscountFirstSix: number;
  planFirstSixTotal: number;
  planRegularTotal: number;
};

export type HospitalitySelectionCalculation = HospitalityPlanCalculation & {
  optionals: Array<{
    id: HospitalityOptionalId;
    name: string;
    points: number;
    unitPrice: number;
    subtotal: number;
  }>;
  optionalsTotal: number;
  firstSixTotal: number;
  regularTotal: number;
};

export const HOSPITALITY_COMMERCIAL = {
  version: "SET-26",
  validUntil: "2026-09-30T23:59:59-03:00",
  environments: [
    {
      id: "rooms",
      name: "Quartos de hospedagem ou acomodações",
      description:
        "Tabela automática para quartos e acomodações elegíveis à modalidade DTH Hospitality.",
    },
    {
      id: "common",
      name: "Áreas comuns",
      description:
        "Recepção, restaurante e outras áreas sociais precisam de cotação específica.",
    },
    {
      id: "other",
      name: "Outros ambientes ou empresas",
      description:
        "Informe sua necessidade para receber uma proposta adequada ao projeto.",
    },
  ] as const,
  ranges: [
    { id: "up20", min: 1, max: 20, label: "Até 20" },
    { id: "up60", min: 21, max: 60, label: "Até 60" },
    { id: "up100", min: 61, max: 100, label: "Até 100" },
    { id: "up200", min: 101, max: 200, label: "Até 200" },
    { id: "over200", min: 201, max: null, label: "Acima de 200" },
  ] as const,
  plans: [
    {
      id: "pop",
      name: "POP HD CORP.",
      availableTerms: [36],
      discountFirstSixPerPoint: 0,
      prices: {
        36: {
          up20: 3890,
          up60: 3790,
          up100: 3690,
          up200: 3590,
          over200: 3490,
        },
      },
    },
    {
      id: "popWorld",
      name: "POP HD + MUNDO + BAND NEWS HD",
      availableTerms: [36],
      discountFirstSixPerPoint: 0,
      prices: {
        36: {
          up20: 3990,
          up60: 3890,
          up100: 3790,
          up200: 3690,
          over200: 3590,
        },
      },
    },
    {
      id: "super",
      name: "SUPER HD DTH CORP.",
      availableTerms: [12, 24, 36],
      discountFirstSixPerPoint: 3000,
      prices: {
        12: {
          up20: 6790,
          up60: 6690,
          up100: 6590,
          up200: 6490,
          over200: 6390,
        },
        24: {
          up20: 5990,
          up60: 5890,
          up100: 5790,
          up200: 5690,
          over200: 5590,
        },
        36: {
          up20: 5790,
          up60: 5690,
          up100: 5590,
          up200: 5490,
          over200: 5390,
        },
      },
    },
    {
      id: "top",
      name: "TOP HD DTH CORP.",
      availableTerms: [12, 24, 36],
      discountFirstSixPerPoint: 4000,
      prices: {
        12: {
          up20: 8790,
          up60: 8690,
          up100: 8590,
          up200: 8490,
          over200: 8390,
        },
        24: {
          up20: 8290,
          up60: 8190,
          up100: 8090,
          up200: 7990,
          over200: 7890,
        },
        36: {
          up20: 8090,
          up60: 7990,
          up100: 7890,
          up200: 7790,
          over200: 7690,
        },
      },
    },
  ] as const satisfies readonly HospitalityPlanConfig[],
  optionals: [
    {
      id: "premiere",
      name: "PREMIERE",
      pricePerPoint: 2278,
      image: "/img/CANAIS%20A%20LA%20CARTE/logo-premiere-ALA.webp",
      logoWidth: 175,
      logoHeight: 55,
    },
    {
      id: "telecine",
      name: "TELECINE",
      pricePerPoint: 1895,
      image: "/img/CANAIS%20A%20LA%20CARTE/logo-telecine-ALA.webp",
      logoWidth: 105,
      logoHeight: 45,
    },
    {
      id: "hbo",
      name: "HBO",
      pricePerPoint: 4490,
      image: "/img/CANAIS%20A%20LA%20CARTE/logo-hbo-ALA.webp",
      logoWidth: 105,
      logoHeight: 35,
    },
    {
      id: "extra995",
      name: "SEXY HOT",
      pricePerPoint: 995,
      image: "/img/CANAIS A LA CARTE/logo-sexyhot-ALA.webp",
      logoWidth: 125,
      logoHeight: 55,
      hideForSchools: true,
    },
    {
      id: "extra1645",
      name: "SKY PLAYBOY",
      pricePerPoint: 1645,
      image: "/img/CANAIS A LA CARTE/logo-playboy-tv-ALA.webp",
      logoWidth: 125,
      logoHeight: 55,
      hideForSchools: true,
    },
    {
      id: "extra3490",
      name: "SEXY PRIVE",
      pricePerPoint: 3490,
      image: "/img/CANAIS A LA CARTE/logo-sex-prive-ALA.webp",
      logoWidth: 125,
      logoHeight: 55,
      hideForSchools: true,
    },
  ] as const satisfies readonly HospitalityOptionalConfig[],
} as const;

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatHospitalityMoney(cents: number) {
  return currency.format(cents / 100);
}

export function getHospitalityRange(points: number) {
  if (!Number.isInteger(points) || points < 1) return null;

  return (
    HOSPITALITY_COMMERCIAL.ranges.find(
      (range) => points >= range.min && (range.max === null || points <= range.max),
    ) ?? null
  );
}

export function getHospitalityPlan(planId: HospitalityPlanId) {
  return HOSPITALITY_COMMERCIAL.plans.find((plan) => plan.id === planId) ?? null;
}

export function getHospitalityOptional(optionalId: HospitalityOptionalId) {
  return (
    HOSPITALITY_COMMERCIAL.optionals.find(
      (optional) => optional.id === optionalId,
    ) ?? null
  );
}

export function isHospitalityPlanTermAvailable(
  planId: HospitalityPlanId,
  term: HospitalityTerm,
) {
  const plan = getHospitalityPlan(planId);
  return plan ? (plan.availableTerms as readonly HospitalityTerm[]).includes(term) : false;
}

export function isHospitalityPricingActive(date: Date) {
  return date.getTime() <= new Date(HOSPITALITY_COMMERCIAL.validUntil).getTime();
}

export function calculateHospitalityPlan(
  planId: HospitalityPlanId,
  term: HospitalityTerm,
  points: number,
): HospitalityPlanCalculation | null {
  const plan = getHospitalityPlan(planId);
  const range = getHospitalityRange(points);

  if (!plan || !range || !(plan.availableTerms as readonly HospitalityTerm[]).includes(term)) return null;

  const termPrices = (plan.prices as Partial<Record<HospitalityTerm, RangePrices>>)[term];
  if (!termPrices) return null;

  const unitPrice = termPrices[range.id];
  if (typeof unitPrice !== "number") return null;

  const planSubtotal = unitPrice * points;
  const monthlyDiscountFirstSix = plan.discountFirstSixPerPoint * points;

  return {
    unitPrice,
    planSubtotal,
    monthlyDiscountFirstSix,
    planFirstSixTotal: planSubtotal - monthlyDiscountFirstSix,
    planRegularTotal: planSubtotal,
  };
}

export function calculateHospitalitySelection(
  planId: HospitalityPlanId,
  term: HospitalityTerm,
  points: number,
  optionalSelections: readonly HospitalityOptionalSelection[],
): HospitalitySelectionCalculation | null {
  const planCalculation = calculateHospitalityPlan(planId, term, points);
  if (!planCalculation) return null;

  const optionals: HospitalitySelectionCalculation["optionals"] = [];

  for (const selection of optionalSelections) {
    if (
      !Number.isInteger(selection.points) ||
      selection.points < 1 ||
      selection.points > points
    ) {
      return null;
    }

    const optional = getHospitalityOptional(selection.id);
    if (!optional) return null;

    optionals.push({
      id: optional.id,
      name: optional.name,
      points: selection.points,
      unitPrice: optional.pricePerPoint,
      subtotal: optional.pricePerPoint * selection.points,
    });
  }

  const optionalsTotal = optionals.reduce(
    (total, optional) => total + optional.subtotal,
    0,
  );

  return {
    ...planCalculation,
    optionals,
    optionalsTotal,
    firstSixTotal: planCalculation.planFirstSixTotal + optionalsTotal,
    regularTotal: planCalculation.planRegularTotal + optionalsTotal,
  };
}
