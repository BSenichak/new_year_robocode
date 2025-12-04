import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { getSudoku } from "../../store/sudokuSlice";
import SudokuGrid from "./SudokuGrid";
import { Box, CircularProgress, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { NumericKeyboard } from "./NumericKeyboard";
export default function Decode() {
    const dispatch = useDispatch<AppDispatch>();
    let sudoku: any = useSelector<RootState, RootState["sudoku"]["sudoku"]>(
        (state: RootState) => state.sudoku.sudoku
    );
    let loading: boolean = useSelector<
        RootState,
        RootState["sudoku"]["isLoading"]
    >((state: RootState) => state.sudoku.isLoading);
    useEffect(() => {
        if (!sudoku) dispatch(getSudoku("easy"));
    }, [sudoku]);
    return (
        <Wrapper>
            {}
            {loading ? (
                <Box>
                    <CircularProgress />
                </Box>
            ) : (
                sudoku && (
                    <>
                        <Typography variant="body1" textAlign="center">
                            Щоб відновити зашифрований хакерами файл треба
                            підібрати комбінацію-ключ. Для цього необхідно
                            заповнити вільні клітинки цифрами від 1 до 9 так,
                            щоб в кожному рядку, в кожному стовпці і в кожному
                            малому квадраті 3×3, кожна цифра зустрічалася лише
                            один раз. Натисніть на порожню клітинку та оберіть з
                            панелі число, яке вважаєте за потрібне.
                        </Typography>
                        <SudokuGrid puzzle={sudoku.puzzle} />{" "}
                        <NumericKeyboard />
                    </>
                )
            )}
        </Wrapper>
    );
}

const Wrapper = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 2rem 0;
    align-items: center;
    gap: 2rem;
    flex-grow: 1;
`;
