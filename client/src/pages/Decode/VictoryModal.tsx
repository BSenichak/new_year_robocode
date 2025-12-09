import {
  DialogTitle,
  DialogActions,
  Dialog,
  DialogContentText,
  Button,
  DialogContent,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import LoginButton from "../../components/LoginButton";
import { useEffect } from "react";
import {
  victory,
  markVictorySent,
  resetVictorySent,
} from "../../store/resultsSlice";
import { clearValues, getSudoku } from "../../store/sudokuSlice";

export default function VictoryModal({ isOpen }: { isOpen: boolean }) {
  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const progress = useSelector(
    (state: RootState) => state.results.progress
  );

  const victorySent = useSelector(
    (state: RootState) => state.results.victorySent
  );

  const dispatch = useDispatch<AppDispatch>();

  // ✅ ВИКЛИКАЄТЬСЯ ТІЛЬКИ 1 РАЗ
  useEffect(() => {
    if (!isOpen) return;

    if (user && !victorySent) {
      dispatch(victory());
      dispatch(markVictorySent());
    }
  }, [isOpen, user, victorySent, dispatch]);

  // ✅ ЄДИНА ФУНКЦІЯ ЗАКРИТТЯ
  const handleClose = () => {
    dispatch(resetVictorySent()); // ✅ дозволяємо наступну перемогу
    dispatch(clearValues());
    dispatch(getSudoku());
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      {!user ? (
        <>
          <DialogTitle textAlign="center">
            Вітаю! Ви розшифрували файл! Авторизуйтеся, щоб зберегти результат.
          </DialogTitle>

          <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
            <LoginButton />
          </DialogActions>
        </>
      ) : (
        <>
          <DialogTitle textAlign="center">
            Вітаю! Ви розшифрували файл!
          </DialogTitle>

          <DialogContent>
            <DialogContentText textAlign="center">
              Всього Вами розв’язано пазлів: {progress}
            </DialogContentText>
          </DialogContent>

          <DialogActions sx={{ justifyContent: "center", gap: 2, pb: 3 }}>
            <Button
              onClick={handleClose}
              variant="contained"
              color="secondary"
            >
              Наступний файл
            </Button>

            <Button
              onClick={handleClose}
              variant="contained"
              color="secondary"
            >
              Поділитися результатом
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
