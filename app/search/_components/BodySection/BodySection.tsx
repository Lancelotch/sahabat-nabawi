import React, { FC } from "react";
import {
  ProductCategoryEnum,
  ProductSectionEnum,
  ProductSubCategoryEnum,
  ResponseProducts,
} from "@/app/_interface/product.interface";
import { fetchProducts } from "@/app/_api/server-action/fetch-product";
import ListingCard from "./ListingCard";
import LoadMore from "@/app/_components/LoadMore/LoadMore";

interface Props {
  category: ProductCategoryEnum;
  section?: ProductSectionEnum;
  sub_category?: ProductSubCategoryEnum;
}

const BodySection: FC<Props> = async ({ category, section, sub_category }) => {
  const categoryProduct =
    category === ProductCategoryEnum.VISA
      ? ProductCategoryEnum.VISA_SERVICE
      : ProductCategoryEnum.TRAVEL_PACKAGE;

  const response: ResponseProducts = await fetchProducts({
    page: 1,
    limit: 10,
    category: categoryProduct,
    section,
    sub_category,
  });

  const products = response?.data?.products || [];

  return (
    <>
      <ListingCard category={category} products={products} />
      {/* {response.ok && (
        <LoadMore
          category={categoryProduct}
          section={section}
          sub_category={sub_category}
        />
      )} */}
    </>
  );
};

export default BodySection;
