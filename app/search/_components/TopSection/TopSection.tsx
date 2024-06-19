"use client";

import React, { FC } from "react";
import {
  ProductCategoryEnum,
  ProductSectionEnum,
  ProductSubCategoryEnum,
} from "@/app/_interface/product.interface";
import {
  categoryServices,
  sectionServices,
  subCategoryServices,
} from "@/app/_constant/target-visa.constant";
import { Select, SelectItem } from "@nextui-org/react";
import { useRouter } from "next/navigation";

interface Props {
  category: ProductCategoryEnum;
  subCategory: ProductSubCategoryEnum;
  section: ProductSectionEnum;
}

const TopSection: FC<Props> = ({ category, subCategory, section }) => {
  const router = useRouter();

  const handleOnChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as ProductCategoryEnum;
    router.push(`/search/${value}${getQueryString({ subCategory, section })}`);
  };

  const handleOnChangeSubCategory = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value as ProductSubCategoryEnum;
    router.push(
      `/search/${category}${getQueryString({ subCategory: value, section })}`
    );
  };

  const handleOnChangeSection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as ProductSectionEnum;
    router.push(
      `/search/${category}${getQueryString({ subCategory, section: value })}`
    );
  };

  // Function to build query string based on defined values
  const getQueryString = ({
    subCategory,
    section,
  }: {
    subCategory?: string;
    section?: string;
  }) => {
    const params = [];
    if (subCategory !== undefined) {
      params.push(`sub_category=${encodeURIComponent(subCategory)}`);
    }
    if (section !== undefined) {
      params.push(`section=${encodeURIComponent(section)}`);
    }
    return params.length > 0 ? `?${params.join("&")}` : "";
  };

  return (
    <section className="w-full p-6">
      <label htmlFor="category-service" className="text-xs">
        Kategori
      </label>
      <div className="flex mb-4">
        <Select
          size="sm"
          radius="sm"
          labelPlacement="outside"
          name="category-service"
          defaultSelectedKeys={[category]}
          onChange={handleOnChangeCategory}
        >
          {categoryServices.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              {category.label}
            </SelectItem>
          ))}
        </Select>
      </div>
      <div className="w-full flex flex-row gap-4">
        <div className="w-full">
          <label htmlFor="category-service" className="text-xs">
            Sub Kategori
          </label>
          <Select
            size="sm"
            radius="sm"
            labelPlacement="outside"
            name="category-service"
            defaultSelectedKeys={[subCategory]}
            onChange={handleOnChangeSubCategory}
          >
            {subCategoryServices.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="w-full">
          <label htmlFor="category-service" className="text-xs">
            Promo
          </label>
          <Select
            size="sm"
            radius="sm"
            labelPlacement="outside"
            name="category-service"
            defaultSelectedKeys={[section]}
            onChange={handleOnChangeSection}
          >
            {sectionServices.map((section) => (
              <SelectItem key={section.value} value={section.value}>
                {section.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </section>
  );
};

export default TopSection;
