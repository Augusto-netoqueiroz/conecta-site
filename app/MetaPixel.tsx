"use client";

import { useEffect } from "react";
import { initializeMetaPixel } from "./metaTracking";

export default function MetaPixel() {
  useEffect(() => initializeMetaPixel(), []);

  return null;
}
