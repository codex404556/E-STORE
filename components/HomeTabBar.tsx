import { productType } from "@/constants/data";
import Link from "next/link";
import React from "react";

interface Props {
  selectedTap: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabBar = ({ selectedTap, onTabSelect }: Props) => {
  console.log(selectedTap);
  return (
    <div className="flex items-center justify-between flex-wrap gap-5">
      <div className="flex items-center gap-3 text-sm font-semibold">
        {productType?.map((item) => (
          <button
            onClick={() => onTabSelect(item?.title)}
            key={item?.title}
            className={`border border-shop_light_yellow/50 px-4 py-1.5 md:px-6 md:py-2 bg-darkColor hover:text-black hover:bg-shop_light_yellow hoverEffect rounded-full ${selectedTap === item?.title ? "bg-shop_light_yellow" : "border border-shop_light_yellow/50 px-4 py-1.5 md:px-6 md:py-2 bg-darkColor text-white hover:text-black hover:bg-shop_light_yellow hoverEffect rounded-full"}`}
          >
            {item?.title}
          </button>
        ))}
      </div>
      <Link
        className="border border-shop_light_yellow/50 px-4 py-1.5 md:px-6 md:py-2 bg-darkColor text-white hover:text-black hover:bg-shop_light_yellow hoverEffect rounded-full"
        href={"shop"}
      >
        See All
      </Link>
    </div>
  );
};

export default HomeTabBar;
