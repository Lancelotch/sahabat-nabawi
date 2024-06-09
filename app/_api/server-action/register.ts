"use server";

import { z } from "zod";
import { axiosInstance } from "@/app/_api";
import { registerSchema } from "../../_components/Authentication/RegisterForm/schema";
import {
  ApiResponse,
  InvalidResponse,
} from "@/app/_interface/general.interface";
import { IRegisterResponse } from "@/app/_interface/login.interface";

type FormData = z.infer<typeof registerSchema>;

export const postRegister = async (
  payload: FormData
): Promise<ApiResponse<IRegisterResponse> | InvalidResponse> => {
  const response = await axiosInstance({
    url: "/accounts/customer",
    method: "POST",
    data: payload,
  })
    .then((res): ApiResponse<IRegisterResponse> => {
      return res.data;
    })
    .catch((e): InvalidResponse => {
      console.error("[ Register ]", e.response.data);
      return e.response.data;
    });

  return response;
};
