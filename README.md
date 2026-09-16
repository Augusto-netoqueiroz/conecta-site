# Contrate TV — Planos SKY

Landing page estática da Contrate TV, parceiro autorizado SKY, publicada em [planostvsky.com.br](https://planostvsky.com.br/).

O projeto utiliza Next.js para gerar os arquivos estáticos da pasta `out/`. O cPanel copia essa pasta para `public_html` durante o deploy. Além do site, o projeto possui rastreamento de campanhas, formulário de leads, Meta Pixel, API de Conversões da Meta e integração com Google Sheets.

## Tecnologias

- Next.js 16 com exportação estática
- React 19 e TypeScript
- CSS responsivo
- PHP no cPanel para a API de Conversões da Meta
- Google Apps Script para gravação de leads no Google Sheets
- Meta Pixel e Meta Conversions API

## Estrutura principal

| Caminho | Responsabilidade |
| --- | --- |
| `app/` | Páginas, componentes, estilos e lógica do site |
| `app/metaTracking.ts` | Pixel, CAPI, consentimento, `fbp`, `fbc` e deduplicação por `event_id` |
| `app/campaignTracking.ts` | UTMs, `fbclid`, visitas de anúncio, cliques e envio para a planilha |
| `app/tracking.ts` | Centralização dos eventos disparados pelos CTAs |
| `app/LeadForm.tsx` | Formulário, evento `Lead` e envio do lead completo para a planilha |
| `public/` | Arquivos públicos copiados para a exportação estática |
| `public/api/meta-conversion.php` | Endpoint PHP da API de Conversões da Meta |
| `google-apps-script/Code.gs` | Código da implantação web ligada à planilha de leads |
| `out/` | Site estático pronto para publicação no cPanel |
| `out/api/meta-conversion.php` | Cópia publicada do endpoint da CAPI |
| `.cpanel.yml` | Rotina que publica `out/` em `public_html` |
| `scripts/` | Scripts auxiliares de instalação, build e validação |
| `tests/` | Testes automatizados do projeto |

## Fluxo de rastreamento

### Meta

O Pixel e a API de Conversões usam o conjunto de dados `1382311347429828`.

- `PageView`: enviado após o consentimento de cookies.
- `Lead`: enviado quando o formulário é preenchido ou quando o visitante clica em um CTA de WhatsApp.
- `Contact`: usado no contato por telefone.
- Pixel e CAPI compartilham o mesmo `event_id` para deduplicação.
- `_fbp` e `_fbc` são enviados sem alterar o valor armazenado.
- Quando a URL contém `fbclid`, o `fbc` é criado uma vez e reutilizado durante a visita.

O navegador envia os eventos do servidor para:

```text
/api/meta-conversion.php
```

O PHP encaminha os dados para a Graph API da Meta. Nome, telefone, cidade, CEP e identificador externo são normalizados e convertidos para SHA-256 antes do envio.

### Google Sheets

O site envia os registros para a implantação web definida em `app/campaignTracking.ts`.

Eventos gravados na aba `Leads`:

| Status | Quando é gravado |
| --- | --- |
| `VISITA_ANUNCIO` | Visitante entra com UTM, `fbclid`, `gclid`, `msclkid` ou referência social |
| `CLIQUE_WHATSAPP` | Clique em botão ou plano que abre o WhatsApp |
| `CLIQUE_CONHECER_PLANOS` | Clique para visualizar os planos |
| `CLIQUE_TELEFONE` | Clique no telefone |
| `LEAD_FORMULARIO` | Envio do formulário com nome, WhatsApp e CEP |

Os eventos de visita e clique podem ter nome, telefone e CEP vazios. Esses dados só são obrigatórios em `LEAD_FORMULARIO`.

O código do Apps Script está versionado em `google-apps-script/Code.gs`, mas a publicação dele é feita separadamente no Google:

1. Abra a planilha e acesse **Extensões → Apps Script**.
2. Atualize o arquivo `Code.gs`.
3. Acesse **Implantar → Gerenciar implantações**.
4. Publique uma nova versão com acesso para **Qualquer pessoa**.
5. Se o Google gerar uma nova URL `/exec`, atualize `app/campaignTracking.ts` e gere novamente a pasta `out/`.

## Variáveis e segredos

Variáveis públicas opcionais de build estão documentadas em `.env.example`:

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
NEXT_PUBLIC_BING_SITE_VERIFICATION=
```

Arquivos `.env*` reais são ignorados pelo Git e não devem conter segredos versionados.

### Token da Meta no cPanel

O token da API de Conversões não fica no repositório. Em produção, o PHP procura primeiro a variável `META_CAPI_ACCESS_TOKEN` e depois o arquivo:

```text
/home2/timmas40/.secrets/meta-capi-token
```

Esse arquivo deve conter somente o token, sem aspas e sem `META_CAPI_ACCESS_TOKEN=`.

Permissões recomendadas:

```bash
chmod 600 /home2/timmas40/.secrets/meta-capi-token
```

Para eventos de teste da CAPI, o servidor também pode receber temporariamente `META_CAPI_TEST_EVENT_CODE`. Essa configuração deve ser removida ao finalizar os testes.

## Desenvolvimento local

Requisitos:

- Node.js 22.13 ou superior
- npm

Instalação e execução:

```bash
npm ci
npm run dev
```

Build estático:

```bash
npm run build
```

O build precisa terminar com a pasta `out/` atualizada.

## Deploy no cPanel

O deploy de produção usa `.cpanel.yml` e publica somente o conteúdo de `out/`.

Fluxo recomendado:

1. Faça a alteração no código-fonte.
2. Execute `npm run build`.
3. Confirme que os arquivos alterados de `out/` estão no commit.
4. Abra um pull request e faça o merge na `main`.
5. No Git Version Control do cPanel, execute **Update from Remote**.
6. Execute **Deploy HEAD Commit**.

O deploy preserva apenas a pasta `.well-known` existente no servidor e substitui os demais arquivos de `public_html` pelo conteúdo de `out/`.

## Arquivos essenciais versionados

Os seguintes arquivos precisam permanecer no Git:

- `.cpanel.yml`
- `.env.example`
- `package.json` e `package-lock.json`
- `next.config.ts`
- `public/.htaccess` e `out/.htaccess`
- `public/api/meta-conversion.php` e `out/api/meta-conversion.php`
- `google-apps-script/Code.gs`
- toda a pasta `app/`
- toda a pasta `public/`
- toda a pasta `out/`
- `out/index.html`, `out/robots.txt` e `out/sitemap.xml`

## Itens essenciais que não são versionados

| Item | Local | Motivo |
| --- | --- | --- |
| Token da Meta CAPI | `/home2/timmas40/.secrets/meta-capi-token` | Segredo de produção; nunca deve entrar no Git |
| Implantação ativa do Apps Script | Conta Google vinculada à planilha | A implantação é externa; apenas o `Code.gs` fica no repositório |
| Planilha de leads | Google Sheets | Banco operacional externo ao projeto |

Arquivos como `node_modules/`, `.next/`, `.env.local`, logs e caches também não são versionados, mas podem ser recriados e não fazem parte do deploy do cPanel.

## Checklist depois do deploy

1. Abra o site com uma UTM de teste nova.
2. Confirme `VISITA_ANUNCIO` na planilha.
3. Aceite os cookies e clique no WhatsApp.
4. Confirme `CLIQUE_WHATSAPP` na planilha.
5. Verifique `PageView` e `Lead` em **Eventos de teste** da Meta.
6. Teste o formulário e confirme `LEAD_FORMULARIO`.

Exemplo de URL para teste da planilha:

```text
https://planostvsky.com.br/?utm_source=facebook&utm_medium=paid&utm_campaign=teste_readme
```

Não utilize um `fbclid` inventado. Para validar `fbc`, acesse o site por um clique real de anúncio.

## Aviso

Este projeto pertence à Contrate TV e representa um canal de parceiro autorizado. Não é o site oficial da SKY.
