import React from "react"
import { Title } from "./ui/text"
import Link from "next/link"
import Image from "next/image"
import { bannerImage } from "@/images"

const HomeBanner = () => {
  return (
    <div className="py-16 md:py-0 bg-shop_light_pink rounded-lg px-10 lg:px-24 flex items-center justify-center mt-25">
      <div className="space-y-5">
        <Title className="m-5">Grap Upto 50% off on<br />
        Selected Headphones
        </Title>
        <Link href={"/shop"} className="bg-shop_light_yellow/90 text-darkColor px-5 py-2 rounded-md text-sm font-semibold hover:text-white hover:bg-darkColor hoverEffect">Buy Now</Link>
      </div>
      <div className="">
        <Image src={bannerImage} alt="banner-image" className="h-60 w-60 hidden md:inline-flex" />
      </div>
    </div>
  )
}

export default HomeBanner
