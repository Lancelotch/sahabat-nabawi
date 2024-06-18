"use client";

import React, { ChangeEvent, FC, useState } from "react";
import { ProductCategoryEnum } from "@/app/_interface/product.interface";
import { useRouter } from "next/navigation";
import { categoryServices } from "@/app/_constant/target-visa.constant";
import { Select, SelectItem } from "@nextui-org/react";

const TopSection = () => {
  const [serviceSelected, setServiceSelected] = useState<ProductCategoryEnum>(
    ProductCategoryEnum.VISA
  );

  const handleOnChangeService = (e: ChangeEvent<HTMLSelectElement>) => {
    const service = e.target.value as ProductCategoryEnum;
    setServiceSelected(service);
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
          defaultSelectedKeys={[serviceSelected]}
          onChange={handleOnChangeService}
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
            Service
          </label>
          <Select
            size="sm"
            radius="sm"
            labelPlacement="outside"
            name="category-service"
            defaultSelectedKeys={[serviceSelected]}
            onChange={handleOnChangeService}
          >
            {categoryServices.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="w-full">
          <label htmlFor="category-service" className="text-xs">
            Section
          </label>
          <Select
            size="sm"
            radius="sm"
            labelPlacement="outside"
            name="category-service"
            defaultSelectedKeys={[serviceSelected]}
            onChange={handleOnChangeService}
          >
            {categoryServices.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </Select>
        </div>
      </div>
    </section>
  );
};

export default TopSection;
