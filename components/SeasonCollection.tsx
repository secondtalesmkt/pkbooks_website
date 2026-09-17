"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { products } from "@/lib/catalog";

const categoryData = [
  {
    name: "Biographies & Memoirs",
    subtitle: "True Stories",
    filter: "Biographies & Memoirs",
    href: "/books?cat=biography",
    image: "/images/collection-biography.jpg",
    ringColor: "group-hover:border-amber-500 group-hover:ring-amber-100"
  },
  {
    name: "Children's Books",
    subtitle: "Fairy Tales & Art",
    filter: "Children's Books",
    href: "/books?cat=children",
    image: "/images/collection-children.jpg",
    ringColor: "group-hover:border-emerald-500 group-hover:ring-emerald-100"
  },
  {
    name: "Literature & Fiction",
    subtitle: "Novels & Poetry",
    filter: "Literature & Fiction",
    href: "/books?cat=fiction",
    image: "/images/collection-fiction.jpg",
    ringColor: "group-hover:border-rose-500 group-hover:ring-rose-100"
  },
  {
    name: "Academic & PSC",
    subtitle: "Rank Files & Guides",
    filter: "Competitive & Academic",
    href: "/books?cat=academic",
    image: "/images/collection-academic.jpg",
    ringColor: "group-hover:border-blue-600 group-hover:ring-blue-100"
  },
  {
    name: "Stationery & Art",
    subtitle: "Pens, Notes & Sets",
    filter: "Stationery Products",
    href: "/stationery",
    image: "/images/category-stationery.jpg",
    ringColor: "group-hover:border-purple-500 group-hover:ring-purple-100"
  },
  {
    name: "Custom Printing",
    subtitle: "Photo Mugs & Gifts",
    filter: "__custom__",
    href: "/custom-products",
    image: "/images/category-custom.jpg",
    ringColor: "group-hover:border-[#ED1C24] group-hover:ring-red-100"
  }
];

export default function SeasonCollection() {
  return (
    <section className="py-8 sm:py-12 bg-gradient-to-b from-white via-slate-50/40 to-white border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-7 sm:mb-9">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#0057B8] mb-1">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Curated Collections</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
              Explore by Genre &amp; Category
            </h2>
          </div>
          <Link
            href="/books"
            className="group hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#0057B8] transition-colors"
          >
            <span>View All Titles</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Circular Category Showcase */}
        <div className="flex sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6 overflow-x-auto no-scrollbar pb-3 sm:pb-0 px-1 -mx-4 sm:-mx-6 lg:mx-0 px-4 sm:px-6 lg:px-0 justify-start sm:justify-center">
          {categoryData.map((cat) => {
            const count =
              cat.filter === "__custom__"
                ? 12
                : products.filter((p) => p.category === cat.filter).length;

            return (
              <Link
                key={cat.name}
                href={cat.href}
                className="group flex flex-col items-center gap-2.5 min-w-[110px] sm:min-w-0 transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Visual Circular Avatar with 3D Illustration */}
                <div
                  className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white p-1.5 shadow-md border-2 border-slate-200/80 transition-all duration-300 group-hover:shadow-xl group-hover:ring-4 ${cat.ringColor} overflow-hidden`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-50 relative">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Text Labels */}
                <div className="text-center px-1">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0057B8] transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                    {count > 0 ? `${count} items` : cat.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-5 text-center sm:hidden">
          <Link
            href="/books"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0057B8]"
          >
            <span>View All Categories &amp; Books</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
