"use client";

import { fetchProducts } from "@/app/_api/server-action/fetch-product";
import {
  Product,
  ProductCategoryEnum,
  ResponseProducts,
} from "@/app/_interface/product.interface";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import PackageTravelCard from "../PackageTravelCard/PackageTravelCard";
import VisaCard from "../VisaCard/VisaCard";
import { useParams } from "next/navigation";

interface Props {
  category: ProductCategoryEnum;
}

let page = 2;

const LoadMore: FC<Props> = ({ category }) => {
  const { ref, inView } = useInView();
  const [products, setProducts] = useState<Product[]>([]);
  const param = useParams();

  useEffect(() => {
    async function fetchMyAPI() {
      const response: ResponseProducts = await fetchProducts({
        page: page,
        limit: 10,
        category,
      });

      if (response.ok) {
        setProducts((prev) => [...prev, ...response.data.products]);
        page++;
      }
    }
    if (inView) fetchMyAPI();
  }, [inView]);

  return (
    <>
      <section className="p-6 flex flex-col gap-8">
        {products &&
          products.map((product: Product, index: number) =>
            param.category === ProductCategoryEnum.VISA ? (
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
      <section ref={ref} className="flex justify-center items-center pb-6">
        <Image
          src="../../spinner.svg"
          alt="spinner"
          width={64}
          height={64}
          className="object-contain"
        />
      </section>
    </>
  );
};

export default LoadMore;
