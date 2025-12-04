import Router from "express";
import db from "../db";
const router = Router();
import type { Request, Response } from "express";

function caesarCipher(text: string, shift: number) {
    const chars =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const len = chars.length;

    return text
        .split("")
        .map((char) => {
            const index = chars.indexOf(char);
            if (index === -1) return char;
            return chars[(index + shift) % len];
        })
        .join("");
}

function getDateKey() {
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hour = now.getHours();

    return day + month + year + hour;
}

router.get("/sudoku", async (req: Request, res: Response) => {
    try {
        const result: any = await fetch("https://youdosudoku.com/api/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                difficulty: req.query.difficulty,
                solution: true,
                array: false,
            })
        }).then(res => res.json());
        const key = getDateKey();

        const encrypted = {
            difficulty: caesarCipher(result.difficulty, key),
            puzzle: caesarCipher(result.puzzle, key),
            solution: caesarCipher(result.solution, key)
        };
        res.setHeader("x-caesar-key", String(key));
        res.status(200).json(encrypted);

    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});


export default router;
