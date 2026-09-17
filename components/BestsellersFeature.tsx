"use client";

import Link from "next/link";
import { ArrowRight, Flame, Sparkles, Star } from "lucide-react";

export default function BestsellersFeature() {
  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[28px] sm:rounded-[32px] overflow-hidden bg-gradient-to-r from-slate-950 via-[#0a1c40] to-slate-900 border border-blue-900/40 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Left Editorial Content */}
            <div className="lg:col-span-6 p-6 sm:p-9 lg:p-12 space-y-4 sm:space-y-5 z-10 text-white">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 text-xs font-bold text-white shadow-2xs w-fit">
                <Flame className="h-3.5 w-3.5 text-amber-400" />
                <span>Trending Across Kerala · Top 10 Bestsellers</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-white leading-[1.12] tracking-tight">
                  Kerala&apos;s Most-Read<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-white to-cyan-200">
                    Bestselling Books
                  </span>
                </h2>

                <p className="text-xs sm:text-sm text-blue-100/85 max-w-md leading-relaxed font-normal pt-1">
                  From timeless Malayalam literature to national bestsellers, competitive exam rank files, and student companions — hand-picked for readers across Kerala.
                </p>
              </div>

              {/* Stats / Social Proof */}
              <div className="grid grid-cols-3 gap-2.5 pt-1 text-xs font-medium max-w-md">
                <div className="rounded-xl bg-white/10 backdrop-blur-md p-2.5 border border-white/15">
                  <span className="block text-[10px] uppercase font-bold text-blue-200">Catalogue</span>
                  <span className="text-xs font-black text-white">10,000+ Titles</span>
                </div>
                <div className="rounded-xl bg-white/10 backdrop-blur-md p-2.5 border border-white/15">
                  <span className="block text-[10px] uppercase font-bold text-blue-200">Pickup</span>
                  <span className="text-xs font-black text-white">15-Mins Counter</span>
                </div>
                <div className="rounded-xl bg-white/10 backdrop-blur-md p-2.5 border border-white/15">
                  <span className="block text-[10px] uppercase font-bold text-blue-200">Rating</span>
                  <span className="text-xs font-black text-amber-300">★ 4.9/5</span>
                </div>
              </div>

              {/* Call to Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Link
                  href="/books"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#ED1C24] hover:bg-[#d0141b] text-white px-5 sm:px-6 py-3 text-xs sm:text-sm font-bold shadow-lg shadow-red-500/25 transition-all active:scale-98"
                >
                  <span>Explore Bestseller Books</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/books?cat=Malayalam"
                  className="text-xs font-bold text-blue-200 hover:text-white underline underline-offset-4 decoration-blue-300/40 transition-colors"
                >
                  Malayalam Novels &rarr;
                </Link>
              </div>
            </div>

            {/* Right Cinematic Image Showcase */}
            <div className="lg:col-span-6 relative h-[260px] sm:h-[340px] lg:h-[420px] overflow-hidden">
              <img
                src="/images/bestseller-library-banner.jpg"
                alt="Kerala Bestselling Books Collection"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              {/* Vignette blend on left edge */}
              <div className="hidden lg:block absolute inset-y-0 left-0 w-28 bg-gradient-to-r from-slate-950 via-slate-950/60 to-transparent" />
              {/* Vignette blend on mobile top edge */}
              <div className="block lg:hidden absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-slate-950 via-slate-950/60 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
