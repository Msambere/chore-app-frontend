import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "~/App";
import AppTheme from "~/Theme/AppTheme";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppTheme>
      <App />
    </AppTheme>
  </StrictMode>,
);
