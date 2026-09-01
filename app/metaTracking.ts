export const META_PIXEL_ID = "1382311347429828";
export const META_CONSENT_KEY = "contrate-tv-cookie-consent";

type MetaEventData = Record<
  string,
  string | number | boolean | undefined
>;

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  loaded?: boolean;
  push?: Fbq;
  queue?: unknown[][];
  version?: string;
};

declare global {
  interface Window {
    _fbq?: Fbq;
    fbq?: Fbq;
  }
}

let initialized = false;
let pageViewSent = false;

function hasConsent() {
  return (
    typeof window !== "undefined" &&
    window.localStorage.getItem(META_CONSENT_KEY) === "accepted"
  );
}

function createEventId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getCookie(name: string) {
  const prefix = `${name}=`;
  const cookie = document.cookie
    .split(";")
    .map((value) => value.trim())
    .find((value) => value.startsWith(prefix));

  return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : undefined;
}

function getExternalId() {
  const key = "contrate-tv-meta-external-id";
  const stored = window.localStorage.getItem(key);

  if (stored) return stored;

  const id = createEventId();
  window.localStorage.setItem(key, id);
  return id;
}

function loadPixel() {
  if (initialized && window.fbq) return window.fbq;

  const existing = window.fbq;
  if (existing) {
    initialized = true;
    return existing;
  }

  const fbq = ((...args: unknown[]) => {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue?.push(args);
  }) as Fbq;

  window.fbq = fbq;
  window._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("consent", "grant");
  fbq("init", META_PIXEL_ID);
  initialized = true;
  return fbq;
}

function sendServerEvent(
  eventName: "PageView" | "Contact",
  eventId: string,
  customData: MetaEventData
) {
  const payload = {
    event_name: eventName,
    event_id: eventId,
    event_source_url: window.location.href,
    fbp: getCookie("_fbp"),
    fbc: getCookie("_fbc"),
    external_id: getExternalId(),
    custom_data: customData,
  };

  void fetch("/api/meta-conversion.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "same-origin",
    keepalive: true,
  }).catch(() => {
    // A falha da medição nunca deve interromper a navegação do usuário.
  });
}

export function initializeMetaPixel() {
  if (!hasConsent()) return;

  const fbq = loadPixel();
  if (pageViewSent) return;

  const eventId = createEventId();
  fbq("track", "PageView", {}, { eventID: eventId });
  sendServerEvent("PageView", eventId, {});
  pageViewSent = true;
}

export function revokeMetaConsent() {
  window.fbq?.("consent", "revoke");
}

export function trackMetaContact(data: MetaEventData = {}) {
  if (!hasConsent()) return;

  const fbq = loadPixel();
  const eventId = createEventId();
  const customData = Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined)
  );

  fbq("track", "Contact", customData, { eventID: eventId });
  sendServerEvent("Contact", eventId, customData);
}
