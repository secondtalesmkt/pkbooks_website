"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles, Feather, Compass, Glasses, Search } from "lucide-react";

interface CategoryCard {
  id: string;
  title: string;
  count: string;
  href: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  bookTitle: string;
  bookAuthor: string;
  bookCoverGradient: string;
  elementIcon?: string;
  badge?: string;
}

const CATEGORY_BLOCKS: CategoryCard[] = [
  {
    id: "fiction-fantasy",
    title: "Fiction & Fantasy",
    count: "120+ titles",
    href: "/books?category=Literature%20%26%20Fiction",
    bgColor: "bg-[#FDE7B9]", // Warm honey pastel
    textColor: "text-[#2B1800]",
    accentColor: "bg-[#D97706]",
    bookTitle: "Carrie Soto Is Back",
    bookAuthor: "Taylor Jenkins Reid",
    bookCoverGradient: "from-amber-500 via-yellow-600 to-amber-800",
    badge: "Bestseller"
  },
  {
    id: "history",
    title: "History & Heritage",
    count: "85+ titles",
    href: "/books?category=Competitive%20%26%20Academic",
    bgColor: "bg-[#C4EFE7]", // Soft mint cyan
    textColor: "text-[#06332C]",
    accentColor: "bg-[#0D9488]",
    bookTitle: "Kerala Charithram",
    bookAuthor: "A. Sreedhara Menon",
    bookCoverGradient: "from-stone-300 via-amber-100 to-stone-400 text-stone-900",
    badge: "Heritage"
  },
  {
    id: "mystery-thriller",
    title: "Mystery, Thriller",
    count: "95+ titles",
    href: "/books?category=Literature%20%26%20Fiction",
    bgColor: "bg-[#E2F0BD]", // Soft sage lime
    textColor: "text-[#1C2C07]",
    accentColor: "bg-[#65A30D]",
    bookTitle: "Ring Shout",
    bookAuthor: "P. Djèlí Clark",
    bookCoverGradient: "from-lime-200 via-emerald-100 to-lime-300 text-emerald-950",
    badge: "Top Rated"
  },
  {
    id: "romance",
    title: "Romance & Drama",
    count: "110+ titles",
    href: "/books?category=Literature%20%26%20Fiction",
    bgColor: "bg-[#FCD8CE]", // Soft peach coral
    textColor: "text-[#3D1409]",
    accentColor: "bg-[#E11D48]",
    bookTitle: "House of Sky & Breath",
    bookAuthor: "Sarah J. Maas",
    bookCoverGradient: "from-rose-500 via-red-600 to-amber-700",
    badge: "Trending"
  },
  {
    id: "teen-ya",
    title: "Teen & Young Adult",
    count: "140+ titles",
    href: "/books?category=Children%27s%20Books",
    bgColor: "bg-[#FBD0DD]", // Soft blush rose
    textColor: "text-[#3B0D1E]",
    accentColor: "bg-[#DB2777]",
    bookTitle: "Over the Woodward Wall",
    bookAuthor: "A. Deborah Baker",
    bookCoverGradient: "from-purple-400 via-pink-400 to-rose-300 text-purple-950",
    badge: "Popular"
  },
  {
    id: "religion-philosophy",
    title: "Religion & Philosophy",
    count: "160+ titles",
    href: "/books?category=Biographies%20%26%20Memoirs",
    bgColor: "bg-[#EAE6DD]", // Warm ivory beige
    textColor: "text-[#28251F]",
    accentColor: "bg-[#78716C]",
    bookTitle: "Autobiography of a Yogi",
    bookAuthor: "Paramahansa Yogananda",
    bookCoverGradient: "from-amber-100 via-stone-100 to-amber-200 text-stone-900",
    badge: "Classics"
  }
];

