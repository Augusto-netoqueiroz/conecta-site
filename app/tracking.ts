import { trackMetaContact } from "./metaTracking";

type TrackingData = Record<
  string,
  string | number | boolean | undefined
>;

type TrackingWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
};

export function trackEvent(
  eventName: string,
  data: TrackingData = {}
) {
  if (typeof window === "undefined") {
    return;
  }

  const trackingWindow = window as TrackingWindow;

  trackingWindow.dataLayer = trackingWindow.dataLayer || [];
  trackingWindow.dataLayer.push({
    event: eventName,
    ...data,
  });

  if (eventName === "click_phone") {
    trackMetaContact({ ...data, channel: "phone" });
  }

  // Os CTAs dos cards de planos (click_plan) são rastreados por regras
  // nativas do Pixel, configuradas pelo texto dos botões. Mantemos aqui
  // apenas os demais links de WhatsApp para evitar dupla contagem.
  if (eventName === "click_whatsapp") {
    trackMetaContact({ ...data, channel: "whatsapp" });
  }
}
