import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";
import { clearValues, getSudoku } from "../../store/sudokuSlice";

export default function RegenerateModal({ isOpen, closeModal }: any) {
    let dispatch = useDispatch<AppDispatch>();
    return (
        <Dialog open={isOpen} onClose={closeModal}>
            <DialogTitle>
                Ви впевнені, що хочете розпочати дешифровку іншого файлу? Увесь
                Ваш поточний прогрес буде втрачено
            </DialogTitle>
            <DialogActions>
                <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                        dispatch(clearValues());
                        dispatch(getSudoku("easy"));
                        closeModal();
                    }}
                >
                    Спробувати інший файл
                </Button>
                <Button variant="contained" color="error" onClick={closeModal}>
                    Повернутись назад
                </Button>
            </DialogActions>
        </Dialog>
    );
}
