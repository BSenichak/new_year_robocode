import { Box, Chip, Typography, useTheme } from "@mui/material";

export default function ShareImage({ progress }: { progress: number }) {
    let theme = useTheme();
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
            }}
        >
            <Typography variant="h2" fontSize={"5rem"} sx={{ mb: 2 }}>
                🎄
            </Typography>

            <Typography variant="h2" sx={{ textAlign: "center" }}>
                Набрав {progress} очок
            </Typography>

            <Typography variant="body2" sx={{}}>
                у Різдвяній місії Robocode
            </Typography>
            <Typography
                variant="body2"
                sx={{ mt: 2, color: theme.palette.text.secondary, p: 0 }}
            >
                Хочеш теж спробувати?
            </Typography>
            <Chip
                label="* для топ-3 призи"
                variant="filled"
                sx={{
                    mt: 1,
                    background: "rgba(255, 255, 255, 0.5)",
                    color: "black",
                    pl: 2,
                    pr: 2,
                    height: "auto",
                }}
            />
        </Box>
    );
}
