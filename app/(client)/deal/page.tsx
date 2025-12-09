import Container from "@/components/Container";
import ProductsCard from "@/components/ProductsCard";
import { Title } from "@/components/ui/text";
import { getDealProducts } from "@/sanity/queries";
import React from "react";

export const dynamic = 'force-dynamic';

const DealPage = async () => {
  const deals = await getDealProducts();

  return (
    <div className="py-10 bg-shop_light_bg mt-15">
      <Container>
        <Title className="mb-5 underline underline-offset-4 decoration-2 text-base uppercase tracking-wide">
          Hote Deals of the Week
        </Title>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {deals?.map((deal) => (
            <ProductsCard key={deal?._id} product={deal} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default DealPage;
