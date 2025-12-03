"use client";

import { Product } from "@/sanity.types";
import React from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";
import useStore from "@/store";
import toast from "react-hot-toast";
import PriceFormatter from "./PriceFormatter";
import QuantityButton from "./QuantityButton";

interface AddToCartButtonProps {
  product: Product | null;
  showProduct?: true | false;
  className?: string;
}

const AddToCartButton = ({
  product,
  showProduct,
  className,
}: AddToCartButtonProps) => {
  const isOutOfStock = product?.stock === 0;
  const { addItem, getItemCount } = useStore();
  if (!product) return null;
  const itemCount = getItemCount(product?._id);
  const HandleAddToCart = () => {
    if ((product?.stock as number) > itemCount) {
      addItem(product);
      toast.success(`${product?.name?.substring(0, 12)} ...add successfully!`);
    } else {
      toast.error("Can not add more than availabe stock");
    }
  };

  return (
    <div className={`${showProduct && "w-full"}`}>
      {itemCount ? (
        <div className="flex flex-col">
          <div className="text-sm w-full flex flex-col gap-1">
            <QuantityButton product={product} className={className} showProduct={showProduct || false} />

            <div className="flex items-center justify-between gap-1 border-t pt-1">
              <span className="text-xs font-semibold text-lightColor">
                subTotal
              </span>
              <PriceFormatter
                className="text-xs font-semibold text-lightColor"
                amount={product?.price && product?.price * itemCount}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          {!showProduct ? (
            <div>
              {!isOutOfStock && (
                <Button onClick={HandleAddToCart}>
                  <ShoppingCart />
                </Button>
              )}
            </div>
          ) : (
            <Button
              className="w-full flex items center gap-4 hover:scale-105"
              onClick={HandleAddToCart}
            >
              <ShoppingCart />
              <p className="font-semibold tracking-wide ">Add To Cart</p>
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default AddToCartButton;
