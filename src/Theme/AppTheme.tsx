import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ReactNode, useMemo } from "react";

interface AppThemeProps {
  children: ReactNode;
}
function AppTheme({ children }: AppThemeProps) {
  const theme = useMemo(() => {
    return createTheme({
      defaultColorScheme: "light",
    });
  }, []);
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}

export default AppTheme;
