import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Entenda como a Contrate TV trata dados pessoais, cookies e solicitações de atendimento.",
  alternates: { canonical: "/politica-de-privacidade" },
};

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <header className="legal-header"><Link href="/" aria-label="Voltar para o início">← Contrate TV</Link><span>PARCEIRO AUTORIZADO SKY</span></header>
      <article className="legal-content">
        <p className="legal-kicker">PRIVACIDADE E LGPD</p>
        <h1>Política de privacidade</h1>
        <p className="legal-date">Última atualização: 20 de agosto de 2026.</p>
        <p>A Contrate TV respeita sua privacidade. Esta política explica quais dados podem ser tratados quando você navega no site ou inicia um atendimento pelo WhatsApp.</p>
        <h2>1. Dados tratados</h2>
        <p>O site pode registrar informações técnicas básicas de navegação, como endereço IP, tipo de dispositivo, navegador, páginas acessadas e eventos de desempenho. Quando você chama no WhatsApp, os dados enviados por você passam a ser tratados no próprio canal de atendimento.</p>
        <h2>2. Finalidades</h2>
        <p>Os dados são usados para manter o site seguro, medir seu funcionamento quando houver consentimento, responder solicitações, consultar disponibilidade regional e auxiliar na contratação do serviço solicitado.</p>
        <h2>3. Cookies e consentimento</h2>
        <p>Cookies necessários podem ser utilizados para memorizar suas preferências. Cookies de medição somente são ativados após sua autorização no banner de privacidade. Você pode recusar os cookies opcionais sem impedir o acesso ao conteúdo.</p>
        <h2>4. Compartilhamento</h2>
        <p>Dados podem ser compartilhados com prestadores de infraestrutura e com os responsáveis pela oferta e instalação apenas quando necessário para atender sua solicitação, cumprir obrigações legais ou proteger o site contra abuso.</p>
        <h2>5. Seus direitos</h2>
        <p>Nos termos da LGPD, você pode solicitar confirmação de tratamento, acesso, correção, exclusão quando aplicável, informação sobre compartilhamento e revogação do consentimento.</p>
        <h2>6. Contato</h2>
        <p>Para dúvidas ou solicitações sobre privacidade, entre em contato pelo WhatsApp <a href="https://wa.me/5561981954746" target="_blank" rel="noopener noreferrer">+55 61 98195-4746</a>.</p>
        <h2>7. Atualizações</h2>
        <p>Esta política pode ser atualizada para refletir mudanças operacionais, legais ou técnicas. A data mais recente sempre aparecerá no início desta página.</p>
      </article>
    </main>
  );
}
