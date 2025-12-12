import {
    Dialog,
    DialogActions,
    DialogContent,
    Button,
    IconButton,
    Typography,
    useMediaQuery,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { giveHint } from "../../store/sudokuSlice";

export default function HelpModal({ isOpen, closeModal }: any) {
    const dispatch = useDispatch<AppDispatch>();
    let isPhone = useMediaQuery("(max-width: 639px)");
    return (
        <Dialog
            open={isOpen}
            onClose={closeModal}
            PaperProps={{
                sx: {
                    borderRadius: "24px",
                    overflow: "hidden",
                    background: "rgba(30, 30, 42, 1)",
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
            <DialogActions
                sx={{
                    justifyContent: "center",
                    p: 2,
                    "@media (max-width: 600px)": {
                        flexDirection: "column",
                        "& > button": {
                            marginLeft: "0 !important",
                        },
                    },
                    gap: 1,
                }}
            >
                <Button
                    variant="outlined"
                    color="inherit"
                    onClick={closeModal}
                    fullWidth={isPhone}
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
                    fullWidth={isPhone}
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
