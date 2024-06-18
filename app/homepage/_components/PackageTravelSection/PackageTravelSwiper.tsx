"use client";

import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar, A11y, Pagination } from "swiper/modules";
import { Product } from "@/app/_interface/product.interface";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@/app/_redux/auth/selectors";
import { updateOpenModal } from "@/app/_redux/auth/auth-slice";

const PackageTravelCard = dynamic(
  () => import("@/app/_components/PackageTravelCard/PackageTravelCard")
);

interface Props {
  products: Product[];
}

const PackageTravelSwiper: FC<Props> = ({ products }) => {
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  const handleBuy = (productId: string) => {
    if (!auth.isAuthenticated) dispatch(updateOpenModal(true));
  };
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={16}
      slidesPerView={1.1}
      navigation
    >
      {products.map((product: Product, index) => (
        <SwiperSlide key={product.id} className="p-[1px]">
          <PackageTravelCard
            key={product.id}
            product={product}
            index={index}
            onClickBuy={handleBuy}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default PackageTravelSwiper;
