import React from "react";
import PriceFormatter from "./PriceFormatter";
interface Props {
  price: number | undefined;
  discount: number | undefined;
}

const PriceView = ({ price, discount }: Props) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <PriceFormatter amount={price} className="" />
        {price && discount && (
          <PriceFormatter
            className="line-through text-lightColor/90 text-xs font-normal"
            amount={price}
          />
        )}
      </div>
    </div>
  );
};

export default PriceView;
