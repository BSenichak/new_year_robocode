import { Router } from "express";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { config } from "dotenv";

config();
const authRouter = Router();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID || "GOOGLE_CLIENT_ID",
            clientSecret: process.env.CLIENT_SECRET || "GOOGLE_CLIENT_SECRET",
            callbackURL: "http://localhost:5000/api/auth/google/callback",
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});

authRouter.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.send(`
  <script>
    window.opener.postMessage({ success: true }, "http://localhost:5173");
    window.close();
  </script>
`);
  }
);

authRouter.get("/auth/me", (req, res) => {
    res.json(req.user || null);
});

authRouter.post("/auth/logout", (req, res) => {
    req.logout(() => {
        req.session.destroy(() => {
            res.clearCookie("connect.sid");
            res.json({ success: true });
        });
    });
});

export default authRouter;
