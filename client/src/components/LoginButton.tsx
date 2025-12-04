import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Google } from "@mui/icons-material";
import type { AppDispatch, RootState } from "../store/store";
import { fetchMe } from "../store/authReducer";

export default function GoogleLoginButton() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

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

  if (user) {
    return (
      <Button variant="outlined" disabled>
        Ви вже увійшли
      </Button>
    );
  }

  return (
    <Button
      startIcon={<Google />}
      size="large"
      variant="contained"
      color="primary"
      onClick={loginWithGoogle}
      fullWidth
    >
      Увійти через Google
    </Button>
  );
}
