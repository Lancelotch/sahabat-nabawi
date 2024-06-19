"use client";

import {
  Product,
  ProductCategoryEnum,
} from "@/app/_interface/product.interface";
import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import Ribbon from "../Ribbon/Ribbon";
import { formatCurrencyIDR } from "@/app/_helper/currency.helper";
import { translateToTitleCase } from "@/app/_helper/string.helper";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Prop {
  product: Product;
  index?: number;
  onClickBuy: (productId: string) => void;
}

function VisaCard({ product, index, onClickBuy }: Prop) {
  const route = useRouter();
  const {
    base_price,
    name,
    minimum_qty,
    id,
    start_time,
    end_time,
    service_type,
    visa_type,
  } = product;

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: (index || 0) * 0.125,
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
    >
      <Card
        className="overflow-visible w-full"
        shadow="sm"
        isPressable
        onPress={() => route.push(`/product/${ProductCategoryEnum.VISA}/${id}`)}
        key={id}
      >
        <CardBody className="overflow-visible p-3 relative flex flex-col gap-1">
          <p className="text-left font-semibold text-sm mb-2 line-clamp-1">
            {name}
          </p>
          <p className="text-left text-sm">{`Tipe Service : ${translateToTitleCase(
            service_type as string
          )}`}</p>
          <p className="text-left text-sm">{`Tipe Visa : ${translateToTitleCase(
            visa_type as string
          )}`}</p>
          <p className="text-left text-sm">{`${start_time} - ${end_time}`}</p>
          <Ribbon text={`Min ${minimum_qty}`} />
        </CardBody>
        <CardFooter className="flex flex-col items-start gap-2 pt-0">
          <div className="flex flex-row justify-between items-center w-full pt-2 border-t-1">
            <p className="font-semibold text-[16px] text-green-700">
              {formatCurrencyIDR(base_price)}
            </p>
            <Button
              color="primary"
              size="sm"
              onClick={() => onClickBuy(product.id)}
            >
              Beli Sekarang
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default VisaCard;
