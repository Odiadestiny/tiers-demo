import React from "react";
import ReactDOM from "react-dom/client";
import { TierProvider } from "./tier/TierContext.jsx";
import App from "./App.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TierProvider initialTier="free">
      <App />
    </TierProvider>
  </React.StrictMode>
);
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App.jsx";
// import "./styles.css";
// import { AuthProvider } from "./auth/AuthContext"; // ← add

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthProvider>   {/* ← wrap app */}
//         <App />
//       </AuthProvider>
//     </BrowserRouter>
//   </React.StrictMode>
// );
