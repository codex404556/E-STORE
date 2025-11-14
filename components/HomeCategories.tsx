import React from "react";
import { Title } from "./ui/text";
import { Category } from "@/sanity.types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

const HomeCategories = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="bg-white border border-shop_light_yellow/20 my-10 md:my-20 p-5 lg:p-7 rounded-md">
      <Title className="border-b pb-3">Popular Categories</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-5">
        {categories?.map((item) => (
          <Link
            href={`/category/${item?.slug?.current}`}
            key={item?._id}
            className="bg-shop_light_bg flex items-center gap-3 hover:shadow-lg hoverEffect px-1 py-2 rounded-lg hover:scale-105 hover:bg-shop_light_yellow/70 cursor-pointer"
          >
            {item?.image && (
              <div className="overflow-hidden border border-shop_light_yellow/20 w-20 h-20 p-1">
                <Image
                  src={urlFor(item?.image).url()}
                  alt="category-image"
                  width={500}
                  height={500}
                  className="w-full h-full object-contain group-hover:scale-110 hoverEffect"
                />
              </div>
            )}
            <div className="space-y-2">
              <h3 className="text-base font-semibold">{item?.title}</h3>
              <p className="text-sm">
                <span className="font-bold text-shop_dark_yellow">
                  ({item?.productCount})
                </span>{" "}
                Available
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
