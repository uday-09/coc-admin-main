import axios from "axios";
import { API_BASE_URL } from "../Utils/constants";
import Cookies from "js-cookie";

//Make sure to add login routers

const token = Cookies.get("admin-token");

export const Api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
