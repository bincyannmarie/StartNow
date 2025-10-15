import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ErrorBoundary from "./components/ErrorBoundary";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
      {/* ✅ Toast notification system */}
      <Toaster position="top-right" reverseOrder={false} />
    </ErrorBoundary>
  </StrictMode>
);