export default function CategoryBanners() {
  return (
    <section className="mx-auto max-w-7xl w-full px-4 py-6 sm:px-6 lg:px-8">
      {/* Mobile Swipe Hint */}
      <div className="flex sm:hidden items-center justify-between mb-3 px-1">
        <span className="text-xs font-black uppercase tracking-wider text-slate-800">
          Explore by Category
        </span>
        <span className="text-[10px] text-slate-400 font-semibold">• Swipe &gt;</span>
      </div>

      {/* Touch Slider on Mobile, 3 Columns x 2 Rows Grid on Desktop */}
      <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory no-scrollbar pb-3 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
        {CATEGORY_BLOCKS.map((cat, idx) => (
          <Link
            key={cat.id}
            href={cat.href}
            className={`group relative overflow-hidden rounded-3xl ${cat.bgColor} p-6 sm:p-7 min-h-[190px] flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-black/5 w-[82vw] max-w-[310px] sm:max-w-none sm:w-auto shrink-0 snap-center sm:shrink`}
          >
            {/* Top Right Decorative Props & 3D Book Mockup */}
            <div className="absolute right-4 top-4 sm:right-6 sm:top-5 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-1">
              {/* 3D Realistic Book Mockup */}
              <div
                className={`relative w-24 sm:w-28 aspect-[3/4.2] rounded-r-lg rounded-l-xs bg-gradient-to-br ${cat.bookCoverGradient} p-2 shadow-2xl flex flex-col justify-between border-l-[3px] border-black/30 overflow-hidden transform rotate-6 group-hover:rotate-3 transition-transform`}
              >
                {/* Book Spine Highlight */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/25 to-transparent pointer-events-none" />
                <div className="absolute left-2.5 top-0 bottom-0 w-px bg-white/20 pointer-events-none" />

                {/* Subtle Book Cover Detail */}
                <div className="text-[8px] font-black uppercase tracking-widest opacity-80 line-clamp-1">
                  {cat.bookAuthor}
                </div>

                <div className="space-y-0.5">
                  <div className="text-[9px] sm:text-[10px] font-black leading-tight line-clamp-2 drop-shadow-xs">
                    {cat.bookTitle}
                  </div>
                  <div className="h-0.5 w-6 bg-white/50 rounded-full" />
                </div>
              </div>

              {/* Decorative Props matching screenshot (coffee cup, leaf, glasses, florals) */}
              {idx === 0 && (
                <div className="absolute -bottom-2 -left-4 h-9 w-9 rounded-full bg-amber-900/10 backdrop-blur-xs border border-amber-900/20 flex items-center justify-center text-xs shadow-xs">
                  ☕
                </div>
              )}
              {idx === 1 && (
                <div className="absolute -bottom-2 -left-4 h-8 w-8 rounded-full bg-teal-900/10 backdrop-blur-xs border border-teal-900/20 flex items-center justify-center text-xs shadow-xs">
                  👓
                </div>
              )}
              {idx === 2 && (
                <div className="absolute -bottom-2 -left-4 h-8 w-8 rounded-full bg-lime-900/10 backdrop-blur-xs border border-lime-900/20 flex items-center justify-center text-xs shadow-xs">
                  🔍
                </div>
              )}
              {idx === 3 && (
                <div className="absolute -bottom-2 -left-4 h-8 w-8 rounded-full bg-rose-900/10 backdrop-blur-xs border border-rose-900/20 flex items-center justify-center text-xs shadow-xs">
                  🌸
                </div>
              )}
              {idx === 4 && (
                <div className="absolute -bottom-2 -left-4 h-8 w-8 rounded-full bg-pink-900/10 backdrop-blur-xs border border-pink-900/20 flex items-center justify-center text-xs shadow-xs">
                  🪶
                </div>
              )}
              {idx === 5 && (
                <div className="absolute -bottom-2 -left-4 h-8 w-8 rounded-full bg-stone-900/10 backdrop-blur-xs border border-stone-900/20 flex items-center justify-center text-xs shadow-xs">
                  📚
                </div>
              )}
            </div>

            {/* Content: Title and Product Count */}
            <div className="relative z-10 max-w-[62%] sm:max-w-[58%]">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-700/80 mb-1 block">
                Category
              </span>
              <h3 className={`text-xl sm:text-2xl font-black ${cat.textColor} tracking-tight leading-tight group-hover:underline decoration-2 underline-offset-4 transition-all`}>
                {cat.title}
              </h3>
              <p className="mt-1 text-xs font-semibold text-slate-600/90">
                {cat.count}
              </p>
            </div>

            {/* Bottom link indicator */}
            <div className="relative z-10 pt-4 flex items-center gap-1.5 text-xs font-black text-slate-800 group-hover:text-black">
              <span>Explore Collection</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
