"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { trackMetaLead } from "./metaTracking";
import { campaignFields, sendSheetRecord } from "./campaignTracking";

const phone = "5561981954746";
const plans = [
  { value: "Ainda não escolhi", label: "Ainda não escolhi", price: 0 },
  { value: "POP HD", label: "POP HD — R$ 69,90/mês", price: 69.9 },
  { value: "SUPER HD", label: "SUPER HD — R$ 59,90/mês", price: 59.9 },
  { value: "SUPER HD II", label: "SUPER HD II — R$ 79,90/mês", price: 79.9 },
  { value: "TOP HD", label: "TOP HD — R$ 99,90/mês", price: 99.9 },
  { value: "TOP HD II", label: "TOP HD II — R$ 119,90/mês", price: 119.9 },
  { value: "SKY CONNECT", label: "SKY CONNECT — R$ 369,90/mês", price: 369.9 },
];

type SubmissionState = "idle" | "sending" | "sent" | "error";

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function formatPhone(value: string) {
  const digits = onlyDigits(value).slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

function formatCep(value: string) {
  const digits = onlyDigits(value).slice(0, 8);
  return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
}

export default function LeadForm({ cityName }: { cityName?: string }) {
  const [phoneValue, setPhoneValue] = useState("");
  const [cepValue, setCepValue] = useState("");
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const plan = String(form.get("plan") || "Ainda não escolhi");
    const selectedPlan = plans.find((item) => item.value === plan) || plans[0];
    const city = cityName || "Não informada";
    const formConsentGranted = form.get("consent") === "on";
    const attribution = campaignFields();
    const eventId = trackMetaLead(
      { content_name: "formulario_planos_sky", content_category: "tv_por_assinatura", city, plan, value: selectedPlan.price, currency: "BRL" },
      { formConsentGranted, userData: { name, phone: phoneValue, city, zip: cepValue } }
    );
    const payload = {
      name,
      phone: phoneValue,
      cep: cepValue,
      city,
      plan,
      price: selectedPlan.price,
      source: attribution?.source || "Site",
      utm_source: attribution?.utm_source || "",
      utm_medium: attribution?.utm_medium || "",
      utm_campaign: attribution?.utm_campaign || "",
      utm_content: attribution?.utm_content || "",
      utm_term: attribution?.utm_term || "",
      fbclid: attribution?.fbclid || "",
      landing_page_url: attribution?.landing_page_url || window.location.href,
      referrer: attribution?.referrer || document.referrer,
      visit_id: attribution?.visit_id || "",
      page_url: window.location.href,
      event_id: eventId || "",
      consent: formConsentGranted,
      status: "LEAD_FORMULARIO",
      observations: "Formulário preenchido e WhatsApp aberto.",
      website: String(form.get("website") || ""),
    };
    const message = [
      "Olá, preenchi o formulário do site e quero consultar uma oferta SKY.",
      `Nome: ${name}`,
      `Telefone: ${phoneValue}`,
      `CEP: ${cepValue}`,
      `Plano de interesse: ${selectedPlan.label}`,
      `Cidade: ${city}`,
    ].join("\n");

    setSubmissionState("sending");
    void sendSheetRecord(payload)
      .then(() => setSubmissionState("sent"))
      .catch(() => setSubmissionState("error"));
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

  const statusMessage = {
    idle: "Ao enviar, seus dados serão registrados para atendimento e o WhatsApp será aberto.",
    sending: "Registrando sua solicitação e abrindo o WhatsApp...",
    sent: "Solicitação enviada. Agora confirme a mensagem no WhatsApp.",
    error: "O WhatsApp foi aberto, mas não foi possível confirmar o registro. Você ainda pode enviar a mensagem normalmente.",
  }[submissionState];

  return (
    <section className="lead-section" id="formulario" aria-labelledby="lead-form-title">
      <div className="container lead-layout">
        <div className="lead-copy">
          <span>CONSULTE PARA O SEU ENDEREÇO</span>
          <h2 id="lead-form-title">Receba uma oferta SKY para o seu CEP</h2>
          <p>Preencha os dados e continue no WhatsApp para confirmar disponibilidade, preço e instalação.</p>
          <ul>
            <li>Consulta rápida e sem compromisso</li>
            <li>Condições confirmadas para sua região</li>
            <li>Atendimento de parceiro autorizado</li>
          </ul>
        </div>
        <form className="lead-form" onSubmit={handleSubmit}>
          <div className="lead-honeypot" aria-hidden="true">
            <label htmlFor="lead-website">Website</label>
            <input id="lead-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="lead-field lead-field-wide">
            <label htmlFor="lead-name">Nome</label>
            <input id="lead-name" name="name" type="text" autoComplete="name" minLength={2} required placeholder="Como podemos chamar você?" />
          </div>
          <div className="lead-field">
            <label htmlFor="lead-phone">WhatsApp</label>
            <input id="lead-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={phoneValue} onChange={(event) => setPhoneValue(formatPhone(event.target.value))} pattern="\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}" required placeholder="(61) 99999-9999" />
          </div>
          <div className="lead-field">
            <label htmlFor="lead-cep">CEP de instalação</label>
            <input id="lead-cep" name="cep" type="text" inputMode="numeric" autoComplete="postal-code" value={cepValue} onChange={(event) => setCepValue(formatCep(event.target.value))} pattern="[0-9]{5}-[0-9]{3}" required placeholder="00000-000" />
          </div>
          <div className="lead-field lead-field-wide">
            <label htmlFor="lead-plan">Plano de interesse</label>
            <select id="lead-plan" name="plan" defaultValue="Ainda não escolhi">
              {plans.map((plan) => <option value={plan.value} key={plan.value}>{plan.label}</option>)}
            </select>
            <small className="lead-plan-note">Valores promocionais do 1º ao 4º mês. Consulte as condições disponíveis para o seu CEP.</small>
          </div>
          <label className="lead-privacy lead-field-wide">
            <input name="consent" type="checkbox" required />
            <span>Concordo com o uso dos dados para receber atendimento e medir o resultado desta campanha, conforme a <Link href="/politica-de-privacidade">Política de Privacidade</Link>.</span>
          </label>
          <button className="lead-submit lead-field-wide" type="submit" disabled={submissionState === "sending"}>RECEBER OFERTA NO WHATSAPP <b aria-hidden="true">→</b></button>
          <p className="lead-status lead-field-wide" aria-live="polite">{statusMessage}</p>
        </form>
      </div>
    </section>
  );
}
