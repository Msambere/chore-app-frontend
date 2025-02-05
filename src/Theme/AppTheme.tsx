import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline, responsiveFontSizes } from "@mui/material";
import { ReactNode, useMemo } from "react";

interface AppThemeProps {
  children: ReactNode;
}

function AppTheme({ children }: AppThemeProps) {
  const theme = useMemo(() => {
    const baseTheme = createTheme({
      palette: {
        mode: "light",
        primary: {
          main: "#3b82f6", // Tailwind blue-500
        },
        secondary: {
          main: "#f97316", // Orange accent
        },
        background: {
          default: "#f8f9fa", // Soft background color
          paper: "#ffffff", // Card background
        },
        text: {
          primary: "#1e293b", // Dark slate
          secondary: "#64748b", // Muted text
        },
      },
      typography: {
        fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
        h1: { fontSize: "2rem", fontWeight: 700 },
        h2: { fontSize: "1.75rem", fontWeight: 600 },
        body1: { fontSize: "1rem", fontWeight: 400 },
        button: { textTransform: "none", fontWeight: 600 },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: "12px",
              textTransform: "none",
              padding: "10px 16px",
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: "16px",
              padding: "16px",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
            },
          },
        },
      },
    });

    return responsiveFontSizes(baseTheme);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default AppTheme;
