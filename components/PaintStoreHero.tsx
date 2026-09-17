"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle, ChevronRight, FileText, Printer, ShieldCheck, Sparkles, Star, Truck } from "lucide-react";
import { Product } from "@/lib/catalog";

interface PaintStoreHeroProps {
  onExploreCatalog: () => void;
  onAddToCart: (product: Product) => void;
  featuredProducts: Product[];
}

export default function PaintStoreHero({
  onExploreCatalog,
  onAddToCart,
  featuredProducts
}: PaintStoreHeroProps) {
  const [activeHeroBook, setActiveHeroBook] = useState(0);

  const heroBooks = featuredProducts.slice(0, 3);
  const currentBook = heroBooks[activeHeroBook] || heroBooks[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-100/80 via-white to-slate-50 pt-2 pb-12 sm:pb-16 lg:pb-20 border-b border-slate-200/80">
      {/* 1. TOP ANNOUNCEMENT TICKER (Inspired by BePaintStore Top Promo Bar) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="flex items-center justify-between gap-4 py-2.5 px-4 rounded-full bg-slate-900 text-white text-xs sm:text-sm font-medium shadow-sm overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#ED1C24] text-[10px] font-bold">
              ⚡
            </span>
            <span className="text-slate-200">Order processing time <strong>24h</strong></span>
          </div>

          <div className="hidden md:flex items-center gap-2 text-slate-300">
            <Truck className="w-4 h-4 text-[#0057B8]" />
            <span>Free delivery in Valanchery on orders over ₹499</span>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-slate-300">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Genuine Publisher Editions</span>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
            <Link
              href="https://wa.me/919847012345"
              target="_blank"
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
            >
              <span>WhatsApp Support</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* 2. MAIN HERO DISPLAY (Split Layout matching BePaintStore) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: Headline, Description, Dual Pill Buttons & Trust Metrics */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-left">
            {/* Small Subtitle Pill with Dot */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#EEF5FF] border border-[#BFDBFE] text-[#0057B8] text-xs sm:text-sm font-bold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#0057B8] animate-pulse" />
              <span>Official Bookstore & Printing Press • Valanchery</span>
            </div>

            {/* Giant Clean Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black text-slate-900 leading-[1.08] tracking-tight">
              Everything You Need for <span className="text-[#0057B8]">Academic Excellence</span> & Lifelong Reading.
            </h1>

            {/* Lead Description */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
              Discover Kerala&apos;s trusted destination for academic school packages, university textbooks, Malayalam literature, PSC exam rank files, and instant online document printing with door delivery.
            </p>

            {/* Dual Pill Buttons (BePaintStore Signature Style) */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-1">
              <button
                onClick={onExploreCatalog}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#0057B8] text-white text-sm sm:text-base font-bold shadow-lg shadow-[#0057B8]/25 hover:bg-[#00438F] hover:shadow-xl hover:shadow-[#0057B8]/30 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <span>Shop Books Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                href="/printing"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white text-slate-800 text-sm sm:text-base font-bold border border-slate-300 shadow-sm hover:bg-slate-50 hover:border-slate-400 hover:-translate-y-0.5 transition-all duration-200"
              >
                <Printer className="w-4 h-4 text-[#ED1C24]" />
                <span>Upload & Print Notes</span>
              </Link>
            </div>

            {/* Trust Metrics Bar (BePaintStore 3-Item Trust Strip) */}
            <div className="pt-6 border-t border-slate-200/90 grid grid-cols-3 gap-3 sm:gap-6">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-xs sm:text-sm font-black text-slate-900">4.9/5 Rating</div>
                <div className="text-[11px] sm:text-xs text-slate-500">1,800+ Google Reviews</div>
              </div>

              <div>
                <div className="text-base sm:text-lg font-black text-[#0057B8] mb-0.5">15,000+</div>
                <div className="text-xs sm:text-sm font-black text-slate-900">Students Served</div>
                <div className="text-[11px] sm:text-xs text-slate-500">Malappuram & Kerala</div>
              </div>

              <div>
                <div className="text-base sm:text-lg font-black text-[#ED1C24] mb-0.5">Same Day</div>
                <div className="text-xs sm:text-sm font-black text-slate-900">Order Dispatch</div>
                <div className="text-[11px] sm:text-xs text-slate-500">Fast Local Delivery</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Floating 3D Bestseller Showcase & Spotlight Card */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            {/* Background Glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#0057B8]/15 to-[#ED1C24]/10 blur-2xl -z-10" />

            {/* Main Featured Book Card */}
            <div className="relative rounded-3xl bg-white p-6 sm:p-7 shadow-xl border border-slate-200/90 overflow-hidden">
              {/* Floating Sale Tag */}
              <div className="absolute top-5 right-5 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#ED1C24] text-white text-xs font-black tracking-wide shadow-sm">
                <span>BESTSELLER</span>
              </div>

              {/* Book Category Label */}
              <div className="text-xs font-black uppercase tracking-wider text-[#0057B8] mb-4">
                {currentBook?.category || "Biographies & Memoirs"}
              </div>

              <div className="grid grid-cols-12 gap-5 items-center">
                {/* 3D Book Cover Graphic */}
                <div className="col-span-5 relative aspect-[3/4.4] rounded-2xl bg-gradient-to-br from-amber-600 via-yellow-700 to-stone-900 p-4 text-white shadow-2xl flex flex-col justify-between overflow-hidden border-l-4 border-black/30">
                  <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-black/25 shadow-inner" />
                  <div className="absolute left-2.5 top-0 bottom-0 w-px bg-white/20" />

                  <div className="text-[9px] font-black uppercase tracking-widest text-white/80">
                    PK BOOKS
                  </div>

                  <div>
                    <h3 className="text-sm font-black text-white leading-tight line-clamp-2 drop-shadow-sm">
                      {currentBook?.name || "Wings of Fire"}
                    </h3>
                    <p className="text-[10px] text-white/70 font-mono mt-1 truncate">
                      {currentBook?.author || "Dr. A.P.J. Abdul Kalam"}
                    </p>
                  </div>

                  <div className="text-[9px] text-amber-200 font-bold">
                    Official Edition
                  </div>
                </div>

                {/* Details & Quick Action */}
                <div className="col-span-7 space-y-3">
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug line-clamp-2">
                    {currentBook?.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {currentBook?.description}
                  </p>

                  <div className="flex items-baseline gap-2 pt-1">
                    <span className="text-2xl font-black text-slate-900">
                      ₹{currentBook?.discountPrice || 315}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      ₹{currentBook?.price || 395}
                    </span>
                    <span className="text-xs font-bold text-emerald-600">
                      Save {Math.round((((currentBook?.price || 395) - (currentBook?.discountPrice || 315)) / (currentBook?.price || 395)) * 100)}%
                    </span>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => currentBook && onAddToCart(currentBook)}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#0057B8] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#00438F] transition-all"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Book Switcher Tabs */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Popular Recommendations:</span>
                <div className="flex items-center gap-1.5">
                  {heroBooks.map((b, idx) => (
                    <button
                      key={b.id}
                      onClick={() => setActiveHeroBook(idx)}
                      className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                        activeHeroBook === idx
                          ? "bg-slate-900 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {idx === 0 ? "Kalam" : idx === 1 ? "Steve Jobs" : "Goat Days"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Trust Card */}
            <div className="hidden sm:flex items-center gap-3 absolute -bottom-5 -left-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-slate-200 text-xs font-bold text-slate-800">
              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>In Stock & Ready for Doorstep Delivery</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
