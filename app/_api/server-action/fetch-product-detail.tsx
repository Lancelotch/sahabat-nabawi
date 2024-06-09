"use server";

import {
  ProductDetail,
  IRequestProductDetail,
  IVisaDetail,
  ProductCategoryEnum,
} from "@/app/_interface/product.interface";
import { axiosInstance } from "..";
import {
  ApiResponse,
  InvalidResponse,
} from "@/app/_interface/general.interface";
import VisaDetail from "@/app/product/[category]/_components/VisaDetail/VisaDetail";
import { toast } from "react-toastify";

export const fetchProductDetail = async (payload: IRequestProductDetail) => {
  const { category, id } = payload || {};
  const response: ApiResponse<IVisaDetail> | InvalidResponse =
    await axiosInstance({
      url: `/products/${category}/${id}`,
      method: "GET",
    })
      .then((res): ApiResponse<IVisaDetail> => {
        return res.data;
      })
      .catch((e): InvalidResponse => {
        console.error("[ Fetch Product Detail ]", e.response.data);
        return e.response.data;
      });

  // if (category === ProductCategoryEnum.VISA && response.ok) {
  //   const responseSuccess = response as ApiResponse<IVisaDetail>;
  //   return <VisaDetail product={responseSuccess.data} />;
  // }

  return response;
};
