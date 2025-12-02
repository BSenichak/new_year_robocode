import express from "express";
import router from "./routes";
import cors from "cors";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use("/api", router);

const clientPath = path.resolve(__dirname, "./dist");
app.use(express.static(clientPath));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
});

app.listen(3000, () => {
    console.log(`Server running on http://localhost:3000`);
});
