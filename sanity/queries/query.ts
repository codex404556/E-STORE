import { defineQuery } from "next-sanity";

const BRANDS_QUERY = defineQuery(`*[_type=="brand"] | order(title asc)`);

const LATEST_BLOG_QUERY = defineQuery(
  `*[_type=="blog"] | order(name asc){..., blogCategories[]->{}, author->}`
);

const AUTHOR_QUERY = defineQuery(`*[_type=="author"] | order(title asc)`);

const DEAL_PRODUCTS = defineQuery(
  `*[_type=="product" && status == "hot" ] | order(name asc){..., "categories": categories[]->title }`
);

const PRODUCT_BY_SLUG = defineQuery(
  `*[_type == "product" && slug.current == $slug] | order(name asc) [0]`
);

const BRAND_QUERY = defineQuery(
  `*[_type == "product" && slug.current == $slug][0]{"brandName": brand->title}`
);

const PRODUCT_BY_INFO = defineQuery(
  `*[_type == "product" && slug.current == $slug][0]{
    description,
    additionalInformation,
  }`
);
const PRODUCT_BY_REVIEW = defineQuery(`
  *[_type == "product" && slug.current == $slug][0]{
    name,
    slug,
    reviews[]{
      userName,
      userImage,
      rating,
      comment,
      date
    }
  }
`);


export {
  BRANDS_QUERY,
  LATEST_BLOG_QUERY,
  AUTHOR_QUERY,
  DEAL_PRODUCTS,
  PRODUCT_BY_SLUG,
  BRAND_QUERY,
  PRODUCT_BY_INFO,
  PRODUCT_BY_REVIEW,
};
