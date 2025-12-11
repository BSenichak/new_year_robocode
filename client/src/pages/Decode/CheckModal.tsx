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
    let progress: any = useSelector<RootState, RootState["results"]["progress"]>(
        (state) => state.results.progress
    );
    let loading = useSelector<RootState, RootState["results"]["loading"]>(
        (state) => state.results.loading
    );
    let user = useSelector<RootState, RootState["auth"]["user"]>(
        (state) => state.auth.user
    );
    useEffect(() => {
        if (correct && user && isOpen) {
            dispatch(victory());
        }
    }, [correct, user, isOpen]);
    let [shareIsOpen, setShareIsOpen] = useState(false);

    if (correct)
        return (
            <Dialog
                open={isOpen}
                onClose={() => {
                    if (user && correct) {
                        dispatch(getSudoku());
                    }
                    closeModal();
                    dispatch(clearCorrectCount());
                }}
                hideBackdrop
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
                                        dispatch(getSudoku());
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
                            {user ? (
                                <>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        textAlign="center"
                                    >
                                        Файл розшифровано і ти маєш +{difficulties.indexOf(difficulty) + 1} ба{difficulties.indexOf(difficulty) + 1 === 1 ? "л" : "ли"}!
                                        Місія продовжується!
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
                                            {progress.decode_count} { " "}
                                            розкодовок
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

                        <DialogActions sx={{ p: 2, justifyContent: "center" }}>
                            {user ? (
                                <>
                                <ShareModal
                                    isOpen={shareIsOpen}
                                    closeModal={() => setShareIsOpen(false)}
                                />
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        onClick={() => setShareIsOpen(true)}
                                    >
                                        Поділитись результатом
                                    </Button>

                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={() => {
                                            dispatch(getSudoku());
                                            closeModal();
                                        }}
                                    >
                                        Наступний файл
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
            hideBackdrop
            PaperProps={{
                sx: {
                    borderRadius: "12px",
                    overflow: "hidden",
                    background: alpha(theme.palette.background.paper, 1),
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
                            dispatch(getSudoku());
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

            <DialogActions sx={{ p: 2, justifyContent: "center" }}>
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => dispatch(getSudoku())}
                >
                    Спробувати інший файл
                </Button>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={closeModal}
                >
                    Повернутися та завершити
                </Button>
            </DialogActions>
        </Dialog>
    );
}
