import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { getSudoku } from "../../store/sudokuSlice";
import SudokuGrid from "./SudokuGrid";
export default function Decode() {
    const dispatch = useDispatch<AppDispatch>();
    let sudoku: any = useSelector<RootState, RootState["sudoku"]["sudoku"]>(
        (state: RootState) => state.sudoku.sudoku
    );
    useEffect(() => {
        if (!sudoku) dispatch(getSudoku("easy"));
    }, [sudoku]);
    return <div>
        { sudoku && <SudokuGrid puzzle={sudoku.puzzle} />}
    </div>;
}
