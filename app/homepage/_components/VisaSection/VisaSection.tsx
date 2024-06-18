import React from "react";
import {
  ProductCategoryEnum,
  ResponseProducts,
} from "@/app/_interface/product.interface";
import { fetchProducts } from "@/app/_api/server-action/fetch-product";
import dynamic from "next/dynamic";
const VisaSwiper = dynamic(() => import("./VisaSwiper"));

const VisaSection = async () => {
  const visaService: ResponseProducts = await fetchProducts({
    page: 1,
    limit: 5,
    category: ProductCategoryEnum.VISA_SERVICE,
  });

  const products = visaService?.data?.products || [];

  return <VisaSwiper products={products} />;
};

export default VisaSection;
