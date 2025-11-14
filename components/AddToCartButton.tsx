"use client";

import { Product } from "@/sanity.types";
import React from "react";
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  product?: Product | null;
  showProduct?: boolean;
}

const AddToCartButton = ({
  product,
  showProduct = false,
}: AddToCartButtonProps) => {
  const isOutOfStock = product?.stock === 0;
  const HandleAddToCart = () => {
    window.alert("Add to cart");
  };
  return (
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
  );
};

export default AddToCartButton;
