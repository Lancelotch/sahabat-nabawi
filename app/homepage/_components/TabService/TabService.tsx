"use client";

import React, { FC } from "react";
import { Tabs, Tab, Pagination } from "@nextui-org/react";
import { FaCcVisa, FaPlaneDeparture } from "react-icons/fa";
import { Product } from "@/app/_interface/product.interface";
import VisaCard from "@/app/_components/VisaCard/VisaCard";
import PacketCard from "@/app/_components/PacketCard/PacketCard";

interface Props {
  products: Product[];
  pagination: Pagination;
}

const TabService: FC<Props> = ({ products }) => {
  return (
    <div className="flex w-full flex-col">
      <Tabs
        aria-label="Options"
        color="primary"
        variant="bordered"
        fullWidth
        className="pb-2"
      >
        <Tab
          key="photos"
          className="py-4 px-0"
          title={
            <div className="flex items-center space-x-2">
              <FaPlaneDeparture />
              <span className="text-sm font-normal">Paket Umrah & Haji</span>
            </div>
          }
        >
          <section className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6">
            {products
              .filter((filter) => filter.product_category === "travel_package")
              .map((product: Product) => (
                <PacketCard key={product.id} product={product} />
              ))}
          </section>
        </Tab>
        <Tab
          key="music"
          className="py-4 px-0"
          title={
            <div className="flex items-center space-x-2">
              <FaCcVisa />
              <span className="text-base font-normal">Layanan Visa</span>
            </div>
          }
        >
          <section className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6">
            {products
              .filter((filter) => filter.product_category === "visa_service")
              .map((product: Product) => (
                <VisaCard key={product.id} product={product} />
              ))}
          </section>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TabService;
