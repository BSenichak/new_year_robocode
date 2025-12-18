import {
    Box,
    Button,
    styled,
    useTheme,
    alpha,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { getSudoku, setDifficulty } from "../../store/sudokuSlice";
import { useState } from "react";
import { Close } from "@mui/icons-material";

const ButtonComponent = ({
    variant,
    children,
    onClick,
    difficulty,
}: {
    variant: "contained" | "outlined";
    children: React.ReactNode;
    onClick: () => void;
    difficulty: string;
}) => {
    const theme = useTheme();

    const colorMap: Record<string, string> = {
        easy: theme.palette.success.main,
        medium: theme.palette.warning.main,
        hard: theme.palette.error.main,
    };

    const mainColor = colorMap[difficulty] ?? "#fff";

    return (
        <Button
            variant={variant}
            sx={{
                flexGrow: 1,
                background: variant === "contained" ? mainColor : "none",
                border:
                    variant === "contained"
                        ? `1px solid ${mainColor}`
                        : `1px solid rgba(255, 255, 255, 0.1)`,
                color:
                    variant === "contained"
                        ? theme.palette.getContrastText(mainColor)
                        : "#fff",
                fontWeight: "300",
                transition: "0.2s",

                "&:hover": {
                    background:
                        variant === "contained"
                            ? mainColor
                            : alpha(mainColor, 0.3),
                    border:
                        variant === "contained"
                            ? `1px solid ${mainColor}`
                            : `1px solid ${alpha(mainColor, 0.5)}`,
                },
            }}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

export default function DifficultySelector() {
    const dispatch = useDispatch<AppDispatch>();
    const difficulty = useSelector<
        RootState,
        RootState["sudoku"]["difficulty"]
    >((state) => state.sudoku.difficulty);

    let [chosen, setChosen] = useState<string | null>(null);

    const theme = useTheme();
    return (
        <Wrapper>
            <ButtonComponent
                difficulty={"easy"}
                variant={difficulty === "easy" ? "contained" : "outlined"}
                onClick={() => setChosen("easy")}
            >
                Легкий (1 бал)
            </ButtonComponent>
            <ButtonComponent
                difficulty={"medium"}
                variant={difficulty === "medium" ? "contained" : "outlined"}
                onClick={() => setChosen("medium")}
            >
                Середній (2 бали)
            </ButtonComponent>
            <ButtonComponent
                difficulty={"hard"}
                variant={difficulty === "hard" ? "contained" : "outlined"}
                onClick={() => setChosen("hard")}
            >
                Складний (3 бали)
            </ButtonComponent>
            <Dialog
                open={!!chosen}
                onClose={() => setChosen(null)}
                PaperProps={{
                    sx: {
                        borderRadius: "12px",
                        overflow: "hidden",
                        background: alpha(theme.palette.background.paper, 1),
                    },
                }}
            >
                <DialogTitle sx={{ position: "relative", p: 2 }}>
                    Спробувати інший файл
                    <IconButton
                        sx={{ position: "absolute", top: 6, right: 6 }}
                        onClick={() => setChosen(null)}
                    >
                        <Close sx={{ color: "white" }} />
                    </IconButton>
                </DialogTitle>

                <DialogContent sx={{ p: 2 }}>
                    <Typography variant="body1" color="text.secondary">
                        Ви впевнені, що хочете розпочати дешифровку іншого
                        файлу? Увесь Ваш поточний прогрес буде втрачено!
                    </Typography>
                </DialogContent>

                <DialogActions sx={{ p: 2 }}>
                    <Button
                        variant="outlined"
                        color="inherit"
                        onClick={() => setChosen(null)}
                    >
                        Повернутись назад
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            dispatch(setDifficulty(chosen));
                            dispatch(getSudoku());
                            setChosen(null);
                        }}
                    >
                        Спробувати інший файл
                    </Button>
                </DialogActions>
            </Dialog>
        </Wrapper>
    );
}

let Wrapper = styled(Box)`
    display: flex;
    gap: 1rem;
    align-self: stretch;
    padding: 1rem 0;
`;
