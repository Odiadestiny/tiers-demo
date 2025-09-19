import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from ?? "/";

  const [values, setValues] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const errors = {
    email:
      !values.email
        ? "Email is required"
        : !emailRegex.test(values.email)
        ? "Enter a valid email"
        : "",
    password:
      !values.password
        ? "Password is required"
        : values.password.length < 6
        ? "Minimum 6 characters"
        : "",
  };

  const isValid = !errors.email && !errors.password;

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setServerError("");
    if (!isValid) return;

    try {
      setSubmitting(true);
      await login(values);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setServerError(err.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="card" style={{ maxWidth: 420, margin: "2rem auto" }}>
      <h2 className="card__name" style={{ marginBottom: 8 }}>Welcome back</h2>
      <p className="card__bio" style={{ marginBottom: 16 }}>
        Sign in to continue.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <label className="form__label" htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          className={`form__input ${touched.email && errors.email ? "is-error" : ""}`}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="you@example.com"
          autoComplete="email"
        />
        {touched.email && errors.email && (
          <p className="form__error" role="alert">{errors.email}</p>
        )}

        <label className="form__label" htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          className={`form__input ${touched.password && errors.password ? "is-error" : ""}`}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="••••••••"
          autoComplete="current-password"
        />
        {touched.password && errors.password && (
          <p className="form__error" role="alert">{errors.password}</p>
        )}

        {serverError && (
          <div className="form__server-error" role="alert">{serverError}</div>
        )}

        <button
          className="btn btn--primary"
          type="submit"
          disabled={!isValid || submitting}
          aria-busy={submitting}
        >
          {submitting ? "Signing in…" : "Sign in"}
        </button>

        <p className="form__hint">
          Don’t have an account? <Link to="#">Start free</Link>
        </p>
      </form>
    </section>
  );
}
