import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box, Typography } from "@mui/material";
import type { AppDispatch, RootState } from "../store/store";
import { fetchMe, logout } from "../store/authReducer";

export default function LoginButton({
    fullWidth = false,
    color = "warning",
    style = {},
}: {
    fullWidth?: boolean;
    color?: any;
    style?: any;
}) {
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

    if (user && !fullWidth) {
        return (
            <Box
                sx={{
                    display: "flex",
                    gap: "15px",
                    alignItems: "center",
                    fontWeight: "100",
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: "100" }}>
                    {user.displayName}
                </Typography>
                <Button
                    variant="outlined"
                    color="inherit"
                    sx={{
                        fontWeight: "100",
                        borderWidth: 0.1, // товщина бордера в px
                        borderColor: "currentColor", // щоб колір збігався з текстом
                        "&:hover": {
                            borderWidth: 0.1, // щоб при ховері не товстішав
                        },
                    }}
                    onClick={() => dispatch(logout())}
                >
                    Вийти
                </Button>
            </Box>
        );
    }

    if (user && fullWidth) {
        return (
            <Button
                variant="outlined"
                color="inherit"
                fullWidth={fullWidth}
                sx={{
                    fontWeight: "100",
                    borderWidth: 0.1, 
                    borderColor: "currentColor",
                    "&:hover": {
                        borderWidth: 0.1, 
                    },
                    justifyContent: "start",
                }}
                onClick={() => dispatch(logout())}
            >
                Вийти ({user.displayName})
            </Button>
        );
    }

    return (
        <Button
            variant="contained"
            color={color}
            onClick={loginWithGoogle}
            fullWidth={fullWidth}
            sx={style}
        >
            Увійти
        </Button>
    );
}
