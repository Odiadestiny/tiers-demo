import React from "react";
import TierSwitcher from "./components/TierSwitcher";
import ProtectedPanels from "./components/ProtectedPanels";

export default function App() {
  return (
    <div className="container">
      <header>
        <h1>Account Tiers Demo</h1>
        <p>Guest · Free · Startup · Professional</p>
      </header>

      <TierSwitcher />

      <section className="grid">
        <ProtectedPanels />
      </section>
    </div>
  );
}
// import React from "react";
// import { Routes, Route, Link } from "react-router-dom";
// import LoginForm from "./auth/LoginForm";
// import ProtectedPage from "./components/ProtectedPage";
// import RequireAuth from "./components/RequireAuth";

// export default function App() {
//   return (
//     <>
//       <header className="appbar">
//         <nav className="nav">
//           <Link to="/" className="nav__brand">MiniApp</Link>
//           <div className="nav__spacer" />
//           <Link to="/login" className="nav__link">Login</Link>
//           <Link to="/dashboard" className="nav__link">Dashboard</Link>
//         </nav>
//       </header>

//       <main className="container">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<LoginForm />} />
//           <Route
//             path="/dashboard"
//             element={
//               <RequireAuth>
//                 <ProtectedPage />
//               </RequireAuth>
//             }
//           />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </main>
//     </>
//   );
// }

// function Home() {
//   return (
//     <section className="card" style={{ maxWidth: 720, margin: "2rem auto" }}>
//       <h2 className="card__name">Welcome</h2>
//       <p className="card__bio">
//         Use the navigation to try the Login form and access a protected page.
//       </p>
//     </section>
//   );
// }

// function NotFound() {
//   return (
//     <section className="card" style={{ maxWidth: 720, margin: "2rem auto" }}>
//       <h2 className="card__name">Page not found</h2>
//       <p className="card__bio">
//         The page you’re looking for doesn’t exist.
//       </p>
//     </section>
//   );
// }
