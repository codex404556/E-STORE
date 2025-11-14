import { logo } from "@/images";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface LogoProps {
  isScrolled?: boolean;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className, isScrolled }) => {
  return (
    <Link href={"/"}>
      <div
        className={`flex items-center hoverEffect ${isScrolled ? "scale-80" : "scale-110"}`}
      >
        <Image src={logo} alt="logo" className="w-9 h-9 mb-3" />
        <h2
          className={cn(
            "text-xl md:text-2xl font-black font-sans tracking-wider uppercase line-clamp-1",
            className
          )}
        >
          E-ST
          <span
            className={`hover:text-black hoverEffect ${isScrolled ? "text-shop_light_yellow" : "text-darkColor"}`}
          >
            ORE
          </span>
        </h2>
      </div>
    </Link>
  );
};

export default Logo;
