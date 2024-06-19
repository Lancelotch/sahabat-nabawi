import { ApiResponse, IPagination } from "./general.interface";

export interface Departure {
  airport: string;
  date: string;
  duration: string;
  airline?: string;
}

export interface Hotel {
  name: string;
  rate: number;
}

export interface Hotels {
  mecca: Hotel;
  medina: Hotel;
}

export interface Product {
  id: string;
  product_category: ProductCategoryEnum;
  name: string;
  base_price: number;
  thumb_url: string;
  departure?: Departure;
  hotels?: Hotels;
  minimum_qty?: number;
  service_type?: ServiceTypeEnum;
  visa_type?: VisaTypeEnum;
  start_time?: string;
  end_time?: string;
}

export interface Parameters {
  page: number;
  section: string;
}

export interface TravelTime {
  started_at: string;
  ended_at: string;
}

export interface Route {
  airline: string;
  airport: string;
}

// Product Detail

export interface Routes {
  departure: Route;
  return: Route;
}

export interface Hotel {
  name: string;
  rate: number;
}

export interface Hotels {
  mecca: Hotel;
  medina: Hotel;
}

export interface ProductDetail {
  id: string;
  product_category: string;
  name: string;
  base_price: number;
  minimum_qty: number;
  thumb_url: string;
  requirement_manifests?: string[];
  travel_time?: TravelTime;
  routes?: Routes;
  hotels?: Hotels;
  included_facilities?: string[];
  excluded_facilities?: string[];
  notes: string[];
}

export interface IFileSpecification {
  extensions: string[];
  size: number;
}

export interface IRequirementManifestsItemData {
  form_text: string;
  db_field: string;
  type: string;
  file_specification?: IFileSpecification;
}

export interface IRequirementManifestsItem {
  display_text: string;
  required: boolean;
  description?: string;
  data: IRequirementManifestsItemData[];
}

export interface IRequirementManifests {
  nationality: IRequirementManifestsItem;
  passport: IRequirementManifestsItem;
  personal_id: IRequirementManifestsItem;
  personal_photo: IRequirementManifestsItem;
}

export interface IVisaDetail {
  id: string;
  service_type: string;
  visa_type: string;
  name: string;
  base_price: number;
  minimum_qty: number;
  start_time: string;
  end_time: string;
  requirement_manifests: IRequirementManifests[];
  description: string;
  notes: string[];
}

export interface VisaService {
  id: string;
  product_category: string;
  name: string;
  visa_type?: VisaTypeEnum;
  base_price: number;
  minimum_qty: number;
  requirement_manifests: string[];
  description?: string; // Optional
  notes: string | null;
}

export interface ResponseProducts
  extends ApiResponse<{ pagination: IPagination; products: Product[] }> {}

export interface RequestProducts {
  page?: number;
  limit?: number;
  section?: ProductSectionEnum;
  category?: ProductCategoryEnum;
  sub_category?: ProductSubCategoryEnum;
}

export interface IRequestProductDetail {
  category: string;
  id: string;
}

export enum ProductSectionEnum {
  PROMO = "PROMO",
  SOON = "SOON",
  LATEST = "LATEST",
}

export enum ProductCategoryEnum {
  TRAVEL = "travel",
  VISA = "visa",
  TRAVEL_PACKAGE = "TRAVEL_PACKAGE",
  VISA_SERVICE = "VISA_SERVICE",
}

export enum ServiceTypeEnum {
  ALL_IN = "ALL_IN",
  CALLING_VISA = "CALLING_VISA",
}

export enum VisaTypeEnum {
  HAJJ_VISA = "HAJJ_VISA",
  UMRAH_VISA = "UMRAH_VISA",
  TOURIST_VISA = "TOURIST_VISA",
  WORK_VISA = "WORK_VISA",
  BUSINESS_VISA = "BUSINESS_VISA",
  EDUCATION_VISA = "EDUCATION_VISA",
}

export enum ProductSubCategoryEnum {
  TOURIST_VISA = "TOURIST_VISA",
  UMRAH_VISA = "UMRAH_VISA",
  HAJJ_VISA = "HAJJ_VISA",
  WORK_VISA = "WORK_VISA",
  BUSINESS_VISA = "BUSINESS_VISA",
  EDUCATION_VISA = "EDUCATION_VISA",
}
