"use client";

import {
  Product,
  ProductCategoryEnum,
} from "@/app/_interface/product.interface";
import { Button, Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Ribbon from "../Ribbon/Ribbon";
import { formatCurrencyIDR } from "@/app/_helper/currency.helper";
import { LuHotel } from "react-icons/lu";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Prop {
  product: Product;
  index: number;
}

function PackageTravelCard({ product, index }: Prop) {
  const route = useRouter();
  const { base_price, name, departure, hotels, id } = product;
  const { duration, airport, airline } = departure || {};
  const { mecca } = hotels || {};

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
        delay: index * 0.125,
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
    >
      <Card
        className="overflow-visible w-full"
        shadow="sm"
        isPressable
        onPress={() =>
          route.push(`/product/${ProductCategoryEnum.TRAVEL}/${id}`)
        }
      >
        <CardBody className="overflow-visible p-0 relative">
          <Image
            shadow="sm"
            radius="lg"
            width="100%"
            alt={name}
            className="w-full object-cover h-40 rounded-t-md rounded-e-none rounded-b-none"
            src={
              "https://lp.waroengslide.com/wp-content/uploads/2023/05/Slide2.jpg"
            }
          />
          <div className="flex flex-col gap-2 p-3">
            <p className="text-left font-semibold text-sm mb-2 line-clamp-1 mb-2">
              {name}
            </p>
            <p className="flex flex-row items-center gap-2 text-sm">
              <LuHotel /> {mecca?.name}
            </p>
            <p className="flex flex-row items-center gap-2 text-sm">
              <BiSolidPlaneAlt /> {airline}
            </p>
            <p className="flex flex-row items-center gap-2 text-sm">
              <FaLocationDot /> {airport}
            </p>
            {duration && <Ribbon text={duration} />}
          </div>
        </CardBody>
        <CardFooter className="flex flex-col items-start gap-2 pt-0">
          <div className="flex flex-row justify-between items-center w-full pt-2 border-t-1">
            <p className="font-semibold text-[16px] text-green-700">
              {formatCurrencyIDR(base_price)}
            </p>
            <Button color="primary" size="sm">
              Beli Sekarang
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default PackageTravelCard;
