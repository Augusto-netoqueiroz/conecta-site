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
}