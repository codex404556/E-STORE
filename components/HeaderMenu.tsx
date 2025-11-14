"use client";

import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const HeaderMenu = ({ isScrolled }: { isScrolled: boolean }) => {
  const pathname = usePathname();
  return (
    <div className="hidden md:inline-flex w-1/3 items-center gap-7 text-sm font-semibold text-lightColor">
      {headerData?.map((item) => (
        <Link
          className={` group relative hoverEffect ${isScrolled ? "scale-100 hover:text-shop_dark_yellow" : "scale-110 "}`}
          key={item?.title}
          href={item?.href}
        >
          {item?.title}
          <span
            className={`absolute -bottom-0.5 left-1/2 w-0 h-0.5  group-hover:w-1/2 hoverEffect group-hover:left-0 ${pathname === item?.href && "w-1/2"} ${isScrolled ? "bg-shop_light_yellow" : "bg-gray-600"}`}
          />
          <span
            className={`absolute -bottom-0.5 right-1/2 w-0 h-0.5 group-hover:w-1/2 hoverEffect group-hover:right-0 ${pathname === item?.href && "w-1/2"} ${isScrolled ? "bg-shop_light_yellow" : "bg-gray-600"}`}
          />
        </Link>
      ))}
    </div>
  );
};

export default HeaderMenu;
