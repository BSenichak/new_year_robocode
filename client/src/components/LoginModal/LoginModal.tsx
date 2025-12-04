import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "../../store/authReducer";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    IconButton,
    Typography,
    Avatar,
} from "@mui/material";
import { closeLoginModal } from "../../store/modalSlice";
import { Close, Google } from "@mui/icons-material";

export default function LoginModal() {
    const dispatch = useDispatch<AppDispatch>();
    const isOpen = useSelector((state: RootState) => state.modal.loginOpen);

    const handleClose = () => {
        dispatch(closeLoginModal());
    };

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
            if (
                event.origin !==
                (import.meta.env.DEV
                    ? "http://localhost:5000"
                    : window.location.origin)
            )
                return;

            if (event.data.success) {
                await dispatch(fetchMe());
                setTimeout(() => {
                    handleClose();
                }, 2000)
            }
        };

        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    }, [dispatch]);

    let user: any = useSelector<RootState, RootState["auth"]["user"]>(state => state.auth.user);
    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle>Вхід</DialogTitle>
            {!user && <DialogContent>
                <Button
                    startIcon={<Google />}
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={loginWithGoogle}
                    fullWidth
                    sx={{ mt: 2 }}
                    
                >
                    Увійти через Google
                </Button>
            </DialogContent>}
            {user && <DialogContent>
                <Avatar src={user.photos[0].value} sx={{ width: 100, height: 100, mx: "auto" }} />
                <br />
                <Typography textAlign="center" variant="body1">Привіт, {user.displayName}</Typography>
            </DialogContent>}

            <IconButton
                onClick={handleClose}
                sx={{ position: "absolute", top: "8px", right: "8px" }}
            >
                <Close />
            </IconButton>
        </Dialog>
    );
}
