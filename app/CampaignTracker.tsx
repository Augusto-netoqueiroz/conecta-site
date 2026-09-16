"use client";

import { useEffect } from "react";
import { initializeCampaignTracking } from "./campaignTracking";

export default function CampaignTracker() {
  useEffect(() => {
    initializeCampaignTracking();

    const onConsent = (event: Event) => {
      if ((event as CustomEvent<string>).detail === "accepted") {
        initializeCampaignTracking();
      }
    };

    window.addEventListener("cookie-consent", onConsent);
    return () => window.removeEventListener("cookie-consent", onConsent);
  }, []);
  return null;
}
