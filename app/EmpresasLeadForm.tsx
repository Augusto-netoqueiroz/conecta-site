"use client";

import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";

type EmpresasLeadFormProps = {
  segment: string;
  phone?: string;
};

export default function EmpresasLeadForm({
  segment,
  phone = "5561982484817",
}: EmpresasLeadFormProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const body = document.body;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (scrollbarWidth > 0) {
      const currentPadding =
        Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0;
      body.style.paddingRight = `${currentPadding + scrollbarWidth}px`;
    }

    body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [open]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    const fields = {
      nome: String(data.get("nome") || "").trim(),
      telefone: String(data.get("telefone") || "").trim(),
      email: String(data.get("email") || "").trim(),
      cep: String(data.get("cep") || "").trim(),
      endereco: String(data.get("endereco") || "").trim(),
      bairro: String(data.get("bairro") || "").trim(),
      estado: String(data.get("estado") || "").trim(),
      cidade: String(data.get("cidade") || "").trim(),
      pontos: String(data.get("pontos") || "").trim(),
    };

    const message = [
      "Olá, quero montar um plano SKY Empresas.",
      "",
      `Segmento: ${segment}`,
      `Nome: ${fields.nome}`,
      `Telefone: ${fields.telefone}`,
      fields.email ? `Email: ${fields.email}` : "",
      fields.cep ? `CEP: ${fields.cep}` : "",
      fields.endereco ? `Endereço: ${fields.endereco}` : "",
      fields.bairro ? `Bairro: ${fields.bairro}` : "",
      `Estado: ${fields.estado}`,
      `Cidade: ${fields.cidade}`,
      fields.pontos ? `Quantidade de pontos/quartos: ${fields.pontos}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const modal =
    open && mounted
      ? createPortal(
          <div
            className="empresas-form-overlay"
            role="presentation"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setOpen(false);
            }}
          >
            <div
              className="empresas-form-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="empresas-form-title"
            >
              <button
                className="empresas-form-close"
                type="button"
                aria-label="Fechar formulário"
                onClick={() => setOpen(false)}
              >
                ×
              </button>

              <div className="empresas-form-brand">
                <Image
                  src="/img/campaign/logo-sky.png"
                  alt="SKY"
                  width={92}
                  height={59}
                  unoptimized
                />
                <span>EMPRESAS</span>
              </div>

              <div className="empresas-form-heading">
                <span>MONTE SUA SOLUÇÃO</span>
                <h2 id="empresas-form-title">
                  Conte um pouco sobre o seu negócio
                </h2>
                <p>
                  Preencha os dados abaixo. Ao enviar, as informações serão
                  abertas no WhatsApp para você concluir o atendimento.
                </p>
              </div>

              <form className="empresas-lead-form" onSubmit={handleSubmit}>
                <label className="empresas-form-full">
                  <span>Segmento</span>
                  <input value={segment} readOnly />
                </label>

                <label className="empresas-form-full">
                  <span>Seu nome</span>
                  <input
                    name="nome"
                    type="text"
                    autoComplete="name"
                    placeholder="Digite seu nome"
                    required
                  />
                </label>

                <label>
                  <span>DDD + Telefone</span>
                  <input
                    name="telefone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="(61) 99999-9999"
                    required
                  />
                </label>

                <label>
                  <span>Email</span>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="seuemail@exemplo.com"
                  />
                </label>

                <label>
                  <span>CEP</span>
                  <input
                    name="cep"
                    type="text"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    placeholder="00000-000"
                  />
                </label>

                <label>
                  <span>Quantidade de pontos/quartos</span>
                  <input
                    name="pontos"
                    type="number"
                    inputMode="numeric"
                    min="1"
                    placeholder="Ex.: 20"
                  />
                </label>

                <label className="empresas-form-full">
                  <span>Endereço</span>
                  <input
                    name="endereco"
                    type="text"
                    autoComplete="street-address"
                    placeholder="Rua, avenida ou endereço do estabelecimento"
                  />
                </label>

                <label>
                  <span>Bairro</span>
                  <input name="bairro" type="text" placeholder="Bairro" />
                </label>

                <label>
                  <span>Estado</span>
                  <select name="estado" defaultValue="" required>
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </select>
                </label>

                <label className="empresas-form-full">
                  <span>Cidade</span>
                  <input
                    name="cidade"
                    type="text"
                    autoComplete="address-level2"
                    placeholder="Digite sua cidade"
                    required
                  />
                </label>

                <button className="empresas-form-submit" type="submit">
                  <Image
                    src="/img/whatsapp-icon.webp"
                    alt=""
                    width={20}
                    height={20}
                    unoptimized
                  />
                  ENVIAR PELO WHATSAPP
                </button>
              </form>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <button
        className="empresas-build-plan-button"
        type="button"
        onClick={() => setOpen(true)}
      >
        MONTAR MEU PLANO
      </button>
      {modal}
    </>
  );
}
