"use client";

import { useEffect } from "react";
import { META_CONSENT_KEY } from "./metaTracking";
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function Analytics() {
  useEffect(() => {
    let loaded = false;

    const load = () => {
      if (loaded || localStorage.getItem(META_CONSENT_KEY) !== "accepted") return;
      loaded = true;
      window.dataLayer = window.dataLayer || [];

      if (GA_ID) {
        const ga = document.createElement("script");
        ga.async = true;
        ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
        document.head.appendChild(ga);
        window.gtag = (...args: unknown[]) => window.dataLayer?.push(args);
        window.gtag("js", new Date());
        window.gtag("config", GA_ID, { anonymize_ip: true });
      }

      if (GTM_ID) {
        const gtm = document.createElement("script");
        gtm.async = true;
        gtm.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
        document.head.appendChild(gtm);
      }
    };

    load();
    const onConsent = () => load();
    window.addEventListener("cookie-consent", onConsent);
    return () => window.removeEventListener("cookie-consent", onConsent);
  }, []);

  return null;
}
