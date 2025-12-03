"use client";

import { useEffect, useState } from "react";
import HomeTabBar from "./HomeTabBar";
import { productType } from "@/constants/data";
import { client } from "@/sanity/lib/client";
import { Loader2 } from "lucide-react";
import NoProductsAvailable from "./NoProductsAvailable";
import { AnimatePresence, motion } from "framer-motion";
import ProductsCard from "./ProductsCard";
import { Product } from "@/sanity.types";

const ProductGrid = () => {
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const query = `*[_type == "product" && variant == $variant] | order(name desc){
  ...,"categories":categories[]->title
}`;
  const params = { variant: selectedTab.toLocaleLowerCase() };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await client.fetch(query, params);
        setProducts(response);
      } catch (error) {
        console.error("Product featching error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedTab]);

  return (
    <div className="mt-10">
      <HomeTabBar selectedTap={selectedTab} onTabSelect={setSelectedTab} />
      {loading ? (
        <div className="flex flex-col items-center justify-center py-10 min-h-80 gap-4 bg-gary-100 w-full mt-10">
          <div className="space-x-2 flex items-center text-shop_light_yellow">
            <Loader2 className="w-5 h-5 text-shop_light_yellow animate-spin" />
            <span>Products is loading...</span>
          </div>
        </div>
      ) : products?.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5 mt-10">
          {products?.slice(0, 10).map((product) => (
            <AnimatePresence key={product?._id}>
              <motion.div
                layout
                initial={{ opacity: 0.2 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="">
                  <ProductsCard product={product} />
                </div>
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      ) : (
        <NoProductsAvailable selectedTab={selectedTab} />
      )}
    </div>
  );
};

export default ProductGrid;
