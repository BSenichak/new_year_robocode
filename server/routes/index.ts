import Router from "express";
import db from "../db";
const router = Router();

router.get("/", (req, res) => {
    res.send("Hello World!");
});

export default router;