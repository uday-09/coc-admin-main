import axios from "axios";
import { API_BASE_URL } from "../Utils/constants";


//Make sure to add login routers

export const Api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDE2YjVmZTNkYWMzNjBlMjI5ZTVhNmIiLCJpYXQiOjE2Nzk1OTc5MTd9.h7zLr6dBRuIo-sz3dubuOgJxuzwYs0DKdYqinMS4DOQ`,
  },
});
