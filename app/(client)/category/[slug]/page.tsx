import CategoryProducts from "@/components/CategoryProducts";
import Container from "@/components/Container";
import { Title } from "@/components/ui/text";
import { getCategories } from "@/sanity/queries";

import React from "react";

export const dynamic = 'force-dynamic';

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const categories = await getCategories();
  const { slug } = await params;
  return (
    <div className="mt-16 py-10">
      <Container>
        <Title className="text-darkColor group">
          Products By Category:{" "}
          <span className="font-bold text-shop_orange capitalize tracking-wide">
            {slug && slug}
          </span>
          <div className="bg-shop_dark_yellow w-40 h-1 mt-2 group-hover:w-80 hoverEffect"></div>
        </Title>

        <CategoryProducts categories={categories} slug={slug} />
      </Container>
    </div>
  );
};

export default CategoryPage;
