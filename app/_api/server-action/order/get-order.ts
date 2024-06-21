"use server";

import { privateAxios } from "@/app/_api";
import {
  ApiResponse,
  InvalidResponse,
} from "@/app/_interface/general.interface";
import { IGetOrderRequest, IOrder } from "@/app/_interface/order.interface";

export const getOrder = async (
  payload: IGetOrderRequest
): Promise<ApiResponse<IOrder> | InvalidResponse> => {
  const response = await privateAxios({
    url: `/orders/${payload.order_number}`,
    method: "GET",
  })
    .then((res): ApiResponse<IOrder> => {
      return res.data;
    })
    .catch((e): InvalidResponse => {
      console.error("[ Get Order ]", e.response.data);
      return e.response.data;
    });

  return response;
};
