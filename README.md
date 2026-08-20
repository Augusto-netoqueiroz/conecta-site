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

Para gerar a versão estática publicada na HostGator:

```bash
npm run build:hostgator
```

Esse comando atualiza a pasta `out`, que é versionada no Git para permitir a publicação sem depender de Node.js no servidor da hospedagem.

## Variáveis opcionais

Copie `.env.example` para `.env.local` e configure somente os serviços utilizados:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_GTM_ID`
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`
- `NEXT_PUBLIC_BING_SITE_VERIFICATION`

Nunca publique o arquivo `.env.local`.

## Publicação no cPanel da HostGator

Clone este repositório pelo Git Version Control do cPanel em `repositories/conecta-site`. O arquivo `.cpanel.yml` publica o conteúdo de `out` em `/home2/timmas40/public_html`, removendo a versão anterior e preservando somente a pasta `.well-known` utilizada pelo SSL.

No cPanel, abra o repositório e use, nesta ordem:

1. `Update from Remote`
2. `Deploy HEAD Commit`

O pacote estático inclui redirecionamento HTTPS, headers de segurança, cache, páginas 404/500, sitemap, robots e `llms.txt`.

## Publicação no Cloudflare

O projeto está preparado para publicação como Cloudflare Worker por meio do fluxo de Sites. O arquivo `.openai/hosting.json` contém apenas a identidade do projeto hospedado e não armazena credenciais.

## Aviso

Este projeto pertence à Contrate TV e representa um canal de parceiro autorizado. Não é o site oficial da SKY.
