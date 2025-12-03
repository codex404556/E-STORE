import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import useStore from "@/store";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AddToFavorites from "./AddToFavorites";
import { Trash } from "lucide-react";
import QuantityButton from "./QuantityButton";
import PriceFormatter from "./PriceFormatter";
import toast from "react-hot-toast";

// Type that allows categories to be either reference objects or strings (dereferenced)
type ProductWithFlexibleCategories = Omit<Product, "categories"> & {
  categories?: Product["categories"] | (string | null)[] | null;
};

interface Props {
  product: Product | ProductWithFlexibleCategories;
}

const CartItem = ({ product }: Props) => {
  const { getItemCount } = useStore();
  const itemCount = getItemCount(product._id);
  const deleteProduct = useStore((state) => state.removeItem);
  return (
    <div className="border-b p-2.5 last:border-b-0">
      <div className="group flex flex-1 items-start gap-5 h-36 md:h-44 px-3">
        {product?.images && (
          <Link
            href={`/product/${product?.slug?.current}`}
            className="border rounded-md overflow-hidden shadow-sm"
          >
            <Image
              src={urlFor(product?.images[0]).url()}
              alt="product-image"
              width={500}
              height={500}
              loading="lazy"
              className="w-32 md:w-40 h-32 md:h-40 object-cover group-hover:scale-107 hoverEffect"
            />
          </Link>
        )}
        <div className="flex flex-1 justify-between h-full py-2 md:py-4 w-full">
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col gap-0.5 md:gap-1.5">
              <h2 className="text-base font-semibold line-clamp-1">
                {product?.name?.split(" ").slice(0, 3).join(" ")}
              </h2>
              <p className="text-sm capitalize">
                Variant:{" "}
                <span className="font-semibold text-sm text-darkColor">
                  {product?.variant}
                </span>
              </p>
              <p className="text-sm capitalize">
                Status:{" "}
                <span className="font-semibold text-sm text-darkColor">
                  {product?.status}
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <AddToFavorites
                product={product}
                showProduct={true}
                className=""
              />
              <Trash
                className="cursor-pointer text-lightColor hover:text-red-500 hover:scale-110 hoverEffect"
                onClick={() => {
                  deleteProduct(product?._id);
                  toast.success("Product Deleted Successfuly!");
                }}
              />
            </div>
          </div>

          <div className="flex flex-col justify-between h-full">
            <PriceFormatter
              amount={(product?.price as number) * itemCount}
              className="text-xl font-semibold text-gray-900"
            />
            <QuantityButton product={product} showProduct={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
