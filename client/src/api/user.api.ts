import api from "./axios";

const getUsers = () => api.get("/users");
const getUserById = (id: number) => api.get(`/users/${id}`);

export default {
    getUsers,
    getUserById
}
