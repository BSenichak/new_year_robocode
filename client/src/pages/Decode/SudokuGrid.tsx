import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { setChosenCell } from "../../store/sudokuSlice";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

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
    const correct =
        useSelector<RootState, RootState["sudoku"]["correctCount"]>(
            (state) => state.sudoku.correctCount
        ) == 81;
    return (
        <div
            style={{
                display: "inline-block",
                border: "2px solid black",
                position: "relative",
            }}
        >
            {correct && (
                <Blocker>
                    <Typography variant="h4" textAlign="center">
                        Розшифровано
                    </Typography>
                </Blocker>
            )}
            {Array.from({ length: 9 }).map((_, row) => (
                <div key={row} style={{ display: "flex" }}>
                    {Array.from({ length: 9 }).map((_, col) => {
                        const value = cells[row * 9 + col];
                        const playerValue = playerAnswers[row * 9 + col];

                        const borderTop =
                            row % 3 === 0
                                ? "2px solid black"
                                : "1px solid black";
                        const borderLeft =
                            col % 3 === 0
                                ? "2px solid black"
                                : "1px solid black";
                        const borderRight =
                            col === 8 ? "2px solid black" : "1px solid black";
                        const borderBottom =
                            row === 8 ? "2px solid black" : "1px solid black";

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
                                    backgroundColor:
                                        value === 0
                                            ? chosenCell?.row === row &&
                                              chosenCell?.col === col
                                                ? "#5f5e5e"
                                                : "#fff"
                                            : "#ccc",
                                    color: value === 0 ? "#000" : "#333",
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
        </div>
    );
};

let Blocker = styled.div`
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default SudokuGrid;
