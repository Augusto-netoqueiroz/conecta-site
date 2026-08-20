import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de uso",
  description: "Condições de uso do site Contrate TV e consulta de planos SKY.",
  alternates: { canonical: "/termos-de-uso" },
};

export default function TermsPage() {
  return (
    <main className="legal-page">
      <header className="legal-header"><Link href="/" aria-label="Voltar para o início">← Contrate TV</Link><span>PARCEIRO AUTORIZADO SKY</span></header>
      <article className="legal-content">
        <p className="legal-kicker">CONDIÇÕES DO SITE</p>
        <h1>Termos de uso</h1>
        <p className="legal-date">Última atualização: 20 de agosto de 2026.</p>
        <p>Ao acessar este site, você concorda com estes termos. A Contrate TV atua como canal de parceiro autorizado para consulta e contratação de planos SKY e não se apresenta como o site oficial da operadora.</p>
        <h2>1. Informações comerciais</h2>
        <p>Planos, preços, canais, equipamentos, benefícios, disponibilidade e condições de instalação podem variar por região e conforme a oferta vigente. A confirmação ocorre durante o atendimento.</p>
        <h2>2. Uso permitido</h2>
        <p>Você pode utilizar o site para conhecer os serviços e iniciar uma consulta. É proibido tentar interferir no funcionamento, automatizar acessos abusivos, copiar o conteúdo para induzir terceiros a erro ou usar a marca de maneira não autorizada.</p>
        <h2>3. Atendimento por terceiros</h2>
        <p>Links para WhatsApp e outros serviços externos seguem também as regras e políticas das respectivas plataformas. O envio de dados nesses canais é uma decisão do visitante.</p>
        <h2>4. Propriedade intelectual</h2>
        <p>Marcas, imagens, nomes comerciais e materiais de terceiros pertencem aos respectivos titulares. O conteúdo institucional da Contrate TV não pode ser reutilizado de modo enganoso.</p>
        <h2>5. Limitação de responsabilidade</h2>
        <p>A Contrate TV trabalha para manter as informações corretas, mas condições comerciais podem ser alteradas. A contratação somente é concluída após a confirmação dos dados e das condições aplicáveis.</p>
        <h2>6. Contato</h2>
        <p>Em caso de dúvida, fale com a equipe pelo WhatsApp <a href="https://wa.me/5561981954746" target="_blank" rel="noopener noreferrer">+55 61 98195-4746</a>.</p>
      </article>
    </main>
  );
}
