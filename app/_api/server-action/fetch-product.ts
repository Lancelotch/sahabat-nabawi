"use server";

import { RequestProducts } from "@/app/_interface/product.interface";
import { publicAxios } from "..";

export const fetchProducts = async (payload: RequestProducts) => {
  const response = await publicAxios({
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
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return response;
};
