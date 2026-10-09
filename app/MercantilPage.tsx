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
    : `Olá, quero comprar um equipamento e contratar um plano SKY.${equipment ? ` Tenho interesse no ${equipment.name} (${equipment.detail.toLowerCase()}), com pagamento ${isInstallments ? paymentDescription : "à vista"}.` : ""}`;
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
          <nav className="desktop-nav" aria-label="Menu SKY">
            <a href="#contratacao">EQUIPAMENTOS E PLANOS</a>
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
              <a href="#contratacao">EQUIPAMENTOS E PLANOS</a>
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
              <span className={styles.eyebrow}>SKY PARA SUA CASA</span>
              <h1 id="mercantil-title">Para ter sua SKY,<br /><em>escolha seu equipamento.</em></h1>
              <p>Para ativar sua assinatura SKY, você precisa adquirir o receptor HD ou o kit completo com antena. <strong>O pagamento é feito antes do recebimento dos aparelhos.</strong></p>
              <p className={styles.heroQuestion} id="antenna-question">Você já possui antena SKY instalada na sua casa?</p>
              <div className={styles.heroChoices} role="group" aria-labelledby="antenna-question">
                <a href="#mercantil-kit-hd" className={styles.heroCta} onClick={() => setEquipment(mercantilEquipment[0])}>Não tenho! Preciso de antena e receptor HD</a>
                <a href="#mercantil-hd" className={styles.heroCta} onClick={() => setEquipment(mercantilEquipment[1])}>Tenho sim! Já tenho antena SKY instalada</a>
              </div>
              <span className={styles.heroNote}>Equipamento à vista ou em {mercantilInstallmentCount}x sem juros no cartão de crédito.</span>
            </div>
          </div>
        </section>

        <div className={`container ${styles.stepsWrap}`}>
          <ol className={styles.steps} aria-label="Etapas da contratação">
            <li className={styles.currentStep}><span>{quote ? "✓" : "1"}</span><strong>Escolha o seu equipamento</strong></li>
            <li className={quote ? styles.currentStep : ""}><span>2</span><strong>Confira e contrate</strong></li>
          </ol>
        </div>

        <section className={styles.section + " " + styles.selectionSection} id="contratacao" aria-labelledby="choice-title">
          <div className="container">
            <div className={styles.sectionHeading}>
              <span>PASSO 1</span>
              <h2 id="choice-title">Escolha seu equipamento</h2>
              <p>Na opção escolhida, selecione a forma de pagamento e o plano. Você pode alterar sua escolha quando quiser. Instalação inclusa.</p>
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
                        <div className={styles.equipmentVisual}><Image src={item.image} alt={item.name} width={200} height={160} unoptimized className={styles.equipmentImage} /><span>{item.detail.toUpperCase()}</span></div>
                        <div className={styles.equipmentCopy}>
                          <h3 id={"equipment-title-" + item.id}>
                            {item.name}
                            <br />
                            <em>{item.hasAntenna ? "(Para você que não possui antena)" : "(Para você que já possui antena SKY)"}</em>
                          </h3>
                          <p>{item.description}</p>
                          <strong className={styles.equipmentPrice}>{formatMercantilPrice(item.priceCents)}<small>À vista</small></strong>
                          <span className={styles.equipmentInstallments}>ou {mercantilInstallmentCount}x de <b>{formatMercantilPrice(cardInstallmentCents)}</b> sem juros</span>
                          <span className={styles.equipmentSelect}>{isSelected ? "EQUIPAMENTO SELECIONADO" : "SELECIONAR ESTE EQUIPAMENTO"}</span>
                        </div>
                      </label>

                      <div className={styles.paymentChoice} id={"pagamento-" + item.id}>
                        <fieldset className={styles.paymentFieldset}>
                          <legend>Pagamento do equipamento</legend>
                          <div className={styles.paymentGrid}>
                            <label className={styles.paymentOption + " " + (isSelected && !cardIsInstallments ? styles.selectedPayment : "")}>
                              <input type="radio" name={"mercantil-payment-" + item.id} value="cash" aria-label={"Pagar " + item.name + " à vista"} checked={isSelected && !cardIsInstallments} onChange={() => chooseEquipmentPayment(item, "cash")} />
                              <span><strong>À vista</strong><b>{formatMercantilPrice(item.priceCents)}</b><small>Compra única</small></span>
                            </label>
                            <label className={styles.paymentOption + " " + (isSelected && cardIsInstallments ? styles.selectedPayment : "")}>
                              <input type="radio" name={"mercantil-payment-" + item.id} value="installments" aria-label={"Pagar " + item.name + " em 10x sem juros"} checked={isSelected && cardIsInstallments} onChange={() => chooseEquipmentPayment(item, "installments")} />
                              <span><strong>{mercantilInstallmentCount}x sem juros</strong><b>{mercantilInstallmentCount}x de {formatMercantilPrice(cardInstallmentCents)}</b><small>No cartão de crédito</small></span>
                            </label>
                          </div>
                        </fieldset>
                      </div>

                      <div className={styles.equipmentPlans} id={"planos-" + item.id}>
                        <fieldset className={styles.planChoices}>
                          <legend>Escolha o plano deste equipamento<span className={styles.srOnly}>: {item.name}</span></legend>
                          {mercantilPlans.map((plan) => {
                            const isPlanSelected = isSelected && selectedPlan?.name === plan.name;
                            const planQuote = getMercantilQuote(item, plan, cardPayment);
                            return (
                              <div className={styles.planOption + " " + (isPlanSelected ? styles.selectedPlan : "")} data-plan-name={plan.name} key={plan.name}>
                                <label className={styles.planSelect}>
                                  <input type="radio" name="mercantil-plan" value={item.id + "-" + plan.name} aria-label={plan.name + " com " + item.name} checked={isPlanSelected} onChange={() => choosePlan(item, plan)} />
                                  <span className={styles.planChoiceCopy}><strong>{plan.name}</strong><small>{plan.highlight}</small></span>
                                  <span className={styles.planChoicePrice}><b>R$ {plan.price}</b><small>/mês</small></span>
                                  <span className={styles.planUpfrontPayment}><span>{cardIsInstallments ? "Pagamento antecipado (1ª parcela)" : "Pagamento à vista"}</span><strong>{formatMercantilPrice(planQuote.firstMonthCents)}</strong><small>Antes do recebimento dos aparelhos</small></span>
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
                        <p className={styles.offerNote}>O pagamento do equipamento é feito antes do recebimento dos aparelhos, sem cobrança do plano neste pagamento. Assinatura com pagamento à vista do 2º ao 4º mês pelo valor promocional; mensalidade regular a partir do 5º mês, conforme o resumo.</p>
                      </div>
                      {!item.hasAntenna && <p className={styles.equipmentNote}>Já tem antena? Confirme a compatibilidade antes de contratar a opção sem antena.</p>}
                      <button type="button" className={styles.cardSummaryButton} disabled={!isSelected || !selectedPlan} aria-label={"Conferir resumo de " + item.name} onClick={showSummary}>CONFERIR RESUMO <span aria-hidden="true">→</span></button>
                    </article>
                  );
                })}
              </div>
            </div>
            <p className={styles.selectionNote}>Você precisa comprar o equipamento para ativar a assinatura. O pagamento é feito antes do recebimento dos aparelhos. O parcelamento em 10x é somente do equipamento.</p>
          </div>
        </section>

        <section className={`${styles.section} ${styles.summarySection}`} id="resumo" aria-labelledby="summary-title">
          <div className={`container ${styles.summaryLayout}`}>
            <div className={styles.summaryCopy}>
              <span className={styles.eyebrow}>PASSO 2</span>
              <h2 id="summary-title" ref={summaryHeading} tabIndex={-1}>Tudo pronto para<br />sua nova SKY.</h2>
              <p>Confira sua escolha e envie o resumo pelo WhatsApp. Nosso atendimento orienta a compra do equipamento e a contratação do plano.</p>
              <ul><li>Pagamento antes do recebimento dos aparelhos</li><li>Equipamento à vista ou em {mercantilInstallmentCount}x sem juros</li><li>Mensalidades do plano a partir do 2º mês</li></ul>
            </div>
            <div className={styles.summaryCard} aria-live="polite" aria-atomic="true">
              {equipment && selectedPlan && quote ? <>
                <span className={styles.summaryLabel}>RESUMO DA SUA COMPRA</span>
                <div className={styles.chosenItem}><div><span>VALOR DO SEU EQUIPAMENTO</span><strong>{equipment.name}</strong><small>{equipment.detail} · {formatMercantilPrice(quote.equipmentCents)}</small></div><a href="#equipamentos">Trocar</a></div>
                <div className={styles.chosenItem}><div><span>PAGAMENTO DO EQUIPAMENTO</span><strong>{paymentDescription}</strong>{isInstallments && <small>No cartão de crédito</small>}</div><a href={"#pagamento-" + equipment.id}>Alterar</a></div>
                <div className={styles.chosenItem}><div><span>PLANO SKY</span><strong>{selectedPlan.name}</strong></div><a href={"#planos-" + equipment.id}>Trocar</a></div>
                <dl className={styles.breakdown}>
                  <div><dt>{isInstallments ? `1ª parcela do equipamento (1/${mercantilInstallmentCount})` : "Valor do seu equipamento"}</dt><dd>{formatMercantilPrice(quote.equipmentFirstMonthCents)}</dd></div>
                  <div><dt>Plano neste pagamento<small>Primeira mensalidade no 2º mês</small></dt><dd>{formatMercantilPrice(quote.planFirstMonthCents)}</dd></div>
                  <div className={styles.upfrontPayment}><dt>{isInstallments ? "Pagamento antecipado" : "Pagamento à vista"}<small>Antes do recebimento dos aparelhos</small><small>Somente {isInstallments ? "a 1ª parcela do equipamento" : "o equipamento"}</small></dt><dd>{formatMercantilPrice(quote.firstMonthCents)}</dd></div>
                  <div className={styles.laterMonth}><dt>Do 2º ao 4º mês<small>{isInstallments ? "Plano + parcela do aparelho" : "Somente o plano"}</small></dt><dd>{formatMercantilPrice(quote.monthsTwoToFourCents)}<small>/mês</small></dd></div>
                  {isInstallments ? <>
                    <div className={styles.laterMonth}><dt>Do 5º ao {mercantilInstallmentCount}º mês<small>Plano regular + parcela do aparelho</small></dt><dd>{formatMercantilPrice(quote.monthsFiveToTenCents)}<small>/mês</small></dd></div>
                    <div className={styles.laterMonth}><dt>A partir do {mercantilInstallmentCount + 1}º mês<small>Somente o plano · Aparelho quitado</small></dt><dd>{formatMercantilPrice(quote.regularMonthlyCents)}<small>/mês</small></dd></div>
                  </> : <div className={styles.laterMonth}><dt>A partir do 5º mês<small>Mensalidade regular do plano</small></dt><dd>{formatMercantilPrice(quote.regularMonthlyCents)}<small>/mês</small></dd></div>}
                </dl>
                <p className={styles.promoNote}>{selectedPlan.promo}</p>
                <TrackedLink className={styles.whatsappCta} href={whatsapp} target="_blank" rel="noopener noreferrer" eventName="click_plan" eventData={{ ...trackingData, placement: "mercantil_summary" }}><Image src="/img/whatsapp-icon.webp" alt="" width={22} height={22} unoptimized /><span>CONTRATAR PELO WHATSAPP</span><b aria-hidden="true">→</b></TrackedLink>
                <p className={styles.summaryNote}>Envie seu CEP para confirmar disponibilidade, instalação e condições da oferta.</p>
              </> : <div className={styles.emptySummary}><span aria-hidden="true">1 + 2</span><h3>Seu resumo aparece aqui</h3><p>Escolha {equipment ? "o plano" : "o equipamento e o plano"} para conferir o pagamento antes do recebimento dos aparelhos e as próximas mensalidades.</p><a href={equipment ? "#planos-" + equipment.id : "#equipamentos"} className={styles.primaryButton}>{equipment ? "ESCOLHER PLANO" : "COMEÇAR PELO EQUIPAMENTO"} <b aria-hidden="true">→</b></a></div>}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.faqSection}`} id="duvidas" aria-labelledby="faq-title">
          <div className="container">
            <div className={styles.sectionHeading}><span>DÚVIDAS FREQUENTES</span><h2 id="faq-title">Sobre a compra e a assinatura</h2></div>
            <div className={`faq-list ${styles.faqList}`}>{mercantilFaqs.map(({ question, answer }, index) => <details key={question} open={index === 0}><summary>{question}</summary><p>{answer}</p></details>)}</div>
          </div>
        </section>
        <ChannelsModal />
      </main>

      <footer className={styles.footer}>
        <div className={`container ${styles.footerRow}`}><div><strong>PLANOS SKY</strong><span>PARCEIRO AUTORIZADO</span></div><nav aria-label="Informações legais"><Link href="/politica-de-privacidade/">Política de privacidade</Link><Link href="/termos-de-uso/">Termos de uso</Link></nav><TrackedLink href={whatsapp} target="_blank" rel="noopener noreferrer" eventName="click_whatsapp" eventData={{ ...trackingData, placement: "mercantil_footer" }}>WhatsApp: (61) 98195-4746</TrackedLink></div>
      </footer>
      <TrackedLink className="whatsapp-float" href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Atendimento SKY pelo WhatsApp" eventName="click_whatsapp" eventData={{ ...trackingData, placement: "mercantil_floating_button" }}><Image src="/img/whatsapp-icon.webp" alt="" width={100} height={100} unoptimized /><span>Assinar</span></TrackedLink>
    </div>
  );
}