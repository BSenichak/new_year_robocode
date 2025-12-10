import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { setChosenCell } from "../../store/sudokuSlice";
import styled from "@emotion/styled";
import {  useTheme, alpha } from "@mui/material";

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

    let theme = useTheme();
    return (
        <Wrapper>
            {Array.from({ length: 9 }).map((_, row) => (
                <div key={row} style={{ display: "flex" }}>
                    {Array.from({ length: 9 }).map((_, col) => {
                        const value = cells[row * 9 + col];
                        const playerValue = playerAnswers[row * 9 + col];

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
                                    backgroundColor:
                                        value === 0
                                            ? chosenCell?.row === row &&
                                              chosenCell?.col === col
                                                ? alpha(
                                                      theme.palette.primary
                                                          .main,
                                                      0.5
                                                  )
                                                : theme.palette.background
                                                      .default
                                            : "#2A2A3A",
                                    color:
                                        value === 0
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
