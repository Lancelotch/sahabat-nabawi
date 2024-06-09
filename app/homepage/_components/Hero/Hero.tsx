"use client";
import React from "react";
import Search from "@/app/_components/Search/Search";
import { ProductCategoryEnum } from "@/app/_interface/product.interface";
import { useRouter } from "next/navigation";

function Hero() {
  const router = useRouter();
  const handleSearch = (service: ProductCategoryEnum) => {
    router.push(`/search/${service}`);
  };
  return (
    <header className="bg-hero bg-center bg-cover bg-no-repeat w-full h-40 relative">
      <div className="w-full absolute bottom-3 px-6">
        <Search onSearch={handleSearch} />
      </div>
    </header>
  );
}

export default Hero;
