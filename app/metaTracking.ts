export const META_PIXEL_ID = "1382311347429828";
export const META_CONSENT_KEY = "contrate-tv-cookie-consent-20260901";
const META_FBC_STORAGE_KEY = "planos-sky-meta-fbc";

type MetaEventData = Record<
  string,
  string | number | boolean | undefined
>;

type MetaUserData = {
  name?: string;
  phone?: string;
  city?: string;
  zip?: string;
};

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

let pixelInitialized = false;
let pageViewSent = false;

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
  // _fbp and _fbc must be sent to Meta exactly as stored in the cookie.
  return cookie ? cookie.slice(prefix.length) : undefined;
}

function getFbc() {
  const cookie = getCookie("_fbc");
  const fbclid = new URLSearchParams(window.location.search).get("fbclid");

  if (!fbclid) return cookie;

  // A new ad click takes precedence over an _fbc left by an older visit.
  // Reuse the value for the whole visit instead of creating a new timestamp
  // on every event, which makes Meta consider the fbclid modified.
  if (cookie?.endsWith(`.${fbclid}`)) return cookie;

  try {
    const stored = window.sessionStorage.getItem(META_FBC_STORAGE_KEY);
    if (stored) {
      const value = JSON.parse(stored) as { fbclid?: string; fbc?: string };
      if (value.fbclid === fbclid && value.fbc) return value.fbc;
    }
  } catch {
    // Storage may be unavailable in restricted browsing modes.
  }

  const fbc = `fb.1.${Date.now()}.${fbclid}`;

  try {
    window.sessionStorage.setItem(
      META_FBC_STORAGE_KEY,
      JSON.stringify({ fbclid, fbc })
    );
  } catch {
    // The cookie below still keeps the value stable when storage is blocked.
  }

  document.cookie = `_fbc=${fbc}; Max-Age=7776000; Path=/; SameSite=Lax; Secure`;
  return fbc;
}

function getExternalId() {
  const key = "planos-sky-meta-external-id";
  let id = window.localStorage.getItem(key);
  if (!id) {
    id = createEventId();
    window.localStorage.setItem(key, id);
  }
  return id;
}

function sendServerEvent(
  eventName: "PageView" | "Contact" | "Lead",
  eventId: string,
  customData: MetaEventData,
  userData: MetaUserData = {}
) {
  return fetch("/api/meta-conversion.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "same-origin",
    keepalive: true,
    body: JSON.stringify({
      event_name: eventName,
      event_id: eventId,
      event_source_url: window.location.href,
      fbp: getCookie("_fbp"),
      fbc: getFbc(),
      external_id: getExternalId(),
      custom_data: customData,
      user_data: userData,
    }),
  })
    .then(async (response) => {
      const result = await response.json().catch(() => null);
      const success = response.ok && result?.ok === true && result?.events_received > 0;
      if (!success) console.error("[META_CAPI] Evento não confirmado.", { eventName, eventId, status: response.status, result });
      return success;
    })
    .catch((error) => {
      console.error("[META_CAPI] Falha de transporte.", { eventName, eventId, error: error instanceof Error ? error.message : String(error) });
      return false;
    });
}

function loadPixel() {
  let fbq = window.fbq;

  if (!fbq) {
    fbq = ((...args: unknown[]) => {
      if (fbq?.callMethod) fbq.callMethod(...args);
      else fbq?.queue?.push(args);
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
  }
  // Another integration (for example GTM) may have created fbq first. Always
  // initialize this dataset explicitly instead of merely reusing that queue.
  if (!pixelInitialized) {
    fbq("consent", "grant");
    fbq("init", META_PIXEL_ID);
    pixelInitialized = true;
  }

  return fbq;
}

function trackBrowserEvent(
  eventName: "PageView" | "Contact" | "Lead",
  eventId: string,
  customData: MetaEventData
) {
  const fbq = loadPixel();
  // trackSingle prevents a pre-existing Pixel on the page from receiving the
  // event while ensuring it is sent to the same dataset used by CAPI.
  fbq("trackSingle", META_PIXEL_ID, eventName, customData, { eventID: eventId });
}

export function initializeMetaPixel() {
  loadPixel();
  if (pageViewSent) return;

  const eventId = createEventId();
  trackBrowserEvent("PageView", eventId, {});
  sendServerEvent("PageView", eventId, {});
  pageViewSent = true;
}

export function trackMetaContact(data: MetaEventData = {}) {
  const eventId = createEventId();
  const customData = Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined)
  );

  trackBrowserEvent("Contact", eventId, customData);
  sendServerEvent("Contact", eventId, customData);
  return eventId;
}

export function trackMetaLead(
  data: MetaEventData = {},
  options: {
    eventId?: string;
    formConsentGranted?: boolean;
    onServerSuccess?: () => void;
    userData?: MetaUserData;
  } = {}
) {
  const eventId = options.eventId || createEventId();
  const customData = Object.fromEntries(
    Object.entries(data).filter(([, value]) => value !== undefined)
  );

  trackBrowserEvent("Lead", eventId, customData);
  void sendServerEvent("Lead", eventId, customData, options.userData).then((success) => {
    if (success) options.onServerSuccess?.();
  });
  return eventId;
}
