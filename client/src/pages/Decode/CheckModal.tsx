import {
    Dialog,
    DialogActions,
    DialogContent,
    Button,
    IconButton,
    Typography,
    alpha,
    useTheme,
    CircularProgress,
    useMediaQuery,
    Box,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { clearCorrectCount, getSudoku } from "../../store/sudokuSlice";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import LoginButton from "../../components/LoginButton";
import { useEffect, useState } from "react";
import { victory } from "../../store/resultsSlice";
import ShareModal from "../Progress/ShareModal";

export default function CheckModal({ isOpen, closeModal }: any) {
    const dispatch = useDispatch<AppDispatch>();
    const theme = useTheme();
    const correct =
        useSelector<RootState, RootState["sudoku"]["correctCount"]>(
            (state) => state.sudoku.correctCount
        ) == 81;
    let difficulties = ["easy", "medium", "hard"];
    let difficulty = useSelector<RootState, RootState["sudoku"]["difficulty"]>(
        (state) => state.sudoku.difficulty
    );
    let progress: any = useSelector<
        RootState,
        RootState["results"]["progress"]
    >((state) => state.results.progress);
    let loading = useSelector<RootState, RootState["results"]["loading"]>(
        (state) => state.results.loading
    );
    let user = useSelector<RootState, RootState["auth"]["user"]>(
        (state) => state.auth.user
    );
    // remove automatic victory dispatch; require captcha verification first
    const [victorySent, setVictorySent] = useState(false);
    const [captchaLoading, setCaptchaLoading] = useState(false);
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY as string | undefined;

    async function loadRecaptcha(): Promise<void> {
        if (!(window as any).grecaptcha) {
            return new Promise<void>((resolve, reject) => {
                const s = document.createElement("script");
                s.src = "https://www.google.com/recaptcha/api.js";
                s.async = true;
                s.onload = () => resolve();
                s.onerror = () => reject(new Error("recaptcha load error"));
                document.head.appendChild(s);
            });
        }
    }

    function runRecaptcha(): Promise<string> {
        if (!siteKey) {
            return Promise.reject(new Error("reCAPTCHA site key not configured"));
        }
        return new Promise<string>((resolve, reject) => {
            loadRecaptcha()
                .then(() => {
                    (window as any).grecaptcha.render("recaptcha-container", {
                        sitekey: siteKey,
                        callback: onRecaptchaSuccess,
                    });
                })
                .catch(reject);
        });
    }

    function onRecaptchaSuccess(token: string) {
        setCaptchaToken(token);
    }

    async function ensureVictoryThen(cb?: () => void) {
        if (victorySent) {
            cb?.();
            return;
        }
        if (!user) {
            // not logged in — victory handled elsewhere or not applicable
            setVictorySent(true);
            dispatch(victory());
            cb?.();
            return;
        }
        if (captchaToken) {
            // captcha already verified
            dispatch(victory());
            setVictorySent(true);
            cb?.();
            return;
        }
        // captcha not yet verified — render it
        setCaptchaLoading(true);
        try {
            await runRecaptcha();
            // wait for onRecaptchaSuccess callback to set captchaToken
        } catch (err) {
            console.error("reCAPTCHA error:", err);
            setCaptchaLoading(false);
        }
    }

    // trigger victory after captcha token is set
    useEffect(() => {
        if (captchaToken && victorySent === false && user) {
            dispatch(victory());
            setVictorySent(true);
            setCaptchaLoading(false);
        }
    }, [captchaToken, user, dispatch]);

    let [shareIsOpen, setShareIsOpen] = useState(false);
    let isPhone = useMediaQuery("(max-width: 639px)");
    if (correct)
        return (
            <Dialog
                open={isOpen}
                onClose={() => {
                    if (user && correct) {
                        // ensure victory already sent before fetching a new puzzle
                        ensureVictoryThen(() => dispatch(getSudoku()));
                    }
                    closeModal();
                    dispatch(clearCorrectCount());
                }}
                PaperProps={{
                    sx: {
                        borderRadius: "12px",
                        overflow: "hidden",
                        background: alpha(theme.palette.background.paper, 1),
                    },
                }}
            >
                {loading ? (
                    <DialogContent
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            p: 4,
                        }}
                    >
                        <CircularProgress />
                    </DialogContent>
                ) : (
                    <>
                        <DialogContent
                            sx={{
                                p: 2,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 1,
                                position: "relative",
                            }}
                        >
                            <IconButton
                                sx={{ position: "absolute", top: 6, right: 6 }}
                                onClick={() => {
                                    if (user && correct) {
                                        ensureVictoryThen(() => dispatch(getSudoku()));
                                    }
                                    closeModal();
                                }}
                            >
                                <Close sx={{ color: "white" }} />
                            </IconButton>
                            <img src="./unlock.png" alt="" height="160px" />
                            <Typography variant="h5" color="success">
                                Вітаємо!
                            </Typography>
                            {captchaLoading && (
                                <Box
                                    sx={{
                                        my: 2,
                                        p: 2,
                                        border: "1px solid rgba(255,255,255,0.2)",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <div id="recaptcha-container" />
                                </Box>
                            )}
                            {user ? (
                                <>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        textAlign="center"
                                    >
                                        Файл розшифровано і ти маєш +
                                        {difficulties.indexOf(difficulty) + 1}{" "}
                                        ба
                                        {difficulties.indexOf(difficulty) +
                                            1 ===
                                        1
                                            ? "л"
                                            : "ли"}
                                        ! Місія продовжується!
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                    >
                                        Твої бали за це судоку:{" "}
                                        <Typography
                                            variant="body1"
                                            color="success"
                                            component={"span"}
                                        >
                                            +
                                            {difficulties.indexOf(difficulty) +
                                                1}
                                        </Typography>
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                    >
                                        Твій загальний прогрес:{" "}
                                        <Typography
                                            variant="body1"
                                            color="success"
                                            component={"span"}
                                        >
                                            {progress.decode_count} розкодовок
                                        </Typography>
                                    </Typography>
                                </>
                            ) : (
                                <>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                    >
                                        Файл розшифровано і ти зможеш отримати
                                        +1 бал якщо авторизуєшся!
                                    </Typography>
                                </>
                            )}
                        </DialogContent>

                        <DialogActions
                            sx={{
                                p: 2,
                                justifyContent: "center",
                                "@media (max-width: 600px)": {
                                    flexDirection: "column",
                                    "& > button": {
                                        marginLeft: "0 !important",
                                    },
                                },
                                gap: 1,
                            }}
                        >
                            {user ? (
                                <>
                                    <ShareModal
                                        isOpen={shareIsOpen}
                                        closeModal={() => setShareIsOpen(false)}
                                    />
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        onClick={() =>
                                            ensureVictoryThen(() =>
                                                setShareIsOpen(true)
                                            )
                                        }
                                        sx={{
                                            "&:hover": {
                                                borderWidth: 0.1,
                                                background:
                                                    "rgba(147, 50, 214, 1)",
                                            },
                                        }}
                                        fullWidth={isPhone}
                                    >
                                        Поділитись результатом
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() =>
                                            ensureVictoryThen(() => {
                                                dispatch(getSudoku());
                                                closeModal();
                                            })
                                        }
                                        fullWidth={isPhone}
                                    >
                                        {captchaLoading ? (
                                            <CircularProgress size={20} />
                                        ) : (
                                            "Наступний файл"
                                        )}
                                    </Button>
                                </>
                            ) : (
                                <LoginButton fullWidth />
                            )}
                        </DialogActions>
                    </>
                )}
            </Dialog>
        );
    return (
        <Dialog
            open={isOpen}
            onClose={closeModal}
            PaperProps={{
                sx: {
                    borderRadius: "24px",
                    overflow: "hidden",
                    background: "rgba(30, 30, 42, 1)",
                },
            }}
        >
            <DialogContent
                sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1,
                    position: "relative",
                }}
            >
                <IconButton
                    sx={{ position: "absolute", top: 6, right: 6 }}
                    onClick={() => {
                        if (user && correct) {
                            ensureVictoryThen(() => dispatch(getSudoku()));
                        }
                        closeModal();
                    }}
                >
                    <Close sx={{ color: "white" }} />
                </IconButton>
                <img src="./lock2.png" alt="" height="160px" />
                <Typography variant="h5" color="error">
                    Файл не розшифровано!
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Повернися, та дорозшифруй файл, або почни з наступного
                </Typography>
            </DialogContent>

            <DialogActions
                sx={{
                    p: 2,
                    justifyContent: "center",
                    "@media (max-width: 600px)": {
                        flexDirection: "column",
                        "& > button": {
                            marginLeft: "0 !important",
                        },
                    },
                    gap: 1,
                }}
            >
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => ensureVictoryThen(() => dispatch(getSudoku()))}
                    fullWidth={isPhone}
                    sx={{
                        "&:hover": {
                            borderWidth: 0.1,
                            background: "rgba(147, 50, 214, 1)",
                        },
                    }}
                >
                    Спробувати інший файл
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={closeModal}
                    fullWidth={isPhone}
                >
                    Повернутися та завершити
                </Button>
            </DialogActions>
        </Dialog>
    );
}
