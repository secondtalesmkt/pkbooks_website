"use client";

import { Suspense, useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  BookOpen,
  CheckCircle2,
  Heart,
  Search,
  ShoppingCart,
  Sparkles,
  Star
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryBanners from "@/components/CategoryBanners";
import { categories, products, type Product } from "@/lib/catalog";
import { useShopProducts } from "@/lib/storeSync";

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

function BooksContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("category");
  const subParam = searchParams.get("sub");

  const [query, setQuery] = useState(subParam || "");
  const [selectedCategory, setSelectedCategory] = useState(catParam || "All");
  const [cartCount, setCartCount] = useState(0);
  const adminBooks = useShopProducts("books");

  useEffect(() => {
    if (catParam) setSelectedCategory(catParam);
    if (subParam) setQuery(subParam);
  }, [catParam, subParam]);

  const allBooks = useMemo(() => {
    const customMap = new Map<string, Product>();
    adminBooks.forEach((b) => {
      const p: Product = {
        id: b.id,
        name: b.name,
        author: b.publisher || "PK Books Featured",
        publisher: b.publisher || "PK Books",
        isbn: b.sku || "PKB-GEN-001",
        category: b.category || "School Books",
        subCategory: b.subCategory || "New Arrival",
        subject: b.tags || "Books",
        language: "English / Malayalam",
        description: b.description || "Available for immediate pickup at Valanchery or fast home delivery.",
        price: Number(b.price || 299),
        discountPrice: Number(b.salePrice || b.price || 249),
        stock: Number(b.quantity || b.stock || 25),
        sku: b.sku || b.id,
        gst: 5,
        rating: 5.0,
        reviewsCount: 12,
        imageTone: "from-blue-600 via-indigo-700 to-slate-900",
        badge: "Verified Item",
        featured: true
      };
      customMap.set(b.id, p);
      if (b.sku) customMap.set(b.sku, p);
    });

    const combined: Product[] = [];
    const seen = new Set<string>();

    // First add admin items
    adminBooks.forEach((b) => {
      const item = customMap.get(b.id);
      if (item && !seen.has(item.id)) {
        combined.push(item);
        seen.add(item.id);
        if (item.sku) seen.add(item.sku);
      }
    });

    // Then add catalog books that weren't in admin
    products.forEach((b) => {
      if (!seen.has(b.id) && (!b.sku || !seen.has(b.sku))) {
        combined.push(b);
        seen.add(b.id);
        if (b.sku) seen.add(b.sku);
      }
    });

    return combined;
  }, [adminBooks]);

  const filtered = useMemo(() => {
    return allBooks.filter((p) => {
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      const text = `${p.name} ${p.author ?? ""} ${p.publisher ?? ""} ${p.subject ?? ""} ${p.subCategory ?? ""} ${p.category}`.toLowerCase();
      return matchCat && text.includes(query.toLowerCase());
    });
  }, [allBooks, selectedCategory, query]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-slate-900">
      <Navbar cartCount={cartCount} />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-red-50/80 via-white to-[#FAFAFA] border-b border-red-100/60 py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-100/80 border border-red-200 px-3 py-1 text-xs font-bold text-[#ED1C24] mb-3">
            <BookOpen className="h-3.5 w-3.5" /> 10,000+ Titles in Stock
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Books, Syllabus Guides & Malayalam Literature
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl font-medium leading-relaxed">
            Syllabus textbooks, SCERT/CBSE guides, Kerala PSC rank files, KTU engineering handbooks, MBBS medical texts, and Malayalam bestsellers.
          </p>
        </div>
      </section>

      {/* Main Catalog Grid */}
      <section className="mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0056B3]">Curated Inventory</span>
            <h2 className="text-2xl font-black text-slate-900">Academic & Literature Collection</h2>
          </div>
          <div className="text-xs font-semibold text-slate-500">
            Showing <span className="font-bold text-slate-900">{filtered.length}</span> titles available
          </div>
        </div>

        {/* Category Tabs & Search Bar */}
        <div className="space-y-4 mb-8">
          <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 rounded-full px-4 py-2 text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#0056B3] text-white shadow-sm ring-2 ring-[#0056B3]/20"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {cat === "All" ? "All Books" : cat}
                </button>
              );
            })}
          </div>

          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-xs font-medium text-slate-800 outline-none ring-[#0056B3]/10 focus:border-[#0056B3] focus:ring-4 transition-all"
              placeholder="Search by book title, author, publisher, exam code or subject..."
            />
          </div>
        </div>

        {/* 4-Column Book Cards Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => {
            const discountPercent = Math.round(((product.price - product.discountPrice) / product.price) * 100);

            return (
              <article
                key={product.id}
                className="group flex flex-col justify-between rounded-3xl bg-white p-4 shadow-[0_10px_35px_rgba(0,0,0,0.03)] border border-slate-100/90 hover:border-slate-200 hover:shadow-[0_20px_45px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div>
                  {/* Visual 3D Book Spine & Cover Mockup */}
                  <div className={`relative flex aspect-[4/3.2] flex-col justify-between rounded-2xl bg-gradient-to-br ${product.imageTone} p-4 text-white shadow-inner overflow-hidden border-l-4 border-black/25`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-white/10 pointer-events-none" />

                    {/* Top: Badge / Discount & Rating */}
                    <div className="relative z-10 flex items-center justify-between gap-1">
                      {product.badge ? (
                        <span className="rounded-md bg-white/20 backdrop-blur-md px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white border border-white/20">
                          {product.badge}
                        </span>
                      ) : (
                        <span className="rounded-md bg-[#ED1C24] px-2 py-0.5 text-[10px] font-black text-white shadow-sm">
                          {discountPercent}% OFF
                        </span>
                      )}

                      <div className="flex items-center gap-1 rounded-full bg-black/40 backdrop-blur-md px-2 py-0.5 text-[11px] font-bold text-amber-300">
                        <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
                        <span>{product.rating}</span>
                      </div>
                    </div>

                    {/* Book Cover Typography */}
                    <div className="relative z-10">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/75 block">
                        {product.subject || product.category}
                      </span>
                      <h3 className="mt-0.5 text-base font-black leading-snug text-white drop-shadow-sm line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-[10px] text-white/80 font-medium truncate">
                        {product.author || product.publisher}
                      </p>
                    </div>
                  </div>

                  {/* Book Metadata */}
                  <div className="mt-3.5 flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#0056B3] transition-colors line-clamp-1">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {product.publisher} · {product.language}
                      </p>
                    </div>
                    <button
                      className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:text-[#ED1C24] hover:bg-red-50 transition-colors"
                      aria-label="Wishlist"
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>

                {/* Footer: Price & Add to Cart */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-lg font-black text-slate-900">
                        {money.format(product.discountPrice)}
                      </span>
                      <span className="ml-2 text-xs text-slate-400 line-through">
                        {money.format(product.price)}
                      </span>
                    </div>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                      ● In Stock ({product.stock})
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setCartCount((c) => c + 1)}
                      className="h-10 flex items-center justify-center gap-1.5 rounded-xl bg-[#0056B3] text-xs font-bold text-white shadow-sm hover:bg-[#00438F] active:scale-95 transition-all"
                    >
                      <ShoppingCart className="h-3.5 w-3.5" /> Add
                    </button>
                    <button
                      onClick={() => {
                        const msg = encodeURIComponent(
                          `*Book Availability Inquiry - PK Books*\n\n` +
                          `📖 *Title:* ${product.name}\n` +
                          `✍️ *Author/Publisher:* ${product.author || product.publisher}\n` +
                          `💰 *Price:* ${money.format(product.discountPrice)}`
                        );
                        window.open(`https://wa.me/919746700123?text=${msg}`, "_blank");
                      }}
                      className="h-10 flex items-center justify-center rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default function BooksPage() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center bg-[#FAFAFA]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0056B3]" /></div>}>
      <BooksContent />
    </Suspense>
  );
}
