"use client";

import { useEffect } from "react";
import {
  initializeMetaPixel,
  META_CONSENT_KEY,
  revokeMetaConsent,
} from "./metaTracking";

export default function MetaPixel() {
  useEffect(() => {
    initializeMetaPixel();

    const onConsent = (event: Event) => {
      const value = (event as CustomEvent<"accepted" | "rejected">)
        .detail;

      if (
        value === "accepted" ||
        window.localStorage.getItem(META_CONSENT_KEY) === "accepted"
      ) {
        initializeMetaPixel();
      } else {
        revokeMetaConsent();
      }
    };

    window.addEventListener("cookie-consent", onConsent);
    return () => window.removeEventListener("cookie-consent", onConsent);
  }, []);

  return null;
}
