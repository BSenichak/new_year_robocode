import {
    Dialog,
    DialogActions,
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
import { giveHint } from "../../store/sudokuSlice";

export default function HelpModal({ isOpen, closeModal }: any) {
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
            <DialogContent
                sx={{
                    p: 2,
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <IconButton
                    sx={{ position: "absolute", top: 6, right: 6 }}
                    onClick={closeModal}
                >
                    <Close sx={{ color: "white" }} />
                </IconButton>
                <img src="./elf.png" alt="elf" style={{ height: "160px" }} />
                <Typography
                    variant="body1"
                    color="text.secondary"
                    textAlign="center"
                >
                    Буде заповнено 1 комірку правильним значенням
                </Typography>
            </DialogContent>

            {/* === Buttons === */}
            <DialogActions sx={{ p: 2, alignItems: "center" }}>
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
                    color="warning"
                    onClick={() => {
                        dispatch(giveHint());
                        closeModal();
                    }}
                >
                    Отримати поміч
                </Button>
            </DialogActions>
        </Dialog>
    );
}
