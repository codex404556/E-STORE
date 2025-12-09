import AddToCartButton from "@/components/AddToCartButton";
import AddToFavorites from "@/components/AddToFavorites";
import Container from "@/components/Container";
import ImagesView from "@/components/ImagesView";
import PriceView from "@/components/PriceView";
import ProductsCharacteristics from "@/components/ProductsCharacteristics";
import {
  getProductBySlug,
  getProductInfo,
  getProductReview,
} from "@/sanity/queries";
import { StarIcon, Truck, CornerDownLeft } from "lucide-react";
import React from "react";
import { RxBorderSplit } from "react-icons/rx";
import { FaRegQuestionCircle } from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { FiShare2 } from "react-icons/fi";
import ProductTab from "@/components/ProductTab";

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
  showProduct?: true | false;
}

const SingleProductPage = async ({
  params, showProduct
}: Props) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  const titleInfo = await getProductInfo(slug);
  const reviews = await getProductReview(slug);

  const isStock = product?.stock;
  return (
    <Container className="flex flex-col md:flex-row gap-12 mt-20 px-20">
      <div className="flex flex-col">
        {product?.images && (
          <ImagesView images={product?.images} isStock={isStock} />
        )}

        <ProductTab titleInfo={titleInfo} reviews={reviews} />
      </div>
      <div className="w-full min-w-1/2 flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-darkColor">
          {product?.name}
        </h2>
        <p className="text-lightColor text-xs font-medium">
          {product?.description}
        </p>
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, index) =>
            index < 4 ? (
              <StarIcon
                size={12}
                key={index}
                className="text-shop_light_yellow fill-shop_light_yellow hover:scale-115 hoverEffect"
                fill="currentColor"
              />
            ) : (
              <StarIcon
                size={12}
                key={index}
                className="text-gray-300"
                fill="none"
              />
            )
          )}
          <p className="text-xs font-light">(120)</p>
        </div>
        <div className="">
          <PriceView price={product?.price} discount={product?.discount} />
          <p
            className={`rounded-full inline-block px-2 text-center text-[12px] mt-2 font-semibold ${isStock ? "bg-shop_light_yellow " : "bg-red-500"}`}
          >
            {(isStock as number) > 0 ? "In Stock" : "Unvailed"}
          </p>
        </div>
        <div className="flex items-center justify-between gap-5">
          <AddToCartButton showProduct={showProduct || true} product={product} />
          <AddToFavorites product={product} showProduct={true} className="" />
        </div>
        <ProductsCharacteristics product={product} />
        <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5 mt-2 border-t border-t-gray-200">
          <div className="flex items-center gap-2 text-sm text-darkColor hover:text-shop_dark_yellow hoverEffect hover:scale-105">
            <RxBorderSplit className="text-lg" />
            <p>Compare Color</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-darkColor hover:text-shop_dark_yellow hoverEffect hover:scale-105">
            <FaRegQuestionCircle className="text-lg" />
            <p>Ask a Question</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-darkColor hover:text-shop_dark_yellow hoverEffect hover:scale-105">
            <TbTruckDelivery className="text-lg" />
            <p>Delivery & Return</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-darkColor hover:text-shop_dark_yellow hoverEffect hover:scale-105">
            <FiShare2 className="text-lg" />
            <p>Share</p>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-start gap-3 border border-gray-300 px-2 py-3">
            <Truck
              size={30}
              className="text-shop_orange hover:scale-105 hoverEffect"
            />
            <div className="flex flex-col">
              <p className="text-base font-semibold text-black">
                Free Delivery
              </p>
              <p className="text-sm text-gray-500 underline underline-offset-2">
                Enter Your Postal code for delivery availability
              </p>
            </div>
          </div>
          <div className="flex items-center justify-start gap-3 border border-gray-300 py-3 px-2">
            <CornerDownLeft
              size={30}
              className="text-shop_orange hover:scale-105 hoverEffect"
            />
            <div className="flex flex-col">
              <p className="text-base font-semibold text-black">
                Return Delivery
              </p>
              <p className="text-sm text-gray-500">
                Free 30days Delivery Returns.{" "}
                <span className="underline underline-offset-1">
                  Detailes
                </span>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SingleProductPage;
