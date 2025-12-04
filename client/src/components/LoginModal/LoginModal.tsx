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
                handleClose();
            }
        };

        window.addEventListener("message", handler);
        return () => window.removeEventListener("message", handler);
    }, [dispatch]);

    return (
        <Dialog open={isOpen} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle>Вхід</DialogTitle>
            <DialogContent>
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
            </DialogContent>

            <IconButton
                onClick={handleClose}
                sx={{ position: "absolute", top: "8px", right: "8px" }}
            >
                <Close />
            </IconButton>
        </Dialog>
    );
}
