"use clint"
import { BRANDS_QUERYResult, Category } from "@/sanity.types";
import React from "react";
import Container from "./Container";
import { Title } from "./ui/text";
import CatergoryList from "./filters/CatergoryList";
import PriceList from "./filters/PriceList";
import BrandList from "./filters/BrandList";

interface Props{
  categories: Category[];
  brands: BRANDS_QUERYResult;
}

const Shop = ({categories, brands}: Props) => {
  return <div className="border-t">
    <Container>
      <div className="sticky top-0 z-10 mb-5 ">
        <div className="flex items-center justify-between">
          <Title className="text-lg">Get the products as your needs</Title>
          <button className="text-shop_dark_yellow underline text-sm mt-2 font-medium hover:text-red-500 hoverEffect">Reset Filters</button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-5 border-t border-t-shop_dark_yellow">
        <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-hidden md:min-w-64 pb-5 md:border-r-2 border-r-shop_dark_yellow">
          <CatergoryList categories={categories} />
          <PriceList />
          <BrandList />
        </div>
        <div className="">products</div>

      </div>
    </Container>
  </div>;
};

export default Shop;
