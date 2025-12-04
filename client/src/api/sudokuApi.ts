import api from "./axios";
import type { Difficulty } from "../utils/types";

const getSudoku = (difficulty: Difficulty) =>
    api.get("sudoku", { params: { difficulty } });

export default {
    getSudoku,
};
