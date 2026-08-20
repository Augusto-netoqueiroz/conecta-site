"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="error-page">
      <span>ERRO 500</span>
      <h1>Não foi possível carregar esta página.</h1>
      <p>O problema pode ser temporário. Tente novamente ou volte para a página inicial.</p>
      <button type="button" onClick={() => reset()}>Tentar novamente</button>
      <Link href="/">Voltar para o início →</Link>
    </main>
  );
}
