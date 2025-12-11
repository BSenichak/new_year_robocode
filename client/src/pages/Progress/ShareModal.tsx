import {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Button,
    IconButton,
    Typography,
    Snackbar,
    Alert,
    alpha,
    useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "../../store/store";
import ShareImage from "./ShareImage";
import * as htmlToImage from "html-to-image";

export default function ShareModal({ isOpen, closeModal }: any) {
    const theme = useTheme();
    const [snackbar, setSnackbar] = useState<string | null>(null);

    let progress: any = useSelector<
        RootState,
        RootState["results"]["progress"]
    >((state) => state.results.progress);

    async function downloadImage() {
        const node = document.getElementById("share-image");
        if (!node) return;

        const dataUrl = await htmlToImage.toPng(node, { pixelRatio: 3 });
        const link = document.createElement("a");
        link.download = "robocode-share.png";
        link.href = dataUrl;
        link.click();

        setSnackbar("Зображення успішно завантажено!");
    }

    async function shareToInstagram() {
        const node = document.getElementById("share-image");
        if (!node) return;

        try {
            const blob = await htmlToImage.toBlob(node, { pixelRatio: 3 });
            if (!blob) throw new Error("Помилка при генерації зображення");

            const file = new File([blob], "robocode.png", {
                type: "image/png",
            });

            if (navigator.share && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: "Мій результат",
                    text: "Подивись мій результат у Robocode!",
                });
            } else {
                setSnackbar("Ваш браузер не підтримує пряме поширення.");
            }
        } catch {
            setSnackbar("Сталася помилка під час поширення.");
        }
    }

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={closeModal}
                PaperProps={{
                    sx: {
                        borderRadius: "12px",
                        overflow: "hidden",
                        background: alpha(theme.palette.background.paper, 1),
                    },
                }}
            >
                <DialogTitle sx={{ position: "relative", p: 2 }}>
                    Поділитися в Instagram
                    <IconButton
                        sx={{ position: "absolute", top: 6, right: 6 }}
                        onClick={closeModal}
                    >
                        <Close sx={{ color: "white" }} />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ p: 2 }}>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ py: 1 }}
                    >
                        Збережіть картинку або поділіться нею у сторіз!
                    </Typography>
                    <ShareImage
                        progress={
                            progress.ease +
                            progress.middle * 2 +
                            progress.hard * 3
                        }
                    />
                </DialogContent>

                <DialogActions sx={{ p: 2, display: "flex", gap: 1 }}>
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={shareToInstagram}
                        sx={{
                            "&:hover": {
                                borderWidth: 0.1,
                                background: "rgba(147, 50, 214, 1)",
                            },
                        }}
                    >
                        Посилання для друзів
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={downloadImage}
                    >
                        Завантажити картинку
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={!!snackbar}
                autoHideDuration={3000}
                onClose={() => setSnackbar(null)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    severity="info"
                    variant="filled"
                    onClose={() => setSnackbar(null)}
                >
                    {snackbar}
                </Alert>
            </Snackbar>
        </>
    );
}
