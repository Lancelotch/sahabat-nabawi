"use server";

import { privateAxios } from "@/app/_api";
import {
  ApiResponse,
  InvalidResponse,
} from "@/app/_interface/general.interface";
import {
  IGetOrderRequest,
  OrderResponse,
} from "@/app/_interface/order.interface";

export const getOrder = async (
  payload: IGetOrderRequest
): Promise<ApiResponse<OrderResponse> | InvalidResponse> => {
  const response = await privateAxios({
    url: `/orders/${payload.order_number}`,
    method: "GET",
  })
    .then((res): ApiResponse<OrderResponse> => {
      return res.data;
    })
    .catch((e): InvalidResponse => {
      console.error("[ Get Order ]", e.response.data);
      return e.response.data;
    });

  return response;
};
