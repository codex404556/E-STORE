"use client";

import { Category, Product } from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Loader2 } from "lucide-react";
import NoProductsAvailable from "./NoProductsAvailable";
import ProductsCard from "./ProductsCard";

interface Props {
  categories: Category[];
  slug: string;
}

const CategoryProducts = ({ categories, slug }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCategoryChange = (newSlug: string) => {
    if (newSlug === currentSlug) return;
    setCurrentSlug(newSlug);
    router.push(`/category/${newSlug}`);
  };

  const featchProducts = async (categorySlug: string) => {
    setLoading(true);
    try {
      const query = `*[_type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)] | order(name asc){ ..., "categories": categories[]->title}`;
      const data = await client.fetch(query, { categorySlug });
      setProducts(data);
    } catch (error) {
      console.log("Error Featching Products", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    setCurrentSlug(slug);
  }, [slug]);

  useEffect(() => {
    featchProducts(currentSlug);
  }, [currentSlug]);

  return (
    <div className="py-5 flex flex-col md:flex-row items-start gap-5">
      <div className="flex flex-wrap md:flex-col gap-2 md:min-w-40">
        {categories?.map((category) => (
          <button
            onClick={() =>
              handleCategoryChange(category?.slug?.current as string)
            }
            className={`text-left border font-semibold py-2 rounded-md px-1 hover:bg-shop_light_yellow hover:text-darkColor hoverEffect hover:scale-105 capitalize ${category?.slug?.current === currentSlug ? "bg-shop_light_yellow scale-107 text-darkColor" : "text-white bg-darkColor/90"}`}
            key={category?._id}
          >
            {category?.title}
          </button>
        ))}
      </div>
      <div className="w-full">
        {loading ? (
          <div className="flex items-center justify-center bg-gray-200 h-screen max-h-80">
            <div className="flex gap-2 text-shop_dark_yellow text-center text-4xl">
              <Loader2 className="w-10 h-10 animate-spin" />
              <span>Product is Loading...</span>
            </div>
          </div>
        ) : products?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {products?.map((product: Product) => (
              <AnimatePresence key={product?._id}>
                <motion.div>
                  <ProductsCard product={product} />
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
        ) : (
          <NoProductsAvailable selectedTab={currentSlug} className="" />
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
