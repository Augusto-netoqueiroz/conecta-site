"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { createPortal } from "react-dom";
import TrackedLink from "./TrackedLink";
import {
  HOSPITALITY_COMMERCIAL,
  calculateHospitalityPlan,
  calculateHospitalitySelection,
  formatHospitalityMoney,
  getHospitalityPlan,
  getHospitalityRange,
  isHospitalityPlanTermAvailable,
  isHospitalityPricingActive,
  type HospitalityOptionalId,
  type HospitalityOptionalSelection,
  type HospitalityPlanId,
  type HospitalityTerm,
} from "./hospitalityPricing";
import styles from "./HospitalityPlanBuilder.module.css";

type PricingStatus = "checking" | "active" | "expired";
type OptionalMode = "all" | "custom";

type OptionalState = {
  selected: boolean;
  mode: OptionalMode;
  customQuantity: string;
};

type HospitalityPlanBuilderProps = {
  phone: string;
  segment: string;
};

const initialOptionals: Record<HospitalityOptionalId, OptionalState> = {
  premiere: { selected: false, mode: "all", customQuantity: "" },
  telecine: { selected: false, mode: "all", customQuantity: "" },
  hbo: { selected: false, mode: "all", customQuantity: "" },
  extra995: { selected: false, mode: "all", customQuantity: "" },
  extra1645: { selected: false, mode: "all", customQuantity: "" },
  extra3490: { selected: false, mode: "all", customQuantity: "" },
};

function parsePositiveInteger(value: string) {
  const normalized = value.trim();
  if (!/^\d+$/.test(normalized)) return null;

  const parsed = Number(normalized);
  return Number.isSafeInteger(parsed) && parsed > 0 ? parsed : null;
}


