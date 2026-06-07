import axios from "axios";

export const backend = axios.create({
  baseURL: process.env.PUBLIC_BACKEND_URL
});