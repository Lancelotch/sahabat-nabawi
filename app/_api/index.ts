import axios from "axios";
import getConfig from "next/config";
import { cookies } from "next/headers";
import { EAuthentication } from "../_constant/authentication";

const config = getConfig();

const initpublicAxios = {
  baseURL: "http://localhost:3300/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
};

const publicAxios = axios.create(initpublicAxios);

const privateAxios = axios.create(initpublicAxios);

privateAxios.interceptors.request.use(
  (config) => {
    const token = cookies().get(EAuthentication.COOKIES_ACCESS_TOKEN)?.value;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { publicAxios, privateAxios };