function SummaryContent({
  points,
  term,
  selectedPlanId,
  optionalRows,
  calculation,
  pricingStatus,
  quoteRequired,
  incompatiblePlan,
}: {
  points: number | null;
  term: HospitalityTerm;
  selectedPlanId: HospitalityPlanId | null;
  optionalRows: Array<{
    id: HospitalityOptionalId;
    name: string;
    selected: boolean;
    quantity: number | null;
    invalid: boolean;
    subtotal: number | null;
  }>;
  calculation: ReturnType<typeof calculateHospitalitySelection>;
  pricingStatus: PricingStatus;
  quoteRequired: boolean;
  incompatiblePlan: boolean;
}) {
  const selectedPlan = selectedPlanId
    ? getHospitalityPlan(selectedPlanId)
    : null;
  const selectedOptionals = optionalRows.filter((item) => item.selected);
  const range = points ? getHospitalityRange(points) : null;

  return (
    <div className={styles.summaryContent}>

      <div className={styles.summaryRow}>
        <span>Pontos</span>
        <strong>{points ?? "Não informado"}</strong>
      </div>

      {range && (
        <div className={styles.summaryRow}>
          <span>Faixa comercial</span>
          <strong>{range.label}</strong>
        </div>
      )}

      <div className={styles.summaryRow}>
        <span>Prazo</span>
        <strong>{term} meses</strong>
      </div>

      <div className={styles.summaryRow}>
        <span>Plano</span>
        <strong>{selectedPlan?.name ?? "Não selecionado"}</strong>
      </div>

      {incompatiblePlan && (
        <div className={styles.summaryWarning}>
          O plano selecionado não está disponível para o prazo escolhido.
          Selecione outro plano.
        </div>
      )}

      {calculation && selectedPlan && (
        <>
          <div className={styles.summaryDivider} />

          <div className={styles.summaryRow}>
            <span>Valor por ponto</span>
            <strong>{formatHospitalityMoney(calculation.unitPrice)}</strong>
          </div>

          <div className={styles.summaryRow}>
            <span>Subtotal do plano</span>
            <strong>
              {formatHospitalityMoney(calculation.planSubtotal)}
            </strong>
          </div>
        </>
      )}

      {selectedOptionals.length > 0 && (
        <>
          <div className={styles.summaryDivider} />
          <div className={styles.summaryGroupTitle}>Opcionais</div>

          {selectedOptionals.map((optional) => (
            <div className={styles.optionalSummaryRow} key={optional.id}>
              <div>
                <strong>{optional.name}</strong>
                <span>
                  {optional.invalid
                    ? "Quantidade precisa ser ajustada"
                    : `${optional.quantity} ${
                        optional.quantity === 1 ? "ponto" : "pontos"
                      }`}
                </span>
              </div>

              {optional.subtotal !== null && !optional.invalid && (
                <b>{formatHospitalityMoney(optional.subtotal)}</b>
              )}
            </div>
          ))}
        </>
      )}

      {calculation && selectedPlan && (
        <>
          <div className={styles.summaryDivider} />

          {calculation.monthlyDiscountFirstSix > 0 ? (
            <>
              <div className={styles.summaryRow}>
                <span>Desconto mensal nos 6 primeiros meses</span>
                <strong>
                  - {formatHospitalityMoney(calculation.monthlyDiscountFirstSix)}
                </strong>
              </div>

              <div className={styles.summaryTotal}>
                <span>1º ao 6º mês</span>
                <strong>
                  {formatHospitalityMoney(calculation.firstSixTotal)}
                  <small>/mês</small>
                </strong>
              </div>

              <div className={styles.summaryRegular}>
                <span>A partir do 7º mês</span>
                <strong>
                  {formatHospitalityMoney(calculation.regularTotal)}
                  <small>/mês</small>
                </strong>
              </div>
            </>
          ) : (
            <div className={styles.summaryTotal}>
              <span>Total mensal da empresa</span>
              <strong>
                {formatHospitalityMoney(calculation.regularTotal)}
                <small>/mês</small>
              </strong>
            </div>
          )}
        </>
      )}

      {pricingStatus === "checking" && (
        <div className={styles.summaryNotice}>
          Verificando a vigência da tabela comercial.
        </div>
      )}

      {quoteRequired && pricingStatus !== "checking" && (
        <div className={styles.summaryNotice}>
          Solicitar cotação. A tabela comercial precisa ser atualizada ou
          confirmada para esta configuração.
        </div>
      )}
    </div>
  );
}

