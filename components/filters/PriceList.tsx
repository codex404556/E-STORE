import React from "react";
import { Title } from "../ui/text";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const priceArray = [
  { title: "Under $100", value: "0-100" },
  { title: "$100 - $200", value: "100-200" },
  { title: "$200 - $300", value: "200-300" },
  { title: "$300 - $500", value: "300-500" },
  { title: "Over $500", value: "500-10000" },
];

interface Props {
  selectedPrice: string | null;
  setSelectedPrice: React.Dispatch<React.SetStateAction<string | null>>;
}

const PriceList = ({ selectedPrice, setSelectedPrice }: Props) => {
  return (
    <div className="flex flex-col gap-2 mt-5">
      <Title className="font-bold text-darkColor/80">Price</Title>
      <RadioGroup value={selectedPrice || ""}>
        {priceArray?.map((price, index) => (
          <div
            key={index}
            className="flex items-center space-x-2 hover:cursor-pointer"
          >
            <RadioGroupItem
              value={price?.value}
              id={price?.value}
              onClick={() => {
                if (selectedPrice === (price?.value as string)) {
                  setSelectedPrice(null);
                } else {
                  setSelectedPrice(price?.value as string);
                }
              }}
            />
            <Label
              className={`text-xs cursor-pointer transition-all duration-75 ${selectedPrice === price?.value ? "font-semibold text-shop_dark_yellow" : "font-normal"}`}
              htmlFor={price?.value}
            >
              {price?.title}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default PriceList;
