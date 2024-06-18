import React from "react";
import {
  ProductCategoryEnum,
  ResponseProducts,
} from "@/app/_interface/product.interface";
import { fetchProducts } from "@/app/_api/server-action/fetch-product";
import dynamic from "next/dynamic";
const PackageTravelSwiper = dynamic(() => import("./PackageTravelSwiper"));

const PackageTravelSection = async () => {
  const response: ResponseProducts = await fetchProducts({
    page: 1,
    limit: 5,
    category: ProductCategoryEnum.TRAVEL_PACKAGE,
  });

  const products = response.data.products;

  return <PackageTravelSwiper products={products} />;
};

export default PackageTravelSection;
