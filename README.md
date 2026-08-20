# Contrate TV — Landing Page SKY

Landing page responsiva da Contrate TV, parceiro autorizado SKY, desenvolvida com Next.js, React, Vinext e Cloudflare Workers.

## Recursos

- Layout otimizado para celular, tablet e desktop
- Hero com arte específica para telas mobile
- Integração com atendimento via WhatsApp
- Planos, FAQ e páginas legais
- Banner de consentimento LGPD
- SEO técnico, Open Graph, sitemap, robots e `llms.txt`
- Dados estruturados Schema.org
- Headers de segurança e cache de arquivos estáticos

## Requisitos

- Node.js 22.13 ou superior
- npm

## Desenvolvimento

```bash
npm ci
npm run dev
```

## Validação

```bash
npm run lint
npm test
```

## Build

```bash
npm run build
```

O build gera um Worker ESM compatível com Cloudflare em `dist/server/index.js`.

## Variáveis opcionais

Copie `.env.example` para `.env.local` e configure somente os serviços utilizados:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- `NEXT_PUBLIC_BING_SITE_VERIFICATION`

Nunca publique o arquivo `.env.local`.

## Publicação

O projeto está preparado para publicação como Cloudflare Worker por meio do fluxo de Sites. O arquivo `.openai/hosting.json` contém apenas a identidade do projeto hospedado e não armazena credenciais.

## Aviso

Este projeto pertence à Contrate TV e representa um canal de parceiro autorizado. Não é o site oficial da SKY.
