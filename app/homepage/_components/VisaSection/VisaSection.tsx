"use client";

import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Scrollbar, A11y, Pagination } from "swiper/modules";
import VisaCard from "@/app/_components/VisaCard/VisaCard";
import {
  Product,
  ProductCategoryEnum,
} from "@/app/_interface/product.interface";
import { Button } from "@nextui-org/react";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface Props {
  products: Product[];
}

const VisaSection: FC<Props> = ({ products }) => {
  const router = useRouter();
  if (!products || products.length < 1) return null;

  const handleShowAll = (service: ProductCategoryEnum) => {
    router.push(`/search/${service}`);
  };

  return (
    <section>
      <div className="mb-2 flex justify-between items-center">
        <p className="text-base font-semibold">Layanan Visa</p>
        <Button
          endContent={<FaArrowRight />}
          variant="light"
          size="sm"
          onClick={() => handleShowAll(ProductCategoryEnum.VISA)}
        >
          Selengkapnya
        </Button>
      </div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={16}
        slidesPerView={1.1}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {products.map((product: Product) => (
          <SwiperSlide key={product.id} className="p-[1px]">
            <VisaCard key={product.id} product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default VisaSection;
