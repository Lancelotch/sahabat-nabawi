"use client";

import { categoryServices } from "@/app/_constant/target-visa.constant";
import { ProductCategoryEnum } from "@/app/_interface/product.interface";
import { Button, Select, SelectItem } from "@nextui-org/react";
import React, { ChangeEvent, FC, useState } from "react";
import { BiSearch } from "react-icons/bi";

interface Props {
  onSearch: (categoryService: ProductCategoryEnum) => void;
}

const Search: FC<Props> = ({ onSearch }) => {
  const [serviceSelected, setServiceSelected] = useState<ProductCategoryEnum>(
    ProductCategoryEnum.VISA
  );

  const handleOnChangeService = (e: ChangeEvent<HTMLSelectElement>) => {
    const service = e.target.value as ProductCategoryEnum;
    setServiceSelected(service);
  };

  return (
    <div className="bg-white p-2 pt-1 rounded-md bg-opacity-80">
      <label htmlFor="category-service" className="text-xs text-primary-500">
        Cari berdasarkan kategori
      </label>
      <div className="w-full flex flex-row rounded-lg overflow-hidden shadow">
        <Select
          size="sm"
          radius="none"
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
        <Button
          isIconOnly
          size="md"
          radius="none"
          onClick={() => onSearch(serviceSelected)}
          color="primary"
          className="h-8 border border-primary-500 shadow"
        >
          <BiSearch />
        </Button>
      </div>
    </div>
  );
};

export default Search;
