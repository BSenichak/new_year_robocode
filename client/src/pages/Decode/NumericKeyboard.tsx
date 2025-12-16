import React, { useEffect } from "react";
import { Box, Button as MuiButton, alpha } from "@mui/material";
import { BackspaceOutlined } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { setChosenCellValue } from "../../store/sudokuSlice";
import styled from "@emotion/styled";

export const NumericKeyboard: React.FC<{ gap?: number }> = () => {
    const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const dispatch = useDispatch<AppDispatch>();
    const chosenCell = useSelector<
        RootState,
        RootState["sudoku"]["chosenCell"]
    >((state) => state.sudoku.chosenCell);

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

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!chosenCell) return;

            if (e.key >= "1" && e.key <= "9") {
                handleKeyPress(e.key);
            } else if (e.key === "0" || e.key === "Backspace") {
                handleKeyPress("0"); 
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [chosenCell]);

    return (
        <Wrapper>
            <Grid>
                {keys.map((k) => (
                    <Button
                        key={k}
                        variant="outlined"
                        disableElevation
                        onClick={() => handleKeyPress(k)}
                        color="inherit"
                        sx={{
                            "&:hover": {
                                borderWidth: 0.1,
                                background: "rgba(22, 70, 255, 1)",
                            },
                        }}
                    >
                        {k}
                    </Button>
                ))}
                <Button
                    onClick={() => handleKeyPress("0")}
                    color="inherit"
                    sx={{ gridColumn: "span 3","&:hover": {
                            borderWidth: 0.1, 
                            background: "rgba(217, 41, 63, 1)"
                        }, }}
                    variant="outlined"
                    startIcon={<BackspaceOutlined />}
                >
                    Видалити
                </Button>
            </Grid>
        </Wrapper>
    );
};

const Grid = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 0.5rem;
`;

const Button = styled(MuiButton)`
    padding: 1rem;
    border: 1px solid ${({ theme }: any) => alpha(theme.palette.grey[300], 0.5)};
    font-size: 1.2rem;
`;

const Wrapper = styled(Box)`
    max-width: 280px;
    @media (max-width: 1099px) {
        grid-row: 2;
        grid-column: 2;
    }
    @media (max-width: 639px) {
        grid-column: 1;
        grid-row: 3;
    }
`;
