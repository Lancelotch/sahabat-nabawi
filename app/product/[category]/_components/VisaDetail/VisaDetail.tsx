"use client";

import {
  IVisaDetail,
  ProductCategoryEnum,
} from "@/app/_interface/product.interface";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface Props {
  product: IVisaDetail;
}

const VisaDetail: FC<Props> = ({ product }) => {
  const route = useRouter();
  const { id, description } = product;
  return (
    <div>
      <div className="p-6 flex flex-col gap-8">{description}</div>
      <Button
        color="primary"
        size="sm"
        onClick={() => route.push(`/order/${ProductCategoryEnum.VISA}/${id}`)}
      >
        Beli Sekarang
      </Button>
    </div>
  );
};

export default VisaDetail;
