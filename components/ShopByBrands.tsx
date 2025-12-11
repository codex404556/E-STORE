import React from "react";
import { Title } from "./ui/text";
import Link from "next/link";
import { getAllBrands } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";
import { Brand } from "@/sanity.types";

const orderData = [
  {
    title: "Free Delivery",
    description: "Free shipping over $100",
    icon: <Truck size={45} />,
  },
  {
    title: "Free Return",
    description: "Free return over $100",
    icon: <GitCompareArrows size={45} />,
  },
  {
    title: "Customer Support",
    description: "Friendly 7/24 customer support",
    icon: <Headset size={45} />,
  },
  {
    title: "Money Back",
    description: "Quality checked by our team",
    icon: <ShieldCheck size={45} />,
  },
];

const ShopByBrands = async () => {
  const brands = await getAllBrands();
  return (
    <div className="lg:mb-25 bg-shop_light_bg p-5 lg:p-7 mx-16 rounded-md">
      <div className="flex items-center justify-between mb-10">
        <Title>Shop By Brands</Title>
        <Link
          href={"/shop"}
          className="px-3 py-1 text-xs font-semibold rounded-full bg-darkColor hover:bg-shop_light_yellow hover:scale-105 text-white hover:text-darkColor hoverEffect"
        >
          View All
        </Link>
      </div>
      <div className="flex flex-wrap md:flex-nowrap justify-between  gap-1.5">
        {brands?.slice(0, 8).map((brand: Brand) => (
          <Link
            className="bg-white w-50 h-24 flex items-center justify-center rounded-md overflow-hidden hover:shadow-lg shadow-shop_light_yellow/20 hoverEffect group"
            key={brand?._id}
            href={{ pathname: "/shop", query: { brand: brand?.slug?.current } }}
          >
            {brand?.image && (
              <Image
                src={urlFor(brand?.image).url()}
                alt="brand-image"
                width={250}
                height={250}
                className="group-hover:scale-110 hoverEffect object-contain w-30 h-20"
              />
            )}
          </Link>
        ))}
      </div>
      <div className="flex flex-wrap md:flex-nowrap items-cente justify-between gap-7 mt-10 md:gap-4 shadow-lg rounded-md py-5 px-5">
        {orderData.map((brand, index) => (
          <div
            key={brand.title}
            className="flex items-center justify-between gap-3 mb-5 mt-7 group"
          >
            <span className="text-lightColor hover:scale-110 group-hover:text-shop_dark_yellow hoverEffect">
              {brand?.icon}
            </span>
            <div className="">
              <p className="text-xs font-semibold text-lightColor capitalize group-hover:text-shop_dark_yellow">
                {brand?.title}
              </p>
              <p className="text-xs font-medium text-lightColor/80">
                {brand?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByBrands;