export default function HospitalityPlanBuilder({
  phone,
  segment,
}: HospitalityPlanBuilderProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pointsInput, setPointsInput] = useState("");
  const term: HospitalityTerm = 36;
  const [selectedPlanId, setSelectedPlanId] =
    useState<HospitalityPlanId | null>(null);
  const [optionalState, setOptionalState] =
    useState<Record<HospitalityOptionalId, OptionalState>>(initialOptionals);
  const [need, setNeed] = useState("");
  const [pricingStatus, setPricingStatus] =
    useState<PricingStatus>("checking");

  useEffect(() => {
    setPricingStatus(
      isHospitalityPricingActive(new Date()) ? "active" : "expired",
    );
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      const currentPadding =
        Number.parseFloat(window.getComputedStyle(document.body).paddingRight) || 0;
      document.body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const points = parsePositiveInteger(pointsInput);
  const quantityError =
    pointsInput !== "" && points === null
      ? "Informe um número inteiro maior que zero."
      : "";

  const automaticPricing = pricingStatus === "active";

  const isSchoolSegment = segment === "Escolas e Universidades";
  const availableOptionals = useMemo(
    () =>
      HOSPITALITY_COMMERCIAL.optionals.filter(
        (optional) =>
          !(
            isSchoolSegment &&
            "hideForSchools" in optional &&
            optional.hideForSchools
          ),
      ),
    [isSchoolSegment],
  );

  const selectedPlan = selectedPlanId
    ? getHospitalityPlan(selectedPlanId)
    : null;

  const incompatiblePlan =
    selectedPlanId !== null &&
    !isHospitalityPlanTermAvailable(selectedPlanId, term);

  const optionalRows = useMemo(() => {
    return availableOptionals.map((optional) => {
      const state = optionalState[optional.id];
      let quantity: number | null = null;

      if (state.selected) {
        quantity =
          state.mode === "all"
            ? points
            : parsePositiveInteger(state.customQuantity);
      }

      const invalid =
        state.selected &&
        (quantity === null ||
          points === null ||
          quantity < 1 ||
          quantity > points);

      const subtotal =
        automaticPricing &&
        state.selected &&
        !invalid &&
        quantity !== null
          ? optional.pricePerPoint * quantity
          : null;

      return {
        id: optional.id,
        name: optional.name,
        selected: state.selected,
        mode: state.mode,
        customQuantity: state.customQuantity,
        quantity,
        invalid,
        subtotal,
      };
    });
  }, [automaticPricing, availableOptionals, optionalState, points]);

  const hasInvalidOptionalQuantity = optionalRows.some(
    (optional) => optional.invalid,
  );

  const optionalSelections = useMemo<HospitalityOptionalSelection[]>(() => {
    if (hasInvalidOptionalQuantity) return [];

    return optionalRows
      .filter(
        (optional) =>
          optional.selected &&
          optional.quantity !== null &&
          optional.quantity > 0,
      )
      .map((optional) => ({
        id: optional.id,
        points: optional.quantity as number,
      }));
  }, [hasInvalidOptionalQuantity, optionalRows]);

  const calculation = useMemo(() => {
    if (
      !automaticPricing ||
      !selectedPlanId ||
      !points ||
      incompatiblePlan ||
      hasInvalidOptionalQuantity
    ) {
      return null;
    }

    return calculateHospitalitySelection(
      selectedPlanId,
      term,
      points,
      optionalSelections,
    );
  }, [
    automaticPricing,
    hasInvalidOptionalQuantity,
    incompatiblePlan,
    optionalSelections,
    points,
    selectedPlanId,
    term,
  ]);

  const missingAutomaticPrice =
    automaticPricing &&
    selectedPlanId !== null &&
    points !== null &&
    !incompatiblePlan &&
    !hasInvalidOptionalQuantity &&
    calculation === null;

  const quoteRequired =
    pricingStatus === "expired" || missingAutomaticPrice;

  const canRequestProposal =
    points !== null &&
    selectedPlanId !== null &&
    !incompatiblePlan &&
    !hasInvalidOptionalQuantity &&
    pricingStatus !== "checking";

  const updateOptional = (
    id: HospitalityOptionalId,
    patch: Partial<OptionalState>,
  ) => {
    setOptionalState((current) => ({
      ...current,
      [id]: {
        ...current[id],
        ...patch,
      },
    }));
  };

  const changePoints = (delta: number) => {
    const current = points ?? 0;
    const next = Math.max(1, current + delta);
    setPointsInput(String(next));
  };

  const buildWhatsAppHref = () => {
    if (!canRequestProposal || !selectedPlan || !points) return "#";

    const selectedOptionalRows = optionalRows.filter(
      (optional) => optional.selected,
    );

    const lines = [
      "Olá, gostaria de solicitar uma proposta SKY Empresas.",
      `Segmento: ${segment}.`,
      `Quantidade de pontos: ${points}.`,
      `Prazo contratual: ${term} meses.`,
      `Plano: ${selectedPlan.name}.`,
    ];

    if (selectedOptionalRows.length) {
      lines.push("Opcionais:");
      selectedOptionalRows.forEach((optional) => {
        lines.push(`- ${optional.name}: ${optional.quantity} pontos.`);
      });
    } else {
      lines.push("Opcionais: nenhum selecionado.");
    }

    if (calculation && !quoteRequired) {
      lines.push(
        `Tabela comercial: ${HOSPITALITY_COMMERCIAL.version} - DTH Hospitality.`,
      );
      lines.push(
        `Valor por ponto do plano: ${formatHospitalityMoney(
          calculation.unitPrice,
        )}.`,
      );
      lines.push(
        `Subtotal mensal do plano: ${formatHospitalityMoney(
          calculation.planSubtotal,
        )}.`,
      );

      calculation.optionals.forEach((optional) => {
        lines.push(
          `${optional.name}: ${optional.points} pontos x ${formatHospitalityMoney(
            optional.unitPrice,
          )} = ${formatHospitalityMoney(optional.subtotal)}.`,
        );
      });

      if (calculation.monthlyDiscountFirstSix > 0) {
        lines.push(
          `Desconto mensal nos 6 primeiros meses: ${formatHospitalityMoney(
            calculation.monthlyDiscountFirstSix,
          )}.`,
        );
        lines.push(
          `Total mensal do 1º ao 6º mês: ${formatHospitalityMoney(
            calculation.firstSixTotal,
          )}.`,
        );
        lines.push(
          `Total mensal a partir do 7º mês: ${formatHospitalityMoney(
            calculation.regularTotal,
          )}.`,
        );
      } else {
        lines.push(
          `Total mensal: ${formatHospitalityMoney(calculation.regularTotal)}.`,
        );
      }
    } else {
      lines.push("Condição: Solicitar cotação.");
    }

    if (need.trim()) {
      lines.push(`Necessidade informada: ${need.trim()}`);
    }

    lines.push(
      "Esta mensagem é uma solicitação de proposta. Quero confirmar disponibilidade e condições comerciais.",
    );

    return `https://wa.me/${phone}?text=${encodeURIComponent(
      lines.join("\n"),
    )}`;
  };

  const proposalHref = buildWhatsAppHref();

  return (
    <>
      <button
        type="button"
        className="empresas-build-plan-button"
        onClick={() => setOpen(true)}
      >
        MONTAR MEU PLANO
      </button>

      {mounted &&
        open &&
        createPortal(
          <div
            className={styles.modalOverlay}
            onMouseDown={() => setOpen(false)}
          >
            <div
              className={styles.modalPanel}
              role="dialog"
              aria-modal="true"
              aria-label={`Montar plano para ${segment}`}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <div className={styles.modalHeader}>
                <div>
                  <span>SKY EMPRESAS</span>
                  <strong>{segment}</strong>
                </div>

                <button
                  type="button"
                  className={styles.modalClose}
                  onClick={() => setOpen(false)}
                  aria-label="Fechar montador de planos"
                >
                  ×
                </button>
              </div>

              <div className={styles.modalScroll}>
                <section className={styles.section}>
                  <div className={styles.modalContainer}>
                    <div className={styles.heading}>
                      <span>SKY EMPRESAS</span>
                      <b className={styles.segmentBadge}>{segment}</b>
                      <h2>Monte o plano da sua empresa</h2>
          <p>
            Informe a quantidade de pontos e o prazo. Os valores são atualizados
            conforme a tabela comercial DTH Hospitality vigente.
          </p>
        </div>

        <div className={styles.setupPanel}>
          <div className={styles.mainControls}>
            <div className={styles.fieldBlock}>
              <label htmlFor="hospitality-points">
                Quantas TVs/pontos sua empresa precisa?
              </label>

              <div className={styles.quantityControl}>
                <button
                  type="button"
                  onClick={() => changePoints(-1)}
                  aria-label="Diminuir quantidade de pontos"
                >
                  −
                </button>

                <input
                  id="hospitality-points"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={pointsInput}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    setPointsInput(event.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Ex.: 20"
                  aria-invalid={Boolean(quantityError)}
                />

                <button
                  type="button"
                  onClick={() => changePoints(1)}
                  aria-label="Aumentar quantidade de pontos"
                >
                  +
                </button>
              </div>

              {quantityError && (
                <small className={styles.inputError}>{quantityError}</small>
              )}

              {!pointsInput && (
                <small className={styles.helperText}>
                  Informe a quantidade de pontos para calcular.
                </small>
              )}
            </div>

            <div className={styles.fieldBlock}>
              <strong>Prazo contratual</strong>

              <div className={styles.fixedTerm}>
                <b>36 meses</b>
                <span>Prazo fixo desta oferta corporativa</span>
              </div>

              <small className={styles.helperText}>
                A promoção de SUPER e TOP dura 6 mensalidades.
              </small>
            </div>
          </div>

          {pricingStatus === "expired" && (
            <div className={styles.quoteNotice}>
              A tabela {HOSPITALITY_COMMERCIAL.version} tinha referência até
              30/09/2026. As escolhas podem ser enviadas, mas os valores ficam
              sob cotação até a atualização da tabela.
            </div>
          )}

        </div>

        <div className={styles.builderLayout}>
          <div className={styles.builderMain}>
            <div className={styles.sectionTitle}>
              <span>1</span>
              <div>
                <strong>Escolha o plano principal</strong>
                <p>
                  A faixa de pontos define o preço unitário aplicado a todos os
                  pontos.
                </p>
              </div>
            </div>

            <div className={styles.planGrid}>
              {HOSPITALITY_COMMERCIAL.plans.map((plan) => {
                const compatible = (plan.availableTerms as readonly HospitalityTerm[]).includes(term);
                const planPricing =
                  automaticPricing && points && compatible
                    ? calculateHospitalityPlan(plan.id, term, points)
                    : null;
                const isSelected = selectedPlanId === plan.id;
                const channelKey =
                  plan.id === "super"
                    ? "super"
                    : plan.id === "top"
                      ? "top"
                      : "pop";

                return (
                  <article
                    className={`reference-plan ${styles.planCard} ${
                      isSelected ? styles.selectedPlan : ""
                    } ${!compatible ? styles.incompatibleCard : ""}`}
                    key={plan.id}
                  >
                    <div className={styles.planTop}>
                      <span>SKY EMPRESAS</span>
                      <strong>{plan.name}</strong>
                      <b>{term} MESES</b>
                    </div>

                    <div className={styles.planBody}>
                      {!compatible ? (
                        <div className={styles.priceUnavailable}>
                          <strong>Disponível para contrato de 36 meses</strong>
                          <span>
                            Selecione 36 meses para consultar este plano.
                          </span>
                        </div>
) : pricingStatus === "checking" ? (
                        <div className={styles.priceUnavailable}>
                          <strong>Verificando tabela comercial</strong>
                        </div>
                      ) : !automaticPricing ? (
                        <div className={styles.priceUnavailable}>
                          <strong>Solicitar cotação</strong>
                          <span>
                            Os preços de quartos não são aplicados a esta
                            configuração.
                          </span>
                        </div>
                      ) : !points ? (
                        <div className={styles.priceUnavailable}>
                          <strong>
                            Informe a quantidade de pontos para calcular
                          </strong>
                        </div>
                      ) : planPricing ? (
                        <>
                          <div className={styles.planMeta}>
                            <div>
                              <span>Por ponto/mês</span>
                              <strong>
                                {formatHospitalityMoney(planPricing.unitPrice)}
                              </strong>
                            </div>
                            <div>
                              <span>Quantidade</span>
                              <strong>{points} pontos</strong>
                            </div>
                          </div>

                          {planPricing.monthlyDiscountFirstSix > 0 ? (
                            <div className={styles.planTotals}>
                              <div>
                                <span>1º ao 6º mês</span>
                                <strong>
                                  {formatHospitalityMoney(
                                    planPricing.planFirstSixTotal,
                                  )}
                                  <small>/mês</small>
                                </strong>
                              </div>
                              <div>
                                <span>A partir do 7º mês</span>
                                <strong>
                                  {formatHospitalityMoney(
                                    planPricing.planRegularTotal,
                                  )}
                                  <small>/mês</small>
                                </strong>
                              </div>
                              <p>
                                Desconto de{" "}
                                {formatHospitalityMoney(
                                  plan.discountFirstSixPerPoint,
                                )}{" "}
                                por ponto em cada uma das 6 primeiras
                                mensalidades.
                              </p>
                            </div>
                          ) : (
                            <div className={styles.singlePlanTotal}>
                              <span>Total mensal do plano</span>
                              <strong>
                                {formatHospitalityMoney(
                                  planPricing.planRegularTotal,
                                )}
                                <small>/mês</small>
                              </strong>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className={styles.priceUnavailable}>
                          <strong>Combinação sob consulta</strong>
                          <span>
                            Não existe preço cadastrado para esta combinação.
                          </span>
                        </div>
                      )}

                      <button
                        type="button"
                        className="plan-more-channels"
                        data-channel-key={channelKey}
                      >
                        VER CANAIS
                      </button>

                      <button
                        type="button"
                        className={`${styles.selectPlanButton} ${
                          isSelected ? styles.selectedPlanButton : ""
                        }`}
                        disabled={!compatible}
                        onClick={() => setSelectedPlanId(plan.id)}
                      >
                        {isSelected ? "PLANO SELECIONADO" : "SELECIONAR PLANO"}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            {selectedPlanId && !incompatiblePlan && (
              <div className={styles.optionalsSection}>
                <div className={styles.sectionTitle}>
                  <span>2</span>
                  <div>
                    <strong>Adicione canais à la carte</strong>
                    <p>
                      Cada opcional pode ser contratado em todos ou apenas em
                      parte dos pontos.
                    </p>
                  </div>
                </div>

                <div className={styles.optionalGrid}>
                  {availableOptionals.map((optional) => {
                    const state = optionalState[optional.id];
                    const row = optionalRows.find(
                      (item) => item.id === optional.id,
                    );

                    return (
                      <article
                        className={`${styles.optionalCard} ${
                          state.selected ? styles.selectedOptional : ""
                        }`}
                        key={optional.id}
                      >
                        <div className={styles.optionalLogo}>
                          <img
  src={optional.image}
  alt={optional.name}
  width={optional.logoWidth ?? 130}
  height={optional.logoHeight ?? 58}
  style={{
    width: `${optional.logoWidth ?? 130}px`,
    height: `${optional.logoHeight ?? 58}px`,
  }}
  loading="lazy"
  decoding="async"
/>
                        </div>

                        <div className={styles.optionalHeader}>
                          <strong>{optional.name}</strong>

                          {automaticPricing ? (
                            <span>
                              {formatHospitalityMoney(optional.pricePerPoint)}
                              <small>/ponto/mês</small>
                            </span>
                          ) : (
                            <span className={styles.quotePrice}>
                              Sob consulta
                            </span>
                          )}
                        </div>

                        <button
                          type="button"
                          className={styles.optionalToggle}
                          aria-pressed={state.selected}
                          onClick={() =>
                            updateOptional(optional.id, {
                              selected: !state.selected,
                            })
                          }
                        >
                          {state.selected ? "REMOVER" : "ADICIONAR"}
                        </button>

                        {state.selected && (
                          <div className={styles.optionalControls}>
                            <button
                              type="button"
                              className={
                                state.mode === "all"
                                  ? styles.activeOptionalMode
                                  : ""
                              }
                              onClick={() =>
                                updateOptional(optional.id, { mode: "all" })
                              }
                            >
                              Em todos os pontos
                            </button>

                            <button
                              type="button"
                              className={
                                state.mode === "custom"
                                  ? styles.activeOptionalMode
                                  : ""
                              }
                              onClick={() =>
                                updateOptional(optional.id, {
                                  mode: "custom",
                                  customQuantity:
                                    state.customQuantity ||
                                    (points ? "1" : ""),
                                })
                              }
                            >
                              Escolher quantidade
                            </button>

                            {state.mode === "custom" && (
                              <label className={styles.customQuantity}>
                                <span>Quantidade de pontos</span>
                                <input
                                  type="text"
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  value={state.customQuantity}
                                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                    updateOptional(optional.id, {
                                      customQuantity:
                                        event.target.value.replace(/\D/g, ""),
                                    })
                                  }
                                  placeholder="Ex.: 5"
                                />
                              </label>
                            )}

                            {row?.invalid && (
                              <small className={styles.inputError}>
                                Informe de 1 até {points ?? "o total"} pontos
                                para este opcional.
                              </small>
                            )}

                            {row?.subtotal !== null &&
                              row?.subtotal !== undefined &&
                              !row.invalid && (
                                <div className={styles.optionalSubtotal}>
                                  <span>
                                    {row.quantity}{" "}
                                    {row.quantity === 1 ? "ponto" : "pontos"}
                                  </span>
                                  <strong>
                                    {formatHospitalityMoney(row.subtotal)}
                                    <small>/mês</small>
                                  </strong>
                                </div>
                              )}
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </div>
            )}

            {quoteRequired && (
              <div className={styles.needBox}>
                <label htmlFor="hospitality-need">
                  Descreva sua necessidade
                </label>
                <textarea
                  id="hospitality-need"
                  value={need}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setNeed(event.target.value)}
                  placeholder="Ex.: recepção, restaurante, áreas comuns, tipo de estabelecimento ou outra informação importante."
                  rows={4}
                />
              </div>
            )}

            <details className={styles.mobileSummary}>
              <summary>
                <span>Resumo da seleção</span>
                <strong>
                  {calculation
                    ? formatHospitalityMoney(
                        calculation.monthlyDiscountFirstSix > 0
                          ? calculation.firstSixTotal
                          : calculation.regularTotal,
                      )
                    : quoteRequired
                      ? "Sob consulta"
                      : "Ver resumo"}
                </strong>
              </summary>

              <SummaryContent
                points={points}
                term={term}
                selectedPlanId={selectedPlanId}
                optionalRows={optionalRows}
                calculation={calculation}
                pricingStatus={pricingStatus}
                quoteRequired={quoteRequired}
                incompatiblePlan={incompatiblePlan}
              />
            </details>

            <div className={styles.proposalArea}>
              {canRequestProposal ? (
                <TrackedLink
                  className={styles.whatsappButton}
                  href={proposalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  eventName="click_whatsapp"
                  eventData={{
                    placement: "hospitality_builder",
                    plan: selectedPlan?.name ?? "",
                    points,
                    term,
                  }}
                >
                  <Image
                    src="/img/whatsapp-icon.webp"
                    alt=""
                    width={20}
                    height={20}
                    unoptimized
                  />
                  <span>SOLICITAR PROPOSTA PELO WHATSAPP</span>
                </TrackedLink>
              ) : (
                <button
                  type="button"
                  className={styles.disabledProposalButton}
                  disabled
                >
                  SOLICITAR PROPOSTA PELO WHATSAPP
                </button>
              )}

              {!canRequestProposal && (
                <small>
                  Informe os pontos, escolha um plano compatível e ajuste as
                  quantidades antes de continuar.
                </small>
              )}
            </div>
          </div>

          <aside className={styles.desktopSummary}>
            <div className={styles.summaryCard}>
              <span className={styles.summaryEyebrow}>RESUMO DO ORÇAMENTO</span>
              <h3>Sua configuração</h3>

              <SummaryContent
                points={points}
                term={term}
                selectedPlanId={selectedPlanId}
                optionalRows={optionalRows}
                calculation={calculation}
                pricingStatus={pricingStatus}
                quoteRequired={quoteRequired}
                incompatiblePlan={incompatiblePlan}
              />

              <p className={styles.validity}>
                Tabela {HOSPITALITY_COMMERCIAL.version}. Referência interna até
                30/09/2026. Valores sujeitos à confirmação da elegibilidade,
                disponibilidade e condições comerciais.
              </p>
            </div>
          </aside>
        </div>
                  </div>
                </section>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
