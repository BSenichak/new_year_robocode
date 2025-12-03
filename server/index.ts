import express from "express";
import router from "./routes";
import cors from "cors";
import path from "path";
import session from "express-session";
import passport from "passport";
import authRouter from "./auth";

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // React
  credentials: true
}));

app.use(session({
  secret: "secret123",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.use("/api", authRouter);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
