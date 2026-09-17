"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Eye, Heart, Plus, ShoppingBag, Star } from "lucide-react";
import { Product } from "@/lib/catalog";

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

export interface CategoryShowcaseProps {
  title: string;
  subcategories: string[];
  bannerBg: string;
  bannerTextColor?: string;
  bannerBorderColor?: string;
  bannerBook: {
    title: string;
    subtitle?: string;
    author: string;
    gradient: string;
    tag?: string;
  };
  bannerPropsEmoji?: string;
  bannerHref?: string;
  books: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export default function CategoryShowcase({
  title,
  subcategories,
  bannerBg,
  bannerTextColor = "text-slate-900",
  bannerBorderColor = "border-black/5",
  bannerBook,
  bannerPropsEmoji = "🌿",
  bannerHref = "/books",
  books,
  onAddToCart,
  onQuickView
}: CategoryShowcaseProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  // Simple carousel pagination
  const itemsPerPage = 4;
  const maxPages = Math.ceil(books.length / itemsPerPage);

  const visibleBooks = books.slice(activeSlide * itemsPerPage, (activeSlide + 1) * itemsPerPage);
  const displayBooks = visibleBooks.length > 0 ? visibleBooks : books.slice(0, 4);

  return (
    <section className="mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8">
      {/* Section Header with line and pagination controls matching reference */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 flex-shrink-0">
          {title}
        </h2>

        {/* Decorative Divider Line */}
        <div className="hidden sm:block flex-1 h-px bg-slate-200/80 mx-4" />

        {/* Navigation Dots & Carousel Indicator */}
        <div className="flex items-center gap-2">
          {/* Visual Indicator Dots matching the reference (small dots + coral active pill) */}
          <div className="flex items-center gap-1.5 mr-2">
            {[...Array(Math.max(2, maxPages))].map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  activeSlide === i
                    ? "h-2 w-6 bg-[#ED1C24]"
                    : "h-2 w-2 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          {/* Prev/Next Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveSlide((prev) => (prev > 0 ? prev - 1 : maxPages - 1))}
              aria-label="Previous items"
              className="grid h-8 w-8 place-items-center rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-xs"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => setActiveSlide((prev) => (prev < maxPages - 1 ? prev + 1 : 0))}
              aria-label="Next items"
              className="grid h-8 w-8 place-items-center rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-xs"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Showcase Layout: Left Feature Banner + Right Book Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* ========================================================================= */}
        {/* LEFT FEATURE BANNER (Col Span 4 on LG, 3 on XL) */}
        {/* ========================================================================= */}
        <div
          className={`lg:col-span-4 xl:col-span-3 rounded-3xl ${bannerBg} ${bannerBorderColor} border p-6 sm:p-7 flex flex-col justify-between shadow-xs relative overflow-hidden`}
        >
          {/* Decorative Corner Foliage & Prop Emojis */}
          <div className="absolute top-4 right-4 text-2xl opacity-70 pointer-events-none select-none">
            {bannerPropsEmoji}
          </div>
          <div className="absolute bottom-4 left-4 text-3xl opacity-20 pointer-events-none select-none">
            🌿
          </div>

          {/* Subcategories List */}
          <div className="relative z-10 space-y-3">
            <div className="space-y-2.5">
              {subcategories.map((sub, i) => (
                <Link
                  key={sub}
                  href={`${bannerHref}?sub=${encodeURIComponent(sub)}`}
                  className="block text-xs sm:text-sm font-bold text-slate-700 hover:text-[#ED1C24] transition-colors line-clamp-1"
                >
                  {sub}
                </Link>
              ))}
            </div>

            <div className="pt-2">
              <Link
                href={bannerHref}
                className="inline-flex items-center gap-1.5 text-xs font-black text-[#ED1C24] hover:underline underline-offset-4 tracking-wide group"
              >
                <span>View More</span>
                <span className="text-sm group-hover:translate-x-1 transition-transform">&gt;</span>
              </Link>
            </div>
          </div>

          {/* Bottom 3D Featured Book Mockup */}
          <div className="relative z-10 mt-6 pt-4 flex justify-end">
            <div
              className={`relative w-32 sm:w-36 aspect-[3/4.2] rounded-r-xl rounded-l-xs bg-gradient-to-br ${bannerBook.gradient} p-3 shadow-2xl flex flex-col justify-between border-l-4 border-black/30 overflow-hidden transform group-hover:scale-105 transition-transform duration-300`}
            >
              {/* Spine Highlight */}
              <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-black/25 to-transparent pointer-events-none" />
              <div className="absolute left-3 top-0 bottom-0 w-px bg-white/20 pointer-events-none" />

              <div className="z-10 text-[8px] font-black uppercase tracking-wider text-white/80 line-clamp-1">
                {bannerBook.tag || "Featured Book"}
              </div>

              <div className="z-10 space-y-1">
                <h4 className="text-[11px] font-black text-white leading-tight line-clamp-2 drop-shadow-xs">
                  {bannerBook.title}
                </h4>
                <p className="text-[8px] text-white/70 font-mono truncate">
                  {bannerBook.author}
                </p>
              </div>

              <div className="absolute -right-6 -bottom-6 h-20 w-20 rounded-full bg-white/10 blur-md pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT BOOK PRODUCTS GRID (Col Span 8 on LG, 9 on XL - 4 Cards) */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 xl:col-span-9 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5">
          {displayBooks.map((book) => {
            const discountPercent = Math.round(((book.price - book.discountPrice) / book.price) * 100);

            return (
              <div
                key={book.id}
                className="group flex flex-col justify-between rounded-2xl bg-white p-3.5 sm:p-4 shadow-[0_2px_15px_rgba(0,0,0,0.02)] border border-slate-200/70 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
              >
                <div>
                  {/* Book Cover Container with Rounded Corners matching the reference */}
                  <div
                    onClick={() => onQuickView(book)}
                    className={`relative aspect-[3/4.2] w-full rounded-2xl bg-gradient-to-br ${
                      book.imageTone || "from-slate-700 via-slate-800 to-slate-950"
                    } p-3.5 text-white shadow-md transition-all duration-300 group-hover:scale-[1.02] cursor-pointer flex flex-col justify-between overflow-hidden border-l-4 border-black/20`}
                  >
                    {/* Spine Shadow Accents */}
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/25 shadow-inner" />
                    <div className="absolute left-2 top-0 bottom-0 w-px bg-white/15" />

                    {/* Top Tag & Discount */}
                    <div className="flex items-start justify-between z-10">
                      {book.badge ? (
                        <span className="rounded-md bg-white/20 backdrop-blur-md px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider text-white border border-white/20">
                          {book.badge}
                        </span>
                      ) : (
                        <span className="text-[8px] font-mono text-white/70 uppercase truncate max-w-[80px]">
                          {book.subCategory || book.category}
                        </span>
                      )}

                      {discountPercent > 0 && (
                        <span className="rounded-md bg-[#ED1C24] px-1.5 py-0.5 text-[9px] font-black text-white shadow-xs">
                          {discountPercent}%
                        </span>
                      )}
                    </div>

                    {/* Book Cover Typography */}
                    <div className="z-10 space-y-0.5 pl-0.5">
                      <span className="block text-[8px] font-mono uppercase tracking-widest text-white/70 truncate">
                        {book.author || book.publisher}
                      </span>
                      <h4 className="font-bold text-xs sm:text-sm text-white leading-tight line-clamp-2 drop-shadow-xs">
                        {book.name}
                      </h4>
                    </div>

                    {/* Hover Quick Action overlay */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-20">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickView(book);
                        }}
                        className="h-8 w-8 rounded-full bg-white text-slate-900 grid place-items-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                        aria-label="Quick View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(book);
                        }}
                        className="h-8 w-8 rounded-full bg-[#ED1C24] text-white grid place-items-center shadow-lg hover:scale-110 active:scale-95 transition-all"
                        aria-label="Add to cart"
                      >
                        <ShoppingBag className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Book Metadata Below Cover matching the reference */}
                  <div className="mt-3 space-y-1">
                    {/* Title */}
                    <h3
                      onClick={() => onQuickView(book)}
                      className="font-bold text-xs sm:text-sm text-slate-900 leading-snug line-clamp-1 hover:text-[#0056B3] cursor-pointer transition-colors"
                      title={book.name}
                    >
                      {book.name}
                    </h3>

                    {/* Star Rating & Review Count */}
                    <div className="flex items-center gap-1.5 text-xs">
                      <div className="flex items-center text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(book.rating)
                                ? "fill-amber-400 text-amber-400"
                                : "text-slate-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] font-bold text-slate-600">
                        {book.rating.toFixed(0)}
                      </span>
                    </div>

                    {/* Author Name */}
                    <p className="text-[11px] text-slate-500 truncate font-normal">
                      {book.author || book.publisher || "PK Editorial"}
                    </p>
                  </div>
                </div>

                {/* Price Tag in Bold Coral/Red matching reference */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm sm:text-base font-black text-[#ED1C24]">
                      {money.format(book.discountPrice)}
                    </span>
                    {book.price > book.discountPrice && (
                      <span className="text-[11px] text-slate-400 line-through">
                        {money.format(book.price)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => onAddToCart(book)}
                    className="h-7 px-2 sm:px-2.5 rounded-lg bg-slate-900 hover:bg-[#0056B3] text-white text-[10px] font-bold flex items-center gap-1 shadow-xs transition-colors"
                  >
                    <Plus className="h-3 w-3" /> Add
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
