import { GeneralOption } from "../_interface/general.interface";
import {
  ProductCategoryEnum,
  ProductSectionEnum,
  ProductSubCategoryEnum,
} from "../_interface/product.interface";

export const categoryServices: Array<GeneralOption<ProductCategoryEnum>> = [
  {
    label: "Layanan Visa",
    value: ProductCategoryEnum.VISA,
  },
  {
    label: "Paket Umrah & Haji",
    value: ProductCategoryEnum.TRAVEL,
  },
];

export const subCategoryServices: Array<GeneralOption<ProductSubCategoryEnum>> =
  [
    {
      label: "Business Visa",
      value: ProductSubCategoryEnum.BUSINESS_VISA,
    },
    {
      label: "Education Visa",
      value: ProductSubCategoryEnum.EDUCATION_VISA,
    },
    {
      label: "Hajj Visa",
      value: ProductSubCategoryEnum.HAJJ_VISA,
    },
    {
      label: "Tourist Visa",
      value: ProductSubCategoryEnum.TOURIST_VISA,
    },
    {
      label: "Umrah Visa",
      value: ProductSubCategoryEnum.UMRAH_VISA,
    },
    {
      label: "Work Visa",
      value: ProductSubCategoryEnum.WORK_VISA,
    },
  ];

export const sectionServices: Array<GeneralOption<ProductSectionEnum>> = [
  {
    label: "Latest",
    value: ProductSectionEnum.LATEST,
  },
  {
    label: "Promo",
    value: ProductSectionEnum.PROMO,
  },
  {
    label: "Soon",
    value: ProductSectionEnum.SOON,
  },
];
