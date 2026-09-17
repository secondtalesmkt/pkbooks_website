"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { products, Product } from "@/lib/catalog";

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

interface BestSellerCarouselProps {
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export default function BestSellerCarousel({ onAddToCart, onQuickView }: BestSellerCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const bestSellers = products
    .filter((p) => p.featured || p.rating >= 4.8)
    .sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0))
    .slice(0, 12);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth"
    });
  };

  return (
    <section className="py-10 sm:py-14 bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h2
          className="text-2xl sm:text-3xl font-extrabold text-center text-[#1a1a1a] mb-8 sm:mb-10"
          style={{ fontFamily: "var(--font-outfit), 'Outfit', serif" }}
        >
          Best Seller
        </h2>

        {/* Carousel */}
        <div className="relative group/carousel">
          {/* Scroll buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-[#0057B8] hover:text-white transition-all opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-100 flex items-center justify-center hover:bg-[#0057B8] hover:text-white transition-all opacity-0 group-hover/carousel:opacity-100"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-2"
          >
            {bestSellers.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[140px] sm:w-[160px] group/card cursor-pointer"
                onClick={() => onQuickView?.(product)}
              >
                {/* Cover */}
                <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#f5f5f5] mb-3">
                  <div className={`absolute inset-0 bg-gradient-to-b ${product.imageTone} flex items-center justify-center p-3 transition-transform duration-500 group-hover/card:scale-105`}>
                    <div className="text-center">
                      {product.author && (
                        <p className="text-[7px] font-bold text-white/50 uppercase tracking-widest mb-1">
                          {product.author.split(",")[0]}
                        </p>
                      )}
                      <p className="text-[10px] font-black text-white leading-tight">
                        {product.name.length > 25 ? product.name.slice(0, 25) + "…" : product.name}
                      </p>
                    </div>
                  </div>

                  {product.badge && (
                    <div className="absolute top-2 left-2 bg-[#0057B8] text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                      {product.badge}
                    </div>
                  )}
                </div>

                {/* Info */}
                <h3 className="text-xs font-semibold text-[#1a1a1a] leading-tight line-clamp-2 group-hover/card:text-[#0057B8] transition-colors">
                  {product.name}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  {product.price !== product.discountPrice && (
                    <span className="text-[10px] text-gray-400 line-through">
                      {money.format(product.price)}
                    </span>
                  )}
                  <span className={`text-xs font-bold ${product.price !== product.discountPrice ? "text-[#ED1C24]" : "text-[#1a1a1a]"}`}>
                    {money.format(product.discountPrice)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
