"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Boxes, Printer, Sparkles } from "lucide-react";

const departmentCards = [
  {
    id: "books",
    title: "Academic & Literature Bookstore",
    shortTitle: "Bookstore",
    subtitle: "Over 10,000+ Titles",
    description: "Kerala PSC 2026-27 rank files, SCERT & CBSE textbooks from Class 1 to 12, Malayalam literature classics, and bestselling novels.",
    href: "/books",
    badge: "10,000+ TITLES",
    dotColor: "bg-[#0056B3]",
    textColor: "text-[#0056B3]",
    image: "/images/books_literature.jpg?v=2",
    icon: BookOpen
  },
  {
    id: "print",
    title: "15-Min Express Digital Print Lab",
    shortTitle: "Print Counter",
    subtitle: "Valanchery Bus Stand Pickup",
    description: "High-speed laser printing, KTU/Calicut University thesis hardcover with gold foil, spiral binding, and duplex color photocopy.",
    href: "/printing",
    badge: "15-MIN EXPRESS",
    dotColor: "bg-[#ED1C24]",
    textColor: "text-[#ED1C24]",
    image: "/images/printing_counter.jpg?v=2",
    icon: Printer
  },
  {
    id: "stationery",
    title: "School & Office Stationery World",
    shortTitle: "Stationery",
    subtitle: "Authorized Brands",
    description: "Classmate notebooks, Hauser XO, Pentel, Camlin geometry boxes, Faber-Castell artist pastels, and student packages.",
    href: "/stationery",
    badge: "GENUINE STOCK",
    dotColor: "bg-[#0056B3]",
    textColor: "text-[#0056B3]",
    image: "/images/stationery_world.jpg?v=2",
    icon: Boxes
  },
  {
    id: "custom",
    title: "Personalized Gifts & Custom Studio",
    shortTitle: "Custom Gifts",
    subtitle: "Student & School Merch",
    description: "Custom printed spiral notebooks with student photo/name, glossy ceramic sublimation mugs, school badges, and ID cards.",
    href: "/custom-products",
    badge: "STUDIO CREATOR",
    dotColor: "bg-[#ED1C24]",
    textColor: "text-[#ED1C24]",
    image: "/images/custom_products.jpg?v=2",
    icon: Sparkles
  }
];

export default function PromoBannerCards() {
  return (
    <section className="py-12 sm:py-16 bg-slate-50/70 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10 text-left">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0056B3] mb-1.5">
              <span className="w-2 h-2 rounded-full bg-[#ED1C24]" />
              <span>4 Dedicated Departments · Valanchery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Explore Our Core Departments
            </h2>
          </div>
          <Link
            href="/books"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0056B3] hover:text-blue-800 transition-colors"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Bright, Premium Department Cards (Zero Dark Monoliths) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {departmentCards.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.id}
                href={item.href}
                className="group flex flex-col rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#0056B3] transition-all duration-300 overflow-hidden hover:-translate-y-1.5 text-left"
              >
                {/* 100% Full-Color Vivid Photography Container */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  {/* Floating Pill Badge */}
                  <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-wider bg-white/95 backdrop-blur-md text-slate-900 shadow-md border border-slate-100">
                    <span className={`w-2 h-2 rounded-full ${item.dotColor}`} />
                    <span>{item.badge}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col justify-between flex-1">
                  <div>
                    <span className={`text-[11px] font-extrabold uppercase tracking-wider block ${item.textColor}`}>
                      {item.subtitle}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-[#0056B3] transition-colors leading-snug mt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal mt-2 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Clean Bottom Action Row */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0056B3] group-hover:text-[#ED1C24] transition-colors">
                      Explore {item.shortTitle}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-[#0056B3] text-slate-700 group-hover:text-white flex items-center justify-center transition-colors">
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
