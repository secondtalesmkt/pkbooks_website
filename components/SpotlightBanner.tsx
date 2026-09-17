"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Star, Zap } from "lucide-react";
import { Product } from "@/lib/catalog";

interface SpotlightBannerProps {
  onAddToCart?: (product: Product) => void;
  spotlightProduct?: Product;
}

export default function SpotlightBanner({
  onAddToCart,
  spotlightProduct
}: SpotlightBannerProps) {
  const pscItem: Product = spotlightProduct || {
    id: "psc-rank",
    name: "Kerala PSC Rank File 2027",
    category: "Competitive & Academic",
    language: "Malayalam",
    description: "Complete syllabus coverage for Secretariat Assistant, LDC, VEO, and Degree Level exams with 10 years of solved question papers.",
    price: 640,
    discountPrice: 525,
    stock: 92,
    sku: "PKB-PSC-2027",
    gst: 5,
    rating: 5.0,
    imageTone: "from-red-600 via-rose-700 to-amber-900",
    badge: "Official Rank File"
  };

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Deep Contrast Container (Inspired by BePaintStore's Rust Blocker Pro Banner) */}
        <div className="relative rounded-3xl bg-slate-900 text-white p-8 sm:p-12 lg:p-16 overflow-hidden shadow-2xl">
          {/* Ambient Lighting Accents */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 rounded-full bg-[#0057B8]/30 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 rounded-full bg-[#ED1C24]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* LEFT: Product Details, Checkmarks & CTA */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ED1C24] text-white text-xs font-black uppercase tracking-wider shadow-sm">
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Spotlight Recommendation</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                Kerala PSC Rank File 2027 <br className="hidden sm:inline" />
                <span className="text-[#38BDF8]">& Degree Level Companion</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
                The ultimate preparation manual for Secretariat Assistant, LDC, VEO, and University Assistant aspirants with verified answer keys, current affairs updates, and OMR sheets.
              </p>

              {/* Feature Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>100% Latest 2026-27 Syllabus</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>10 Years Solved Question Papers</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Free 5 Practice OMR Worksheets</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Guaranteed Same-Day Dispatch</span>
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <div>
                  <span className="text-3xl sm:text-4xl font-black text-white">₹525</span>
                  <span className="text-base text-slate-400 line-through ml-2">₹640</span>
                  <span className="ml-2 text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    Save ₹115
                  </span>
                </div>

                <button
                  onClick={() => onAddToCart && onAddToCart(pscItem)}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-[#0057B8] text-white text-sm sm:text-base font-bold shadow-lg hover:bg-[#00438F] hover:-translate-y-0.5 transition-all group"
                >
                  <span>Order Your Copy Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* RIGHT: Large 3D Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-56 sm:w-64 aspect-[3/4.4] rounded-2xl bg-gradient-to-br from-red-600 via-rose-700 to-amber-900 p-6 text-white shadow-2xl flex flex-col justify-between border-l-4 border-black/40 transform hover:scale-105 transition-transform duration-300">
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-black/30 shadow-inner" />
                <div className="absolute left-3 top-0 bottom-0 w-px bg-white/20" />

                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-300">
                    KERALA PSC 2027
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/20 text-[9px] font-bold">
                    Official Edition
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-black text-white leading-snug drop-shadow-md">
                    Master Rank File & Question Bank
                  </h3>
                  <p className="text-xs text-rose-100 font-mono">
                    By PK Books Academic Board
                  </p>
                </div>

                <div className="pt-4 border-t border-white/20 flex items-center justify-between text-xs font-bold text-amber-200">
                  <span>Valanchery Edition</span>
                  <span>5.0 ★ (420+ Reviews)</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
