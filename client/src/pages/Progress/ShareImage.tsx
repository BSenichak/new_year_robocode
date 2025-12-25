import { Box, Chip, Typography, useTheme } from "@mui/material";

export default function ShareImage({ progress }: { progress: number }) {
    const theme = useTheme();
    return (
        <Box
            id="share-image"
            sx={{
                maxWidth: 400,
                width: "100%",
                borderRadius: "20px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: `linear-gradient(120deg,${theme.palette.primary.main},${theme.palette.secondary.main})`,
                color: "white",
                p: 4,
                margin: "auto",
            }}
        >
            <Box sx={{ mb: 3, fontSize: "4rem" }}>🎄</Box>

            <Typography variant="h4" sx={{ textAlign: "center" }}>
                Набрав {progress} очок
            </Typography>

            <Typography variant="body2">у Різдвяній місії Robocode</Typography>

            <Typography
                variant="body2"
                sx={{ mt: 2, color: theme.palette.text.secondary }}
            >
                Хочеш теж спробувати?
            </Typography>

            <Chip
                label="* для топ-3 призи"
                sx={{
                    mt: 1,
                    background: "rgba(255, 255, 255, 0.5)",
                    color: "black",
                    px: 2,
                }}
            />
        </Box>
    );
}
