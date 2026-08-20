import assert from "node:assert/strict";
import test from "node:test";

test("renders launch metadata and security headers", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(response.headers.get("content-security-policy") ?? "", /frame-ancestors 'none'/);
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");

  const html = await response.text();
  assert.match(html, /<title>Contrate TV \| Parceiro autorizado SKY<\/title>/i);
  assert.match(html, /rel="canonical"[^>]+href="https:\/\/portal-de-tv\.augusto-netoqueiroz0\.chatgpt\.site\/"/i);
  assert.match(html, /application\/ld\+json/i);
  assert.match(html, /FAQPage/);
  assert.match(html, /Política de privacidade/i);
});
