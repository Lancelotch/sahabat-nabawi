import { fetchProducts } from "@/app/_api/server-action/fetch-product";
import { IPathParam } from "@/app/_interface/general.interface";
import {
  Product,
  ProductCategoryEnum,
  ResponseProducts,
} from "@/app/_interface/product.interface";
import dynamic from "next/dynamic";

const TopSection = dynamic(
  () => import("../_components/TopSection/TopSection"),
  {
    ssr: false,
  }
);

const VisaCard = dynamic(() => import("@/app/_components/VisaCard/VisaCard"), {
  ssr: false,
});

const PackageTravelCard = dynamic(
  () => import("@/app/_components/PackageTravelCard/PackageTravelCard"),
  { ssr: false }
);

const LoadMore = dynamic(() => import("@/app/_components/LoadMore/LoadMore"), {
  ssr: false,
});

async function SearchCategory({ params, searchParams }: IPathParam) {
  const { category } = params;
  const { section, sub_category } = searchParams;
  const categoryProduct =
    category === ProductCategoryEnum.VISA
      ? ProductCategoryEnum.VISA_SERVICE
      : ProductCategoryEnum.TRAVEL_PACKAGE;

  const response: ResponseProducts = await fetchProducts({
    page: 1,
    limit: 10,
    category: categoryProduct,
    section,
    sub_category,
  });

  return (
    <div>
      <TopSection />
      <section className="p-6 flex flex-col gap-8">
        {response.data.products.map((product: Product, index: number) =>
          category === ProductCategoryEnum.VISA ? (
            <VisaCard key={product.id} product={product} index={index} />
          ) : (
            <PackageTravelCard
              key={product.id}
              product={product}
              index={index}
            />
          )
        )}
      </section>
      {response.ok && (
        <LoadMore
          category={categoryProduct}
          section={section}
          sub_category={sub_category}
        />
      )}
    </div>
  );
}

export default SearchCategory;
