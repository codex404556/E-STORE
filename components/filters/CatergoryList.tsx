import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Category } from "@/sanity.types";
import { Title } from "../ui/text";
import { Label } from "../ui/label";

interface Props {
  categories: Category[];
  selectedCategory?: string | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string | null>>;
}

const CatergoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: Props) => {
  return (
    <div className="gap-2 flex flex-col mt-5">
      <Title className="text-base text-darkColor/80 font-bold">
        Categories
      </Title>
      <RadioGroup value={selectedCategory || ""} className="mt-2 space-y-1">
        {categories?.map((category) => (
          <div
            className="flex items-center space-x-2 cursor-pointer"
            key={category?._id}
          >
            <RadioGroupItem
              value={(category?.slug?.current as string) || ""}
              id={category?.slug?.current}
              className="rounded-sm hover:scale-105"
              onClick={() => {
                if (selectedCategory === (category?.slug?.current as string)) {
                  setSelectedCategory(null);
                } else {
                  setSelectedCategory(category?.slug?.current as string);
                }
              }}
            />
            <Label
              htmlFor={category?.slug?.current}
              className={`text-xs cursor-pointer transition-all duration-75 ${selectedCategory === category?.slug?.current ? "font-semibold text-shop_dark_yellow" : "font-normal"}`}
            >
              {category?.title}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default CatergoryList;
