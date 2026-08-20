"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const CONSENT_KEY = "contrate-tv-cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(!localStorage.getItem(CONSENT_KEY)), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const choose = (value: "accepted" | "rejected") => {
    localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new CustomEvent("cookie-consent", { detail: value }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside className="cookie-banner" aria-label="Preferências de cookies" role="dialog" aria-live="polite">
      <div>
        <strong>Sua privacidade importa</strong>
        <p>Usamos cookies necessários para o funcionamento do site e, com sua autorização, dados de navegação para medir o desempenho. <Link href="/politica-de-privacidade">Saiba mais</Link>.</p>
      </div>
      <div className="cookie-actions">
        <button type="button" className="cookie-secondary" onClick={() => choose("rejected")}>Recusar opcionais</button>
        <button type="button" className="cookie-primary" onClick={() => choose("accepted")}>Aceitar</button>
      </div>
    </aside>
  );
}
