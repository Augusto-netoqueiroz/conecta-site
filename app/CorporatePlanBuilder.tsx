"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { createPortal } from "react-dom";
import TrackedLink from "./TrackedLink";
import {
  CORPORATE_COMMERCIAL,
  calculateCorporateSelection,
  formatCorporateMoney,
  getCorporateOptionals,
  getCorporatePlan,
  isCorporatePricingActive,
  type CorporateOptionalId,
  type CorporateOptionalSelection,
  type CorporatePlanId,
  type CorporateTerm,
} from "./corporatePricing";
import styles from "./HospitalityPlanBuilder.module.css";

type OptionalState = {
  selected: boolean;
  mode: "all" | "custom";
  customQuantity: string;
};

const initialOptionals: Record<CorporateOptionalId, OptionalState> = {
  premiere: { selected: false, mode: "all", customQuantity: "" },
  telecine: { selected: false, mode: "all", customQuantity: "" },
  hbo: { selected: false, mode: "all", customQuantity: "" },
  sexyHot: { selected: false, mode: "all", customQuantity: "" },
  playboy: { selected: false, mode: "all", customQuantity: "" },
  sexPrive: { selected: false, mode: "all", customQuantity: "" },
};

function parsePoints(value: string) {
  if (!/^\d+$/.test(value.trim())) return null;
  const count = Number(value.trim());
  return Number.isSafeInteger(count) && count > 0 ? count : null;
}

type OptionalRow = {
  id: CorporateOptionalId;
  name: string;
  selected: boolean;
  quantity: number | null;
  invalid: boolean;
  subtotal: number | null;
};

function CorporateSummary({
  points,
  term,
  planId,
  combo,
  optionalRows,
  calculation,
  pricingStatus,
}: {
  points: number | null;
  term: CorporateTerm;
  planId: CorporatePlanId | null;
  combo: boolean;
  optionalRows: OptionalRow[];
  calculation: ReturnType<typeof calculateCorporateSelection>;
  pricingStatus: "checking" | "active" | "expired";
}) {
  const plan = planId ? getCorporatePlan(planId) : null;
  const chosen = optionalRows.filter((row) => row.selected);

  return (
    <div className={styles.summaryContent}>
      <div className={styles.summaryRow}><span>Pontos</span><strong>{points ?? "Não informado"}</strong></div>
      <div className={styles.summaryRow}><span>Prazo</span><strong>{term} meses</strong></div>
      <div className={styles.summaryRow}><span>Plano</span><strong>{plan?.name ?? "Não selecionado"}</strong></div>
      {combo && <div className={styles.summaryRow}><span>Versão Combo</span><strong>Sim</strong></div>}

      {calculation && (
        <>
          <div className={styles.summaryDivider} />
          <div className={styles.summaryRow}>
            <span>Valor por ponto</span><strong>{formatCorporateMoney(calculation.unitPrice)}</strong>
          </div>
          <div className={styles.summaryRow}>
            <span>Subtotal do plano</span><strong>{formatCorporateMoney(calculation.planSubtotal)}</strong>
          </div>
        </>
      )}

      {chosen.length > 0 && (
        <>
          <div className={styles.summaryDivider} />
          <div className={styles.summaryGroupTitle}>Opcionais</div>
          {chosen.map((row) => (
            <div className={styles.optionalSummaryRow} key={row.id}>
              <div>
                <strong>{row.name}</strong>
                <span>{row.invalid ? "Ajuste a quantidade" : `${row.quantity} ${row.quantity === 1 ? "ponto" : "pontos"}`}</span>
              </div>
              {row.subtotal !== null && !row.invalid && <b>{formatCorporateMoney(row.subtotal)}</b>}
            </div>
          ))}
        </>
      )}

      {calculation && (
        <>
          <div className={styles.summaryDivider} />
          <div className={styles.summaryRow}>
            <span>Desconto mensal nos 3 primeiros meses</span>
            <strong>- {formatCorporateMoney(calculation.monthlyDiscountFirstThree)}</strong>
          </div>
          <div className={styles.summaryTotal}>
            <span>1º ao 3º mês</span>
            <strong>{formatCorporateMoney(calculation.firstThreeTotal)}<small>/mês</small></strong>
          </div>
          <div className={styles.summaryRegular}>
            <span>A partir do 4º mês</span>
            <strong>{formatCorporateMoney(calculation.regularTotal)}<small>/mês</small></strong>
          </div>
        </>
      )}

      {pricingStatus === "checking" && (
        <div className={styles.summaryNotice}>Verificando a vigência da tabela comercial.</div>
      )}
      {pricingStatus === "expired" && (
        <div className={styles.summaryNotice}>Tabela vencida. Envie a configuração para solicitar uma cotação atualizada.</div>
      )}
    </div>
  );
}

