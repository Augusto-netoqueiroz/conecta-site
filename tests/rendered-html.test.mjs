import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("gera o site estático com metadados e headers de segurança", async () => {
  const [html, htaccess] = await Promise.all([
    readFile(new URL("../out/index.html", import.meta.url), "utf8"),
    readFile(new URL("../out/.htaccess", import.meta.url), "utf8"),
  ]);

  assert.match(html, /<title>Planos SKY TV por Assinatura \| Consulte Ofertas e Grade de Canais<\/title>/i);
  assert.match(html, /rel="canonical"[^>]+href="https:\/\/planostvsky\.com\.br\/"/i);
  assert.match(html, /Política de privacidade/i);
  assert.match(htaccess, /X-Content-Type-Options "nosniff"/i);
  assert.match(htaccess, /X-Frame-Options "SAMEORIGIN"/i);
  assert.match(htaccess, /RewriteRule \^\(\.\+\\\.txt\)\/\$ \$1 \[L\]/i);
  assert.match(htaccess, /RewriteRule \^home2\/timmas40\/public_html\/\(\.\+\)\$ \/\$1 \[L,R=308,NE\]/i);
  assert.match(htaccess, /SetEnvIf Request_URI "\^\/" no-gzip=1/i);
  assert.doesNotMatch(htaccess, /AddOutputFilterByType\s+DEFLATE/i);
});

test("inclui os arquivos necessários para RSC e Meta CAPI", async () => {
  await Promise.all([
    access(new URL("../out/politica-de-privacidade/__next.politica-de-privacidade.__PAGE__.txt", import.meta.url)),
    access(new URL("../out/api/meta-conversion.php", import.meta.url)),
  ]);

  const endpoint = await readFile(new URL("../out/api/meta-conversion.php", import.meta.url), "utf8");
  assert.match(endpoint, /events_received/);
  assert.match(endpoint, /test_mode/);
});
