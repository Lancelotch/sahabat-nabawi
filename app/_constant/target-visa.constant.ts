import { GeneralOption } from "../_interface/general.interface";
import { ProductCategoryEnum } from "../_interface/product.interface";

export const categoryServices: Array<GeneralOption> = [
  {
    label: "Layanan Visa",
    value: ProductCategoryEnum.VISA,
  },
  {
    label: "Paket Umrah & Haji",
    value: ProductCategoryEnum.TRAVEL,
  },
];
