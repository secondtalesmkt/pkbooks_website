"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2, MessageCircle, ShoppingBag, ShieldCheck } from "lucide-react";

export default function SeasonalPromoStrip() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0056B3] via-[#092252] to-slate-950 shadow-2xl border border-blue-500/30 text-white">
          {/* Subtle background ambient lights */}
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#ED1C24]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-14">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              {/* Promo Badge */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-md px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-[#ED1C24]" />
                  Academic Year 2026–27
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#ED1C24] px-3 py-1 text-xs font-bold text-white shadow-sm">
                  Special Student Discount
                </span>
              </div>

              {/* Heading */}
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-[1.12]"
              >
                Complete School &amp; Exam Combo Bundles
              </h2>

              {/* Subheading */}
              <p className="mt-4 text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-xl font-normal">
                Prescribed State &amp; CBSE syllabus textbooks, Classmate study notebooks, geometry kits, and PSC materials — bundled together at official store counter prices.
              </p>

              {/* Value Highlights */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-white font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-200 shrink-0" />
                  <span>Verified 2026-27 Syllabus</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-200 shrink-0" />
                  <span>Free Geometry &amp; Pen Kit</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-200 shrink-0" />
                  <span>Bulk School &amp; PTA Packages</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-blue-200 shrink-0" />
                  <span>15-Min Pickup at Bus Stand</span>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/books?category=Academic"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#ED1C24] hover:bg-[#d0141b] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-500/25 active:scale-[0.98] transition-all duration-200"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Shop Academic Bundles</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href="https://wa.me/919746700123?text=Hi%20PK%20Books%2C%20I%20am%20interested%20in%20the%20Academic%20Year%202026-27%20packages%20and%20combo%20bundles."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-slate-900 hover:bg-slate-100 active:scale-[0.98] shadow-md transition-all duration-200"
                >
                  <MessageCircle className="h-4 w-4 text-[#0056B3]" />
                  <span>Quick WhatsApp Order</span>
                </a>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-md group">
                {/* Glow ring behind image */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-blue-400 to-[#ED1C24] opacity-30 blur-lg group-hover:opacity-50 transition duration-500" />

                {/* Main Product Photography Card */}
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl border-2 border-white/20 aspect-[4/3]">
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
                  <div className="absolute top-3 right-3 rounded-full bg-[#ED1C24] px-3.5 py-1 text-xs font-black text-white shadow-lg uppercase tracking-wide border border-white/20">
                    Official Combo
                  </div>

                  {/* Bottom Caption Pill */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl bg-slate-950/80 backdrop-blur-md px-3.5 py-2 text-white border border-white/15">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-blue-300 shrink-0" />
                      <span className="text-xs font-semibold">100% Genuine Books</span>
                    </div>
                    <span className="text-xs font-black text-white">Starting ₹799</span>
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

