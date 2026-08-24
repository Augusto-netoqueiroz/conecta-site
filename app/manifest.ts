import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Contrate TV — Parceiro autorizado SKY",
    short_name: "Contrate TV",
    description: "Planos SKY com atendimento de parceiro autorizado.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ed0016",
    lang: "pt-BR",
    icons: [{ src: "/img/campaign/logo-sky.png", sizes: "1436x922", type: "image/png" }],
  };
}
