"use client";
import { BRANDS_QUERYResult, Category, Product } from "@/sanity.types";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import { Title } from "./ui/text";
import CatergoryList from "./filters/CatergoryList";
import PriceList from "./filters/PriceList";
import BrandList from "./filters/BrandList";
import { useSearchParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { Loader2 } from "lucide-react";
import NoProductsAvailable from "./NoProductsAvailable";
import ProductsCard from "./ProductsCard";

interface Props {
  categories: Category[];
  brands: BRANDS_QUERYResult;
}

const Shop = ({ categories, brands }: Props) => {
  const searchParams = useSearchParams();
  const categoryParams = searchParams?.get("category");
  const brandParams = searchParams?.get("brand");
  const searchTerm = (searchParams?.get("search") || "").trim();
  const [loading, setLoding] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParams || null
  );

  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    brandParams || null
  );
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const fetchProducts = async () => {
    setLoding(true);
    try {
      let minPrice = 0;
      let maxPrice = 10000;
      if (selectedPrice) {
        const [min, max] = selectedPrice.split("-").map(Number);
        minPrice = min;
        maxPrice = max;
      }
      const query = `
      *[_type == 'product' 
        && (!defined($selectedCategory) || references(*[_type == "category" && slug.current == $selectedCategory]._id))
        && (!defined($selectedBrand) || references(*[_type == "brand" && slug.current == $selectedBrand]._id))
        && ($searchTerm == "" || name match $searchTerm)
        && price >= $minPrice && price <= $maxPrice
      ] 
      | order(name asc) {
        ...,"categories": categories[]->title
      }
    `;
      const data = await client.fetch(
        query,
        {
          selectedCategory,
          selectedBrand,
          minPrice,
          maxPrice,
          searchTerm: searchTerm ? `${searchTerm}*` : "",
        },
        { next: { revalidate: 0 } }
      );
      setProducts(data);
    } catch (error) {
      console.log("Shop Product fetching error", error);
    } finally {
      setLoding(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [selectedBrand, selectedCategory, selectedPrice, searchTerm]);

  return (
    <div className="border-t">
      <Container>
        <div className="sticky top-0 z-10 mb-5 ">
          <div className="flex items-center justify-between">
            <Title className="text-lg">Get the products as your needs</Title>
            {(selectedBrand !== null ||
              selectedPrice !== null ||
              selectedCategory !== null) && (
              <button
                onClick={() => {
                  setSelectedBrand(null);
                  setSelectedCategory(null);
                  setSelectedPrice(null);
                }}
                className="text-shop_dark_yellow underline text-sm mt-2 font-medium hover:text-red-500 hoverEffect"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 border-t border-t-shop_dark_yellow">
          <div className="md:sticky md:top-20 md:self-start md:h-[calc(100vh-160px)] md:overflow-y-auto md:min-w-64 pb-5 md:border-r border-r-shop_light_yellow scrollbar-hide">
            <CatergoryList
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            <PriceList
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
            />
            <BrandList
              brands={brands}
              selectedBrand={selectedBrand}
              setSelectedBrand={setSelectedBrand}
            />
          </div>
          <div className="">
            <div className="">
              {loading ? (
                <div className="flex flex-col items-center justify-center p-50 mt-10">
                  <Loader2 className="w-10 h-10 text-shop_dark_yellow animate-spin" />
                  <p className="text-xl font-semibold text-gray-600">
                    Product is Loading....
                  </p>
                </div>
              ) : (
                <div className="">
                  {products?.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {products?.map((product) => (
                        <ProductsCard product={product} key={product._id} />
                      ))}
                    </div>
                  ) : (
                    <div className="">
                      <NoProductsAvailable className="p-60" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Shop;
