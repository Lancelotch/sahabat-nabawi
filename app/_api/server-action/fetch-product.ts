"use server";

import { RequestProducts } from "@/app/_interface/product.interface";
import { axiosInstance } from "..";

export const fetchProducts = async (payload: RequestProducts) => {
  const response = await axiosInstance({
    url: "/products",
    method: "GET",
    params: payload,
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error("[Fetch Product]", error);
    });

  return response;
};
