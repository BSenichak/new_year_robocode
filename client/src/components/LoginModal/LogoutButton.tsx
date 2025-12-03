import { useDispatch } from "react-redux";
import { logout } from "../../store/authReducer";
import type { AppDispatch } from "../../store/store";

function LogoutButton() {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return <button onClick={handleLogout}>Вийти</button>;
}

export default LogoutButton;
