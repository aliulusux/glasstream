import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SupabaseProvider } from "./context/SupabaseProvider";
import { ToastProvider } from "./context/ToastContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SupabaseProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </SupabaseProvider>
  </React.StrictMode>
);
