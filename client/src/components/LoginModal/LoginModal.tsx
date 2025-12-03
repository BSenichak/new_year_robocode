import { useDispatch, useSelector } from "react-redux";
import { fetchMe } from "../../store/authReducer";
import type { AppDispatch, RootState } from "../../store/store";
import { useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { closeLoginModal } from "../../store/modalSlice";

export default function LoginModal() {
  const dispatch = useDispatch<AppDispatch>();
  const isOpen = useSelector((state: RootState) => state.modal.loginOpen);

  const handleClose = () => {
    dispatch(closeLoginModal());
  };

  const loginWithGoogle = () => {
    // відкриваємо OAuth у новому вікні
    window.open(
      "http://localhost:5000/api/auth/google",
      "_blank",
      "width=500,height=600"
    );
  };

  useEffect(() => {
    const handler = async (event: MessageEvent) => {
      // перевіряємо origin бекенду
      if (event.origin !== "http://localhost:5000") return;

      if (event.data.success) {
        // отримуємо користувача з сервера
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
          variant="contained"
          color="primary"
          onClick={loginWithGoogle}
          fullWidth
          sx={{ mt: 2 }}
        >
          Увійти через Google
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Закрити
        </Button>
      </DialogActions>
    </Dialog>
  );
}
