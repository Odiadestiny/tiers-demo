import React from "react";
import { useTier } from "../tier/TierContext";

export default function TierSwitcher() {
  const { tier, setTier } = useTier();
  return (
    <div className="row" style={{ marginBottom: "1rem" }}>
      <span>Current tier:</span>
      <span className={`badge ${tier}`}>{tier}</span>
      <div className="row">
        {["guest", "free", "startup", "professional"].map((t) => (
          <button
            key={t}
            className={t === tier ? "primary" : ""}
            onClick={() => setTier(t)}
            aria-pressed={t === tier}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}
