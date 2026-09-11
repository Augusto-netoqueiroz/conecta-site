"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { trackMetaLead } from "./metaTracking";

const phone = "5561981954746";
const plans = [
  { value: "Ainda não escolhi", label: "Ainda não escolhi" },
  { value: "POP HD", label: "POP HD — R$ 69,90/mês" },
  { value: "SUPER HD", label: "SUPER HD — R$ 59,90/mês" },
  { value: "SUPER HD II", label: "SUPER HD II — R$ 79,90/mês" },
  { value: "TOP HD", label: "TOP HD — R$ 99,90/mês" },
  { value: "TOP HD II", label: "TOP HD II — R$ 119,90/mês" },
  { value: "SKY CONNECT", label: "SKY CONNECT — R$ 369,90/mês" },
];

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
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const plan = String(form.get("plan") || "Ainda não escolhi");
    const planLabel = plans.find((item) => item.value === plan)?.label || plan;
    const city = cityName || "Não informada";
    const message = [
      "Olá, preenchi o formulário do site e quero consultar uma oferta SKY.",
      `Nome: ${name}`,
      `Telefone: ${phoneValue}`,
      `CEP: ${cepValue}`,
      `Plano de interesse: ${planLabel}`,
      `Cidade: ${city}`,
    ].join("\n");

    trackMetaLead({ content_name: "formulario_planos_sky", content_category: "tv_por_assinatura", city, plan });
    setSent(true);
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  }

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
            <input type="checkbox" required />
            <span>Concordo com o uso dos dados para receber atendimento, conforme a <Link href="/politica-de-privacidade">Política de Privacidade</Link>.</span>
          </label>
          <button className="lead-submit lead-field-wide" type="submit">RECEBER OFERTA NO WHATSAPP <b aria-hidden="true">→</b></button>
          <p className="lead-status lead-field-wide" aria-live="polite">{sent ? "Dados preparados. O WhatsApp foi aberto para você enviar a solicitação." : "Seus dados serão enviados somente quando você confirmar a mensagem no WhatsApp."}</p>
        </form>
      </div>
    </section>
  );
}
