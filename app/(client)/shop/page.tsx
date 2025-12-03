import React from "react";
import { getAllBrands, getCategories } from "@/sanity/queries";
import Shop from "@/components/Shop";

const ShopPage = async () => {
  const categories = await getCategories();
  const brands = await getAllBrands();
  return (
    <div className="mt-20">
      <Shop categories={categories} brands={brands} />
    </div>
  );
};

export default ShopPage;
