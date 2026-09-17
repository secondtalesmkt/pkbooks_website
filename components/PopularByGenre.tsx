"use client";

import { useState } from "react";
import { products, Product } from "@/lib/catalog";
import { ShoppingBag, Eye, Heart, Repeat } from "lucide-react";

const genres = [
  { label: "All genres", filter: "All" },
  { label: "Fiction", filter: "Literature & Fiction" },
  { label: "Biographies", filter: "Biographies & Memoirs" },
  { label: "Academic", filter: "Competitive & Academic" },
  { label: "Children's", filter: "Children's Books" },
  { label: "Stationery", filter: "Stationery Products" },
  { label: "Shop all", filter: "__all__" }
];

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

interface PopularByGenreProps {
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export default function PopularByGenre({ onAddToCart, onQuickView }: PopularByGenreProps) {
  const [activeGenre, setActiveGenre] = useState("All");

  const filtered =
    activeGenre === "All" || activeGenre === "__all__"
      ? products
      : products.filter((p) => p.category === activeGenre);

  const displayed = filtered.slice(0, 12);

  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header with genre tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <h2
            className="text-2xl sm:text-3xl font-extrabold text-[#1a1a1a]"
            style={{ fontFamily: "var(--font-outfit), 'Outfit', serif" }}
          >
            Popular by Genre
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {genres.map((genre) => (
              <button
                key={genre.label}
                onClick={() => setActiveGenre(genre.filter)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 border ${
                  activeGenre === genre.filter
                    ? "border-[#1a1a1a] bg-white text-[#1a1a1a]"
                    : "border-transparent text-gray-500 hover:text-[#1a1a1a] hover:border-gray-200"
                }`}
              >
                {genre.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {displayed.map((product) => (
            <div key={product.id} className="group">
              {/* Book cover */}
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-[#f5f5f5] mb-3">
                <div className={`absolute inset-0 bg-gradient-to-b ${product.imageTone} flex items-center justify-center p-3 transition-transform duration-500 group-hover:scale-105`}>
                  <div className="text-center">
                    {product.author && (
                      <p className="text-[7px] font-bold text-white/50 uppercase tracking-widest mb-1">
                        {product.author.split(",")[0]}
                      </p>
                    )}
                    <p className="text-[10px] sm:text-xs font-black text-white leading-tight">
                      {product.name.length > 30 ? product.name.slice(0, 30) + "…" : product.name}
                    </p>
                  </div>
                </div>

                {/* Discount badge */}
                {product.price !== product.discountPrice && (
                  <div className="absolute top-2 left-2 bg-[#ED1C24] text-white text-[9px] font-bold px-2 py-0.5 rounded">
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                  </div>
                )}

                {/* Hover action icons */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <button
                    onClick={() => onAddToCart?.(product)}
                    className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#0057B8] hover:text-white transition-colors"
                    title="Add to cart"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#0057B8] hover:text-white transition-colors" title="Wishlist">
                    <Heart className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => onQuickView?.(product)}
                    className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#0057B8] hover:text-white transition-colors"
                    title="Quick view"
                  >
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-[#0057B8] hover:text-white transition-colors" title="Compare">
                    <Repeat className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Product info */}
              <h3 className="text-xs sm:text-sm font-semibold text-[#1a1a1a] leading-tight line-clamp-2 group-hover:text-[#0057B8] transition-colors">
                {product.name}
              </h3>
              <div className="mt-1 flex items-center gap-2">
                {product.price !== product.discountPrice && (
                  <span className="text-xs text-gray-400 line-through">
                    {money.format(product.price)}
                  </span>
                )}
                <span className={`text-sm font-bold ${product.price !== product.discountPrice ? "text-[#ED1C24]" : "text-[#1a1a1a]"}`}>
                  {money.format(product.discountPrice)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
