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

  if (eventName === "click_whatsapp" || eventName === "click_plan") {
    trackMetaContact({ ...data, channel: "whatsapp" });
  }
}
