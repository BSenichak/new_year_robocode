import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { getSudoku } from "../../store/sudokuSlice";
import SudokuGrid from "./SudokuGrid";
import { Box, CircularProgress, Typography, Button } from "@mui/material";
import styled from "@emotion/styled";
import { NumericKeyboard } from "./NumericKeyboard";
import * as React from "react";
import ClearModal from "./ClearModal";
import RegenerateModal from "./RegenerateModal";
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

    let [clearModalOpen, setClearModalOpen] = React.useState(false);
    let [regenerateOpen, setRegenerateOpen] = React.useState(false);

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
            <Button
                variant="contained"
                color="secondary"
                onClick={() => setClearModalOpen(true)}
                sx={{ m: 2 }}
            >
                Розпочати дешифровку заново
            </Button>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => setRegenerateOpen(true)}
                sx={{ m: 2 }}
            >
                Спробувати дешифрувати інший файл
            </Button>
            <ClearModal
                isOpen={clearModalOpen}
                closeModal={() => setClearModalOpen(false)}
            />
            <RegenerateModal
                isOpen={regenerateOpen}
                closeModal={() => setRegenerateOpen(false)}
            />
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
