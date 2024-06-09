"use server";

import { z } from "zod";
import { loginSchema } from "../../_components/Authentication/LoginForm/schema";
import { axiosInstance } from "@/app/_api";
import { storeToken } from "./store-token";
import {
  ApiResponse,
  InvalidResponse,
} from "@/app/_interface/general.interface";
import { ILoginResponse } from "@/app/_interface/login.interface";

type FormData = z.infer<typeof loginSchema>;

export const postLogin = async (
  payload: FormData
): Promise<ApiResponse<ILoginResponse> | InvalidResponse> => {
  const response = await axiosInstance({
    url: "/session",
    method: "POST",
    data: payload,
  })
    .then((res): ApiResponse<ILoginResponse> => {
      return res.data;
    })
    .catch((e): InvalidResponse => {
      console.error("[ Login ]", e.response.data);
      return e.response.data;
    });

  if (response.ok) {
    const successResponse = response as ApiResponse<ILoginResponse>;
    await storeToken(successResponse.data);
  }
  return response;
};
