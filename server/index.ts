import express from "express";
import router from "./routes";
import cors from "cors";
import path from "path";
import session from "express-session";
import passport from "passport";
import authRouter from "./auth";
import { config } from "dotenv";

config();

const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        exposedHeaders: ["x-caesar-key"],
    })
);

app.use(
  session({
    name: "sid",
    secret: process.env.SESSION_SECRET || "secret123",
    resave: false,
    saveUninitialized: false,

    cookie: {
      httpOnly: true,
      secure: false,  
      sameSite: "lax",      
      maxAge: 1000 * 60 * 60 * 24 * 7, 
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", authRouter);
app.use("/api", router);

const clientPath = path.resolve(__dirname, "./dist");
app.use(express.static(clientPath));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
});

app.listen(5000, () => {
    console.log(`Server running on ${process.env.PUBLIC_DOMAIN}`);
});
