import { sanityFetch } from "../lib/live";
import {
  AUTHOR_QUERY,
  BRAND_QUERY,
  BRANDS_QUERY,
  DEAL_PRODUCTS,
  LATEST_BLOG_QUERY,
  PRODUCT_BY_SLUG,
  PRODUCT_BY_INFO,
  PRODUCT_BY_REVIEW,
} from "./query";

const getCategories = async (quantity?: number) => {
  try {
    const query = quantity
      ? `*[_type == "category"] | order(title asc)[0..$quantity]{
      ...,
      "productCount": count(*[_type == "product" && references(^._id)])
    }`
      : `*[_type == "category"] | order(title asc){
      ...,
      "productCount": count(*[_type == "product" && references(^._id)])
    }`;

    const { data } = await sanityFetch({
      query,
      params: quantity ? { quantity } : {},
    });
    return data ?? [];
  } catch (error) {
    console.log("Error featching categories", error);
    return [];
  }
};

const getAllBrands = async () => {
  try {
    const { data } = await sanityFetch({ query: BRANDS_QUERY });
    return data ?? [];
  } catch (error) {
    console.log("Error featching Brands:", error);
    return [];
  }
};

const getLatestBlog = async () => {
  try {
    const { data } = await sanityFetch({ query: LATEST_BLOG_QUERY });
    return data ?? [];
  } catch (error) {
    console.log("Error featching Blogs:", error);
    return [];
  }
};

const getAuthor = async () => {
  try {
    const { data } = await sanityFetch({ query: AUTHOR_QUERY });
    return data ?? [];
  } catch (error) {
    console.log("Error featching Author:", error);
  }
};

const getDealProducts = async () => {
  try {
    const { data } = await sanityFetch({ query: DEAL_PRODUCTS });
    return data ?? [];
  } catch (error) {
    console.log("Error featching Deals:", error);
    return [];
  }
};

const getProductBySlug = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG,
      params: {
        slug,
      },
    });
    return product?.data || null;
  } catch (error) {
    console.log("Error Fetching Product by ID", error);
    return null;
  }
};

const getBrand = async (slug: string) => {
  try {
    const product = await sanityFetch({
      query: BRAND_QUERY,
      params: {
        slug,
      },
    });
    return product?.data?.brandName || null;
  } catch (error) {
    console.log("Error fetching product by ID", error);
    return null;
  }
};

const getProductInfo = async (slug: string) => {
  try {
    const { data } = await sanityFetch({
      query: PRODUCT_BY_INFO,
      params: {
        slug,
      },
    });
    return data || null;
  } catch (error) {
    console.log("Error fetching product info", error);
    return null;
  }
};

const getProductReview = async (slug: string) => {
  try {
    const { data } = await sanityFetch({
      query: PRODUCT_BY_REVIEW,
      params: { slug }
    });
    return data?.reviews ?? [];
  } catch (error) {
    console.log("Error Fetching Product by reviews", error);
    return [];
  }
};

export {
  getCategories,
  getAllBrands,
  getLatestBlog,
  getAuthor,
  getDealProducts,
  getProductBySlug,
  getBrand,
  getProductInfo,
  getProductReview,
};
