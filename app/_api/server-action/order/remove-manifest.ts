"use server";

import { privateAxios } from "@/app/_api";
import {
  ApiResponse,
  InvalidResponse,
} from "@/app/_interface/general.interface";
import { OrderResponse } from "@/app/_interface/order.interface";

export const removeManifest = async (
  order_number: string,
  order_item_id: number,
  id?: string
): Promise<ApiResponse<OrderResponse> | InvalidResponse> => {
  const response = await privateAxios({
    url: `/orders/${order_number}/${order_item_id}/manifests/${id}`,
    method: "DELETE",
  })
    .then((res): ApiResponse<OrderResponse> => {
      return res.data;
    })
    .catch((e): InvalidResponse => {
      console.error("[ Remove Manifest ]", e.response.data);
      return e.response.data;
    });

  return response;
};
