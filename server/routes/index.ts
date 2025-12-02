import Router from "express";
import db from "../db";
const router = Router();
import type { Request, Response } from "express";
import type { QueryResult, FieldPacket } from "mysql2/promise";

router.get("/users", async(req: Request, res: Response) => {
    try {
        let [result, _] : [QueryResult, FieldPacket[]]  = await db.query("SELECT * FROM users");
        res.status(200).json(result);
    }catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
});

export default router;