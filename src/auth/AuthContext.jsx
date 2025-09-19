// import React, { createContext, useContext, useState, useMemo } from "react";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null); // { email } when logged in

//   const login = async ({ email, password }) => {
//     // Fake delay to simulate request
//     await new Promise((r) => setTimeout(r, 800));

//     // Demo auth rule: any email + password length >= 6
//     if (!email || password.length < 6) {
//       throw new Error("Invalid credentials");
//     }
//     setUser({ email });
//   };

//   const logout = () => setUser(null);

//   const value = useMemo(() => ({ user, login, logout }), [user]);
//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// }

// export function useAuth() {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
//   return ctx;
// }
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext(null);
const LS_KEY = "auth.v1"; // { token, email }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);          // { email }
  const [token, setToken] = useState(null);        // string or null
  const [loading, setLoading] = useState(true);    // initial restore

  // Restore session on first load
  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (raw) {
      try {
        const { token, email } = JSON.parse(raw);
        if (token && email) {
          setToken(token);
          setUser({ email });
        }
      } catch {}
    }
    setLoading(false);
  }, []);

  // Helper: centralize storage updates
  function saveAuth({ token, email }) {
    setToken(token);
    setUser({ email });
    localStorage.setItem(LS_KEY, JSON.stringify({ token, email }));
  }

  // Realistic login calling an API
  const login = async ({ email, password }) => {
    if (!email || !password) throw new Error("Email and password are required");

    // Example: Vite env var (set in .env.local): VITE_API_BASE=https://api.example.com
    const base = import.meta.env.VITE_API_BASE || "http://localhost:3000";

    const res = await fetch(`${base}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      // Try to read server error message
      let msg = "Login failed";
      try {
        const data = await res.json();
        msg = data?.message || msg;
      } catch {}
      throw new Error(msg);
    }

    const data = await res.json(); // expect { token: "jwt_or_session", email }
    if (!data?.token) throw new Error("Missing token in response");
    saveAuth({ token: data.token, email: data.email || email });
  };

  const logout = () => {
    localStorage.removeItem(LS_KEY);
    setToken(null);
    setUser(null);
  };

  // Optionally: refresh profile on demand
  const fetchProfile = async () => {
    const base = import.meta.env.VITE_API_BASE || "http://localhost:3000";
    const res = await fetch(`${base}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const data = await res.json(); // { email, name, ... }
      if (data?.email) setUser((u) => ({ ...u, ...data }));
    }
  };

  // Helper: authorized fetch for the rest of the app
  const authFetch = (url, opts = {}) => {
    const base = import.meta.env.VITE_API_BASE || "http://localhost:3000";
    const headers = {
      ...(opts.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    return fetch(`${base}${url}`, { ...opts, headers });
  };

  const value = useMemo(
    () => ({ user, token, login, logout, loading, authFetch, fetchProfile }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
