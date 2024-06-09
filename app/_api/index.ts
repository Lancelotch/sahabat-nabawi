import axios from "axios";
import getConfig from "next/config";

const config = getConfig();

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3300/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
