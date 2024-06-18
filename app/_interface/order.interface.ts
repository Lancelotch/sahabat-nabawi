import { ProductCategoryEnum } from "./product.interface";

export interface InitiateOrderRequest {
  product_id: string;
  product_category: string;
  quantity?: number;
}

export interface IGetOrderRequest {
  order_number: string;
}

export interface IManifestData {
  id: string;
  nationality: string;
  name: string;
  personal_identifier_number: string;
  passport_number: string;
  personal_identifier_url: string;
  passport_url: string;
  personal_photo_url: string;
}

export interface OrderResponse {
  order_number: string;
  total_quantity: number;
  total_price: number;
  status: "INITIATED";
  order_items: (TravelPackageProduct | VisaServiceProduct)[];

  title?: string;
  product_category: ProductCategoryEnum;
  product_name: string;

  payment_method: number;
  canceled_at?: string;
  paid_at?: string;
  created_at: string;
  updated_at: string;
}

export interface TravelPackageProduct {
  order_item_id: number;
  product: {
    id: string;
    category: string;
    name: string;
    travel_type: string;
    base_price: string;
    min_quantity: string;
  };
  total_quantity: number;
  total_amount: number;
  travel_start_time: string; // Format: DD MM YYYY in Indonesian language
  travel_end_time: string; // Format: DD MM YYYY in Indonesian language
  manifests_left: number;
  manifests_data: IManifestData[]; // In initiate order phase, this must be an empty array
}

export interface VisaServiceProduct {
  order_item_id: number;
  product: {
    id: string;
    category: string;
    name: string;
    service_type: string;
    visa_type: string;
    base_price: string;
    min_quantity: string;
  };
  total_quantity: number;
  total_amount: number;
  manifests_left: number;
  manifests_data: IManifestData[]; // In initiate order phase, this must be an empty array
}

export enum EFieldManifest {
  PERSONAL_IDENTIFIER = "personal_identifier",
  PERSONAL_PHOTO = "personal_photo",
  PASSPORT = "passport",
}

export interface IUploadManifestFileRequest {
  field: EFieldManifest;
  file_name: string;
  file_type: string;
  file: any;
}

export interface IUploadManifestFileResponse {
  image_url: string;
}
