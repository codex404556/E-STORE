import React, { useState } from "react";
import { Title } from "./ui/text";
import PriceFormatter from "./PriceFormatter";
import useStore from "@/store";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { AlignJustify } from "lucide-react";
import { motion } from "framer-motion";
import { useOutsideClick } from "@/hooks";

const MobOrderSummary = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getSubTotalPrice, getTotalPrice } = useStore();
  const sideRef = useOutsideClick<HTMLDivElement>(() => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  });

  return (
    <motion.div
      ref={sideRef}
      initial={false}
      animate={{ height: isOpen ? "50%" : "48px" }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      className="bottom-0 left-0 fixed w-full bg-white shadow-top-lg rounded-t-xl overflow-hidden md:hidden"
    >
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }, 10);
            document.body.style.overflow = "hidden";
          } else {
            document.body.style.overflow = "auto";
          }
        }}
        className="w-full bg-white rounded-t-md flex items-center justify-center md:hidden shadow-inner"
      >
        <motion.div
          animate={{ x: !isOpen ? [0, -9, 9, -9, 9, 0] : 0 }}
          transition={{
            duration: 2,
            repeat: isOpen ? 0 : Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        >
          <AlignJustify size={21} className="mt-1 text-lightColor" />
        </motion.div>
      </button>
      <div className="block md:hidden border-b-4 rounded-lg rounded-t-none w-full bg-white p-8 pb-6 md:pb-8">
        <Title className="text-darkColor mb-7">Order Summary</Title>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Suptotal</span>
            <PriceFormatter
              amount={getSubTotalPrice()}
              className="text-lightColor font-bold"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="">Discount</span>
            <PriceFormatter
              amount={getSubTotalPrice() - getTotalPrice()}
              className="font-bold text-lightColor"
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between font-semibold text-lg mt-6">
            <span>Total</span>
            <PriceFormatter
              amount={getSubTotalPrice() - getTotalPrice()}
              className="text-lg font-bold text-darkColor"
            />
          </div>
          <Button
            size="lg"
            className="w-full rounded-md font-semibold tracking-wide hoverEffect"
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default MobOrderSummary;
