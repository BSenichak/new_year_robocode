import { createTheme, type Theme } from "@mui/material";

const theme: Theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: "#1b5e20",
        },
        secondary: {
            main: "#ff9800",
        },
        background: {
            default: "#004d00",
            paper: "#1b5e20",
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
