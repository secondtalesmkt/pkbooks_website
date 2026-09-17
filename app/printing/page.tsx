"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QuickPrintSection from "@/components/QuickPrintSection";
import {
  Clock,
  FileText,
  Printer,
  ShieldCheck,
  Sparkles,
  Zap,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  ShoppingBag,
  ExternalLink,
  Star,
  Layers,
  HeartHandshake,
  Award,
  BookOpen,
  Filter,
  Check,
  X
} from "lucide-react";
import { useShopProducts, DEFAULT_PRINT_PRODUCTS, placeSystemOrder } from "@/lib/storeSync";

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

export default function PrintingPage() {
  const [cartCount, setCartCount] = useState(0);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProduct, setActiveModalProduct] = useState<any | null>(null);
  const [orderCustomerName, setOrderCustomerName] = useState("");
  const [orderCustomerPhone, setOrderCustomerPhone] = useState("");
  const [orderPaymentMode, setOrderPaymentMode] = useState<"upi" | "cash">("upi");
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [orderSuccessMsg, setOrderSuccessMsg] = useState<string | null>(null);

  const adminPrintItems = useShopProducts("printing");

  const printCatalog = useMemo(() => {
    const customMap = new Map<string, any>();
    adminPrintItems.forEach((item) => {
      const p = {
        id: item.id,
        name: item.name,
        category: item.category || "Bordered Paper Sets",
        desc: item.description || "High resolution digital printing on premium cardstock with precision finishing.",
        price: Number(item.salePrice || item.price || 149),
        originalPrice: Number(item.price || 249),
        rating: 4.9,
        reviewsCount: 36,
        badge: "Admin Verified",
        sku: item.sku || item.id,
        image: item.image || "/images/print-store/bordered-paper.png"
      };
      customMap.set(item.id, p);
      if (item.sku) customMap.set(item.sku, p);
    });

    const combined: any[] = [];
    const seen = new Set<string>();

    adminPrintItems.forEach((item) => {
      const found = customMap.get(item.id);
      if (found && !seen.has(found.id)) {
        combined.push(found);
        seen.add(found.id);
        if (found.sku) seen.add(found.sku);
      }
    });

    DEFAULT_PRINT_PRODUCTS.forEach((item) => {
      if (!seen.has(item.id) && (!item.sku || !seen.has(item.sku))) {
        combined.push(item);
        seen.add(item.id);
        if (item.sku) seen.add(item.sku);
      }
    });

    return combined;
  }, [adminPrintItems]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    printCatalog.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    return ["All", ...Array.from(set)];
  }, [printCatalog]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "All") return printCatalog;
    return printCatalog.filter((item) => item.category === selectedCategory);
  }, [printCatalog, selectedCategory]);

  const handleQuickBuyClick = (item: any) => {
    setActiveModalProduct(item);
    setOrderQuantity(1);
    setOrderSuccessMsg(null);
  };

  const submitQuickOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderCustomerName.trim()) {
      alert("Please enter your name");
      return;
    }
    if (!orderCustomerPhone.trim() || orderCustomerPhone.length < 10) {
      alert("Please enter a valid 10-digit WhatsApp number");
      return;
    }

    const orderId = `PKP-PRD-${Math.floor(1000 + Math.random() * 9000)}`;
    const total = (activeModalProduct.price * orderQuantity);

    // Save to unified system orders for Admin Print Orders view
    placeSystemOrder({
      id: orderId,
      orderType: "print",
      customerName: orderCustomerName,
      phone: orderCustomerPhone,
      items: `${activeModalProduct.name} (Qty: ${orderQuantity} × ${money.format(activeModalProduct.price)})`,
      itemCount: orderQuantity,
      totalAmount: total,
      fulfillment: "Store Pickup / Home Delivery",
      paymentMode: orderPaymentMode === "upi" ? "UPI (GPay/PhonePe)" : "Cash on Pickup",
      paymentStatus: "Unpaid",
      orderStatus: "Received",
      date: new Date().toISOString().slice(0, 16).replace("T", " "),
      printSpecs: {
        copies: orderQuantity,
        fileName: activeModalProduct.name,
        colorMode: "Colour"
      }
    });

    setCartCount((c) => c + 1);
    setOrderSuccessMsg(`Order #${orderId} placed successfully! Our team will WhatsApp you confirmation.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFD] text-slate-900 font-sans">
      <Navbar cartCount={cartCount} />

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-slate-900 text-white px-5 py-3.5 shadow-2xl border border-slate-700 animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* Hero Banner with Direct Meesho Store Connection */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF5F5] via-white to-[#FDFDFD] border-b border-rose-100/70 pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Top Badges & External Link Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 border border-rose-200/80 px-3.5 py-1 text-xs font-black text-rose-700 shadow-2xs">
              <Sparkles className="h-3.5 w-3.5 text-rose-600 animate-pulse" />
              <span>PK PRINTS OFFICIAL STORE • MEESHO TOP RATED</span>
            </div>

            <a
              href="https://www.meesho.com/PKPRINTS25263?ms=2"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-rose-700 hover:text-rose-900 bg-white hover:bg-rose-50 px-4 py-1.5 rounded-full border border-rose-200 transition-all shadow-2xs group"
            >
              <span>View Verified Meesho Store</span>
              <ExternalLink className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
                Pre-Printed Paper Sets &amp; <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ED1C24] via-rose-600 to-purple-600">
                  Custom Print Store
                </span>
              </h1>
              <p className="mt-3.5 text-sm sm:text-base text-slate-600 max-w-xl font-medium leading-relaxed">
                Explore our signature ready-to-use <strong>A4 Bordered Paper Packs</strong>, elegant <strong>Thank You Parcel Cards</strong>, and student assignment sheets, or upload custom documents for instant 15-minute counter pickup.
              </p>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#meesho-products"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#ED1C24] px-5 py-3 text-xs font-bold text-white hover:bg-red-700 active:scale-95 transition-all shadow-md"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Shop Printed Sets</span>
                </a>
                <a
                  href="#custom-upload"
                  className="inline-flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-slate-900 active:scale-95 transition-all shadow-2xs"
                >
                  <Printer className="h-4 w-4 text-[#0057B8]" />
                  <span>Custom Xerox &amp; Thesis</span>
                </a>
                <a
                  href="https://wa.me/919746700123?text=Hi%20PK%20Prints,%20I%20want%20to%20inquire%20about%20your%20printed%20paper%20sets"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-xs font-bold text-emerald-800 hover:bg-emerald-100 active:scale-95 transition-all"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-600" />
                  <span>WhatsApp Desk</span>
                </a>
              </div>
            </div>

            {/* Right Hero Highlights (Featured Best Sellers) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              {/* Product 1: A4 Bordered Paper */}
              <div className="rounded-2xl bg-white p-3.5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-100 mb-2.5">
                  <img
                    src="/images/print-store/bordered-paper.png"
                    alt="A4 Bordered Paper Pack"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-[#ED1C24] text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
                    Pack of 100
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">A4 Bordered Paper Pack</h4>
                <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">Single sheets for projects &amp; notes</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">₹149</span>
                  <span className="text-[10px] text-emerald-600 font-bold">40% OFF</span>
                </div>
              </div>

              {/* Product 2: Thank You Cards */}
              <div className="rounded-2xl bg-white p-3.5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all">
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-100 mb-2.5">
                  <img
                    src="/images/print-store/thank-you-cards.jpg"
                    alt="Thank You Cards Pack"
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
                    Pack of 50
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">Thank You Support Cards</h4>
                <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">Botanical leaves &amp; gold heart</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900">₹129</span>
                  <span className="text-[10px] text-emerald-600 font-bold">35% OFF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Ready-Made Printed Products Section */}
      <section id="meesho-products" className="py-12 bg-white border-b border-slate-200/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header & Category Filters */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-[#ED1C24] bg-red-50 px-3 py-1 rounded-md border border-red-100">
                <Layers className="h-3.5 w-3.5" />
                <span>Ready-To-Buy Printed Sets</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
                PK Prints Catalog &amp; Paper Sets
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                Pre-printed paper sets with designer borders, small business packaging cards, assignment sheets &amp; certificate paper.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? "bg-white text-slate-900 shadow-xs border border-slate-200/70"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((item) => (
              <div
                key={item.id}
                className="group rounded-3xl border border-slate-200/80 bg-white p-4 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image Card with Badges */}
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 mb-3.5">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.badge && (
                      <span className="absolute top-2.5 left-2.5 rounded-full bg-[#ED1C24] px-2.5 py-0.5 text-[9px] font-black text-white uppercase tracking-wider shadow-xs">
                        {item.badge}
                      </span>
                    )}
                    <span className="absolute bottom-2.5 right-2.5 rounded-md bg-slate-900/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-bold text-white">
                      {item.category}
                    </span>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500 mb-1">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span>{item.rating || 4.9}</span>
                    <span className="text-slate-400 font-normal">({item.reviewsCount || 40})</span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-sm font-bold text-slate-900 leading-snug group-hover:text-[#ED1C24] transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>

                {/* Price & Action Row */}
                <div className="mt-4 pt-3.5 border-t border-slate-100">
                  <div className="flex items-baseline justify-between mb-3">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-base font-black text-slate-900">{money.format(item.price)}</span>
                      {item.originalPrice > item.price && (
                        <span className="text-xs text-slate-400 line-through">
                          {money.format(item.originalPrice)}
                        </span>
                      )}
                    </div>
                    {item.originalPrice > item.price && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                        {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleQuickBuyClick(item)}
                      className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#ED1C24] py-2 text-xs font-bold text-white hover:bg-red-700 active:scale-95 transition-all shadow-2xs"
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      <span>Order</span>
                    </button>

                    <a
                      href={`https://wa.me/919746700123?text=${encodeURIComponent(`Hi PK Books, I want to order "${item.name}" (${money.format(item.price)}) from PK Prints`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/70 py-2 text-xs font-bold transition-all"
                      title="Direct WhatsApp Order"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Order Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800"
            >
              <X className="h-4 w-4" />
            </button>

            {orderSuccessMsg ? (
              <div className="text-center py-6">
                <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-black text-slate-900">Order Confirmed!</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {orderSuccessMsg}
                </p>
                <div className="mt-6 flex flex-col gap-2">
                  <a
                    href={`https://wa.me/919746700123?text=${encodeURIComponent(`Hi PK Prints, I just submitted an order for "${activeModalProduct.name}" (Qty: ${orderQuantity}). Please confirm delivery/pickup.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-700"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Send WhatsApp Confirmation</span>
                  </a>
                  <button
                    onClick={() => setActiveModalProduct(null)}
                    className="rounded-xl border border-slate-200 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={submitQuickOrder}>
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                  <div className="h-14 w-14 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <img
                      src={activeModalProduct.image}
                      alt={activeModalProduct.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{activeModalProduct.name}</h3>
                    <p className="text-xs text-emerald-600 font-bold">{money.format(activeModalProduct.price)} / pack</p>
                    <span className="text-[10px] text-slate-500">{activeModalProduct.category}</span>
                  </div>
                </div>

                <div className="space-y-3.5 text-xs">
                  {/* Quantity */}
                  <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-700">Quantity (Packs):</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setOrderQuantity((q) => Math.max(1, q - 1))}
                        className="h-6 w-6 rounded-md bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="w-6 text-center font-bold text-slate-900">{orderQuantity}</span>
                      <button
                        type="button"
                        onClick={() => setOrderQuantity((q) => q + 1)}
                        className="h-6 w-6 rounded-md bg-white border border-slate-300 font-bold text-slate-700 hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Customer Name */}
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anjali Menon"
                      value={orderCustomerName}
                      onChange={(e) => setOrderCustomerName(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 outline-none focus:bg-white focus:border-red-500"
                    />
                  </div>

                  {/* WhatsApp Phone */}
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">WhatsApp Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 98461 23456"
                      value={orderCustomerPhone}
                      onChange={(e) => setOrderCustomerPhone(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-800 outline-none focus:bg-white focus:border-red-500"
                    />
                  </div>

                  {/* Payment Mode */}
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Payment Method</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setOrderPaymentMode("upi")}
                        className={`py-2 px-3 rounded-xl border font-bold text-center transition-all ${
                          orderPaymentMode === "upi"
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        UPI (GPay / PhonePe)
                      </button>
                      <button
                        type="button"
                        onClick={() => setOrderPaymentMode("cash")}
                        className={`py-2 px-3 rounded-xl border font-bold text-center transition-all ${
                          orderPaymentMode === "cash"
                            ? "bg-slate-900 text-white border-slate-900"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        Cash on Delivery/Pickup
                      </button>
                    </div>
                  </div>

                  {/* Total & Submit */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between mb-3 text-sm font-black text-slate-900">
                      <span>Total Amount:</span>
                      <span className="text-base text-[#ED1C24]">{money.format(activeModalProduct.price * orderQuantity)}</span>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl bg-[#ED1C24] text-white font-bold hover:bg-red-700 active:scale-95 transition-all shadow-md"
                    >
                      Confirm Order ({money.format(activeModalProduct.price * orderQuantity)})
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* On-Demand Document Printing & Thesis Upload Section */}
      <section id="custom-upload" className="py-12 bg-slate-50/70 border-t border-slate-200/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[11px] font-black uppercase tracking-wider text-[#0057B8] bg-blue-50 px-3 py-1 rounded-md border border-blue-100">
              ⚡ Instant Xerox &amp; Thesis Counter
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
              Upload Custom Document &amp; Thesis
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Have your own PDF notes, seminar files or university thesis? Calculate live price below and collect at Valanchery Bus Stand in 15 minutes or choose GPS-tracked home delivery.
            </p>
          </div>
        </div>

        <QuickPrintSection />
      </section>

      <Footer />
    </div>
  );
}

