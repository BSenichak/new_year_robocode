import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box, Typography } from "@mui/material";
import type { AppDispatch, RootState } from "../store/store";
import { fetchMe } from "../store/authReducer";

export default function LoginButton() {
    const dispatch = useDispatch<AppDispatch>();
    const user: any = useSelector((state: RootState) => state.auth.user);

    const loginWithGoogle = () => {
        window.open(
            `${
                import.meta.env.DEV
                    ? "http://localhost:5000"
                    : window.location.origin
            }/api/auth/google`,
            "_blank",
            "width=500,height=600"
        );
    };

    useEffect(() => {
        const handler = async (event: MessageEvent) => {
            const allowedOrigin = import.meta.env.DEV
                ? "http://localhost:5000"
                : window.location.origin;

            if (event.origin !== allowedOrigin) return;

            if (event.data?.success) {
                await dispatch(fetchMe());
            }
        };

        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    }, [dispatch]);

    if (user) {
        return (
            <Box sx={{
              display:"flex",
              gap: "15px",
              alignItems: "center",
              fontWeight: "100"
            }}>
                <Typography variant="h6" sx={{fontWeight: "100"}}>{user.displayName}</Typography>
                <Button variant="outlined" color="inherit" sx={{fontWeight: "100"}}>
                    Вийти
                </Button>
            </Box>
        );
    }

    return (
        <Button variant="contained" color="warning" onClick={loginWithGoogle}>
            Увійти
        </Button>
    );
}