export default function CorporatePlanBuilder({
  segment,
  phone,
}: {
  segment: string;
  phone: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [pointsInput, setPointsInput] = useState("");
  const [term, setTerm] = useState<CorporateTerm>(12);
  const [planId, setPlanId] = useState<CorporatePlanId | null>(null);
  const [combo, setCombo] = useState(false);
  const [optionalState, setOptionalState] = useState(initialOptionals);
  const [city, setCity] = useState("");
  const [need, setNeed] = useState("");
  const [pricingStatus, setPricingStatus] = useState<"checking" | "active" | "expired">("checking");
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    setPricingStatus(isCorporatePricingActive(new Date()) ? "active" : "expired");

    const oldOverflow = document.body.style.overflow;
    const oldPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarWidth > 0) {
      const padding = Number.parseFloat(getComputedStyle(document.body).paddingRight) || 0;
      document.body.style.paddingRight = `${padding + scrollbarWidth}px`;
    }
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = oldOverflow;
      document.body.style.paddingRight = oldPadding;
      window.removeEventListener("keydown", onKeyDown);
      openerRef.current?.focus();
    };
  }, [open]);

  const points = parsePoints(pointsInput);
  const plan = planId ? getCorporatePlan(planId) : null;
  const optionals = useMemo(() => getCorporateOptionals(segment), [segment]);
  const automaticPricing = pricingStatus === "active";

  const optionalRows: OptionalRow[] = optionals.map((optional) => {
    const state = optionalState[optional.id];
    const quantity = !state.selected
      ? null
      : state.mode === "all" ? points : parsePoints(state.customQuantity);
    const invalid = state.selected && (quantity === null || points === null || quantity > points);
    return {
      id: optional.id,
      name: optional.name,
      selected: state.selected,
      quantity,
      invalid,
      subtotal: automaticPricing && state.selected && !invalid && quantity !== null
        ? optional.pricePerPoint * quantity : null,
    };
  });
  const invalidOptional = optionalRows.some((row) => row.invalid);
  const selections: CorporateOptionalSelection[] = optionalRows
    .filter((row) => row.selected && !row.invalid && row.quantity !== null)
    .map((row) => ({ id: row.id, points: row.quantity! }));
  const calculation = automaticPricing && points && planId && !invalidOptional
    ? calculateCorporateSelection(segment, planId, term, points, combo, selections)
    : null;
  const canRequest = Boolean(points && plan && !invalidOptional && pricingStatus !== "checking");

  const updateOptional = (id: CorporateOptionalId, patch: Partial<OptionalState>) => {
    setOptionalState((current) => ({ ...current, [id]: { ...current[id], ...patch } }));
  };

  const buildHref = () => {
    if (!canRequest || !points || !plan) return "#";
    const lines = [
      "Olá, quero solicitar uma proposta SKY Empresas.",
      `Segmento: ${segment}.`,
      ...(city.trim() ? [`Cidade/UF: ${city.trim()}.`] : []),
      `Quantidade de pontos: ${points}.`,
      `Prazo contratual: ${term} meses.`,
      `Plano: ${plan.name}${combo ? " COMBO" : ""}.`,
    ];

    const chosen = optionalRows.filter((row) => row.selected);
    lines.push(chosen.length ? "Opcionais:" : "Opcionais: nenhum selecionado.");
    for (const row of chosen) lines.push(`- ${row.name}: ${row.quantity} pontos.`);

    if (calculation) {
      lines.push(`Tabela comercial: ${CORPORATE_COMMERCIAL.version} - SKY Empresas.`);
      lines.push(`Valor do plano por ponto: ${formatCorporateMoney(calculation.unitPrice)}.`);
      lines.push(`Subtotal mensal do plano: ${formatCorporateMoney(calculation.planSubtotal)}.`);
      for (const row of calculation.optionals) {
        lines.push(`${row.name}: ${row.points} pontos x ${formatCorporateMoney(row.unitPrice)} = ${formatCorporateMoney(row.subtotal)}.`);
      }
      lines.push(`Desconto mensal nos 3 primeiros meses: ${formatCorporateMoney(calculation.monthlyDiscountFirstThree)}.`);
      lines.push(`Total mensal do 1º ao 3º mês: ${formatCorporateMoney(calculation.firstThreeTotal)}.`);
      lines.push(`Total mensal a partir do 4º mês: ${formatCorporateMoney(calculation.regularTotal)}.`);
    } else {
      lines.push("Valores: solicitar cotação atualizada.");
    }
    if (need.trim()) lines.push(`Necessidade informada: ${need.trim()}`);
    lines.push("Esta mensagem é uma solicitação de proposta sujeita à confirmação de elegibilidade, disponibilidade e condições comerciais.");
    return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  return (
    <>
      <button ref={openerRef} type="button" className="empresas-build-plan-button" onClick={() => setOpen(true)}>
        MONTAR MEU PLANO
      </button>

      {mounted && open && createPortal(
        <div className={styles.modalOverlay} onMouseDown={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}>
          <div className={styles.modalPanel} role="dialog" aria-modal="true" aria-label={`Montar plano para ${segment}`}>
            <div className={styles.modalHeader}>
              <div><span>SKY EMPRESAS</span><strong>{segment}</strong></div>
              <button ref={closeRef} type="button" className={styles.modalClose} aria-label="Fechar montador" onClick={() => setOpen(false)}>×</button>
            </div>
            <div className={styles.modalScroll}>
              <section className={styles.section}>
                <div className={styles.modalContainer}>
                  <div className={styles.heading}>
                    <span>SKY EMPRESAS</span>
                    <b className={styles.segmentBadge}>{segment}</b>
                    <h2>Monte o plano da sua empresa</h2>
                    <p>Escolha os pontos, o prazo, o plano e os opcionais. Valores de referência sujeitos à confirmação comercial.</p>
                  </div>

                  <div className={styles.setupPanel}>
                    <div className={styles.mainControls}>
                      <div className={styles.fieldBlock}>
                        <label htmlFor="corporate-points">Quantas TVs/pontos sua empresa precisa?</label>
                        <div className={styles.quantityControl}>
                          <button type="button" aria-label="Diminuir pontos" onClick={() => setPointsInput(String(Math.max(1, (points ?? 1) - 1)))}>−</button>
                          <input id="corporate-points" type="text" inputMode="numeric" pattern="[0-9]*" value={pointsInput}
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setPointsInput(event.target.value.replace(/\D/g, ""))}
                            placeholder="Ex.: 20" aria-invalid={pointsInput !== "" && points === null} />
                          <button type="button" aria-label="Aumentar pontos" onClick={() => setPointsInput(String((points ?? 0) + 1))}>+</button>
                        </div>
                        {pointsInput && points === null && <small className={styles.inputError}>Informe um número inteiro maior que zero.</small>}
                      </div>
                      <div className={styles.fieldBlock}>
                        <strong>Prazo contratual</strong>
                        <div className={styles.termButtons}>
                          {CORPORATE_COMMERCIAL.terms.map((availableTerm) => (
                            <button type="button" key={availableTerm} aria-pressed={term === availableTerm}
                              className={term === availableTerm ? styles.activeTerm : ""}
                              onClick={() => setTerm(availableTerm)}>{availableTerm} MESES</button>
                          ))}
                        </div>
                        <small className={styles.helperText}>O valor por ponto é o mesmo para os dois prazos nesta tabela.</small>
                      </div>
                    </div>
                    {pricingStatus === "expired" && (
                      <div className={styles.quoteNotice}>A tabela {CORPORATE_COMMERCIAL.version} tinha referência até 30/09/2026. Envie sua seleção para receber uma cotação atualizada.</div>
                    )}
                  </div>

                  <div className={styles.builderLayout}>
                    <div className={styles.builderMain}>
                      <div className={styles.sectionTitle}>
                        <span>1</span><div><strong>Escolha o plano principal</strong><p>Preço mensal por ponto, multiplicado pela quantidade de TVs/pontos.</p></div>
                      </div>
                      <div className={styles.planGrid}>
                        {CORPORATE_COMMERCIAL.plans.map((item) => {
                          const selected = planId === item.id;
                          const usingCombo = selected && combo;
                          const unitPrice = usingCombo ? item.comboUnitPrice! : item.unitPrice;
                          const baseSubtotal = points ? unitPrice * points : null;
                          return (
                            <article className={`reference-plan ${styles.planCard} ${selected ? styles.selectedPlan : ""}`} key={item.id}>
                              <div className={styles.planTop}>
                                <span>SKY EMPRESAS</span><strong>{item.name}</strong><b>{term} MESES</b>
                              </div>
                              <div className={styles.planBody}>
                                {automaticPricing ? (
                                  <>
                                    <div className={styles.planMeta}>
                                      <div><span>Por ponto/mês</span><strong>{formatCorporateMoney(unitPrice)}</strong></div>
                                      <div><span>Quantidade</span><strong>{points ? `${points} pontos` : "Informe os pontos"}</strong></div>
                                    </div>
                                    {baseSubtotal !== null && (
                                      <div className={styles.planTotals}>
                                        <div><span>1º ao 3º mês</span><strong>{formatCorporateMoney(baseSubtotal - CORPORATE_COMMERCIAL.discountFirstThreePerPoint * points!)}<small>/mês</small></strong></div>
                                        <div><span>A partir do 4º mês</span><strong>{formatCorporateMoney(baseSubtotal)}<small>/mês</small></strong></div>
                                        <p>Desconto de {formatCorporateMoney(CORPORATE_COMMERCIAL.discountFirstThreePerPoint)} por ponto nas 3 primeiras mensalidades do plano.</p>
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <div className={styles.priceUnavailable}><strong>{pricingStatus === "checking" ? "Verificando tabela" : "Solicitar cotação"}</strong></div>
                                )}
                                <button type="button" className={`${styles.selectPlanButton} ${selected ? styles.selectedPlanButton : ""}`}
                                  onClick={() => { setPlanId(item.id); if (item.comboUnitPrice === null) setCombo(false); }}>
                                  {selected ? "PLANO SELECIONADO" : "SELECIONAR PLANO"}
                                </button>
                              </div>
                            </article>
                          );
                        })}
                      </div>

                      {plan && plan.comboUnitPrice !== null && (
                        <label className={styles.comboBox}>
                          <input type="checkbox" checked={combo} onChange={(event) => setCombo(event.target.checked)} />
                          <span><strong>Versão Combo do plano</strong><small>Adiciona {formatCorporateMoney(plan.comboUnitPrice - plan.unitPrice)} por ponto/mês. Confirme o conteúdo do Combo no atendimento.</small></span>
                        </label>
                      )}

                      {plan && (
                        <div className={styles.optionalsSection}>
                          <div className={styles.sectionTitle}>
                            <span>2</span><div><strong>Adicione canais à la carte</strong><p>Cada opcional pode ser contratado em todos ou somente em parte dos pontos.</p></div>
                          </div>
                          <div className={styles.optionalGrid}>
                            {optionals.map((optional) => {
                              const state = optionalState[optional.id];
                              const row = optionalRows.find((item) => item.id === optional.id);
                              return (
                                <article key={optional.id} className={`${styles.optionalCard} ${state.selected ? styles.selectedOptional : ""}`}>
                                  <div className={styles.optionalLogo}>
                                    <img src={optional.image} alt={optional.name} width={optional.logoWidth} height={optional.logoHeight}
                                      style={{ width: optional.logoWidth, height: optional.logoHeight }} loading="lazy" decoding="async" />
                                  </div>
                                  <div className={styles.optionalHeader}>
                                    <strong>{optional.name}</strong>
                                    {automaticPricing ? <span>{formatCorporateMoney(optional.pricePerPoint)}<small>/ponto/mês</small></span>
                                      : <span className={styles.quotePrice}>Sob consulta</span>}
                                  </div>
                                  <button type="button" className={styles.optionalToggle} aria-pressed={state.selected}
                                    onClick={() => updateOptional(optional.id, { selected: !state.selected })}>
                                    {state.selected ? "REMOVER" : "ADICIONAR"}
                                  </button>
                                  {state.selected && (
                                    <div className={styles.optionalControls}>
                                      <button type="button" className={state.mode === "all" ? styles.activeOptionalMode : ""}
                                        onClick={() => updateOptional(optional.id, { mode: "all" })}>Em todos os pontos</button>
                                      <button type="button" className={state.mode === "custom" ? styles.activeOptionalMode : ""}
                                        onClick={() => updateOptional(optional.id, { mode: "custom", customQuantity: state.customQuantity || "1" })}>Escolher quantidade</button>
                                      {state.mode === "custom" && (
                                        <label className={styles.customQuantity}>
                                          <span>Quantidade de pontos</span>
                                          <input type="text" inputMode="numeric" pattern="[0-9]*" value={state.customQuantity}
                                            onChange={(event: ChangeEvent<HTMLInputElement>) => updateOptional(optional.id, { customQuantity: event.target.value.replace(/\D/g, "") })} />
                                        </label>
                                      )}
                                      {row?.invalid && <small className={styles.inputError}>Informe de 1 até {points ?? "o total"} pontos.</small>}
                                      {row?.subtotal !== null && row?.subtotal !== undefined && !row.invalid && (
                                        <div className={styles.optionalSubtotal}>
                                          <span>{row.quantity} pontos</span><strong>{formatCorporateMoney(row.subtotal)}<small>/mês</small></strong>
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

                      <div className={styles.needBox}>
                        <label htmlFor="corporate-city">Cidade e UF do estabelecimento</label>
                        <input id="corporate-city" type="text" value={city} onChange={(event) => setCity(event.target.value)} placeholder="Ex.: Brasília/DF" />
                        <label htmlFor="corporate-need">Outras informações (opcional)</label>
                        <textarea id="corporate-need" value={need} onChange={(event) => setNeed(event.target.value)}
                          placeholder="Ex.: recepção, restaurante, área comum, tipo de operação..." rows={3} />
                      </div>

                      <details className={styles.mobileSummary}>
                        <summary><span>Resumo da seleção</span><strong>{calculation ? formatCorporateMoney(calculation.firstThreeTotal) : pricingStatus === "expired" ? "Sob consulta" : "Ver resumo"}</strong></summary>
                        <CorporateSummary points={points} term={term} planId={planId} combo={combo} optionalRows={optionalRows}
                          calculation={calculation} pricingStatus={pricingStatus} />
                      </details>
                      <div className={styles.proposalArea}>
                        {canRequest ? (
                          <TrackedLink className={styles.whatsappButton} href={buildHref()} target="_blank" rel="noopener noreferrer"
                            eventName="click_whatsapp" eventData={{ placement: "corporate_builder", segment, plan: plan?.name ?? "", points: points ?? 0, term }}>
                            <Image src="/img/whatsapp-icon.webp" alt="" width={20} height={20} unoptimized />
                            <span>SOLICITAR PROPOSTA PELO WHATSAPP</span>
                          </TrackedLink>
                        ) : <button type="button" className={styles.disabledProposalButton} disabled>SOLICITAR PROPOSTA PELO WHATSAPP</button>}
                        {!canRequest && <small>Informe os pontos, selecione um plano e ajuste as quantidades para continuar.</small>}
                      </div>
                    </div>
                    <aside className={styles.desktopSummary}>
                      <div className={styles.summaryCard}>
                        <span className={styles.summaryEyebrow}>RESUMO DO ORÇAMENTO</span>
                        <h3>Sua configuração</h3>
                        <CorporateSummary points={points} term={term} planId={planId} combo={combo} optionalRows={optionalRows}
                          calculation={calculation} pricingStatus={pricingStatus} />
                        <p className={styles.validity}>Tabela {CORPORATE_COMMERCIAL.version}, referência até 30/09/2026. Confirme elegibilidade, disponibilidade e condições comerciais antes de contratar.</p>
                      </div>
                    </aside>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>, document.body,
      )}
    </>
  );
}
