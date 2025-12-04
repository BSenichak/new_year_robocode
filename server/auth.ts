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
            callbackURL: `${process.env.PUBLIC_DOMAIN}/api/auth/google/callback`,
        },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        }
    )
);
console.log(process.env.PUBLIC_DOMAIN);

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
