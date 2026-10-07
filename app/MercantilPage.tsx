"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import ChannelsModal from "./ChannelsModal";
import TrackedLink from "./TrackedLink";
import {
  formatMercantilPrice,
  getMercantilInstallmentCents,
  getMercantilMessage,
  getMercantilQuote,
  mercantilEquipment,
  mercantilFaqs,
  mercantilInstallmentCount,
  mercantilPlans,
  type MercantilEquipment,
  type MercantilPayment,
  type MercantilPlan,
} from "./mercantilData";
import styles from "./MercantilPage.module.css";

const phone = "5561981954746";
const whatsappUrl = (message: string) => `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

function EquipmentIllustration({ hasAntenna }: { hasAntenna: boolean }) {
  return (
    <svg viewBox="0 0 220 132" fill="none" aria-hidden="true" className={styles.equipmentIllustration}>
      {hasAntenna && (
        <g stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M27 18a58 58 0 0 0 74 74L27 18Z" fill="#fff" />
          <path d="m45 37 54 18 6-9M65 83l-8 28M37 112h52" />
          <rect x="99" y="32" width="17" height="17" rx="5" fill="#fbdcdf" />
          <path d="M119 15c10 1 20 8 22 19M122 3c18 2 30 13 34 29" opacity=".4" />
        </g>
      )}
      <g transform={hasAntenna ? "translate(83 73)" : "translate(45 44)"}>
        <path d="M0 18 16 0h103l13 18" fill="#edeef1" stroke="#25252b" strokeWidth="3" />
        <rect y="18" width="132" height="40" rx="9" fill="#25252b" />
        <rect x="12" y="30" width="40" height="15" rx="4" fill="#4a4a54" />
        <text x="20" y="41" fill="white" fontSize="11" fontWeight="700">HD</text>
        <circle cx="111" cy="39" r="3" fill="#ed1b2f" />
        <path d="M71 35h18M71 42h18" stroke="#6b6b74" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export default function MercantilPage() {
  const [equipment, setEquipment] = useState<MercantilEquipment | null>(null);
  const [equipmentPayments, setEquipmentPayments] = useState<Record<MercantilEquipment["id"], MercantilPayment>>({
    "kit-hd": "cash",
    hd: "cash",
  });
  const equipmentPayment = equipment ? equipmentPayments[equipment.id] : "cash";
  const [selectedPlan, setSelectedPlan] = useState<MercantilPlan | null>(null);
  const summaryHeading = useRef<HTMLHeadingElement>(null);
  const isInstallments = equipmentPayment === "installments";
  const equipmentInstallmentCents = equipment ? getMercantilInstallmentCents(equipment) : 0;
  const paymentDescription = isInstallments
    ? `${mercantilInstallmentCount}x de ${formatMercantilPrice(equipmentInstallmentCents)} sem juros`
    : "À vista";
  const quote = equipment && selectedPlan ? getMercantilQuote(equipment, selectedPlan, equipmentPayment) : null;
  const message = equipment && selectedPlan
    ? getMercantilMessage(equipment, selectedPlan, equipmentPayment)
    : `Olá, quero atendimento para contratar SKY Mercantil.${equipment ? ` Tenho interesse no ${equipment.name} (${equipment.detail.toLowerCase()}), com pagamento ${isInstallments ? paymentDescription : "à vista"}.` : ""}`;
  const whatsapp = whatsappUrl(message);
  const trackingData = {
    page: "mercantil",
    equipment: equipment?.name,
    equipment_payment: equipment ? equipmentPayment : undefined,
    equipment_installments: equipment ? (isInstallments ? mercantilInstallmentCount : 1) : undefined,
    plan: selectedPlan?.name,
    value: quote ? quote.firstMonthCents / 100 : undefined,
    currency: "BRL",
  };

  function chooseEquipmentPayment(item: MercantilEquipment, payment: MercantilPayment) {
    setEquipment(item);
    setEquipmentPayments((current) => ({ ...current, [item.id]: payment }));
  }

  function choosePlan(item: MercantilEquipment, plan: MercantilPlan) {
    setEquipment(item);
    setSelectedPlan(plan);
  }

  function showSummary() {
    window.requestAnimationFrame(() => {
      summaryHeading.current?.focus({ preventScroll: true });
      summaryHeading.current?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        block: "start",
      });
    });
  }

  return (
    <div className={styles.page}>
      <header className="commercial-header">
        <div className="container header-row">
          <Link className="commercial-brand" href="/" aria-label="SKY — parceiro autorizado, página inicial">
            <Image src="/img/campaign/logo-sky.png" alt="SKY" width={320} height={205} unoptimized />
            <span>PARCEIRO AUTORIZADO</span>
          </Link>
          <nav className="desktop-nav" aria-label="Menu Mercantil">
            <a href="#contratacao">MERCANTIL E PLANO</a>
            <a href="#resumo">SEU RESUMO</a>
            <a href="#duvidas">DÚVIDAS</a>
          </nav>
          <div className="header-actions">
            <TrackedLink className="call-header-cta" href="tel:08003631234" eventName="click_phone" eventData={{ page: "mercantil", placement: "header" }}>
              <span aria-hidden="true">☎</span><span>Ligue</span>
            </TrackedLink>
            <TrackedLink className="green-header-cta" href={whatsapp} target="_blank" rel="noopener noreferrer" eventName="click_whatsapp" eventData={{ ...trackingData, placement: "mercantil_header" }}>
              <Image src="/img/whatsapp-icon.webp" alt="" width={18} height={18} unoptimized />
              <span>WhatsApp</span>
            </TrackedLink>
          </div>
          <details className="mobile-menu">
            <summary aria-label="Abrir menu"><span /><span /><span /></summary>
            <div className="mobile-menu-panel">
              <a href="#contratacao">MERCANTIL E PLANO</a>
              <a href="#resumo">SEU RESUMO</a>
              <a href="#duvidas">DÚVIDAS</a>
            </div>
          </details>
        </div>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="mercantil-title">
          <div className={`container ${styles.heroLayout}`}>
            <div className={styles.heroCopy}>
              <span className={styles.eyebrow}>MODALIDADE MERCANTIL</span>
              <h1 id="mercantil-title">Para ter sua SKY,<br /><em>compre seu Mercantil.</em></h1>
              <p><strong>A compra do aparelho Mercantil é obrigatória</strong> para ativar a assinatura nesta modalidade. A assinatura tem pagamento à vista.</p>
              <a href="#contratacao" className={styles.heroCta}>ESCOLHER APARELHO E PLANO <span aria-hidden="true">→</span></a>
              <span className={styles.heroNote}>Aparelho à vista ou em {mercantilInstallmentCount}x sem juros no cartão de crédito.</span>
            </div>
          </div>
        </section>

        <div className={`container ${styles.stepsWrap}`}>
          <ol className={styles.steps} aria-label="Etapas da contratação">
            <li className={styles.currentStep}><span>{quote ? "✓" : "1"}</span><strong>Escolha o Mercantil e o plano</strong></li>
            <li className={quote ? styles.currentStep : ""}><span>2</span><strong>Confira e contrate</strong></li>
          </ol>
        </div>

        <section className={styles.section + " " + styles.selectionSection} id="contratacao" aria-labelledby="choice-title">
          <div className="container">
            <div className={styles.sectionHeading}>
              <span>PASSO 1</span>
              <h2 id="choice-title">Escolha seu Mercantil e plano</h2>
              <p>Dentro do Mercantil escolhido, selecione o pagamento do aparelho e o plano. Instalação inclusa.</p>
            </div>
            <div className={styles.equipmentAnchor} id="equipamentos">
              <div className={styles.equipmentGrid} id="planos">
                {mercantilEquipment.map((item) => {
                  const isSelected = equipment?.id === item.id;
                  const cardPayment = equipmentPayments[item.id];
                  const cardIsInstallments = cardPayment === "installments";
                  const cardInstallmentCents = getMercantilInstallmentCents(item);

                  return (
                    <article className={styles.equipmentCard + " " + (isSelected ? styles.selectedEquipment : "")} id={"mercantil-" + item.id} data-equipment-id={item.id} aria-labelledby={"equipment-title-" + item.id} key={item.id}>
                      <label className={styles.equipmentHeader}>
                        <input type="radio" name="mercantil-equipment" value={item.id} aria-label={"Selecionar " + item.name} checked={isSelected} onChange={() => setEquipment(item)} />
                        <div className={styles.equipmentVisual}><EquipmentIllustration hasAntenna={item.hasAntenna} /><span>{item.detail.toUpperCase()}</span></div>
                        <div className={styles.equipmentCopy}>
                          <span className={styles.equipmentRequired}>COMPRA OBRIGATÓRIA</span>
                          <h3 id={"equipment-title-" + item.id}>
  {item.name}
  <br />
  <em>
    {item.id === "kit-hd"
      ? "(Para você que não possui antena)"
      : "(Para você que já possui antena)"}
  </em>
</h3>
                          <p>{item.description}</p>
                          <strong className={styles.equipmentPrice}>{formatMercantilPrice(item.priceCents)}<small>À vista</small></strong>
                          <span className={styles.equipmentInstallments}>ou {mercantilInstallmentCount}x de <b>{formatMercantilPrice(cardInstallmentCents)}</b> sem juros</span>
                          <span className={styles.equipmentSelect}>{isSelected ? "✓ APARELHO SELECIONADO" : "SELECIONAR ESTE MERCANTIL"}</span>
                        </div>
                      </label>

                      <div className={styles.paymentChoice} id={"pagamento-" + item.id}>
                        <fieldset className={styles.paymentFieldset}>
                          <legend>Pagamento do aparelho</legend>
                          <div className={styles.paymentGrid}>
                            <label className={styles.paymentOption + " " + (!cardIsInstallments ? styles.selectedPayment : "")}>
                              <input type="radio" name={"mercantil-payment-" + item.id} value="cash" aria-label={"Pagar " + item.name + " à vista"} checked={!cardIsInstallments} onChange={() => chooseEquipmentPayment(item, "cash")} />
                              <span><strong>À vista</strong><b>{formatMercantilPrice(item.priceCents)}</b><small>Compra única</small></span>
                            </label>
                            <label className={styles.paymentOption + " " + (cardIsInstallments ? styles.selectedPayment : "")}>
                              <input type="radio" name={"mercantil-payment-" + item.id} value="installments" aria-label={"Pagar " + item.name + " em 10x sem juros"} checked={cardIsInstallments} onChange={() => chooseEquipmentPayment(item, "installments")} />
                              <span><strong>{mercantilInstallmentCount}x sem juros</strong><b>{mercantilInstallmentCount}x de {formatMercantilPrice(cardInstallmentCents)}</b><small>No cartão de crédito</small></span>
                            </label>
                          </div>
                        </fieldset>
                      </div>

                      <div className={styles.equipmentPlans} id={"planos-" + item.id}>
                        <fieldset className={styles.planChoices}>
                          <legend>Escolha o plano deste Mercantil<span className={styles.srOnly}>: {item.name}</span></legend>
                          {mercantilPlans.map((plan) => {
                            const isPlanSelected = isSelected && selectedPlan?.name === plan.name;
                            const planQuote = getMercantilQuote(item, plan, cardPayment);
                            return (
                              <div className={styles.planOption + " " + (isPlanSelected ? styles.selectedPlan : "")} data-plan-name={plan.name} key={plan.name}>
                                <label className={styles.planSelect}>
                                  <input type="radio" name="mercantil-plan" value={item.id + "-" + plan.name} aria-label={plan.name + " com " + item.name} checked={isPlanSelected} onChange={() => choosePlan(item, plan)} />
                                  <span className={styles.planChoiceCopy}><strong>{plan.name}</strong><small>{plan.highlight}</small></span>
                                  <span className={styles.planChoicePrice}><b>R$ {plan.price}</b><small>/mês</small></span>
                                  <span className={styles.planFirstMonth}><span>1º mês ({cardIsInstallments ? "parcela" : "aparelho"} + plano)</span><strong>{formatMercantilPrice(planQuote.firstMonthCents)}</strong></span>
                                </label>
                                <details className={styles.planDetails}>
                                  <summary>Ver benefícios e canais</summary>
                                  <div className={styles.planDetailsContent}>
                                    <strong className={styles.benefitsTitle}>O que vem em seu plano:</strong>
                                    <div className={"plan-logo-grid " + styles.planLogos}>
                                      {plan.logos.map(([src, alt]) => <div className="plan-logo-item" key={src}><Image src={"/img/campaign/" + src} alt={alt} width={160} height={90} unoptimized /></div>)}
                                    </div>
                                    <ul className="plan-benefits">{plan.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
                                    <div className="plan-channel-preview">
                                      <strong className="plan-channel-title">Principais canais</strong>
                                      <div className="plan-channel-icons">{plan.mainChannels.map(([src, alt]) => <Image key={alt} src={src} alt={alt} width={90} height={50} unoptimized />)}</div>
                                      <button className="plan-more-channels" type="button" data-channel-key={plan.channelKey}>VER MAIS CANAIS</button>
                                    </div>
                                  </div>
                                </details>
                              </div>
                            );
                          })}
                        </fieldset>
                        <p className={styles.offerNote}>Assinatura com pagamento à vista. Valores do 1º ao 4º mês; mensalidade regular a partir do 5º mês, conforme o resumo.</p>
                      </div>
                      {!item.hasAntenna && <p className={styles.equipmentNote}>Já tem antena? Confirme a compatibilidade antes de contratar a opção sem antena.</p>}
                      <button type="button" className={styles.cardSummaryButton} disabled={!isSelected || !selectedPlan} aria-label={"Conferir resumo de " + item.name} onClick={showSummary}>CONFERIR RESUMO <span aria-hidden="true">→</span></button>
                    </article>
                  );
                })}
              </div>
            </div>
            <p className={styles.selectionNote}>A compra do Mercantil é obrigatória antes da ativação. O parcelamento em 10x é somente do aparelho.</p>
          </div>
        </section>

        <section className={`${styles.section} ${styles.summarySection}`} id="resumo" aria-labelledby="summary-title">
          <div className={`container ${styles.summaryLayout}`}>
            <div className={styles.summaryCopy}>
              <span className={styles.eyebrow}>PASSO 2</span>
              <h2 id="summary-title" ref={summaryHeading} tabIndex={-1}>Tudo pronto para<br />sua nova SKY.</h2>
              <p>Confira sua escolha e envie o resumo pelo WhatsApp. Nosso atendimento orienta a compra do aparelho e a contratação do plano.</p>
              <ul><li>Compra do aparelho antes da ativação</li><li>Aparelho à vista ou em {mercantilInstallmentCount}x sem juros</li><li>Mensalidades conforme o plano escolhido</li></ul>
            </div>
            <div className={styles.summaryCard} aria-live="polite" aria-atomic="true">
              {equipment && selectedPlan && quote ? <>
                <span className={styles.summaryLabel}>SEU RESUMO MERCANTIL</span>
                <div className={styles.chosenItem}><div><span>APARELHO MERCANTIL</span><strong>{equipment.name}</strong><small>{equipment.detail} · Valor total {formatMercantilPrice(quote.equipmentCents)}</small></div><a href="#equipamentos">Trocar</a></div>
                <div className={styles.chosenItem}><div><span>PAGAMENTO DO APARELHO</span><strong>{paymentDescription}</strong>{isInstallments && <small>No cartão de crédito</small>}</div><a href={"#pagamento-" + equipment.id}>Alterar</a></div>
                <div className={styles.chosenItem}><div><span>PLANO SKY</span><strong>{selectedPlan.name}</strong></div><a href={"#planos-" + equipment.id}>Trocar</a></div>
                <dl className={styles.breakdown}>
                  <div><dt>{isInstallments ? `1ª parcela do aparelho (1/${mercantilInstallmentCount})` : "Aparelho Mercantil"}</dt><dd>{formatMercantilPrice(quote.equipmentFirstMonthCents)}</dd></div>
                  <div><dt>1ª mensalidade do plano</dt><dd>{formatMercantilPrice(quote.monthlyCents)}</dd></div>
                  <div className={styles.firstMonth}><dt>Total do primeiro mês<small>{isInstallments ? "1ª parcela do aparelho" : "Aparelho"} + plano</small></dt><dd>{formatMercantilPrice(quote.firstMonthCents)}</dd></div>
                  <div className={styles.laterMonth}><dt>Do 2º ao 4º mês<small>{isInstallments ? "Plano + parcela do aparelho" : "Somente o plano"}</small></dt><dd>{formatMercantilPrice(quote.monthsTwoToFourCents)}<small>/mês</small></dd></div>
                  {isInstallments ? <>
                    <div className={styles.laterMonth}><dt>Do 5º ao {mercantilInstallmentCount}º mês<small>Plano regular + parcela do aparelho</small></dt><dd>{formatMercantilPrice(quote.monthsFiveToTenCents)}<small>/mês</small></dd></div>
                    <div className={styles.laterMonth}><dt>A partir do {mercantilInstallmentCount + 1}º mês<small>Somente o plano · Aparelho quitado</small></dt><dd>{formatMercantilPrice(quote.regularMonthlyCents)}<small>/mês</small></dd></div>
                  </> : <div className={styles.laterMonth}><dt>A partir do 5º mês<small>Mensalidade regular do plano</small></dt><dd>{formatMercantilPrice(quote.regularMonthlyCents)}<small>/mês</small></dd></div>}
                </dl>
                <p className={styles.promoNote}>{selectedPlan.promo}</p>
                <TrackedLink className={styles.whatsappCta} href={whatsapp} target="_blank" rel="noopener noreferrer" eventName="click_plan" eventData={{ ...trackingData, placement: "mercantil_summary" }}><Image src="/img/whatsapp-icon.webp" alt="" width={22} height={22} unoptimized /><span>CONTRATAR PELO WHATSAPP</span><b aria-hidden="true">→</b></TrackedLink>
                <p className={styles.summaryNote}>Envie seu CEP para confirmar disponibilidade, instalação e condições da oferta.</p>
              </> : <div className={styles.emptySummary}><span aria-hidden="true">1 + 2</span><h3>Seu resumo aparece aqui</h3><p>Escolha {equipment ? "o plano" : "o Mercantil e o plano"} para ver o total do primeiro mês e as próximas mensalidades.</p><a href={equipment ? "#planos-" + equipment.id : "#equipamentos"} className={styles.primaryButton}>{equipment ? "ESCOLHER PLANO" : "COMEÇAR PELO APARELHO"} <b aria-hidden="true">→</b></a></div>}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.faqSection}`} id="duvidas" aria-labelledby="faq-title">
          <div className="container">
            <div className={styles.sectionHeading}><span>DÚVIDAS FREQUENTES</span><h2 id="faq-title">Sobre o SKY Mercantil</h2></div>
            <div className={`faq-list ${styles.faqList}`}>{mercantilFaqs.map(({ question, answer }, index) => <details key={question} open={index === 0}><summary>{question}</summary><p>{answer}</p></details>)}</div>
          </div>
        </section>
        <ChannelsModal />
      </main>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerRow}`}><div><strong>SKY MERCANTIL</strong><span>PARCEIRO AUTORIZADO</span></div><nav aria-label="Informações legais"><Link href="/politica-de-privacidade/">Política de privacidade</Link><Link href="/termos-de-uso/">Termos de uso</Link></nav><TrackedLink href={whatsapp} target="_blank" rel="noopener noreferrer" eventName="click_whatsapp" eventData={{ ...trackingData, placement: "mercantil_footer" }}>WhatsApp: (61) 98195-4746</TrackedLink></div>
      </footer>
      <TrackedLink className="whatsapp-float" href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Atendimento SKY Mercantil pelo WhatsApp" eventName="click_whatsapp" eventData={{ ...trackingData, placement: "mercantil_floating_button" }}><Image src="/img/whatsapp-icon.webp" alt="" width={100} height={100} unoptimized /><span>Assinar</span></TrackedLink>
    </div>
  );
}
