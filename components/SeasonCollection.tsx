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
    image: "/images/collection-biography.jpg?v=2",
    ringColor: "group-hover:border-amber-500 group-hover:ring-amber-100"
  },
  {
    name: "Children's Books",
    subtitle: "Fairy Tales & Art",
    filter: "Children's Books",
    href: "/books?cat=children",
    image: "/images/collection-children.jpg?v=2",
    ringColor: "group-hover:border-emerald-500 group-hover:ring-emerald-100"
  },
  {
    name: "Literature & Fiction",
    subtitle: "Novels & Poetry",
    filter: "Literature & Fiction",
    href: "/books?cat=fiction",
    image: "/images/collection-fiction.jpg?v=2",
    ringColor: "group-hover:border-rose-500 group-hover:ring-rose-100"
  },
  {
    name: "Academic & PSC",
    subtitle: "Rank Files & Guides",
    filter: "Competitive & Academic",
    href: "/books?cat=academic",
    image: "/images/collection-academic.jpg?v=2",
    ringColor: "group-hover:border-blue-600 group-hover:ring-blue-100"
  },
  {
    name: "Stationery & Art",
    subtitle: "Pens, Notes & Sets",
    filter: "Stationery Products",
    href: "/stationery",
    image: "/images/category-stationery.jpg?v=2",
    ringColor: "group-hover:border-purple-500 group-hover:ring-purple-100"
  },
  {
    name: "Custom Printing",
    subtitle: "Photo Mugs & Gifts",
    filter: "__custom__",
    href: "/custom-products",
    image: "/images/category-custom.jpg?v=2",
    ringColor: "group-hover:border-[#ED1C24] group-hover:ring-red-100"
  }
];

export default function SeasonCollection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white border-b border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0057B8] mb-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Curated Collections</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
              Explore by Genre &amp; Category
            </h2>
          </div>
          <Link
            href="/books"
            className="group hidden sm:inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-[#0057B8] transition-colors"
          >
            <span>View All Titles</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 6 Circular Category Showcase */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 justify-center">
          {categoryData.map((cat) => {
            const count =
              cat.filter === "__custom__"
                ? 12
                : products.filter((p) => p.category === cat.filter).length;

            return (
              <Link
                key={cat.name}
                href={cat.href}
                className="group flex flex-col items-center gap-3.5 transition-transform duration-300 hover:-translate-y-1.5 text-center"
              >
                {/* Visual Circular Avatar with Double-Bezel Hardware Frame */}
                <div
                  className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full p-2 bg-gradient-to-br from-slate-100 via-white to-slate-200 shadow-md transition-all duration-500 group-hover:shadow-2xl group-hover:ring-4 ${cat.ringColor} overflow-hidden border border-slate-200/80`}
                >
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 relative shadow-inner">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Text Labels */}
                <div className="px-1 space-y-0.5">
                  <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-[#0057B8] transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {count > 0 ? `${count} titles available` : cat.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#0057B8] bg-blue-50 px-4 py-2.5 rounded-full"
          >
            <span>View All Categories &amp; Books</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
