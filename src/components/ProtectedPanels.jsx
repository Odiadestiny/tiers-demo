import React from "react";
import TierGate from "../tier/TierGate";

export default function ProtectedPanels() {
  return (
    <>
      <div className="card">
        <h3>Create Public Group</h3>
        <p>Available from Free and up.</p>
        <TierGate capability="createGroupPublic">
          <button className="primary">Create Group</button>
        </TierGate>
      </div>

      <div className="card">
        <h3>Create Private Group</h3>
        <p>Professional only.</p>
        <TierGate capability="createGroupPrivate">
          <button className="primary">Create Private Group</button>
        </TierGate>
      </div>

      <div className="card">
        <h3>Create Posts (Volunteering)</h3>
        <p>Free and up.</p>
        <TierGate capability="createPostVolunteering">
          <button className="primary">Create Volunteering Post</button>
        </TierGate>
      </div>

      <div className="card">
        <h3>Create Posts (Events/Services)</h3>
        <p>Startup and up.</p>
        <TierGate capability="createPostEvents">
          <button className="primary">Create Event Post</button>
        </TierGate>
        <br />
        <TierGate capability="createPostServices">
          <button className="primary">Create Service Post</button>
        </TierGate>
      </div>

      <div className="card">
        <h3>Create Posts (Training/Advisory)</h3>
        <p>Professional only.</p>
        <TierGate capability="createPostTraining">
          <button className="primary">Create Training Post</button>
        </TierGate>
        <br />
        <TierGate capability="createPostAdvisory">
          <button className="primary">Create Advisory Post</button>
        </TierGate>
      </div>

      <div className="card">
        <h3>Widget Maker</h3>
        <p>Professional only.</p>
        <TierGate capability="useWidgetMaker">
          <button className="primary">Open Widget Maker</button>
        </TierGate>
      </div>
    </>
  );
}
