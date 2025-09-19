// quick-server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/auth/login", (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password || password.length < 6) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  return res.json({ token: "demo-token-123", email });
});

app.get("/secure/hello", (req, res) => {
  const auth = req.headers.authorization || "";
  if (!auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Missing token" });
  }
  return res.json({ message: "Hello, Destiny! This is protected data." });
});

app.listen(3000, () => console.log("Mock API on http://localhost:3000"));
