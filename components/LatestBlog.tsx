import React from "react";
import { Title } from "./ui/text";
import { getLatestBlog } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { Calendar } from "lucide-react";

const LatestBlog = async () => {
  const blogs = await getLatestBlog();
  return (
    <div className="mb-10 lg:mb-20">
      <Title>Latest Blog</Title>
      <div className="flex flex-wrap md:flex-nowrap mt-5 gap-4 py-3">
        {blogs?.slice(0, 5).map((blog) => (
          <div
            key={blog?._id}
            className="bg-shop_light_bg rounded-md shadow-md max-w-90 overflow-hidden hover:shadow-shop_light_yellow/40"
          >
            {blog?.mainImage && blog?.slug?.current && (
              <Link className="" href={`/blog/${blog.slug.current}`}>
                <Image
                  src={urlFor(blog.mainImage).url()}
                  alt="bolg-main-image"
                  width={500}
                  height={500}
                  className="h-40 w-90 hover:scale-110 hoverEffect"
                />
              </Link>
            )}
            <div className="">
              <p className="text-darkColor font-bold line-clamp-1 text-base mt-5">
                {blog?.title}
              </p>
              <div className="flex items-center justify-between px-3 mb-5">
                <div className="flex items-center justify-between gap-1">
                  <Calendar size={13} className="text-lightColor" />
                  <p className="text-xs font-base text-lightColor underline">
                    {blog?.publishedAt}
                  </p>
                </div>
                {blog?.author && (
                  <div className="flex flex-col items-center justify-between mt-2">
                    <Image
                      src={urlFor(blog?.author?.image).url()}
                      alt={blog.author.name || "Author"}
                      width={30}
                      height={30}
                      className="object-cover rounded-full overflow-hidden"
                    />
                    <p className="text-[8px] mt-2 font-semibold text-lightColor">
                      {blog.author.name}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBlog;
