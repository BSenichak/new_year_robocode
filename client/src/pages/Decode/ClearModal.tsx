import {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    Button,
    IconButton,
    Typography,
    alpha,
    useTheme,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { clearValues } from "../../store/sudokuSlice";

export default function ClearModal({ isOpen, closeModal }: any) {
    const dispatch = useDispatch<AppDispatch>();
    const theme = useTheme();

    return (
        <Dialog
            open={isOpen}
            onClose={closeModal}
            PaperProps={{
                sx: {
                    borderRadius: "12px",
                    overflow: "hidden",
                    background: alpha(theme.palette.background.paper, 1),
                },
            }}
        >
            {/* === Title === */}
            <DialogTitle sx={{ position: "relative", p: 2 }}>
                Розпочати заново
                <IconButton
                    sx={{ position: "absolute", top: 6, right: 6 }}
                    onClick={closeModal}
                >
                    <Close sx={{ color: "white" }} />
                </IconButton>
            </DialogTitle>

            {/* === Text === */}
            <DialogContent sx={{ p: 2 }}>
                <Typography variant="body1" color="text.secondary">
                    Ви впевнені, що хочете розпочати дешифровку файлу заново?
                    Увесь Ваш поточний прогрес буде втрачено!
                </Typography>
            </DialogContent>

            {/* === Buttons === */}
            <DialogActions sx={{ p: 2 }}>
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={closeModal}
                    sx={{
                        "&:hover": {
                            borderWidth: 0.1,
                            background: "rgba(147, 50, 214, 1)",
                        },
                    }}
                >
                    Повернутись назад
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                        dispatch(clearValues());
                        closeModal();
                    }}
                >
                    Розпочати заново
                </Button>
            </DialogActions>
        </Dialog>
    );
}
