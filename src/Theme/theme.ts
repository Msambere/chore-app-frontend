import {
  createTheme,
  PaletteOptions,
  responsiveFontSizes,
} from "@mui/material/styles";
import { PaletteColorOptions, PaletteMode } from "@mui/material";
declare module "@mui/material/styles" {
  interface Palette {
    frosted: PaletteColorOptions;
  }
  interface PaletteOptions {
    frosted?: PaletteColorOptions;
  }
}

export function makeAppTheme(mode: PaletteMode) {
  const lightPalette: PaletteOptions = {
    mode: "light",
    primary: { main: "#4d84f2", light: "#79a7ff", dark: "#0052cc" },
    secondary: { main: "#ff95c5", light: "#ffb8d9", dark: "#ff6699" },
    grey: { 500: "#64748b" },
    background: {
      default: "#f7fafc",
      paper: "#ffffff",
    },
    success: { main: "#a8fabf", light: "#A8FABFFF", dark: "#84a5ad" },
    text: { primary: "#1e293b", secondary: "#64748b" },
  };

  const darkPalette: PaletteOptions = {
    mode: "dark",
    primary: { main: "#4d84f2" },
    secondary: { main: "#ff95c5" },
    grey: { 500: "#64748b" },
    success: { main: "#64748b", light: "#3A5943FF", dark: "#3b4754" },
    background: {
      default: "#1e293b",
      paper: "#2d3748",
    },
    text: { primary: "#f1f5f9", secondary: "#cbd5e1" },
  };

  const baseTheme = createTheme({
    palette: mode === "light" ? lightPalette : darkPalette,
    typography: {
      fontFamily: ["'Roboto'", "sans-serif"].join(","),
      h1: { fontSize: "2rem", fontWeight: 700 },
      h2: { fontSize: "1.75rem", fontWeight: 600 },
      body1: { fontSize: "1rem", fontWeight: 400 },
      button: { textTransform: "none", fontWeight: 600 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            padding: "8px 16px",
            borderRadius: 8,
            textTransform: "none",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            padding: 16,
            boxShadow:
              mode === "light"
                ? "0px 4px 12px rgba(0,0,0,0.1)"
                : "0px 4px 12px rgba(0,0,0,0.4)",
          },
        },
      },
    },
  });

  return responsiveFontSizes(baseTheme);
}
