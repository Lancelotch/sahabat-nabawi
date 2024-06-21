"use server";

import { privateAxios } from "@/app/_api";
import {
  ApiResponse,
  InvalidResponse,
} from "@/app/_interface/general.interface";
import { InitiateOrderRequest, IOrder } from "@/app/_interface/order.interface";

export const postInitiateOrder = async (
  payload: InitiateOrderRequest
): Promise<ApiResponse<IOrder> | InvalidResponse> => {
  const response = await privateAxios({
    url: "/orders",
    method: "POST",
    data: payload,
  })
    .then((res): ApiResponse<IOrder> => {
      return res.data;
    })
    .catch((e): InvalidResponse => {
      console.error("[ Initiate Order ]", e.response.data);
      return e.response.data;
    });

  return response;
};
