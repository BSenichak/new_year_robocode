import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import {
    clearValues,
    getSudoku,
    setChosenCellValue,
} from "../../store/sudokuSlice";

export const NumericKeyboard: React.FC<{ gap?: number }> = ({ gap = 2 }) => {
    const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const dispatch = useDispatch<AppDispatch>();
    const chosenCell = useSelector<
        RootState,
        RootState["sudoku"]["chosenCell"]
    >((state) => state.sudoku.chosenCell);
    const correct =
        useSelector<RootState, RootState["sudoku"]["correctCount"]>(
            (state) => state.sudoku.correctCount
        ) == 81;

    // Клавіші блоковані, якщо не обрана комірка
    const disabled = !chosenCell || correct;

    const handleKeyPress = (key: string) => {
        if (!chosenCell) return;
        dispatch(
            setChosenCellValue({
                row: chosenCell.row,
                col: chosenCell.col,
                value: key,
            })
        );
    };

    return (
        <Box
            sx={{
                width: 280,
                mx: "auto",
                p: 2,
                borderRadius: 2,
                bgcolor: "#228B22",
            }}
        >
            <Grid container spacing={gap} justifyContent="center">
                {keys.map((k) => (
                    <Grid
                        key={k}
                        sx={{ display: "flex", justifyContent: "center" }}
                    >
                        <Button
                            variant="contained"
                            disableElevation
                            disabled={disabled}
                            onClick={() => handleKeyPress(k)}
                            sx={{
                                width: 64,
                                height: 64,
                                minWidth: 0,
                                borderRadius: 2.5,
                                bgcolor: "#D2691E",
                                color: "#fff",
                                fontSize: "1.25rem",
                                fontWeight: 600,
                                "&:hover": { bgcolor: "#c4621c" },
                                "&:active": { bgcolor: "#b7591a" },
                                "&:focus-visible": {
                                    outline: "3px solid rgba(255,255,255,0.6)",
                                    outlineOffset: 2,
                                },
                            }}
                        >
                            {k}
                        </Button>
                    </Grid>
                ))}

                <Grid sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton
                        disabled={disabled}
                        onClick={() => handleKeyPress("0")}
                        aria-label="Backspace"
                        sx={{
                            width: 64,
                            height: 64,
                            borderRadius: 2.5,
                            bgcolor: "#D2691E",
                            color: "#fff",
                            "&:hover": { bgcolor: "#c4621c" },
                            "&:active": { bgcolor: "#b7591a" },
                            "& .MuiSvgIcon-root": { fontSize: 28 },
                            "&:focus-visible": {
                                outline: "3px solid rgba(255,255,255,0.6)",
                                outlineOffset: 2,
                            },
                        }}
                    >
                        <BackspaceOutlinedIcon />
                    </IconButton>
                </Grid>
            </Grid>

            <Button
                variant="contained"
                color="secondary"
                disabled={disabled}
                onClick={() => dispatch(clearValues())}
                sx={{ m: 2 }}
            >
                Розпочати дешифровку заново
            </Button>
            <Button
                variant="contained"
                color="secondary"
                disabled={disabled}
                onClick={() => {
                    dispatch(clearValues());
                    dispatch(getSudoku("easy"));
                }}
                sx={{ m: 2 }}
            >
                Спробувати дешифрувати інший файл
            </Button>
        </Box>
    );
};
