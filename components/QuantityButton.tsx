import React from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import useStore from "@/store";
import { Product } from "@/sanity.types";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

// Type that allows categories to be either reference objects or strings (dereferenced)
type ProductWithFlexibleCategories = Omit<Product, "categories"> & {
  categories?: Product["categories"] | (string | null)[] | null;
};

interface Props {
  product: Product | ProductWithFlexibleCategories;
  className?: string;
  showProduct: false | true;
}

const QuantityButton = ({ product, className, showProduct }: Props) => {
  const { getItemCount, addItem, removeItem } = useStore();
  const itemCount = getItemCount(product._id);
  const isOutOfStock = product?.stock === 0;

  const handlePlusButton = () => {
    if ((product?.stock as number) > itemCount) {
      addItem(product);
      toast.success(`${product?.name?.substring(0, 12)}Increased`);
    } else {
      toast.error("Can't add more then availble stock!");
    }
  };
  const handleRemoveButton = () => {
    removeItem(product._id);
    if (itemCount > 1) {
      toast.success("Quantity Decreased successfully!");
    } else {
      toast.success(`${product?.name?.substring(0, 12)}removed successfully!`);
    }
  };
  return (
    <div
      className={cn(
        "flex items-center justify-center text-base",
        showProduct ? "gap-4 md:gap-12" : "gap-1",
        className
      )}
    >
      <Button
        onClick={handleRemoveButton}
        size="icon"
        disabled={itemCount === 0 || isOutOfStock}
        className="h-6 w-6"
      >
        <Minus />
      </Button>
      <span className="text-sm font-semibold text-center text-darkColor bg-shop_light_yellow/30 rounded-full px-3 py-2">
        {itemCount}
      </span>
      <Button
        onClick={handlePlusButton}
        size="icon"
        disabled={isOutOfStock}
        className="h-6 w-6"
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantityButton;
