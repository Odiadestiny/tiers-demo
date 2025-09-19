// import React from "react";
// import { useAuth } from "../auth/AuthContext";

// export default function ProtectedPage() {
//   const { user, logout } = useAuth();

//   return (
//     <section className="card" style={{ maxWidth: 720, margin: "2rem auto" }}>
//       <h2 className="card__name">Dashboard</h2>
//       <p className="card__bio">You’re signed in as <strong>{user?.email}</strong>.</p>
//       <button className="btn btn--secondary" onClick={logout}>
//         Sign out
//       </button>
//     </section>
//   );
// }

import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function ProtectedPage() {
  const { user, logout, authFetch } = useAuth();
  const [secret, setSecret] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function run() {
      try {
        const res = await authFetch("/secure/hello"); // your protected API
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json(); // e.g., { message: "Hello, Destiny!" }
        if (!ignore) setSecret(data?.message || "Loaded.");
      } catch (e) {
        if (!ignore) setSecret(`Error: ${e.message}`);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    run();
    return () => { ignore = true; };
  }, [authFetch]);

  return (
    <section className="card" style={{ maxWidth: 720, margin: "2rem auto" }}>
      <h2 className="card__name">Dashboard</h2>
      <p className="card__bio">Signed in as <strong>{user?.email}</strong>.</p>

      {loading ? <p>Loading secure message…</p> : <p>{secret}</p>}

      <button className="btn btn--secondary" onClick={logout} style={{ marginTop: 12 }}>
        Sign out
      </button>
    </section>
  );
}
