"use client";

import React, { FC } from "react";
import {
  Product,
  ProductCategoryEnum,
} from "@/app/_interface/product.interface";
import dynamic from "next/dynamic";
import { updateOpenModal } from "@/app/_redux/auth/auth-slice";
import { selectAuth } from "@/app/_redux/auth/selectors";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { postInitiateOrder } from "@/app/_api/server-action/order/initiate-order";
import { OrderResponse } from "@/app/_interface/order.interface";
import { ApiResponse } from "@/app/_interface/general.interface";

const VisaCard = dynamic(() => import("@/app/_components/VisaCard/VisaCard"));
const PackageTravelCard = dynamic(
  () => import("@/app/_components/PackageTravelCard/PackageTravelCard")
);

interface Props {
  products: Product[];
  category: ProductCategoryEnum;
}

const ListingCard: FC<Props> = ({ category, products }) => {
  const route = useRouter();
  const auth = useSelector(selectAuth);
  const dispatch = useDispatch();

  const handleBuy = async (productId: string) => {
    if (!auth.isAuthenticated) {
      dispatch(updateOpenModal(true));
      return;
    }
    const response = await postInitiateOrder({
      product_category: ProductCategoryEnum.VISA_SERVICE,
      product_id: productId,
    });

    if (response.ok) {
      const successResponse = response as ApiResponse<OrderResponse>;
      const { order_number } = successResponse.data;
      route.push(`/order/${order_number}`);
    }
  };

  return (
    <section className="p-6 flex flex-col gap-8">
      {products.map((product: Product, index: number) =>
        category === ProductCategoryEnum.VISA ? (
          <VisaCard
            key={product.id}
            product={product}
            index={index}
            onClickBuy={handleBuy}
          />
        ) : (
          <PackageTravelCard
            key={product.id}
            product={product}
            index={index}
            onClickBuy={handleBuy}
          />
        )
      )}
    </section>
  );
};

export default ListingCard;
