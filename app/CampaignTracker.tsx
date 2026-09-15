"use client";

import { useEffect } from "react";
import { initializeCampaignTracking } from "./campaignTracking";

export default function CampaignTracker() {
  useEffect(() => initializeCampaignTracking(), []);
  return null;
}
