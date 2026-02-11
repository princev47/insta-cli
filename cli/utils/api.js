import axios from "axios";
import { getToken } from "./auth.js";

const api = axios.create({
  baseURL: "https://insta-cli.onrender.com",
});


export const initApi = async () => {
  const token = await getToken();
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

export default api;
