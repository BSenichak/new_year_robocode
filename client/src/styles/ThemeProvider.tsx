import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material";
import React from "react";

const appTheme = createTheme({
  palette: {
    primary: {
      main: "rgba(22, 70, 255, 1)",
      light: "rgba(157, 157, 255, 1)",
      dark: "rgba(21, 52, 234, 1)",
    },
    secondary: {
      main: "rgba(169, 57, 255, 1)",
      light: "rgba(147, 50, 214, 1)",
      dark: "rgba(107, 70, 193, 1)",
    },
    error: {
      main: "rgba(254, 57, 78, 1)",
      light: "rgba(252, 129, 129, 1)",
      dark: "rgba(237, 40, 58, 1)",
    },
    warning: {
      main: "rgba(255, 121, 57, 1)",
      light: "rgba(246, 173, 85, 1)",
      dark: "rgba(255, 104, 32, 1)",
    },
    success: {
      main: "rgba(51, 249, 129, 1)",
      light: "rgba(51, 231, 129, 1)",
      dark: "rgba(72, 187, 120, 1)",
    },
    info: {
      main: "rgba(21, 115, 255, 1)",
      light: "rgba(157, 157, 255, 1)",
      dark: "rgba(22, 70, 255, 1)",
    },
    background: {
      default: "rgba(20, 20, 30, 1)",
      paper: "rgba(30, 29, 41, 0.5)",
    },
    text: {
      primary: "rgba(255, 255, 255, 1)",
      secondary: "#9D9DFF",
      disabled: "rgba(255, 255, 255, 0.65)",
    },
    divider: "rgba(255, 255, 255, 0.1)",
  },
  typography: {
    fontFamily: '"Inter", Helvetica, Arial, sans-serif',
    h1: {
      fontSize: "48px",
      fontWeight: 700,
      letterSpacing: "0px",
      lineHeight: "56px",
      fontStyle: "normal",
    },
    h2: {
      fontSize: "36px",
      fontWeight: 700,
      letterSpacing: "0px",
      lineHeight: "44px",
      fontStyle: "normal",
    },
    h3: {
      fontSize: "28px",
      fontWeight: 600,
      letterSpacing: "0px",
      lineHeight: "36px",
      fontStyle: "normal",
    },
    h4: {
      fontSize: "22px",
      fontWeight: 600,
      letterSpacing: "0px",
      lineHeight: "30px",
      fontStyle: "normal",
    },
    h5: {
      fontSize: "18px",
      fontWeight: 600,
      letterSpacing: "0px",
      lineHeight: "24px",
      fontStyle: "normal",
    },
    h6: {
      fontSize: "16px",
      fontWeight: 600,
      letterSpacing: "0px",
      lineHeight: "22px",
      fontStyle: "normal",
    },
    body1: {
      fontSize: "14px",
      fontWeight: 400,
      letterSpacing: "0px",
      lineHeight: "18px",
      fontStyle: "normal",
    },
    body2: {
      fontSize: "12px",
      fontWeight: 400,
      letterSpacing: "0px",
      lineHeight: "normal",
      fontStyle: "normal",
    },
    button: {
      fontSize: "14px",
      fontWeight: 700,
      letterSpacing: "0px",
      lineHeight: "18px",
      fontStyle: "normal",
      textTransform: "none",
    },
    caption: {
      fontSize: "12px",
      fontWeight: 400,
      letterSpacing: "0px",
      lineHeight: "normal",
      fontStyle: "normal",
    },
    overline: {
      fontSize: "12px",
      fontWeight: 400,
      letterSpacing: "0px",
      lineHeight: "normal",
      fontStyle: "normal",
      textTransform: "uppercase",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "10px",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "rgba(20, 20, 30, 1)",
          color: "rgba(255, 255, 255, 1)",
        },
      },
    },
  },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MuiThemeProvider theme={appTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
