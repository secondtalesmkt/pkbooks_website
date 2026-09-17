"use client";

import Link from "next/link";
import { Award, BookMarked, Calculator, GraduationCap, Layers, Library, PenTool, Printer } from "lucide-react";

const categories = [
  {
    name: "Academic & School",
    tagline: "NCERT, SCERT & Guidebooks",
    count: "450+ Titles",
    icon: GraduationCap,
    gradient: "from-blue-600 to-indigo-800",
    bgLight: "bg-blue-50 hover:bg-blue-100/80 border-blue-200/80",
    textColor: "text-[#0057B8]",
    href: "/books?category=Competitive%20%26%20Academic"
  },
  {
    name: "Biographies & Memoirs",
    tagline: "Inspiring Life Stories",
    count: "180+ Titles",
    icon: BookMarked,
    gradient: "from-amber-500 to-amber-700",
    bgLight: "bg-amber-50 hover:bg-amber-100/80 border-amber-200/80",
    textColor: "text-amber-800",
    href: "/books?category=Biographies%20%26%20Memoirs"
  },
  {
    name: "Literature & Fiction",
    tagline: "Malayalam & World Classics",
    count: "320+ Titles",
    icon: Library,
    gradient: "from-rose-500 to-red-700",
    bgLight: "bg-red-50 hover:bg-red-100/80 border-red-200/80",
    textColor: "text-[#ED1C24]",
    href: "/books?category=Literature%20%26%20Fiction"
  },
  {
    name: "Kerala PSC & Exams",
    tagline: "Rank Files & Question Banks",
    count: "280+ Titles",
    icon: Award,
    gradient: "from-emerald-600 to-teal-800",
    bgLight: "bg-emerald-50 hover:bg-emerald-100/80 border-emerald-200/80",
    textColor: "text-emerald-800",
    href: "/books?category=Competitive%20%26%20Academic"
  },
  {
    name: "Stationery & Geometry",
    tagline: "Calculators, Notebooks & Kits",
    count: "540+ Items",
    icon: Calculator,
    gradient: "from-cyan-600 to-blue-800",
    bgLight: "bg-cyan-50 hover:bg-cyan-100/80 border-cyan-200/80",
    textColor: "text-cyan-800",
    href: "/stationery"
  },
  {
    name: "Custom Printing",
    tagline: "PDF Print, Spiral & Project Bind",
    count: "On Demand",
    icon: Printer,
    gradient: "from-violet-600 to-purple-800",
    bgLight: "bg-purple-50 hover:bg-purple-100/80 border-purple-200/80",
    textColor: "text-purple-800",
    href: "/printing"
  }
];

export default function CategorySelector() {
  return (
    <section className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching BePaintStore */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-black uppercase tracking-widest text-[#0057B8]">
            Browse By Department
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">
            Select a category
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Explore curated sections for students, competitive aspirants, and book lovers.
          </p>
        </div>

        {/* Categories Grid (BePaintStore Circle/Card Grid Style) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={cat.href}
                className={`group flex flex-col items-center text-center p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg ${cat.bgLight}`}
              >
                {/* Icon Circle */}
                <div className={`w-16 h-16 rounded-full bg-gradient-to-tr ${cat.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300 mb-3.5`}>
                  <Icon className="w-8 h-8 stroke-[1.75]" />
                </div>

                {/* Title */}
                <h3 className="text-sm font-black text-slate-900 leading-snug line-clamp-2">
                  {cat.name}
                </h3>

                {/* Count badge */}
                <span className="text-[11px] font-bold text-slate-500 mt-1.5">
                  {cat.count}
                </span>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
