const PLANILHA_ID = "11rq3I_y9P58ALT8X2NGWQ-tN5wa-JlTBQGpo17ET0WE";
const ABA_LEADS = "Leads";

function respostaJson(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function somenteDigitos(value) {
  return String(value || "").replace(/\D/g, "");
}

function eventoAnonimo(status) {
  return status === "VISITA_ANUNCIO" || status.indexOf("CLIQUE_") === 0;
}

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    // Bots preenchem este campo invisível. Retornamos sucesso sem gravar.
    if (String(data.website || "").trim()) {
      return respostaJson({ ok: true, ignored: true });
    }

    const status = String(data.status || "Novo").trim();
    if (!eventoAnonimo(status)) {
      const nome = String(data.name || "").trim();
      const telefone = somenteDigitos(data.phone);
      const cep = somenteDigitos(data.cep);

      if (nome.length < 2 || !/^\d{10,11}$/.test(telefone) || !/^\d{8}$/.test(cep)) {
        return respostaJson({ ok: false, error: "Dados do formulário inválidos." });
      }
    }

    const preco = data.price === "" || data.price == null
      ? ""
      : Number(data.price);
    const consentimento = data.consent === true || data.consent === "true"
      ? "Sim"
      : "Não";
    const pagina = String(data.page_url || data.landing_page_url || "");

    const linha = [
      new Date(),
      String(data.name || ""),
      String(data.phone || ""),
      String(data.cep || ""),
      String(data.city || ""),
      String(data.plan || ""),
      Number.isFinite(preco) ? preco : "",
      String(data.source || "Site"),
      String(data.utm_source || ""),
      String(data.utm_medium || ""),
      String(data.utm_campaign || ""),
      String(data.utm_content || ""),
      String(data.utm_term || ""),
      String(data.fbclid || ""),
      pagina,
      String(data.event_id || ""),
      consentimento,
      status,
      String(data.observations || ""),
    ];

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      SpreadsheetApp.openById(PLANILHA_ID)
        .getSheetByName(ABA_LEADS)
        .appendRow(linha);
    } finally {
      lock.releaseLock();
    }

    return respostaJson({ ok: true });
  } catch (error) {
    console.error(error);
    return respostaJson({ ok: false, error: String(error) });
  }
}
