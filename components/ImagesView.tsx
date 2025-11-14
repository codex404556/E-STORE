"use client";

import {
  internalGroqTypeReferenceTo,
  SanityImageCrop,
  SanityImageHotspot,
} from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  images?: Array<{
    assest?: {
      _ref: string;
      _type: "reference";
      _weak?: boolean;
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset";
    };
    hotspot?: SanityImageHotspot;
    crop?: SanityImageCrop;
    _type?: "image";
    _key: string;
  }>;
  isStock?: number;
}

const ImagesView = ({ images = [], isStock }: Props) => {
  const [isActive, setIsActive] = useState(images[0]);
  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={isActive?._key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full max-h-[550px] min-h-[450px] rounded-md group overflow-hidden"
        >
          <Image
            src={urlFor(isActive).url()}
            alt="product-image"
            width={700}
            height={700}
            priority
            className={`w-full h-96 max-h-[550px] min-h-[500px] object-contain group-hover:scale-107 hoverEffect rounded-md ${isStock === 0 && "opacity-50"}`}
          />
        </motion.div>
      </AnimatePresence>
      <div className="flex items-center gap-3 mt-5">
        {images?.map((image) => (
          <button className={`border border-shop_light_yellow/60 rounded-md overflow-hidden hover:scale-105 hoverEffect ${isActive === image && "scale-110 border border-shop_dark_yellow shadow-md"}`} onClick={() => setIsActive(image)} key={image?._key}>
            <Image
              src={urlFor(image).url()}
              alt={`Thumbnail ${image?._key}`}
              width={100}
              height={100}
              className="w-full h-auto object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImagesView;
