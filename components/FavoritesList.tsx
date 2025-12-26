"use client";
import useStore from "@/store";
import React, { useState } from "react";
import Container from "./Container";
import { Heart, X } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { Product } from "@/sanity.types";
import toast from "react-hot-toast";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import PriceFormatter from "./PriceFormatter";
import AddToCartButton from "./AddToCartButton";

const FavoritesList = () => {
  const [visibleProducts, setVisibleProducts] = useState(5);
  const { favoriteProduct, removeFromFavorite, resetFavorite } = useStore();
  const loadMore = () => {
    setVisibleProducts((prev) => Math.min(prev + 5, favoriteProduct.length));
  };
  return (
    <Container>
      {favoriteProduct?.length > 0 ? (
        <>
          <div className="mt-20 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="border-b">
                <tr className="bg-black/2">
                  <th className="p-2 text-left">Image</th>
                  <th className="p-2 text-left hidden md:table-cell">
                    Category
                  </th>
                  <th className="p-2 text-left hidden md:table-cell">Type</th>
                  <th className="p-2 text-left hidden md:table-cell">Status</th>
                  <th className="p-2 text-left">Price</th>
                  <th className="p-2 text-left md:text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {favoriteProduct
                  .slice(0, visibleProducts)
                  ?.map((product, index) => (
                    <tr key={index} className="border-b hover:bg-gray-100">
                      <td className="px-2 py-4 flex items-center gap-2">
                        <X
                          onClick={() => {
                            removeFromFavorite(product?._id);
                            toast.success("Poduct Removed Successfuly");
                          }}
                          size={18}
                          className="hover:text-red-700 hover:scale-105 hoverEffect cursor-pointer"
                        />
                        {product?.images && (
                          <Link href={`/product/${product?.slug?.current}`}>
                            <Image
                              src={urlFor(product?.images[0]).url()}
                              alt="Product-Image"
                              width={80}
                              height={90}
                              className="object-cover"
                            />
                          </Link>
                        )}
                        <p className="capitalize text-sm font-medium">
                          {product?.name?.split(" ").slice(0, 5).join(" ")}
                          <span> .....</span>
                        </p>
                      </td>
                      <td className="p-2 capitalize hidden md:table-cell">
                        {product?.categories && (
                          <p>
                            {product?.categories?.map((cat) => cat).join(",")}
                          </p>
                        )}
                      </td>
                      <td className="p-2 capitalize hidden md:table-cell">
                        {product?.variant}
                      </td>
                      <td
                        className={`p-2 px-2 w-24 text-xs font-semibold hidden md:table-cell ${(product?.stock as number) > 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {(product?.stock as number) > 0
                          ? "In Stock"
                          : "Out of Stock"}
                      </td>
                      <td className="p-2">
                        <PriceFormatter
                          amount={product?.price}
                          className="w-full"
                        />
                      </td>
                      <td className="w-29 p-2 text-center">
                        <AddToCartButton product={product} />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {visibleProducts < favoriteProduct?.length && (
            <div className="my-3 text-center">
              <Button onClick={loadMore} variant="outline">
                Load More
              </Button>
            </div>
          )}
          {favoriteProduct?.length > 0 && (
            <Button
              variant="destructive"
              className="mt-5"
              onClick={resetFavorite}
            >
              Reset
            </Button>
          )}
        </>
      ) : (
        <div className="mt-20 flex min-h-[400px] flex-col items-center justify-center space-y-6 px-4 text-center">
          <div className="flex flex-col items-center gap-4">
            <Heart
              className="h-12 w-12 text-shop_light_yellow animate-bounce"
              fill="currentColor"
            />
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-wide">
                Your favorite List is empty
              </h2>
              <p className="text-sm text-muted-foreground">
                your favorite will appear here
              </p>
            </div>
            <Button asChild>
              <Link className="font-semibold text-sm " href="/shop">
                Continue Shopping
              </Link>
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

export default FavoritesList;
