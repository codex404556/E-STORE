"use client";

import { client } from "@/sanity/lib/client";
import { SEARCH_PRODUCTS } from "@/sanity/queries/query";
import { Loader2, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
interface SearchItem {
  _id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  brand: string;
  categories: string[];
}

const SearchBar = ({ isScrolled }: { isScrolled: boolean }) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [resolts, setResolts] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchInput);
    }, 250);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput]);

  // featch result besed on debouncedSearchTerm
  useEffect(() => {
    let cancelled = false;
    async function run() {
      const term = debouncedSearchTerm;
      if (term.length < 0) {
        setResolts([]);
        return;
      }

      setLoading(true);
      try {
        const q = `*${term}*`;
        const data = await client.fetch<SearchItem[]>(SEARCH_PRODUCTS, { q });

        if (!cancelled) setResolts(data ?? []);
      } catch (error) {
        console.log("Error searching products:", error);
        if (!cancelled) setResolts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();

    return () => {
      cancelled = true;
    };
  }, [debouncedSearchTerm]);
  useEffect(() => {
    if(!open) return;
    const body = document.body;
    const prevOverflow = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      body.style.overflow = prevOverflow
    }
  }, [open]);

  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if(!open) return;
    const handleClickOutside = (e: PointerEvent) => {
      const el = panelRef.current;
      if (!el) return;
      if(!el.contains(e.target as Node)) {
        setOpen(false)
      }
    };
    window.addEventListener("pointerdown", handleClickOutside);
    return () => {
      window.removeEventListener("pointerdown", handleClickOutside)
    }
  }, [open])

  useEffect(() => {
    if(!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if(e.key === "Escape") {
        setOpen(false)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open])

  return (
    <>
      <button onClick={() => setOpen(true)} className="cursor-pointer">
        <Search
          className={`w-5 h-5 hover:scale-110 hoverEffect
      ${isScrolled ? "scale-90" : "scale-110"}
    `}
        />
      </button>
      {/* modal search */}
      {open && (
        <div className="fixed inset-0 bg-black/30">
          {/* Center container */}
          <div className="relative z-10 flex min-h-screen items-start justify-center p-4 md:p-10">
            {/* Modal panel */}
            <div
              ref={panelRef}
              className="flex flex-col w-full max-w-2xl rounded-2xl bg-white p-6 shadow-lg overflow-hidden max-h-[80vh]"
            >
              {/* Header */}
              <div className="flex items-center gap-3">
                <form className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
                    <input
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      type="search"
                      placeholder="Search for products..."
                      className="w-full rounded-xl border border-lightColor bg-white py-2 pl-9 pr-3 outline-none"
                    />
                  </div>
                </form>

                <button type="button" onClick={() => setOpen(false)}>
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Body */}
              <div className="mt-4 flex-1 overflow-y-auto overscroll-contain scrollbar-hide">
                {debouncedSearchTerm.trim().length === 0 ? (
                  <p className="text-2xl font-medium space-y-10">Type to search</p>
                ) : loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2
                      size={20}
                      className="animate-spin text-shop_dark_yellow"
                    />
                    <p className="text-darkColor font-medium">Searching...</p>
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {resolts.map((item) => (
                      <li key={item._id}>
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex items-center justify-between gap-3 rounded-xl p-2 hover:bg-black/5"
                          onClick={() => setOpen(false)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 overflow-hidden rounded-lg bg-black/5">
                              {item.image ? (
                                <Image
                                  src={item.image}
                                  alt="product-image"
                                  width={40}
                                  height={40}
                                  className="h-10 w-10 object-cover"
                                />
                              ) : null}
                            </div>

                            <div>
                              <p className="text-sm font-medium">{item.name}</p>
                              <p className="text-xs opacity-70">
                                {item.brand}
                                {item.categories?.length ? (
                                  <span> • {item.categories.join(", ")}</span>
                                ) : null}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm font-medium">{item.price}$</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;
