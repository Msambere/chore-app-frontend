import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "~/App";
import AppTheme from "~/Theme/AppTheme";
import { CssBaseline } from "@mui/material";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssBaseline>
      <AppTheme>
        <App />
      </AppTheme>
    </CssBaseline>
  </StrictMode>,
);
