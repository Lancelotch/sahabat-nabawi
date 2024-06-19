import { IPathParam } from "@/app/_interface/general.interface";
import {
  ProductCategoryEnum,
  ProductSectionEnum,
  ProductSubCategoryEnum,
} from "@/app/_interface/product.interface";
import { Suspense, lazy } from "react";
import dynamic from "next/dynamic";
const BodySection = lazy(
  () => import("../_components/BodySection/BodySection")
);
const TopSection = dynamic(
  () => import("../_components/TopSection/TopSection")
);

async function SearchCategory({ params, searchParams }: IPathParam) {
  const { category = ProductCategoryEnum.VISA_SERVICE } = params || {};
  const { section, sub_category } = searchParams || {};

  return (
    <div>
      <TopSection
        category={category}
        section={section as unknown as ProductSectionEnum}
        subCategory={sub_category as unknown as ProductSubCategoryEnum}
      />
      <Suspense
        key={`${searchParams?.sub_category}-${section}`}
        fallback={<div>Loading...</div>}
      >
        <BodySection
          category={category}
          section={section}
          sub_category={sub_category}
        />
      </Suspense>
    </div>
  );
}

export default SearchCategory;
