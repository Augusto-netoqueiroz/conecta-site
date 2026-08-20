import Link from "next/link";

export default function NotFound() {
  return (
    <main className="error-page">
      <span>ERRO 404</span>
      <h1>Essa página não está disponível.</h1>
      <p>O endereço pode ter mudado ou não existir. Volte para conhecer os planos SKY disponíveis.</p>
      <Link href="/">Voltar para o início →</Link>
    </main>
  );
}
