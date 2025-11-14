import React from "react";
import Logo from "./Logo";
import SocialMedia from "./SocialMedia";
import { SubText, SubTitle } from "./ui/text";
import { categoryLinks, QuickLinks } from "@/constants/data";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const BottomFooter = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9">
      <div className="flex flex-col gap-12 justify-center w-50 mb-35">
        <Logo />
        <SubText className="">
          Discover premium gadgets and electronics designed to elevate your
          everyday life.
        </SubText>
        <SocialMedia
          className="text-darkColor/60"
          iconClassName="border-darkColor/20 hover:border-shop_light_yellow hover:text-shop_dark_yellow"
          tooltipClassName="bg-darkColor text-white"
        />
      </div>
      <div className="">
        <SubTitle>Quick Links</SubTitle>
        <ul className="space-y-3 mt-4">
          {QuickLinks?.map((item) => (
            <li key={item?.title}>
              <Link
                className="hover:text-lightOrange hoverEffect font-medium"
                href={item?.href}
              >
                {item?.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="">
        <SubTitle>Category</SubTitle>
        <ul className="space-y-3 mt-4">
          {categoryLinks?.map((item) => (
            <li key={item?.title}>
              <Link
                className="hover:text-lightOrange hoverEffect font-medium"
                href={`/category/${item?.href}`}
              >
                {item?.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4">
        <SubText>Subscribe to our newslatter to receive update and exclusive offers</SubText>
        <form className="space-y-3">
          <Input placeholder="Enter Your Email" type="email"/>
          <Button className="w-full">Subscribe</Button>
        </form>
      </div>
    </div>
  );
};

export default BottomFooter;
