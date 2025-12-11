import { Cached, Shuffle } from "@mui/icons-material";
import {
    Box,
    Card,
    CardContent,
    styled,
    Typography,
    Button,
} from "@mui/material";
import ClearModal from "./ClearModal";
import RegenerateModal from "./RegenerateModal";
import { useState } from "react";
import CheckModal from "./CheckModal";
import HelpModal from "./HelpModal";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

export default function InfoBar() {
    let [clearModalOpen, setClearModalOpen] = useState(false);
    let [regenerateOpen, setRegenerateOpen] = useState(false);
    let [checkIsOpen, setCheckIsOpen] = useState(false);
    let [helpOpen, setHelpOpen] = useState(false);
    let helpedCell = useSelector<RootState, RootState["sudoku"]["helpedCell"]>(
        (state: RootState) => state.sudoku.helpedCell
    );
    return (
        <Wrapper>
            <Card
                sx={{
                    width: "100%",
                    border: "1px solid #ffffff44",
                    borderRadius: 3,
                }}
            >
                <CardContent>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Як розшифрувати файл?
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Щоб відновити зашифрований хакерами файл, треба
                        підібрати ключ-комбінацію. Заповнюй порожні клітинки
                        цифрами від 1 до 9 так, щоб у кожному рядку, стовпці та
                        квадраті 3×3 кожна цифра зустрічалася лише один раз
                    </Typography>
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        sx={{ mt: 1 }}
                    >
                        Натисни на порожню клітинку, обери з панелі число – і
                        наближай Санту до повернення його списків
                    </Typography>
                    <Box
                        sx={{
                            position: "relative",
                            paddingLeft: "1rem",
                        }}
                    >
                        <Typography
                            variant="body1"
                            color="success"
                            sx={{ position: "absolute", top: 0, left: 0 }}
                        >
                            *
                        </Typography>
                        <Typography
                            variant="body1"
                            color="success"
                            sx={{ mt: 1 }}
                        >
                            Кожна головоломка дає 1, 2 або 3 бали залежно від її
                            складності
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            position: "relative",
                            paddingLeft: "1rem",
                        }}
                    >
                        <Typography
                            variant="body1"
                            color="warning"
                            sx={{ position: "absolute", top: 0, left: 0 }}
                        >
                            *
                        </Typography>
                        <Typography
                            variant="body1"
                            color="warning"
                            sx={{ mt: 1 }}
                        >
                            Для одного ключа маєш 1 підказку
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
            <Button
                variant="contained"
                fullWidth
                size="large"
                color="success"
                startIcon={
                    <img
                        src="Union.svg"
                        alt="arrow"
                        height={18}
                        style={{ filter: "invert()" }}
                    />
                }
                sx={{ py: 2 }}
                onClick={() => setCheckIsOpen(true)}
            >
                ПЕРЕВІРИТИ КЛЮЧ
            </Button>
            <Button
                variant="contained"
                fullWidth
                size="large"
                color="inherit"
                startIcon={
                    <img
                        src="./elf.png"
                        alt="arrow"
                        height={40}
                        style={!!helpedCell ? { filter: "grayscale()" } : {}}
                    />
                }
                sx={{
                    background: "#2b2b34",
                }}
                onClick={() => setHelpOpen(true)}
                disabled={!!helpedCell}
            >
                ЕЛЬФ-ПОМІЧ
            </Button>
            <Button
                variant="outlined"
                fullWidth
                size="large"
                color="inherit"
                startIcon={<Cached />}
                sx={{
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    background: "transparent",
                    p: "8px 16px",
                    "&:hover": {
                        borderWidth: 0.1,
                        background: "rgba(147, 50, 214, 1)",
                    },
                }}
                onClick={() => setClearModalOpen(true)}
            >
                РОЗПОЧАТИ ЗАНОВО
            </Button>
            <Button
                variant="outlined"
                fullWidth
                size="large"
                color="inherit"
                startIcon={<Shuffle />}
                sx={{
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    background: "transparent",
                    p: "8px 16px",
                    "&:hover": {
                        borderWidth: 0.1,
                        background: "rgba(147, 50, 214, 1)",
                    },
                }}
                onClick={() => setRegenerateOpen(true)}
            >
                ІНШИЙ ФАЙЛ
            </Button>
            <ClearModal
                isOpen={clearModalOpen}
                closeModal={() => setClearModalOpen(false)}
            />
            <RegenerateModal
                isOpen={regenerateOpen}
                closeModal={() => setRegenerateOpen(false)}
            />
            <CheckModal
                isOpen={checkIsOpen}
                closeModal={() => setCheckIsOpen(false)}
            />
            <HelpModal
                isOpen={helpOpen}
                closeModal={() => setHelpOpen(false)}
            />
        </Wrapper>
    );
}

let Wrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    justify-self: stretch;
    gap: 1rem;
    @media (max-width: 1099px) {
        grid-row: 1/3;
        grid-column: 1;
    }
    @media (max-width: 639px) {
        grid-column: 1;
        grid-row: 1;
    }
`;
