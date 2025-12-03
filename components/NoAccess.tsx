import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Logo from "./Logo";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const NoAccess = () => {
  return (
    <div className="flex items-center justify-center py-12 md:py-32 bg-gray-100 p-4">
      <Card className="w-full max-w-md p-5">
        <CardHeader className="flex items-center flex-col gap-1">
          <Logo />
          <CardTitle className="text-center font-bold text-lightColor text-2xl">
            Welcome Back!
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <p className="text-bold text-center font-medium text-sm text-lightColor/80">
            Login to view your cart items and checkout. Don&apos;t miss out on
            your favorite products!
          </p>
          <SignInButton mode="modal">
            <Button className="w-full">Sign in</Button>
          </SignInButton>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <p className="text-xs text-lightColor">Don&apos;t have an account?</p>
          <SignUpButton mode="modal">
            <Button size="lg" variant="outline">
              Creat an account
            </Button>
          </SignUpButton>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NoAccess;
