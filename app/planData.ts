import {
  popMainChannels,
  superMainChannels,
  topMainChannels,
} from "./channelData";

const promo = "Desconto no cartão de crédito do 1º ao 4º mês.";

const standardLogos = [
  ["nfl-card-logo.webp", "NFL"],
  ["prime-card-logo.webp", "Amazon Prime"],
  ["sky-card-logo.webp", "SKY+"],
] as const;

const popLogos = [
  ["nfl-card-logo.webp", "NFL"],
  ["prime-card-logo.webp", "Amazon Prime"],
  ["Premiere-card-logo.png", "Premiere"],
  ["sky-card-logo.webp", "SKY+"],
] as const;

const connectLogos = [
  ["nfl-card-logo.webp", "NFL"],
  ["prime-card-logo.webp", "Amazon Prime"],
  ["Premiere-card-logo.png", "Premiere"],
  ["hbo-card-logo.webp", "HBO"],
  ["telecine-card-logo.webp", "Telecine"],
  ["paramount-card-logo.png", "Paramount+"],
  ["disney-card-logo.webp", "Disney+"],
  ["espn-card-logo.png", "ESPN"],
  ["sky-card-logo.webp", "SKY+"],
] as const;

const standardBenefits = (channels: number) => [
  `Mais de ${channels} canais de TV por Assinatura e TV Aberta!`,
  "Programação em HD",
  "Inclui Amazon Prime",
  "Inclui NFL",
  "Inclui SKY+",
];

export const plans = [
  {
    name: "POP HD",
    highlight: "+50 CANAIS",
    summary: ["Canais locais em HD", "+ Futebol ao vivo"],
    logos: popLogos,
    mainChannels: popMainChannels,
    channelKey: "pop",
    benefits: [
      "Mais de 50 canais de TV por Assinatura e TV Aberta!",
      "Programação em HD",
      "Inclui Amazon Prime",
      "Inclui Premiere e NFL",
      "Inclui SKY+",
    ],
    oldPrice: "99,90",
    price: "69,90",
    promo,
  },
  {
    name: "SUPER HD",
    highlight: "+100 CANAIS",
    summary: ["Filmes • Séries • Esportes"],
    logos: standardLogos,
    mainChannels: superMainChannels,
    channelKey: "super",
    benefits: standardBenefits(100),
    oldPrice: "89,90",
    price: "59,90",
    promo,
  },
  {
    name: "SUPER HD II",
    highlight: "+100 CANAIS",
    summary: ["Filmes • Séries • Esportes"],
    badge: "2 PONTOS INCLUSOS",
    logos: standardLogos,
    mainChannels: superMainChannels,
    channelKey: "super",
    benefits: standardBenefits(100),
    oldPrice: "109,90",
    price: "79,90",
    promo,
  },
  {
    name: "TOP HD",
    highlight: "+170 CANAIS",
    summary: ["Filmes • Séries • Esportes"],
    logos: standardLogos,
    mainChannels: topMainChannels,
    channelKey: "top",
    benefits: standardBenefits(170),
    oldPrice: "129,90",
    price: "99,90",
    promo,
  },
  {
    name: "TOP HD II",
    highlight: "+170 CANAIS",
    summary: ["Filmes • Séries • Esportes"],
    badge: "2 PONTOS INCLUSOS",
    logos: standardLogos,
    mainChannels: topMainChannels,
    channelKey: "top",
    benefits: standardBenefits(170),
    oldPrice: "149,90",
    price: "119,90",
    promo,
  },
  {
    name: "SKY CONNECT",
    highlight: "PACOTE COMPLETO",
    summary: ["TV • Streaming • Esportes"],
    badge: "EXPERIÊNCIA COMPLETA",
    logos: connectLogos,
    mainChannels: topMainChannels,
    channelKey: "connect",
    benefits: [
      "Inclui Amazon Prime",
      "Inclui Premiere, HBO e Telecine",
      "Inclui Paramount+ e Disney+",
      "Inclui ESPN",
      "Inclui NFL e SKY+",
    ],
    oldPrice: "399,90",
    price: "369,90",
    promo,
  },
];