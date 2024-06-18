"use server";

import { z } from "zod";
import { privateAxios, publicAxios } from "@/app/_api";
import {
  ApiResponse,
  InvalidResponse,
} from "@/app/_interface/general.interface";
import { manifestSchema } from "@/app/order/[orderNumber]/_components/ManifestForm/schema";
import { OrderResponse } from "@/app/_interface/order.interface";

type FormData = z.infer<typeof manifestSchema>;

export const addManifest = async (
  payload: FormData,
  order_number: string,
  order_item_id: number
): Promise<ApiResponse<OrderResponse> | InvalidResponse> => {
  const response = await privateAxios({
    url: `/orders/${order_number}/${order_item_id}/manifests`,
    method: "POST",
    data: payload,
  })
    .then((res): ApiResponse<OrderResponse> => {
      return res.data;
    })
    .catch((e): InvalidResponse => {
      console.error("[ Add Manifest ]", e.response.data);
      return e.response.data;
    });

  return response;
};
