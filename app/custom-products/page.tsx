"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Award,
  BookOpen,
  CheckCircle2,
  Gift,
  Heart,
  Image as ImageIcon,
  MessageSquare,
  Palette,
  Send,
  Share2,
  ShoppingCart,
  Sparkles,
  Star,
  Tag,
  User
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { PKBookIcon } from "@/components/PKLogo";

const money = new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });

const customItems = [
  {
    id: "notebook",
    title: "Personalized Spiral Notebook",
    category: "Student Stationery",
    price: 149,
    originalPrice: 199,
    desc: "Custom printed 200-page notebook with student name, quote & school theme.",
    popular: true,
    badge: "Bestseller"
  },
  {
    id: "mug",
    title: "Custom Ceramic Photo Mug",
    category: "Gift & Merchandise",
    price: 249,
    originalPrice: 320,
    desc: "High-gloss 325ml ceramic coffee mug with fade-proof sublimation photo print.",
    popular: true,
    badge: "Top Gift"
  },
  {
    id: "badge",
    title: "School / College ID Badges & Pins",
    category: "Institutional",
    price: 35,
    originalPrice: 50,
    desc: "Metallic pin badges with school emblem, student house colors & glossy finish.",
    popular: false,
    badge: "Bulk Deals"
  },
  {
    id: "visiting",
    title: "Executive Visiting Cards (Pack of 100)",
    category: "Business",
    price: 299,
    originalPrice: 399,
    desc: "350 GSM matte/gloss laminated double-sided premium visiting cards.",
    popular: false,
    badge: "Pro Quality"
  }
];

