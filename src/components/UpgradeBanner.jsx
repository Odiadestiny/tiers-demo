import React from "react";
import { useTier } from "../tier/TierContext";

const LABELS = {
  createGroupPrivate: "Private groups",
  createPostVolunteering: "Volunteering posts",
  createPostEvents: "Event posts",
  createPostServices: "Service posts",
  createPostTraining: "Training posts",
  createPostAdvisory: "Advisory posts",
  useWidgetMaker: "Widget Maker",
};

export default function UpgradeBanner({ capability }) {
  const { tier } = useTier();
  const feature = LABELS[capability] || capability;

  return (
    <div className="banner">
      <strong>{feature}</strong> isn’t available on your current tier
      (<em> {tier} </em>).<br />
      <button className="link" onClick={() => alert("Upgrade flow…")}>
        Upgrade to unlock
      </button>
    </div>
  );
}
