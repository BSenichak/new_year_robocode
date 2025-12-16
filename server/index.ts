import express from "express";
import router from "./routes";
import cors from "cors";
import path from "path";
import session from "express-session";
import passport from "passport";
import authRouter from "./auth";
import { config } from "dotenv";
import MySQLStoreConstructor from "express-mysql-session";

config();

const app = express();

const MySQLStore = MySQLStoreConstructor(session);
const sessionStore = new MySQLStore({
    host: process.env.DB_HOST || process.env.MYSQLHOST || 'localhost',
    port: Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306),
    user: process.env.DB_USER || process.env.MYSQLUSER || 'root',
    password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '',
    database: process.env.DB_NAME || process.env.MYSQLDATABASE || '',
    clearExpired: true,
    checkExpirationInterval: 900000, 
    expiration: 1000 * 60 * 60 * 24 * 7, 
    createDatabaseTable: true,
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
});

app.set('trust proxy', 1);

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
        exposedHeaders: ["x-caesar-key"],
    })
);

app.use(
  session({
    name: "connect.sid",
    secret: process.env.SESSION_SECRET || "secret123",
    store: sessionStore,
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