export default function CustomProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState("notebook");
  const [name, setName] = useState("Aisha Nizar");
  const [quote, setQuote] = useState("Make every page count");
  const [color, setColor] = useState("#0056B3");
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);

  const presetColors = [
    { name: "PK Royal Blue", hex: "#0056B3" },
    { name: "Crimson Red", hex: "#ED1C24" },
    { name: "Emerald Forest", hex: "#059669" },
    { name: "Deep Violet", hex: "#7C3AED" },
    { name: "Midnight Slate", hex: "#1E293B" },
    { name: "Amber Gold", hex: "#D97706" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-slate-900">
      <Navbar cartCount={cartCount} />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-blue-50/80 via-white to-[#FAFAFA] border-b border-blue-100/60 py-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100/80 border border-blue-200 px-3 py-1 text-xs font-bold text-[#0056B3] mb-3">
            <Sparkles className="h-3.5 w-3.5" /> Personalization Studio
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Custom Printed Notebooks, Mugs & School Gifts
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl font-medium leading-relaxed">
            Create personalized merchandise with your name, school logo, photos, and custom artwork. Crafted locally in Valanchery.
          </p>
        </div>
      </section>

      {/* Interactive 3D Visual Customizer */}
      <section className="mx-auto max-w-7xl w-full px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] items-start">
          {/* Left: Customization Controls */}
          <div className="rounded-3xl bg-white p-6 sm:p-8 shadow-[0_10px_35px_rgba(0,0,0,0.03)] border border-slate-100 space-y-6">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0056B3] block">Step 1</span>
              <h2 className="text-xl font-black text-slate-900">Choose Product Type</h2>
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                {[
                  { id: "notebook", label: "Spiral Notebook", icon: BookOpen },
                  { id: "mug", label: "Photo Ceramic Mug", icon: Gift },
                  { id: "badge", label: "School Badge Pin", icon: Award },
                  { id: "visiting", label: "Visiting Cards", icon: Tag }
                ].map((item) => {
                  const Icon = item.icon;
                  const isActive = selectedProduct === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedProduct(item.id)}
                      className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all ${
                        isActive
                          ? "border-[#0056B3] bg-blue-50/70 text-[#0056B3] font-bold shadow-2xs"
                          : "border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-xs">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Text Inputs */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#0056B3] block">Step 2</span>
              <h2 className="text-xl font-black text-slate-900">Personalize Details</h2>

              <label className="block text-xs font-bold text-slate-700">
                Student / Brand / Recipient Name
                <div className="mt-1.5 relative flex items-center">
                  <User className="absolute left-3.5 h-4 w-4 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-3.5 font-bold text-slate-800 outline-none focus:border-[#0056B3] focus:bg-white text-xs transition-all"
                  />
                </div>
              </label>

              <label className="block text-xs font-bold text-slate-700">
                Custom Tagline / Motivation Quote
                <input
                  type="text"
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 font-semibold text-slate-800 outline-none focus:border-[#0056B3] focus:bg-white text-xs transition-all"
                />
              </label>

              {/* Color Theme Selector */}
              <div>
                <span className="block text-xs font-bold text-slate-700 mb-2">Cover / Theme Color</span>
                <div className="flex flex-wrap items-center gap-2.5">
                  {presetColors.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => setColor(c.hex)}
                      className={`h-9 w-9 rounded-xl border-2 transition-all flex items-center justify-center ${
                        color === c.hex ? "border-slate-900 scale-110 shadow-sm" : "border-white"
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {color === c.hex && <CheckCircle2 className="h-4 w-4 text-white" />}
                    </button>
                  ))}
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="h-9 w-12 rounded-xl border border-slate-200 cursor-pointer p-0.5 bg-white"
                  />
                </div>
              </div>
            </div>

            {/* Price & Action Row */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Unit Price</span>
                <span className="text-2xl font-black text-slate-900">
                  {money.format(selectedProduct === "notebook" ? 149 : selectedProduct === "mug" ? 249 : selectedProduct === "badge" ? 35 : 299)}
                </span>
              </div>

              <div className="flex gap-2 flex-1 justify-end">
                <button
                  onClick={() => {
                    setCartCount((c) => c + 1);
                  }}
                  className="h-11 px-4 rounded-xl border border-[#0056B3] text-[#0056B3] font-bold text-xs hover:bg-blue-50 transition-colors"
                >
                  + Add to Cart
                </button>
                <button
                  onClick={() => {
                    const prodName = selectedProduct === "notebook" ? "Custom Notebook" : selectedProduct === "mug" ? "Photo Mug" : selectedProduct === "badge" ? "School Badge" : "Visiting Cards";
                    const msg = encodeURIComponent(
                      `*Custom Design Order Inquiry - PK Books*\n\n` +
                      `🎁 *Product:* ${prodName}\n` +
                      `👤 *Name on item:* ${name}\n` +
                      `💬 *Quote/Tagline:* "${quote}"\n` +
                      `🎨 *Theme Color:* ${color}\n` +
                      `📍 *Store:* Valanchery Counter`
                    );
                    window.open(`https://wa.me/919746700123?text=${msg}`, "_blank");
                  }}
                  className="h-11 px-5 flex items-center gap-2 rounded-xl bg-[#ED1C24] font-bold text-white shadow-sm hover:bg-[#C40022] text-xs transition-all"
                >
                  <Send className="h-3.5 w-3.5" /> Order on WhatsApp
                </button>
              </div>
            </div>
          </div>

          {/* Right: Live Realistic 3D Product Mockup */}
          <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-8 shadow-[0_10px_35px_rgba(0,0,0,0.03)] border border-slate-100 text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-5 block">
              Live Product Visual Mockup
            </span>

            {/* 3D Realistic Notebook Card */}
            {selectedProduct === "notebook" ? (
              <div
                className="relative aspect-[3/4.2] w-full max-w-xs rounded-2xl p-7 text-white shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden border-l-8 border-black/30"
                style={{ backgroundColor: color }}
              >
                {/* Spiral Holes Mockup */}
                <div className="absolute left-1 top-0 bottom-0 flex flex-col justify-between py-4 pointer-events-none">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="h-2 w-2 rounded-full bg-white/40 shadow-inner" />
                  ))}
                </div>

                <div className="pl-4 flex items-center justify-between">
                  <PKBookIcon className="h-8 w-10 opacity-90" colorMode="white" />
                  <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-0.5 rounded backdrop-blur">
                    Custom Edition
                  </span>
                </div>

                <div className="pl-4 my-auto text-left">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/70">PK Books & Stationery</p>
                  <h3 className="mt-1 text-2xl font-black leading-tight break-words drop-shadow-sm">{name || "Student Name"}</h3>
                  <p className="mt-3 text-xs italic text-white/90 leading-relaxed font-medium break-words">
                    "{quote || "Make every page count"}"
                  </p>
                </div>

                <div className="pl-4 pt-3 border-t border-white/20 flex items-center justify-between text-[10px] text-white/75 font-mono">
                  <span>200 Pages · Single Line</span>
                  <span>Valanchery</span>
                </div>
              </div>
            ) : (
              <div
                className="relative aspect-[4/3] w-full max-w-sm rounded-3xl p-8 text-white shadow-2xl transition-all duration-300 flex flex-col justify-center items-center text-center"
                style={{ backgroundColor: color }}
              >
                <PKBookIcon className="h-10 w-12 mb-3 opacity-90" colorMode="white" />
                <h3 className="text-2xl font-black">{name || "Custom Name"}</h3>
                <p className="mt-2 text-xs italic text-white/90">"{quote}"</p>
                <span className="mt-4 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold tracking-widest uppercase">
                  Sublimation Printed
                </span>
              </div>
            )}

            <p className="mt-6 text-xs text-slate-500 max-w-xs">
              ⚡ Printed using high-grade Japanese digital press equipment at our Valanchery counter.
            </p>
          </div>
        </div>

        {/* Catalog of Custom Products */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#0056B3]">Popular Options</span>
              <h2 className="text-2xl font-black text-slate-900">Custom Merchandise Catalog</h2>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {customItems.map((item) => (
              <div
                key={item.id}
                className="rounded-3xl bg-white p-5 shadow-[0_10px_35px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col justify-between hover:border-blue-200 hover:-translate-y-1 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-[#0056B3] border border-blue-100">
                      {item.badge}
                    </span>
                    <span className="text-xs text-slate-400">{item.category}</span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="font-black text-slate-900 text-base">{money.format(item.price)}</span>
                    <span className="ml-1.5 text-xs text-slate-400 line-through">{money.format(item.originalPrice)}</span>
                  </div>
                  <button
                    onClick={() => setSelectedProduct(item.id)}
                    className="rounded-xl bg-[#0056B3] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#00438F] transition-all"
                  >
                    Customize
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
