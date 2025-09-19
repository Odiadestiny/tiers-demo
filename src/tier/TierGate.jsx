import React from "react";
import { useTier } from "./TierContext";
import UpgradeBanner from "../components/UpgradeBanner";

export default function TierGate({ capability, children }) {
  const { can } = useTier();
  if (!can(capability)) {
    return <UpgradeBanner capability={capability} />;
  }
  return <>{children}</>;
}
