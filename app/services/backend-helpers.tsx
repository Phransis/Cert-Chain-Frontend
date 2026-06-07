import axios from "axios";

const baseURL = "https://cert-chain-backend.onrender.com";
const bearerToken = process.env.BEARER_TOKEN;

export const backend = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${bearerToken}`
  }
});
