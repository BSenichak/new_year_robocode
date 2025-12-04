import api from "./axios";

type Difficulty = "easy" | "medium" | "hard";

const getSudoku = (difficulty: Difficulty) =>
    api.get("sudoku", { params: { difficulty } });

export default {
    getSudoku,
};
