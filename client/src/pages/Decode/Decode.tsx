import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { getSudoku } from "../../store/sudokuSlice";
import SudokuGrid from "./SudokuGrid";
import { Box, CircularProgress, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { NumericKeyboard } from "./NumericKeyboard";
import DifficultySelector from "./DifficultySelector";
import InfoBar from "./InfoBar";

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
        if (!sudoku) dispatch(getSudoku());
    }, [sudoku]);



    if (loading || !sudoku)
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexGrow: 1,
                }}
            >
                <CircularProgress />
            </Box>
        );
    return (
        <Wrapper>
            <Typography variant="h2" textAlign="center" sx={{ m: 2 }}>
                Розшифрувати файл
            </Typography>
            <Typography
                variant="body1"
                textAlign="center"
                sx={{ m: 2 }}
                color="text.secondary"
            >
                Заповни судоку, щоб розшифрувати файл Санти
            </Typography>
            <DifficultySelector />
            <Grid>
                <NumericKeyboard />
                <SudokuGrid puzzle={sudoku.puzzle} />
                <InfoBar />
            </Grid>
        </Wrapper>
    );
}

const Wrapper = styled(Box)`
    padding: 2rem 0;
    margin: 0 auto;
    width: 100%;
`;

let Grid = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
    place-items: start center;
    @media (max-width: 1199px) {
        grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 639px) {
        grid-template-columns: 1fr;
    }
`;
