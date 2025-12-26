import React, { useState } from "react";
import { Title } from "./ui/text";
import PriceFormatter from "./PriceFormatter";
import useStore from "@/store";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const OrderSummary = () => {
  const { getSubTotalPrice, getTotalPrice } = useStore();
  const [ loading, setLoading ] = useState(false);
  
 
  //featch data using strip or whatever tools you need 
  {/*const handleCheckout =  () => {
  *setLoading(true);
   try {
    

    catch (error) {

   finally {
  setLoading(false)
    }
  } */}
  return (
    <div className="hidden md:block border rounded-lg w-full bg-white p-8 pb-6 md:pb-8">
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
            amount={getTotalPrice()}
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
          disabled={loading}
          onClick={() =>setLoading(true)}
        >
          {loading ? "Processing..." : "Proceed to Checkout"}
        </Button>
      </div>
    </div>
  );
};

export default OrderSummary;
