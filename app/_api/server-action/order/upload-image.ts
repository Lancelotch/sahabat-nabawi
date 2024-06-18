"use server";

import { privateAxios } from "@/app/_api";
import {
  ApiResponse,
  InvalidResponse,
} from "@/app/_interface/general.interface";
import {
  EFieldManifest,
  IUploadManifestFileResponse,
} from "@/app/_interface/order.interface";

export const postUploadManifest = async (
  formData: FormData,
  field: EFieldManifest,
  order_number: string
): Promise<ApiResponse<IUploadManifestFileResponse> | InvalidResponse> => {
  const imageFile = formData.get("image") as File;
  const buffer = await imageFile.arrayBuffer();
  const imageBuffer = Buffer.from(buffer);

  const response = await privateAxios({
    url: `/orders/${order_number}/manifests/upload?field=${field}&file_name=${imageFile.name}&file_type=${imageFile.type}`,
    method: "POST",
    data: imageBuffer,
  })
    .then((res): ApiResponse<IUploadManifestFileResponse> => {
      return res.data;
    })
    .catch((e): InvalidResponse => {
      return e.response.data;
    });

  return response;
};
