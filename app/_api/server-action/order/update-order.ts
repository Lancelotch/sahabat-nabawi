"use server";

import { privateAxios } from "@/app/_api";
import {
  ApiResponse,
  InvalidResponse,
} from "@/app/_interface/general.interface";
import { IOrder } from "@/app/_interface/order.interface";
import { OrderSchema } from "@/app/order/[orderNumber]/schema";

export const updateOrder = async (
  payload: OrderSchema,
  order_number: string
): Promise<ApiResponse<IOrder> | InvalidResponse> => {
  console.debug(payload);
  const response = await privateAxios({
    url: `/orders/${order_number}`,
    method: "PUT",
    data: payload,
  })
    .then((res): ApiResponse<IOrder> => {
      return res.data;
    })
    .catch((e): InvalidResponse => {
      console.error("[ Update Order ]", e.response.data);
      return e.response.data;
    });

  return response;
};
