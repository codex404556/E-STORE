import { Product } from "@/sanity.types";
import { getBrand } from "@/sanity/queries";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

// Type that allows categories to be either reference objects or strings (dereferenced)
type ProductWithFlexibleCategories = Omit<Product, "categories"> & {
  categories?: Product["categories"] | (string | null)[] | null;
};

const ProductsCharacteristics = async ({
  product,
}: {
  product: Product | ProductWithFlexibleCategories | null;
}) => {
  const brandName = await getBrand(product?.slug?.current as string);
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger className="font-semibold tracking-wide text-2xl">
          {product?.name}: Characteristics
        </AccordionTrigger>
        <AccordionContent className="">
          <p className="flex items-center justify-between">
            Brand:
            {brandName && (
              <span className="text-sm font-bold text-lightColor">
                {brandName}
              </span>
            )}{" "}
          </p>
          <p className="flex items-center justify-between">
            Collection:{" "}
            <span className="text-sm font-bold text-lightColor">2025</span>{" "}
          </p>
          <p className="flex items-center justify-between">
            Type:{" "}
            <span className="text-sm font-bold text-lightColor">
              {product?.variant}
            </span>{" "}
          </p>
          <p className="flex items-center justify-between">
            Stock:{" "}
            <span className="text-sm font-bold text-lightColor">
              {product?.stock ? "Available" : "Out of Stock"}
            </span>{" "}
          </p>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ProductsCharacteristics;
