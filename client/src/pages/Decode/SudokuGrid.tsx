import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { setChosenCell } from "../../store/sudokuSlice";
import styled from "@emotion/styled";
import { useTheme, alpha } from "@mui/material";

type Props = {
    puzzle: string;
};

const SudokuGrid: React.FC<Props> = ({ puzzle }) => {
    const cells = puzzle.split("").map((c) => Number(c));
    const dispatch = useDispatch<AppDispatch>();
    const chosenCell = useSelector<
        RootState,
        RootState["sudoku"]["chosenCell"]
    >((state) => state.sudoku.chosenCell);
    const playerAnswers = useSelector<
        RootState,
        RootState["sudoku"]["playerAnswers"]
    >((state) => state.sudoku.playerAnswers);

    let helpedCell = useSelector<RootState, RootState["sudoku"]["helpedCell"]>(
        (state) => state.sudoku.helpedCell
    );

    let theme = useTheme();
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!chosenCell) return;

            const { row, col } = chosenCell;

            let dir: { r: number; c: number } | null = null;

            if (e.key === "ArrowUp") dir = { r: -1, c: 0 };
            else if (e.key === "ArrowDown") dir = { r: 1, c: 0 };
            else if (e.key === "ArrowLeft") dir = { r: 0, c: -1 };
            else if (e.key === "ArrowRight") dir = { r: 0, c: 1 };
            else return;

            e.preventDefault();

            if (!dir) return;

            // Пошук наступної клітинки, яка є порожньою (value===0)
            let nextRow = row + dir.r;
            let nextCol = col + dir.c;

            const isEmpty = (r: number, c: number) => {
                const v = cells[r * 9 + c];
                return v === 0;
            };

            while (
                nextRow >= 0 &&
                nextRow <= 8 &&
                nextCol >= 0 &&
                nextCol <= 8
            ) {
                if (isEmpty(nextRow, nextCol)) {
                    dispatch(setChosenCell({ row: nextRow, col: nextCol }));
                    return;
                }

                nextRow += dir.r;
                nextCol += dir.c;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [chosenCell, cells, dispatch]);

    return (
        <Wrapper>
            {Array.from({ length: 9 }).map((_, row) => (
                <div key={row} style={{ display: "flex" }}>
                    {Array.from({ length: 9 }).map((_, col) => {
                        const value = cells[row * 9 + col];
                        const playerValue = playerAnswers[row * 9 + col];

                        const isHelped =
                            helpedCell?.row === row && helpedCell?.col === col;

                        const borderTop =
                            row === 0
                                ? "none"
                                : row % 3 === 0
                                ? "2px solid " + theme.palette.primary.main
                                : "none";

                        const borderLeft =
                            col === 0
                                ? "none"
                                : col % 3 === 0
                                ? "2px solid " + theme.palette.primary.main
                                : "none";

                        const borderRight =
                            col === 8
                                ? "none"
                                : (col + 1) % 3 === 0
                                ? "2px solid " + theme.palette.primary.main
                                : "none";

                        const borderBottom =
                            row === 8
                                ? "none"
                                : (row + 1) % 3 === 0
                                ? "2px solid " + theme.palette.primary.main
                                : "none";

                        let displayValue = "";
                        if (value !== 0) displayValue = String(value);
                        else if (playerValue && playerValue !== "0")
                            displayValue = playerValue;

                        return (
                            <div
                                key={col}
                                style={{
                                    width: 40,
                                    height: 40,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 20,
                                    flexShrink: 0,

                                    backgroundColor: isHelped
                                        ? alpha(theme.palette.success.main, 0.6)
                                        : value === 0
                                        ? chosenCell?.row === row &&
                                          chosenCell?.col === col
                                            ? "rgba(22, 70, 255, 0.3)"
                                            : "rgba(30, 30, 42, 1)"
                                        : "rgba(42, 42, 58, 1)",

                                    boxShadow:
                                        chosenCell?.row === row &&
                                        chosenCell?.col === col
                                            ? `inset 0 0 0 2px ${theme.palette.primary.main}`
                                            : "none",
                                    color: isHelped
                                        ? theme.palette.success.main
                                        : value === 0
                                        ? theme.palette.text.secondary
                                        : theme.palette.text.primary,

                                    borderTop,
                                    borderLeft,
                                    borderRight,
                                    borderBottom,
                                }}
                                onClick={() => {
                                    if (value === 0)
                                        dispatch(setChosenCell({ row, col }));
                                }}
                            >
                                {displayValue}
                            </div>
                        );
                    })}
                </div>
            ))}
        </Wrapper>
    );
};

let Wrapper = styled.div`
    display: inline-block;
    border: 2px solid black;
    position: relative;
    border: 3px solid ${({ theme }: any) => theme.palette.primary.main};
    border-radius: 1rem;
    overflow: hidden;
    width: fit-content;
    @media (max-width: 1099px) {
        grid-row: 1;
        grid-column: 2;
    }
    @media (max-width: 639px) {
        grid-column: 1;
        grid-row: 2;
    }
`;

export default SudokuGrid;
