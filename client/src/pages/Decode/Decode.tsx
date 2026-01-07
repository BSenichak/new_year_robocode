// import { useDispatch, useSelector } from "react-redux";
// import type { AppDispatch, RootState } from "../../store/store";
// import { useEffect } from "react";
// import { getSudoku } from "../../store/sudokuSlice";
// import SudokuGrid from "./SudokuGrid";
import { Box,
    // CircularProgress,
    Typography } from "@mui/material";
import styled from "@emotion/styled";
// import { NumericKeyboard } from "./NumericKeyboard";
// import DifficultySelector from "./DifficultySelector";
// import InfoBar from "./InfoBar";

export default function Decode() {
    // const dispatch = useDispatch<AppDispatch>();
    // let sudoku: any = useSelector<RootState, RootState["sudoku"]["sudoku"]>(
    //     (state: RootState) => state.sudoku.sudoku
    // );
    // let loading: boolean = useSelector<
    //     RootState,
    //     RootState["sudoku"]["isLoading"]
    // >((state: RootState) => state.sudoku.isLoading);
    //
    // useEffect(() => {
    //     if (!sudoku) dispatch(getSudoku());
    // }, [sudoku]);
    //
    //
    //
    // if (loading || !sudoku)
    //     return (
    //         <Box
    //             sx={{
    //                 display: "flex",
    //                 justifyContent: "center",
    //                 alignItems: "center",
    //                 flexGrow: 1,
    //             }}
    //         >
    //             <CircularProgress />
    //         </Box>
    //     );
    return (
        <Wrapper>
            {/*<Typography variant="h2" textAlign="center" sx={{ m: 2 }}>*/}
            {/*    Розшифрувати файл*/}
            {/*</Typography>*/}
            {/*<Typography*/}
            {/*    variant="body1"*/}
            {/*    textAlign="center"*/}
            {/*    sx={{ m: 2 }}*/}
            {/*    color="text.secondary"*/}
            {/*>*/}
            {/*    Заповни судоку, щоб розшифрувати файл Санти*/}
            {/*</Typography>*/}
            {/*<DifficultySelector />*/}
            {/*<Grid>*/}
            {/*    <NumericKeyboard />*/}
            {/*    <SudokuGrid puzzle={sudoku.puzzle} />*/}
            {/*    <InfoBar />*/}
            {/*</Grid>*/}
            <ResultScreen>
                <Typography variant="h3" align="center" fontWeight={700}>
                    Розшифрування <Success>завершено!</Success>
                </Typography>

                <Typography
                    variant="body1"
                    align="center"
                    color="text.secondary"
                    sx={{ maxWidth: 720 }}
                >
                    Порядок у листах відновлено. Санта вже формує список дітей та їхніх
                    добрих справ, а ельфи-помічники готують подарунки
                    топ-помічникам Різдвяної місії Robocode.
                </Typography>

                <Image
                    src="/image.png"
                    alt="Santa result"
                />
            </ResultScreen>
        </Wrapper>
    );
}

// const Wrapper = styled(Box)`
//     padding: 2rem 0;
//     margin: 0 auto;
//     width: 100%;
// `;

// let Grid = styled(Box)`
//     display: grid;
//     grid-template-columns: 1fr 1fr 1fr;
//     gap: 1rem;
//     place-items: start center;
//     @media (max-width: 1199px) {
//         grid-template-columns: 1fr 1fr;
//     }
//     @media (max-width: 639px) {
//         grid-template-columns: 1fr;
//     }
// `;

const Wrapper = styled(Box)`
    padding: 3rem 1rem;
    margin: 0 auto;
    width: 100%;
    min-height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ResultScreen = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
`;

const Success = styled("span")`
    color: #2ecc71; /* можно заменить на theme.palette.success.main */
`;

const Image = styled("img")`
    margin-top: 2rem;
    max-width: 100%;
    width: 520px;
    height: auto;
`;
