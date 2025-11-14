import { Product } from "@/sanity.types";
import { Heart } from "lucide-react";
import Link from "next/link";
import React from "react";

const AddToFavorites = ({
  showProduct = false,
  product,
}: {
  showProduct?: boolean;
  product: Product | null;
}) => {
  return (
    <>
      {!showProduct ? (
        <Link
          href={"/wishlist"}
          className={`absolute top-1 right-1 z-10 opacity-0 group-hover:opacity-100 hoverEffect`}
        >
          <button className="p-1.5 rounded-full bg-shop_light_yellow/60 hover:scale-110 hoverEffect cursor-pointer">
            <Heart size={15} />
          </button>
        </Link>
      ) : (
        <button className="rounded-md ">
          <Heart
            size={45}
            className="bg-shop_light_yellow rounded-full hover:scale-110 p-2 hoverEffect"
          />
        </button>
      )}
    </>
  );
};

export default AddToFavorites;
