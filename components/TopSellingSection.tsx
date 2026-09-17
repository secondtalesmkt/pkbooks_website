"use client";

import { useState } from "react";
import { Eye, Heart, ShoppingBag, Star } from "lucide-react";
import { Product } from "@/lib/catalog";

interface TopSellingSectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

const filterTabs = [
  "All Products",
  "Biographies & Memoirs",
  "Literature & Fiction",
  "Competitive & Academic",
  "Stationery Products"
];

export default function TopSellingSection({
  products,
  onAddToCart,
  onQuickView
}: TopSellingSectionProps) {
  const [activeTab, setActiveTab] = useState("All Products");

  const filtered = activeTab === "All Products"
    ? products.slice(0, 8)
    : products.filter(p => p.category === activeTab).slice(0, 8);

  const displayList = filtered.length > 0 ? filtered : products.slice(0, 8);

  return (
    <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header + Filter Tabs matching BePaintStore */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">
              Verified Customer Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">
              Top selling
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              The most requested books and academic supplies in Valanchery this month.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex-shrink-0 ${
                  activeTab === tab
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid (4 columns on desktop, 2 on mobile) */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {displayList.map((product) => {
            const discountPercent = Math.round(((product.price - product.discountPrice) / product.price) * 100);

            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between rounded-2xl bg-white p-3.5 sm:p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] border border-slate-200 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
              >
                <div>
                  {/* Book Mockup Cover with 3D Spine and Tone */}
                  <div
                    onClick={() => onQuickView(product)}
                    className={`relative aspect-[3/4.2] w-full rounded-2xl bg-gradient-to-br ${
                      product.imageTone || "from-slate-700 via-slate-800 to-slate-950"
                    } p-3.5 text-white shadow-md transition-all duration-300 group-hover:scale-[1.02] cursor-pointer flex flex-col justify-between overflow-hidden border-l-4 border-black/25`}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/25 shadow-inner pointer-events-none" />
                    <div className="absolute left-2 top-0 bottom-0 w-px bg-white/15 pointer-events-none" />

                    {/* Top Tag & Discount */}
                    <div className="flex items-start justify-between z-10">
                      {product.badge ? (
                        <span className="rounded-md bg-white/20 backdrop-blur-md px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white border border-white/20">
                          {product.badge}
                        </span>
                      ) : (
                        <span className="text-[9px] font-bold text-white/70">PK BOOKS</span>
                      )}

                      {discountPercent > 0 && (
                        <span className="rounded-full bg-[#ED1C24] px-2 py-0.5 text-[9px] font-black tracking-wide text-white shadow-xs">
                          -{discountPercent}%
                        </span>
                      )}
                    </div>

                    {/* Title & Author on Cover */}
                    <div className="z-10 space-y-1">
                      <h4 className="text-xs font-black text-white leading-snug line-clamp-2 drop-shadow-xs">
                        {product.name}
                      </h4>
                      {product.author && (
                        <p className="text-[10px] text-white/80 font-mono line-clamp-1">
                          {product.author}
                        </p>
                      )}
                    </div>

                    {/* Quick View Hover Button */}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickView(product);
                        }}
                        className="px-3.5 py-1.5 rounded-full bg-white text-slate-900 text-xs font-bold shadow-lg hover:bg-slate-100 transition-colors flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View</span>
                      </button>
                    </div>
                  </div>

                  {/* Rating Stars & Reviews */}
                  <div className="mt-3 flex items-center gap-1.5">
                    <div className="flex items-center text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-slate-500">
                      ({product.reviewsCount || 48})
                    </span>
                  </div>

                  {/* Title & Category */}
                  <h3 className="mt-1 text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                    {product.category}
                  </p>
                </div>

                {/* Price & Add to Cart Pill Button (BePaintStore Style) */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-base font-black text-slate-900">
                      ₹{product.discountPrice}
                    </div>
                    {product.price > product.discountPrice && (
                      <div className="text-xs text-slate-400 line-through">
                        ₹{product.price}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onAddToCart(product)}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-[#0057B8] text-white text-xs font-bold hover:bg-[#00438F] active:scale-95 transition-all shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add</span>
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
