import dynamic from "next/dynamic";
import { fetchProducts } from "../_api/server-action/fetch-product";
import {
  ProductCategoryEnum,
  ResponseProducts,
} from "../_interface/product.interface";
const VisaSection = dynamic(
  () => import("./_components/VisaSection/VisaSection"),
  { ssr: false }
);

const PackageTravelSection = dynamic(
  () => import("./_components/PackageTravelSection/PackageTravelSection"),
  { ssr: false }
);

async function Home() {
  const travelPackage: ResponseProducts = await fetchProducts({
    page: 1,
    limit: 10,
    category: ProductCategoryEnum.TRAVEL_PACKAGE,
  });

  const visaService: ResponseProducts = await fetchProducts({
    page: 1,
    limit: 10,
    category: ProductCategoryEnum.VISA_SERVICE,
  });

  return (
    <div className="p-6 flex flex-col gap-8">
      <VisaSection products={visaService.data.products} />
      <PackageTravelSection products={travelPackage.data.products} />
    </div>
  );
}

export default Home;
