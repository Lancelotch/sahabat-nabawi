"use server";

import { privateAxios } from "@/app/_api";
import {
  ApiResponse,
  InvalidResponse,
} from "@/app/_interface/general.interface";
import {
  IGetOrderRequest,
  OrderResponse,
  OrdersRequest,
} from "@/app/_interface/order.interface";

export const getOrders = async (
  payload: OrdersRequest
): Promise<ApiResponse<OrderResponse> | InvalidResponse> => {
  const response = await privateAxios({
    url: `/orders`,
    method: "GET",
    params: payload,
  })
    .then((res): ApiResponse<OrderResponse> => {
      return res.data;
    })
    .catch((e): InvalidResponse => {
      console.error("[ Get List of Order ]", e.response.data);
      return e.response.data;
    });

  return response;
};
