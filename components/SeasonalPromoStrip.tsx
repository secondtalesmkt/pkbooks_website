"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2, MessageCircle, ShoppingBag, ShieldCheck } from "lucide-react";

export default function SeasonalPromoStrip() {
  return (
    <section className="py-10 sm:py-14 bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#ea580c] via-[#f59e0b] to-[#d97706] shadow-xl shadow-orange-500/10 text-white">
          {/* Subtle background ambient lights */}
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-black/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-14">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Promo Badge */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-md px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white border border-white/25">
                  <Sparkles className="h-3.5 w-3.5 text-yellow-200" />
                  Academic Year 2026–27
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-black/30 backdrop-blur-md px-3 py-1 text-xs font-bold text-yellow-300 border border-yellow-400/30">
                  Flat 30% OFF Today
                </span>
              </div>

              {/* Heading */}
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.12]"
                style={{ fontFamily: "var(--font-outfit), 'Outfit', sans-serif" }}
              >
                Complete School &amp; Exam Combo Bundles
              </h2>

              {/* Subheading */}
              <p className="mt-4 text-base sm:text-lg text-white/90 leading-relaxed max-w-xl font-medium">
                Prescribed State &amp; CBSE syllabus textbooks, Classmate study notebooks, geometry kits, and PSC materials — bundled together at unbeatable student prices.
              </p>

              {/* Value Highlights */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-white/95 font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-yellow-300 shrink-0" />
                  <span>Verified 2026-27 Syllabus</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-yellow-300 shrink-0" />
                  <span>Free Geometry &amp; Pen Kit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-yellow-300 shrink-0" />
                  <span>Bulk School &amp; PTA Discounts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-yellow-300 shrink-0" />
                  <span>Fast Same-Day Delivery in Malappuram</span>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/books?category=Academic"
                  className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-bold text-white hover:bg-black hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/25 transition-all duration-200"
                >
                  <ShoppingBag className="h-4 w-4 text-amber-400" />
                  <span>Shop Academic Bundles</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="https://wa.me/919746700123?text=Hi%20PK%20Books%2C%20I%20am%20interested%20in%20the%20Academic%20Year%202026-27%20packages%20and%20combo%20bundles."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/90 backdrop-blur-md px-5 py-3.5 text-sm font-bold text-slate-900 hover:bg-white hover:scale-[1.02] active:scale-[0.98] shadow-md transition-all duration-200"
                >
                  <MessageCircle className="h-4 w-4 text-[#25D366]" />
                  <span>Quick WhatsApp Order</span>
                </a>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md group">
                {/* Glow ring behind image */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-yellow-300 to-amber-200 opacity-40 blur-lg group-hover:opacity-60 transition duration-500" />

                {/* Main Product Photography Card */}
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl border-2 border-white/30 aspect-[4/3]">
                  <Image
                    src="/images/academic-combo-bundle.jpg?v=2"
                    alt="Academic Year 2026-27 School Combo Package"
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 450px"
                    priority
                  />

                  {/* Gradient Overlay for badges legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                  {/* Floating Discount Badge */}
                  <div className="absolute top-3 right-3 rounded-full bg-red-600/90 backdrop-blur-md px-3 py-1 text-xs font-black text-white shadow-lg uppercase tracking-wide border border-white/20">
                    Save ₹350
                  </div>

                  {/* Bottom Caption Pill */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-black/60 backdrop-blur-md px-3.5 py-2 text-white border border-white/15">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                      <span className="text-xs font-semibold">100% Genuine Curricula</span>
                    </div>
                    <span className="text-xs font-black text-amber-300">From ₹799</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

