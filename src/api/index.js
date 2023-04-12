import axios from "axios";
import { API_BASE_URL } from "../Utils/constants";


//Make sure to add login routers

export const Api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDM2NTAzZmUyOTlmZGYwZDkxMGE4ZjgiLCJpYXQiOjE2ODEyODEwODd9.ton1gKB0KVqenu_Ins9_39pxjLM0x9ss0oBE_eoUiiw`,
  },
});
