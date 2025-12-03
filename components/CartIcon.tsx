"use client";

import useStore from "@/store";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import React from "react";

interface CartIconProps {
  isScrolled: boolean;
}

const CartIcon: React.FC<CartIconProps> = ({ isScrolled }) => {
  const { items } = useStore();
  return (
    <Link
      href={"/cart"}
      className={`group relative hoverEffect ${isScrolled ? "scale-80" : "scale-120"}`}
      
    >
      <ShoppingBag className="w-5 h-5 hover:text-shop_dark_yellow hoverEffect" />
      <span className="absolute -top-1 -right-1 bg-amber-200 rounded-full flex items-center justify-center text-xs font-semibold text-black h-3.5 w-3.5">
        {items?.length ? items?.length : 0}
      </span>
    </Link>
  );
};

export default CartIcon;
