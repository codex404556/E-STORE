import { SignInButton } from "@clerk/nextjs";
import React from "react";

const SignIn = ({ isScrolled }: { isScrolled: boolean }) => {
  return (
    <SignInButton mode="modal">
      <button
        className={`text-sm font-semibold text-white hoverEffect cursor-pointer rounded-full bg-darkColor px-3 py-2 ${isScrolled ? "scale-70 hover:bg-shop_light_yellow hover:text-darkColor" : "scale-90"}`}
      >
        Login
      </button>
    </SignInButton>
  );
};

export default SignIn;
