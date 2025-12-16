import { Router, type Request, type Response } from "express";
import passport from "passport";
import {
    Strategy as GoogleStrategy,
    type Profile as GoogleProfile,
    type VerifyCallback,
} from "passport-google-oauth20";
import { config } from "dotenv";
import pool from "./db";

// Тип користувача з БД
export interface DBUser {
    id: number;
    google_id: string;
    email: string | null;
    name: string | null;
    avatar: string | null;
    access_token: string | null;
    refresh_token: string | null;
    created_at: Date;
    updated_at: Date;
}

config();

const authRouter = Router();

/* ====================================================
   GOOGLE STRATEGY + MYSQL
==================================================== */
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID as string,
            clientSecret: process.env.CLIENT_SECRET as string,
            callbackURL: `${process.env.PUBLIC_DOMAIN}/api/auth/google/callback`,
            passReqToCallback: true,
        },
        async (
            req: Request,
            accessToken: string,
            refreshToken: string | null,
            profile: GoogleProfile,
            done: VerifyCallback
        ) => {
            try {
                const googleId = profile.id;
                const email = profile.emails?.[0]?.value || null;
                const name = profile.displayName || null;
                const avatar = profile.photos?.[0]?.value || null;

                // Перевірка існуючого користувача
                const [existing] = await pool.query<any[]>(
                    "SELECT * FROM users WHERE google_id = ? LIMIT 1",
                    [googleId]
                );

                let user: DBUser;

                if (existing.length === 0) {
                    // Новий користувач
                    const [insert] = await pool.query<any>(
                        `INSERT INTO users (google_id, email, name, avatar, access_token, refresh_token)
             VALUES (?, ?, ?, ?, ?, ?)`,
                        [
                            googleId,
                            email,
                            name,
                            avatar,
                            accessToken,
                            refreshToken,
                        ]
                    );

                    const userId = insert.insertId;

                    const [rows] = await pool.query<any[]>(
                        "SELECT * FROM users WHERE id = ?",
                        [userId]
                    );

                    user = rows[0];
                } else {
                    // Оновлюємо дані існуючого
                    await pool.query(
                        `UPDATE users
             SET email = ?, name = ?, avatar = ?, access_token = ?,
                 refresh_token = COALESCE(?, refresh_token),
                 updated_at = CURRENT_TIMESTAMP
             WHERE google_id = ?`,
                        [
                            email,
                            name,
                            avatar,
                            accessToken,
                            refreshToken,
                            googleId,
                        ]
                    );

                    const [rows] = await pool.query<any[]>(
                        "SELECT * FROM users WHERE google_id = ? LIMIT 1",
                        [googleId]
                    );

                    user = rows[0];
                }

                return done(null, user);
            } catch (err) {
                console.error("Google OAuth DB Error:", err);
                return done(err as Error, undefined);
            }
        }
    )
);

/* ====================================================
   SESSION SERIALIZATION
==================================================== */
passport.serializeUser((user: any, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id: number, done) => {
    try {
        const [rows] = await pool.query<any[]>(
            "SELECT * FROM users WHERE id = ? LIMIT 1",
            [id]
        );
        done(null, rows[0] || null);
    } catch (err) {
        done(err as Error, null);
    }
});

/* ====================================================
   ROUTES
==================================================== */

// Login init
authRouter.get(
    "/auth/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        accessType: "offline",
        prompt: "consent",
    })
);

// Google redirects here
authRouter.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req: Request, res: Response) => {
        res.send(`
<script>
  (function () {
    const params = new URLSearchParams(window.location.search);
    const targetOrigin = params.get('origin') || '*';
    try {
      window.opener && window.opener.postMessage({ success: true }, targetOrigin);
    } catch (e) {
      console.error('postMessage failed', e);
    }
    window.close();
  })();
</script>
        `);
    }
);

// Current user session
authRouter.get("/auth/me", (req: Request, res: Response) => {
    res.json(req.user || null);
});

// Logout
authRouter.post("/auth/logout", (req: Request, res: Response) => {
    req.logout(() => {
        req.session.destroy(() => {
            res.clearCookie("connect.sid"); // Тепер збігається з name у session
            res.json({ success: true });
        });
    });
});

export default authRouter;

