import axios from "axios";
import { getToken } from "./auth.js";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});


export const initApi = async () => {
  const token = await getToken();
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

export default api;
