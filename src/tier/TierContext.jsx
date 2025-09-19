import React, { createContext, useContext, useMemo, useState } from "react";

/**
 * Allowed tiers
 * - guest
 * - free
 * - startup
 * - professional
 */

const TierContext = createContext(null);

const CAPABILITY_MAP = {
  guest: new Set(["viewPublic"]),
  free: new Set([
    "viewPublic",
    "createProfile",
    "createGroupPublic",
    "createPostVolunteering"
  ]),
  startup: new Set([
    "viewPublic",
    "createProfile",
    "createGroupPublic",
    "createPostVolunteering",
    "createPostEvents",
    "createPostServices",
  ]),
  professional: new Set([
    "viewPublic",
    "createProfile",
    "createGroupPublic",
    "createGroupPrivate",
    "createPostVolunteering",
    "createPostEvents",
    "createPostServices",
    "createPostTraining",
    "createPostAdvisory",
    "useWidgetMaker",
  ]),
};

export function TierProvider({ initialTier = "free", children }) {
  const [tier, setTier] = useState(initialTier);

  const canSet = useMemo(() => {
    return CAPABILITY_MAP[tier] || CAPABILITY_MAP.guest;
  }, [tier]);

  const value = useMemo(
    () => ({
      tier,
      setTier,
      can: (capability) => canSet.has(capability),
    }),
    [tier, canSet]
  );

  return <TierContext.Provider value={value}>{children}</TierContext.Provider>;
}

export function useTier() {
  const ctx = useContext(TierContext);
  if (!ctx) throw new Error("useTier must be used within a TierProvider");
  return ctx;
}
