"use client";
import CartItem from "@/components/CartItem";
import Container from "@/components/Container";
import DeleveryInfo from "@/components/DeleveryInfo";
import EmptyCart from "@/components/EmptyCart";
import MobOrderSummary from "@/components/MobOrderSummary";
import NoAccess from "@/components/NoAccess";
import OrderSummary from "@/components/OrderSummary";
import { Button } from "@/components/ui/button";
import { Title } from "@/components/ui/text";
import useStore from "@/store";
import { useAuth } from "@clerk/nextjs";
import { ShoppingBag } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

export const dynamic = 'force-dynamic';

const CartPage = () => {
  const { isSignedIn } = useAuth();
  const { resetCart } = useStore();

  const groupedItems = useStore((state) => state.getGroupedItems());
  const habdleResetCart = () => {
    const conformed = window.confirm(
      "Are you sure you want to reset the cart?"
    );
    if (conformed) {
      resetCart();
      toast.success("Cart has been reset successfully");
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="bg-gray-50 pb-52 md:pb-10 mt-20">
      {isSignedIn ? (
        <Container>
          {groupedItems?.length ? (
            <>
              <div className="flex items-center gap-2 py-5">
                <ShoppingBag />
                <Title>Shopping Cart</Title>
              </div>
              <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                <div className="border rounded-md bg-white w-full">
                  {groupedItems.map(({ product }) => (
                    <CartItem key={product?._id} product={product} />
                  ))}
                  <Button
                    onClick={habdleResetCart}
                    className="font-semibold m-5"
                    variant="destructive"
                  >
                    Reset Cart
                  </Button>
                </div>
                <div className="flex flex-col w-full md:max-w-1/3">
                  <OrderSummary />
                  <MobOrderSummary />
                  <DeleveryInfo />
                </div>
              </div>
            </>
          ) : (
            <EmptyCart />
          )}
        </Container>
      ) : (
        <NoAccess />
      )}
    </div>
  );
};

export default CartPage;
