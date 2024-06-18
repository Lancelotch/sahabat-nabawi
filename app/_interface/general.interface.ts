import {
  ProductSectionEnum,
  ProductSubCategoryEnum,
} from "./product.interface";

export interface GeneralOption {
  label: string;
  value: string;
}

export interface ApiResponse<T> {
  ok: boolean;
  data: T;
}

export interface InvalidResponse {
  ok: boolean;
  err_code: string;
  err_msg: string;
}

export interface IPagination {
  items: number;
  total_items: number;
  current_page: number;
  last_page: number;
}

export interface IPathParam {
  params?: {
    category?: string;
    id?: string;
    orderItemId?: string;
    orderNumber?: string;
  };
  searchParams?: {
    sub_category: ProductSubCategoryEnum;
    section: ProductSectionEnum;
  };
}

export interface ITableColumn {
  name: string;
  uid: string;
}

export interface ICountriesResponse {
  userCountryCode: string;
  countries: GeneralOption[];
}

export type ImageUploaderProps = {
  image?: string;
  name: string;
  label: string;
  onChangeImage: (name: string, file: File) => void;
  errorMessage?: string;
  loading?: number;
  subTitlePosition?: "top" | "bottom";
  ref?: any;
  register?: any;
};
