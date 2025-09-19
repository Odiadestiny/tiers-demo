// import React from "react";
// import { useAuth } from "../auth/AuthContext";
// import { Navigate, useLocation } from "react-router-dom";

// export default function RequireAuth({ children }) {
//   const { user } = useAuth();
//   const location = useLocation();

//   if (!user) {
//     // send them to /login and remember where they wanted to go
//     return <Navigate to="/login" replace state={{ from: location.pathname }} />;
//   }
//   return children;
// }


import React from "react";
import { useAuth } from "../auth/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ maxWidth: 720, margin: "2rem auto", textAlign: "center" }}>
        <p>Checking your session…</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}
