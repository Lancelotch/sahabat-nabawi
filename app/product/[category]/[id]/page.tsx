import { fetchProductDetail } from "@/app/_api/server-action/fetch-product-detail";
import { ApiResponse, IPathParam } from "@/app/_interface/general.interface";
import {
  IRequestProductDetail,
  IVisaDetail,
  ProductCategoryEnum,
} from "@/app/_interface/product.interface";
import VisaDetail from "../_components/VisaDetail/VisaDetail";
import Toast from "@/app/_components/Toast/TextButton";
import PackageDetail from "../_components/PackageDetaill/PackageDetaill";

async function ProductDetail({ params }: IPathParam) {
  const response = await fetchProductDetail(params as IRequestProductDetail);
  if (!response.ok) {
    return (
      <Toast
        type="error"
        message={`${params.category} detail tidak ditemukan`}
      />
    );
  }

  const productDetail =
    params.category === ProductCategoryEnum.VISA ? (
      <VisaDetail product={(response as ApiResponse<IVisaDetail>).data} />
    ) : (
      <PackageDetail product={(response as ApiResponse<IVisaDetail>).data} />
    );

  return <div className="p-6 flex flex-col gap-8">{productDetail}</div>;
}

export default ProductDetail;
