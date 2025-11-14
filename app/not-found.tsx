import Logo from "@/components/Logo";
import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="bg-darkColor flex items-center justify-center px-4">
      <div className="">
        <div className="">
          <Logo />
          <h2>Looking for something?</h2>
          <p>
            we&apos;re sorry. The Web address you entered is not a functioning
            page on oursite!
          </p>
        </div>
        <div className="">
          <Link className="w-full bg-darkColor/90 text-white hover:bg-shop_light_yellow hover:text-black hoverEffect hover:scale-105 " href={"/"}>Go to E-Store&apos;s home page</Link>
          <Link className="font-bold" href={"/help"}>Help</Link>
        </div>
        <p>Need help? Visit Help section or connect us by clicking{" "} <span><Link href={"/contact"}>here</Link></span>
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
