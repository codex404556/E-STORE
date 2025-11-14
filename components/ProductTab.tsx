"use client";

import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import React, { useState } from "react";
import { FaUserCircle, FaStar, FaRegStar  } from "react-icons/fa";


interface SanityImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

interface Reviews {
  userName: string;
  rating: number;
  comment: string;
  date: string;
  userImage?: SanityImage;
}

interface Props {
  titleInfo: {
    description: string;
    additionalInformation: string;
  };
  reviews: Reviews[];
}

const ProductTab = ({ titleInfo, reviews }: Props) => {
  const [activeTap, setActiveTap] = useState<
    "description" | "additional-info" | "reviews"
  >("description");
  const tabs = [
    { id: "description", lable: "Description" },
    { id: "additional-info", lable: "Additonal Info" },
    { id: "reviews", lable: "Reviews" },
  ] as const;

  return (
    <div className="mt-10 flex flex-col w-full md:w-120">
      <div className="flex items-center">
        {tabs.map((tab) => (
          <button
            className={`font-medium py-2 px-3 hover:bg-shop_dark_yellow/60 w-full text-center line-clamp-1 hover:text-darkColor hoverEffect capitalize ${activeTap === tab.id ? "bg-shop_light_yellow text-darkColor transition-colors" : "text-white bg-darkColor/90"}`}
            onClick={() => setActiveTap(tab.id)}
            key={tab.id}
          >
            {tab.lable}
          </button>
        ))}
      </div>

      {/* contant tap */}
      <div className="rounded-md bg-gray-50 px-4 py-4 w-full min-h-70">
        {activeTap === "description" && (
          <p className="text-xs text-gray-500">
            {titleInfo.description ||
              "No Description has been provided for this product yet"}
          </p>
        )}

        {activeTap === "additional-info" && (
          <p className="text-xs text-gray-500">
            {titleInfo.additionalInformation ||
              "No Additional Information has been provided for this product yet"}
          </p>
        )}
        {activeTap === "reviews" && (
          <div className="">
            {reviews.length > 0 ? (
              reviews.map((item, index) => (
                <div key={index} className="flex items-center justify-start gap-3 mb-3 shadow-md rounded-md px-2 py-1">
                  <div className="flex flex-col">
                    {item?.userImage ? (
                      <Image
                        src={urlFor(item.userImage)
                          .width(100)
                          .height(100)
                          .url()}
                        width={40}
                        height={40}
                        alt="user-image"
                        className="rounded-full"
                      />
                    ) : (
                      <FaUserCircle size={40} className="text-lightColor" />
                    )}
                    <p className="text-[9px] font-bold text-lightColor">{item?.userName}</p>
                  </div>
                  <div className="flex flex-col justify-start gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_,i) => (
                        i < item.rating ? (
                          <FaStar className="text-shop_light_yellow" key={i} />
                        ) : (
                          <FaRegStar className="text-shop_light_yellow" key={i} />
                        )
                      ))}
                    </div>
                    <p className="line-clamp-3 text-lightColor text-sm font-semibold">{item.comment}</p>
                    <p className="text-[9px] font-medium text-lightColor">{item.date}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No Reviews for this product yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTab;
