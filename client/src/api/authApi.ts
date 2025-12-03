import api from "./axios";

const getMe = () => api.get("auth/me");
const logout = () => api.post("auth/logout");

export default {
  getMe,
  logout
};
