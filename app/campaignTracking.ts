import {
  hasMetaConsent,
  META_CONSENT_KEY,
  trackMetaLead,
} from "./metaTracking";

const leadsEndpoint = "https://script.google.com/macros/s/AKfycbxeZvHxK-m1EXI3MwjfsuPhVAyGiAwt6a0_4J_LQs20xjFzTNrvtP-kW1xGPzriDAXt/exec";
const attributionKey = "planos-sky-campaign-attribution";
const visitIdKey = "planos-sky-campaign-visit-id";
const visitSentKey = "planos-sky-campaign-visit-sent";
const visitMetaSentKey = "planos-sky-campaign-visit-meta-sent";

type CampaignData = {
  source: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  fbclid: string;
  landing_page_url: string;
  referrer: string;
};

type TrackingData = Record<string, string | number | boolean | undefined>;

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function socialSource(referrer: string) {
  try {
    const host = new URL(referrer).hostname.replace(/^www\./, "");
    if (/(^|\.)facebook\.com$/.test(host)) return "facebook";
    if (/(^|\.)instagram\.com$/.test(host)) return "instagram";
  } catch {
    return "";
  }
  return "";
}

function readCurrentAttribution(): CampaignData | null {
  const params = new URLSearchParams(window.location.search);
  const referrerSource = socialSource(document.referrer);
  const utmSource = params.get("utm_source") || "";
  const fbclid = params.get("fbclid") || "";
  const hasCampaign = Boolean(
    utmSource || params.get("utm_medium") || params.get("utm_campaign") ||
    fbclid || params.get("gclid") || params.get("msclkid") || referrerSource
  );
  if (!hasCampaign) return null;

  return {
    source: utmSource || (fbclid ? "Meta Ads" : referrerSource || "Anúncio"),
    utm_source: utmSource,
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
    fbclid,
    landing_page_url: window.location.href,
    referrer: document.referrer,
  };
}

function getStoredAttribution(): CampaignData | null {
  try {
    const stored = sessionStorage.getItem(attributionKey);
    return stored ? JSON.parse(stored) as CampaignData : null;
  } catch {
    return null;
  }
}

export function getCampaignAttribution() {
  if (typeof window === "undefined") return null;
  const current = readCurrentAttribution();
  const stored = getStoredAttribution();

  if (current) {
    const changedCampaign = stored && JSON.stringify({ ...stored, landing_page_url: "", referrer: "" }) !== JSON.stringify({ ...current, landing_page_url: "", referrer: "" });
    sessionStorage.setItem(attributionKey, JSON.stringify(current));
    if (!stored || changedCampaign) {
      sessionStorage.setItem(visitIdKey, createId());
      sessionStorage.removeItem(visitSentKey);
      sessionStorage.removeItem(visitMetaSentKey);
    }
    return current;
  }

  return stored;
}

function visitId() {
  let id = sessionStorage.getItem(visitIdKey);
  if (!id) {
    id = createId();
    sessionStorage.setItem(visitIdKey, id);
  }
  return id;
}

export function sendSheetRecord(data: TrackingData) {
  return fetch(leadsEndpoint, {
    method: "POST",
    mode: "no-cors",
    keepalive: true,
    headers: { "Content-Type": "text/plain;charset=UTF-8" },
    body: JSON.stringify(data),
  }).then(() => undefined);
}

function basePayload(attribution: CampaignData, eventId: string) {
  return {
    name: "",
    phone: "",
    cep: "",
    city: "Não informada",
    plan: "",
    price: "",
    ...attribution,
    page_url: window.location.href,
    event_id: eventId,
    visit_id: visitId(),
    consent: localStorage.getItem(META_CONSENT_KEY) === "accepted",
    website: "",
  };
}

export function initializeCampaignTracking() {
  const attribution = getCampaignAttribution();
  if (!attribution) return;

  const eventId = visitId();

  if (sessionStorage.getItem(visitSentKey) !== "1") {
    void sendSheetRecord({
      ...basePayload(attribution, eventId),
      status: "VISITA_ANUNCIO",
      observations: "Visitante chegou ao site por anúncio.",
    })
      .then(() => sessionStorage.setItem(visitSentKey, "1"))
      .catch(() => {});
  }

  if (hasMetaConsent() && sessionStorage.getItem(visitMetaSentKey) !== "1") {
    trackMetaLead(
      {
        content_name: "visita_anuncio",
        content_category: "tv_por_assinatura",
        conversion_method: "campaign_visit",
        lead_status: "VISITA_ANUNCIO",
        source: attribution.source,
        utm_source: attribution.utm_source,
        utm_medium: attribution.utm_medium,
        utm_campaign: attribution.utm_campaign,
        utm_content: attribution.utm_content,
        utm_term: attribution.utm_term,
      },
      { eventId }
    );
    sessionStorage.setItem(visitMetaSentKey, "1");
  }
}

export function trackCampaignAction(eventName: string, data: TrackingData = {}, eventId = createId()) {
  const attribution = getCampaignAttribution();
  if (!attribution) return;

  const status = eventName === "click_whatsapp" || eventName === "click_plan"
    ? "CLIQUE_WHATSAPP"
    : eventName === "click_view_plans"
      ? "CLIQUE_CONHECER_PLANOS"
      : eventName === "click_phone"
        ? "CLIQUE_TELEFONE"
        : `CLIQUE_${eventName.toUpperCase()}`;

  void sendSheetRecord({
    ...basePayload(attribution, eventId),
    plan: data.plan || "",
    city: data.city || "Não informada",
    status,
    observations: JSON.stringify({ event: eventName, ...data }),
  }).catch(() => {});
}

export function campaignFields() {
  const attribution = getCampaignAttribution();
  return attribution ? { ...attribution, visit_id: visitId() } : null;
}
