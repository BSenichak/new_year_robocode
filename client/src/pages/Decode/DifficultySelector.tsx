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
}: {
    variant: "contained" | "outlined";
    children: React.ReactNode;
    onClick: () => void;
}) => {
    const theme = useTheme();
    return (
        <Button
            variant={variant}
            sx={{
                flexGrow: 1,
                background:
                    variant === "contained"
                        ? alpha(theme.palette.success.main, 0.2)
                        : "none",
                border:
                    variant === "contained"
                        ? `1px solid ${theme.palette.success.main}`
                        : `1px solid ${theme.palette.primary.main}`,
                color:
                    variant === "contained"
                        ? theme.palette.success.main
                        : theme.palette.primary.main,
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
                variant={difficulty === "easy" ? "contained" : "outlined"}
                onClick={() => setChosen("easy")}
            >
                Легкий (1 бал)
            </ButtonComponent>
            <ButtonComponent
                variant={difficulty === "medium" ? "contained" : "outlined"}
                onClick={() => setChosen("medium")}
            >
                Середній (2 бали)
            </ButtonComponent>
            <ButtonComponent
                variant={difficulty === "hard" ? "contained" : "outlined"}
                onClick={() => setChosen("hard")}
            >
                Складний (3 бали)
            </ButtonComponent>
            <Dialog
                open={!!chosen}
                onClose={() => setChosen(null)}
                hideBackdrop
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
