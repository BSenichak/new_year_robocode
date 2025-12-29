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
            }),
        }).then((res) => res.json()).catch((e) => console.log(e));
        const key = getDateKey();

        const encrypted = {
            difficulty: caesarCipher(result.difficulty, key),
            puzzle: caesarCipher(result.puzzle, key),
            solution: caesarCipher(result.solution, key),
        };
        res.setHeader("x-caesar-key", String(key));
        res.status(200).json(encrypted);
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

enum Difficulty {
    easy = "ease",
    medium = "middle",
    hard = "hard",
}

router.post("/victory", async (req: Request, res: Response) => {
    try {
        const difficulty = req.body.difficulty as keyof typeof Difficulty;
        const column = Difficulty[difficulty];
        if (!column)
            return res.status(400).json({ message: "Invalid difficulty" });

        const user: any = req.user;

        if (!user?.id || !user?.google_id) {
            console.log("❌ Victory failed - User object:", user);
            return res.status(401).json({ message: "Unauthorized" });
        }

        const googleId = user.google_id;
        const email = user.email || `user_${googleId}@unknown.com`;
        const displayName = user.name || `User ${googleId}`;

        console.log("✅ Victory request:", {
            googleId,
            email,
            displayName,
            difficulty,
        });

        await db.query(
            `
            INSERT INTO users_stats (google_id, email, display_name, decode_count, ease, middle, hard)
            VALUES (?, ?, ?, 1, ?, ?, ?)
            ON DUPLICATE KEY UPDATE 
                decode_count = decode_count + 1,
                ease = ease + VALUES(ease),
                middle = middle + VALUES(middle),
                hard = hard + VALUES(hard)
            `,
            [
                googleId,
                email,
                displayName,
                difficulty === "easy" ? 1 : 0,
                difficulty === "medium" ? 1 : 0,
                difficulty === "hard" ? 1 : 0,
            ]
        );

        const today = new Date().toISOString().split("T")[0];
        await db.query(
            `
            INSERT INTO daily_overall_progress (date, total_decode_count)
            VALUES (?, 1)
            ON DUPLICATE KEY UPDATE total_decode_count = total_decode_count + 1
            `,
            [today]
        );

        const [result]: any = await db.query(
            "SELECT decode_count, ease, middle, hard FROM users_stats WHERE google_id = ?",
            [googleId]
        );

        console.log("✅ Victory successful:", result[0]);
        res.status(200).json(result[0]);
    } catch (err) {
        console.error("❌ Victory error:", err);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/progress", async (req: Request, res: Response) => {
    try {
        const user: any = req.user;
        const userId = user?.google_id;

        if (!userId) {
            return res.status(200).json({
                decode_count: 0,
                ease: 0,
                middle: 0,
                hard: 0,
                rank: null,
            });
        }

        // Отримуємо статистику користувача
        const [userResult]: any = await db.query(
            "SELECT decode_count, ease, middle, hard FROM users_stats WHERE google_id = ?",
            [userId]
        );

        const userStats = userResult[0];

        if (!userStats) {
            return res.status(200).json({
                decode_count: 0,
                ease: 0,
                middle: 0,
                hard: 0,
                rank: null,
            });
        }

        const userPoints =
            userStats.ease * 1 + userStats.middle * 2 + userStats.hard * 3;

        const [rankResult]: any = await db.query(
            `
            SELECT COUNT(*) + 1 AS \`rank\`
            FROM users_stats
            WHERE (ease*1 + middle*2 + hard*3) > ?
            `,
            [userPoints]
        );

        const rank = rankResult[0]?.rank || 1;

        res.status(200).json({ ...userStats, rank });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

router.get("/stats", async (req: Request, res: Response) => {
    try {
        const [overall]: any = await db.query(`
            SELECT 
                COUNT(*) AS totalPlayers,
                SUM(decode_count) AS totalDecodeCount
            FROM users_stats
        `);

        const today = new Date().toISOString().split("T")[0];
        const [todayResult]: any = await db.query(
            `SELECT total_decode_count AS todayDecodeCount
             FROM daily_overall_progress
             WHERE date = ?`,
            [today]
        );

        res.status(200).json({
            totalPlayers: overall[0]?.totalPlayers || 0,
            totalDecodeCount: Number(overall[0]?.totalDecodeCount) || 0,
            todayDecodeCount: todayResult[0]?.todayDecodeCount || 0,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.get("/leaderboard", async (req: Request, res: Response) => {
    try {
        const [rows]: any = await db.query(`
            SELECT 
                display_name AS name,
                decode_count AS filesDecoded,
                (ease*1 + middle*2 + hard*3) AS points
            FROM users_stats
            ORDER BY points DESC, decode_count DESC
            LIMIT 10
        `);

        const leaderboard = rows.map((row: any, index: number) => ({
            place: index + 1,
            ...row,
        }));

        res.status(200).json(leaderboard);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
