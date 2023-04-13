import axios from "axios";
import { API_BASE_URL } from "../Utils/constants";

//Make sure to add login routers

export const nonAuthApi = axios.create({
  baseURL: API_BASE_URL,
});
