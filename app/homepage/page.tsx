import { ProductCategoryEnum } from "../_interface/product.interface";
import { Suspense, lazy } from "react";
import SkeletonVisa from "./_components/VisaSection/SkeletonVisa";
import PackageTravelSkeleton from "./_components/PackageTravelSection/PackageTravelSkeleton";
const VisaSection = lazy(() => import("./_components/VisaSection/VisaSection"));

const PackageTravelSection = lazy(
  () => import("./_components/PackageTravelSection/PackageTravelSection")
);

async function Home() {
  return (
    <div className="p-6 flex flex-col gap-8">
      <section>
        <div className="mb-2 flex justify-between items-center">
          <p className="text-base font-semibold">Layanan Visa</p>
          <a
            className="text-primary text-base"
            href={`/search/${ProductCategoryEnum.VISA}`}
          >
            Selengkapnya
          </a>
        </div>
        <div className="min-h-[179px] w-full">
          <Suspense fallback={<SkeletonVisa />}>
            <VisaSection />
          </Suspense>
        </div>
      </section>
      <section>
        <div className="mb-2 flex justify-between items-center">
          <p className="text-base font-semibold">Layanan Visa</p>
          <a
            className="text-primary text-base"
            href={`/search/${ProductCategoryEnum.TRAVEL}`}
          >
            Selengkapnya
          </a>
        </div>
        <div className="min-h-[351px] w-full">
          <Suspense fallback={<PackageTravelSkeleton />}>
            <PackageTravelSection />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

export default Home;
