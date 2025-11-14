"use client";

import { useEffect, useState } from "react";
import CartIcon from "./CartIcon";
import Container from "./Container";
import FavoriteButton from "./FavoriteButton";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import SignIn from "./SignIn";
import { ClerkLoaded } from "@clerk/nextjs";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user } = useUser();
  console.log(user);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <header
      className={`fixed w-full z-50 shadow-md ${isScrolled ? "bg-white/60 backdrop-blur-lg overflow-visible h-13 transition-all duration-300" : "h-17 bg-shop_light_yellow"}`}
    >
      <Container className="flex items-center justify-between h-15">
        <div className="w-auto md:w-1/3 flex items-center gap-2.5 justify-start md:gap-0">
          <MobileMenu />
          <Logo isScrolled={isScrolled} />
        </div>

        <HeaderMenu isScrolled={isScrolled} />
        <div className="flex w-auto md:1/3 items-center justify-end gap-5">
          <SearchBar isScrolled={isScrolled} />
          <CartIcon isScrolled={isScrolled} />
          <FavoriteButton isScrolled={isScrolled} />
          <ClerkLoaded>
            <SignedIn>
              <UserButton />
            </SignedIn>
            {!user && <SignIn isScrolled={isScrolled} />}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;
