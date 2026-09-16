import { trackMetaContact, trackMetaLead } from "./metaTracking";
import { trackCampaignAction } from "./campaignTracking";

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

  let eventId: string | undefined;

  if (eventName === "click_phone") {
    eventId = trackMetaContact({ ...data, channel: "phone" });
  }

  if (eventName === "click_whatsapp" || eventName === "click_plan") {
    eventId = trackMetaLead({
      ...data,
      content_name: "atendimento_whatsapp",
      content_category: "tv_por_assinatura",
      conversion_method: "whatsapp",
    });
  }

  trackCampaignAction(eventName, data, eventId);
}
