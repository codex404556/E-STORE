import { BRANDS_QUERYResult } from "@/sanity.types";

import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Title } from "../ui/text";
import { Label } from "../ui/label";

interface Props {
  brands: BRANDS_QUERYResult;
  selectedBrand?: string | null;
  setSelectedBrand: React.Dispatch<React.SetStateAction<string | null>>;
}

const BrandList = ({ brands, selectedBrand, setSelectedBrand }: Props) => {
  return (
    <div className="flex flex-col gap-2 mt-5">
      <Title className="font-bold text-darkColor/80">Brands</Title>
      <RadioGroup value={selectedBrand || ""}>
        {brands?.map((brand) => (
          <div
            className="flex items-center space-x-2 cursor-pointer"
            key={brand?._id}
          >
            <RadioGroupItem
              id={brand?.slug?.current}
              value={brand?.slug?.current as string}
              onClick={() => {
                if (selectedBrand === (brand?.slug?.current as string)) {
                  setSelectedBrand(null);
                } else {
                  setSelectedBrand(brand?.slug?.current as string);
                }
              }}
            />
            <Label
              htmlFor={brand?.slug?.current}
              className={`text-xs cursor-pointer transition-all duration-75 ${selectedBrand === brand?.slug?.current ? "font-semibold text-shop_dark_yellow" : "font-normal"}`}
            >
              {brand?.title}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default BrandList;
