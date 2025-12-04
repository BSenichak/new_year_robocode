import api from "./axios";
import type { Difficulty } from "../utils/types";

const getProgress = () => api.get("progress");

const victory = (difficulty: Difficulty) => api.post("victory", { difficulty });

export default {
    getProgress,
    victory,
};
