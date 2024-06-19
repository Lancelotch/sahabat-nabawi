"use server";

import { privateAxios } from "@/app/_api";
import {
  ApiResponse,
  InvalidResponse,
} from "@/app/_interface/general.interface";
import { OrderResponse } from "@/app/_interface/order.interface";
import { OrderSchema } from "@/app/order/[orderNumber]/schema";

export const createOrder = async (
  payload: OrderSchema,
  order_number: string
): Promise<ApiResponse<OrderResponse> | InvalidResponse> => {
  const response = await privateAxios({
    url: `/orders/${order_number}`,
    method: "POST",
    data: payload,
  })
    .then((res): ApiResponse<OrderResponse> => {
      return res.data;
    })
    .catch((e): InvalidResponse => {
      console.error("[ Create Order ]", e.response.data);
      return e.response.data;
    });

  return response;
};
