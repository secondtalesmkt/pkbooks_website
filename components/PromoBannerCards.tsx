"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { BookOpen, Boxes, ChevronLeft, ChevronRight, Sparkles, ArrowRight, Printer } from "lucide-react";

const sections = [
  {
    id: "stationery",
    name: "Stationeries",
    badge: "SCHOOL & OFFICE",
    badgeColor: "bg-emerald-100 text-emerald-800 border border-emerald-200/80",
    tagline: "Stationery World",
    tagline2: "Pens, Notebooks & Art Sets",
    href: "/stationery",
    image: "/images/category-stationery.jpg?v=2",
    cardBg: "bg-gradient-to-b from-emerald-50/90 via-slate-50/50 to-white",
    borderColor: "border-emerald-100/90 hover:border-emerald-300",
    btnColor: "bg-emerald-700 hover:bg-emerald-800 text-white",
    icon: Boxes
  },
  {
    id: "custom",
    name: "Customisations",
    badge: "GIFT STUDIO",
    badgeColor: "bg-amber-100 text-amber-900 border border-amber-200/80",
    tagline: "Custom Studio",
    tagline2: "Personalized Mugs & Gifts",
    href: "/custom-products",
    image: "/images/category-custom.jpg?v=2",
    cardBg: "bg-gradient-to-b from-amber-50/90 via-slate-50/50 to-white",
    borderColor: "border-amber-100/90 hover:border-amber-300",
    btnColor: "bg-amber-700 hover:bg-amber-800 text-white",
    icon: Sparkles
  },
  {
    id: "print",
    name: "Print Store",
    badge: "ONLINE COUNTER",
    badgeColor: "bg-purple-100 text-purple-900 border border-purple-200/80",
    tagline: "Print Store",
    tagline2: "Documents, Spiral & Thesis",
    href: "/printing",
    image: "/images/category-print.jpg?v=2",
    cardBg: "bg-gradient-to-b from-purple-50/90 via-slate-50/50 to-white",
    borderColor: "border-purple-100/90 hover:border-purple-300",
    btnColor: "bg-purple-700 hover:bg-purple-800 text-white",
    icon: Printer
  },
  {
    id: "books",
    name: "Books",
    badge: "10,000+ TITLES",
    badgeColor: "bg-blue-100 text-blue-900 border border-blue-200/80",
    tagline: "Book Store",
    tagline2: "PSC, SCERT & Novels",
    href: "/books",
    image: "/images/category-books.jpg?v=2",
    cardBg: "bg-gradient-to-b from-blue-50/90 via-slate-50/50 to-white",
    borderColor: "border-blue-100/90 hover:border-blue-300",
    btnColor: "bg-[#0057B8] hover:bg-blue-700 text-white",
    icon: BookOpen
  }
];

export default function PromoBannerCards() {
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const idx = Math.round(scrollLeft / (clientWidth * 0.75));
      setActiveIdx(Math.min(Math.max(idx, 0), sections.length - 1));
    }
  };

  const scrollToSlide = (idx: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth * 0.78;
      scrollRef.current.scrollTo({
        left: idx * cardWidth,
        behavior: "smooth"
      });
      setActiveIdx(idx);
    }
  };

  return (
    <section className="py-6 sm:py-10 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-5 sm:mb-7">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0057B8]">Explore Departments</span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1a1a1a] tracking-tight">
              Shop by Category
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">4 Dedicated Stores · Valanchery</span>
          </div>
        </div>

        {/* Horizontal Slider on Mobile, 2-Col on Tablet, 4-Col on Desktop */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory no-scrollbar pb-3 sm:pb-0 px-1 -mx-4 sm:mx-0 px-4 sm:px-0"
        >
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <Link
                key={section.id}
                href={section.href}
                className={`group relative w-[78vw] max-w-[300px] sm:w-auto sm:max-w-none shrink-0 snap-center rounded-3xl ${section.cardBg} p-4 sm:p-5 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border ${section.borderColor}`}
              >
                {/* Header with Badge & Category Name */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full ${section.badgeColor}`}>
                    <IconComponent className="h-3 w-3" />
                    <span>{section.badge}</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">
                    {section.name}
                  </span>
                </div>

                {/* Illustrated Image Showcase Window */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-xs border border-slate-200/60 my-2">
                  <img
                    src={section.image}
                    alt={section.tagline}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Title & Subtitle */}
                <div className="mt-2.5 mb-3.5">
                  <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight group-hover:text-[#0057B8] transition-colors">
                    {section.tagline}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium mt-1 truncate">
                    {section.tagline2}
                  </p>
                </div>

                {/* Shop Button */}
                <div className="pt-2 border-t border-slate-200/60">
                  <span className={`w-full h-10 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all ${section.btnColor} group-hover:shadow-md`}>
                    <span>Shop {section.name}</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile Slider Indicator Dots & Controls */}
        <div className="flex sm:hidden items-center justify-center gap-3 mt-4">
          <button
            onClick={() => scrollToSlide(Math.max(0, activeIdx - 1))}
            disabled={activeIdx === 0}
            className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 disabled:opacity-30 shadow-2xs"
            aria-label="Previous section"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {sections.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToSlide(i)}
                aria-label={`Section ${i + 1}`}
                className={`transition-all duration-300 ${
                  activeIdx === i
                    ? "w-6 h-1.5 rounded-full bg-[#0057B8]"
                    : "w-2 h-1.5 rounded-full bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => scrollToSlide(Math.min(sections.length - 1, activeIdx + 1))}
            disabled={activeIdx === sections.length - 1}
            className="grid h-8 w-8 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 disabled:opacity-30 shadow-2xs"
            aria-label="Next section"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

