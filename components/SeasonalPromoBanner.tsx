"use client";

import Link from "next/link";
import { ArrowRight, BookCheck, FileText, Package, Percent, Sparkles } from "lucide-react";

export default function SeasonalPromoBanner() {
  return (
    <section className="py-10 sm:py-14 bg-slate-50 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Title matching BePaintStore */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs font-black uppercase tracking-widest text-[#0057B8]">
            Seasonal Offers & Academic Bundles
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">
            Prepare for Academic Year 2026-27
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Complete school packages, college project binding, and student essentials with special seasonal savings.
          </p>
        </div>

        {/* Dual Cards Grid (BePaintStore Campaign Split Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* PROMO CARD 1: School & College Packages */}
          <div className="relative rounded-3xl bg-gradient-to-br from-[#0057B8] to-[#00438F] text-white p-7 sm:p-9 shadow-xl overflow-hidden flex flex-col justify-between group">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 bg-white/10 rounded-full blur-xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider text-white mb-4">
                <Package className="w-3.5 h-3.5" />
                <span>All-in-One Package</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Class 1 to 12 Complete <br />
                School Book Bundles
              </h3>

              <p className="text-blue-100 text-sm mt-3 max-w-md leading-relaxed">
                Save hours with pre-packaged school sets containing verified textbooks, notebooks, geometry kits, and name labels.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between">
              <div>
                <span className="text-xs text-blue-200 block">Bundle Discount</span>
                <span className="text-xl font-black text-white">Flat 20% OFF</span>
              </div>

              <Link
                href="/custom-products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#0057B8] text-xs sm:text-sm font-bold shadow-md hover:bg-slate-100 transition-all group-hover:translate-x-1"
              >
                <span>View School Kits</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* PROMO CARD 2: Custom Online Printing & Binding */}
          <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 text-white p-7 sm:p-9 shadow-xl overflow-hidden flex flex-col justify-between group border border-slate-800">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 bg-[#ED1C24]/20 rounded-full blur-xl pointer-events-none" />

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ED1C24] text-white text-xs font-black uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Digital Press</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Online Document Print <br />
                & Spiral Project Binding
              </h3>

              <p className="text-slate-300 text-sm mt-3 max-w-md leading-relaxed">
                Upload your PDF notes or college record from phone, calculate instant cost, and receive door delivery in Valanchery.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Starting From</span>
                <span className="text-xl font-black text-white">₹1.50 / page</span>
              </div>

              <Link
                href="/printing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ED1C24] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#C40022] transition-all group-hover:translate-x-1"
              >
                <span>Upload PDF Now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
