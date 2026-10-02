import Image from "next/image";

export default function FooterLegal() {
  return (
    <footer className="authorized-footer" aria-label="Credenciamento e informações da empresa">
      <div className="authorized-footer-identity">
        <Image src="/img/campaign/logo-sky.png" alt="SKY" width={320} height={205} unoptimized />
        <p>CREDENCIADO AUTORIZADO SKY | STAR TELECOMUNICAÇÕES | PDV: V906812 ©</p>
      </div>
      <p>Todos os direitos reservados.</p>
      <p>CNPJ: 10.863.171/0001-06</p>
    </footer>
  );
}
