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

enum Difficulty {
  easy = 1,
  medium = 2,
  hard = 3,
}

router.post("/victory", async (req: Request, res: Response) => {
  try {

    const difficulty = req.body.difficulty as keyof typeof Difficulty;
    const count = Difficulty[difficulty];
    if (!count) {
      return res.status(400).json({ message: "Invalid difficulty" });
    }

    const user: any = req.user;

    if (!user?.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    await db.query(
      `
      INSERT INTO victories (user_id, count)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE count = count + VALUES(count)
      `,
      [user.id, count]
    );

    res.status(200).json({ message: "Victory saved" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



router.get("/progress", async (req: Request, res: Response) => {
    try {
        let user: any = req.user;
        if (user) {
            const [result]: any = await db.query("SELECT count FROM victories WHERE user_id = ?", [user.id]);
            res.status(200).send(result[0]);
        } else {
            res.status(200).send({ count: 0 });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
})


export default router;
