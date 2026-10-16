"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Boxes, Printer, Sparkles } from "lucide-react";

const bentoSections = [
  {
    id: "books",
    title: "Academic & Literature Bookstore",
    subtitle: "Over 10,000+ Curated Titles in Stock",
    description: "Kerala PSC 2026-27 rank files, SCERT & CBSE textbooks from Class 1 to 12, Malayalam literature classics, and bestselling novels.",
    href: "/books",
    badge: "10,000+ TITLES",
    badgeBg: "bg-blue-600 text-white",
    image: "/images/books_literature.jpg?v=2",
    colSpan: "lg:col-span-7",
    icon: BookOpen
  },
  {
    id: "print",
    title: "15-Min Express Digital Print Lab",
    subtitle: "Counter Pickup at Valanchery Bus Stand",
    description: "High-speed laser printing, KTU/Calicut University thesis hardcover with golden foil, spiral binding, and duplex color photocopy.",
    href: "/printing",
    badge: "15-MIN EXPRESS",
    badgeBg: "bg-[#ED1C24] text-white",
    image: "/images/printing_counter.jpg?v=2",
    colSpan: "lg:col-span-5",
    icon: Printer
  },
  {
    id: "stationery",
    title: "School & Office Stationery World",
    subtitle: "Authorized Dealer for Top Brands",
    description: "Classmate notebooks, Hauser XO, Pentel, Camlin geometry boxes, Faber-Castell artist pastels, and complete school companion kits.",
    href: "/stationery",
    badge: "GENUINE STOCK",
    badgeBg: "bg-emerald-600 text-white",
    image: "/images/stationery_world.jpg?v=2",
    colSpan: "lg:col-span-5",
    icon: Boxes
  },
  {
    id: "custom",
    title: "Personalized Gifts & Custom Studio",
    subtitle: "Personalized Merchandise for Students & Schools",
    description: "Custom printed spiral notebooks with student photo/name, glossy ceramic sublimation mugs, school house badges, and executive cards.",
    href: "/custom-products",
    badge: "STUDIO CREATOR",
    badgeBg: "bg-amber-600 text-white",
    image: "/images/custom_products.jpg?v=2",
    colSpan: "lg:col-span-7",
    icon: Sparkles
  }
];

export default function PromoBannerCards() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-slate-50/60 border-b border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0057B8] mb-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>4 Core Departments · Valanchery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Explore Everything at PK Books
            </h2>
          </div>
          <Link
            href="/books"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0057B8] hover:text-blue-800 transition-colors"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* High-End Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {bentoSections.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`group relative rounded-[2rem] overflow-hidden bg-slate-900 border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 flex flex-col justify-between min-h-[340px] sm:min-h-[380px] p-6 sm:p-8 ${item.colSpan}`}
              >
                {/* Background Image with Cinematic Darkness Gradient */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-45 group-hover:opacity-55"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/20" />
                </div>

                {/* Top Badge & Icon */}
                <div className="flex items-center justify-between gap-3 z-10">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest shadow-sm ${item.badgeBg}`}>
                    <Icon className="h-3 w-3" />
                    <span>{item.badge}</span>
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-slate-900 transition-all duration-300">
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Content at Bottom */}
                <div className="z-10 space-y-2 pt-12">
                  <span className="text-xs font-bold text-amber-300 tracking-wide uppercase">
                    {item.subtitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-snug group-hover:text-blue-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-lg line-clamp-2 sm:line-clamp-none">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
