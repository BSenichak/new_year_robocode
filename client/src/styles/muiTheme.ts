
import { createTheme, type Theme } from "@mui/material";

const theme: Theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#228c22", // зелений
        },
        secondary: {
            main: "#d2691e", // коричнево-оранжевий
        },
        error: {
            main: "#ff0000", // червоний
        },
        background: {
            default: "#006600", // темно-зелений
            paper: "#8b4513", // коричневий
        },
        text: {
            primary: "#ffffff",
            secondary: "#e0e0e0",
        },
    },
    typography: {
        fontFamily: "'Roboto', 'Arial', sans-serif",
        button: {
            fontWeight: 600,
            textTransform: "none",
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    padding: "8px 16px",
                },
            },
        },
    },
});

export default theme;

