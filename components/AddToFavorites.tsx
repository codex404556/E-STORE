"use client";

import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";
import useStore from "@/store";
import { Heart } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  showProduct: false | true;
  product: Product | null;
  className: string;
}

const AddToFavorites = ({ showProduct, product, className }: Props) => {
  const { favoriteProduct, addToFavorite } = useStore();

  const existingProduct = favoriteProduct?.some(
    (item) => item?._id === product?._id
  );

  const handleFavorite = () => {
    if (product?._id) {
      addToFavorite(product).then(() =>
        toast.success(
          existingProduct
            ? "Product Removed Successfully!"
            : "Product Added Successfully!"
        )
      );
    }
  };
  return (
    <>
      {!showProduct ? (
        <div
          className={cn(
            `absolute top-1 right-1 z-10 opacity-0 group-hover:opacity-60 hoverEffect ${existingProduct && "opacity-100 group-hover:opacity-100"}`,
            className
          )}
        >
          <button
            onClick={handleFavorite}
            className="p-1.5 rounded-full bg-shop_light_yellow hover:scale-110 hoverEffect cursor-pointer"
          >
            <Heart size={15} />
          </button>
        </div>
      ) : (
        <button
          onClick={handleFavorite}
          className={cn(
            `bg-shop_light_yellow rounded-full p-2 hover:scale-110 text-lightColor opacity-70 hover:opacity-90 hoverEffect ${existingProduct && "opacity-100 group-hover:opacity-100"}`,
            className
          )}
        >
          <Heart size={25} className="" />
        </button>
      )}
    </>
  );
};

export default AddToFavorites;
