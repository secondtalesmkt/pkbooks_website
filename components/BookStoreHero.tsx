"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Boxes,
  Check,
  CheckCircle2,
  Clock,
  CreditCard,
  FileCheck,
  FileText,
  Loader2,
  MapPin,
  MessageSquare,
  Minus,
  Navigation,
  Phone,
  Plus,
  Printer,
  QrCode,
  RotateCcw,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  UploadCloud,
  User,
  X,
  Zap
} from "lucide-react";

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

export default function BookStoreHero() {
  // Active Hero Tab: "print" vs "book_inquiry"
  const [activeTab, setActiveTab] = useState<"print" | "book_inquiry">("print");

  // Book Quick Inquiry State
  const [inquiryBookName, setInquiryBookName] = useState("");
  const [inquiryCustomerName, setInquiryCustomerName] = useState("");

  // File Upload State
  const [fileName, setFileName] = useState<string>("");
  const [fileSizeBytes, setFileSizeBytes] = useState<number>(0);
  const [isLargeFile, setIsLargeFile] = useState<boolean>(false);

  // Print Specifications
  const [pages, setPages] = useState<number>(10);
  const [copies, setCopies] = useState<number>(1);
  const [colorMode, setColorMode] = useState<"bw" | "color">("bw");
  const [sides, setSides] = useState<"double" | "single">("double");
  const [binding, setBinding] = useState<"none" | "staple" | "spiral" | "hardcover">("none");

  // Customer Details
  const [customerName, setCustomerName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  // Fulfillment & GPS Location
  const [fulfillment, setFulfillment] = useState<"counter" | "delivery">("counter");
  const [address, setAddress] = useState<string>("");
  const [gpsCoordinates, setGpsCoordinates] = useState<string>("");
  const [isLocating, setIsLocating] = useState<boolean>(false);

  // Payment Options
  const [paymentType, setPaymentType] = useState<"online" | "cash">("online");
  const [selectedOnlineMethod, setSelectedOnlineMethod] = useState<"upi" | "card">("upi");
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState<boolean>(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  // Handle File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setFileSizeBytes(file.size);
      const isOver5MB = file.size > 5 * 1024 * 1024;
      setIsLargeFile(isOver5MB);
    }
  };

  // GPS Geolocation Tracking
  const detectGPSLocation = () => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(5);
          const lng = pos.coords.longitude.toFixed(5);
          setGpsCoordinates(`${lat}, ${lng}`);
          setAddress(`📍 GPS: ${lat}, ${lng} (Valanchery)`);
          setIsLocating(false);
        },
        () => {
          setAddress("Bus Stand, Valanchery - 676552");
          setGpsCoordinates("10.8794, 76.0718");
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    }
  };

  // Price Calculation
  const quote = useMemo(() => {
    const perPage = colorMode === "bw" ? (sides === "double" ? 1.5 : 2.0) : (sides === "double" ? 7.0 : 8.0);
    const printCost = pages * perPage * copies;

    let bindingCost = 0;
    if (binding === "staple") bindingCost = 5 * copies;
    if (binding === "spiral") bindingCost = 35 * copies;
    if (binding === "hardcover") bindingCost = 180 * copies;

    const deliveryCost = fulfillment === "delivery" ? 30 : 0;
    const subtotal = printCost + bindingCost + deliveryCost;
    const gst = Math.round(subtotal * 0.05);
    const total = Math.max(10, subtotal + gst);

    return { printCost, bindingCost, deliveryCost, gst, total };
  }, [pages, copies, colorMode, sides, binding, fulfillment]);

  // Order Submission
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      alert("Please enter a valid 10-digit WhatsApp phone number.");
      return;
    }
    if (fulfillment === "delivery" && !address.trim()) {
      alert("Please enter delivery address or tap Auto-Detect GPS.");
      return;
    }

    if (fulfillment === "counter" && paymentType === "cash") {
      finalizeOrder("Cash on Counter Pickup", "UNPAID (Pay Cash on Collection)");
    } else {
      setIsPaymentModalOpen(true);
    }
  };

  const finalizeOrder = (paymentMode: string, paymentStatusText: string) => {
    const orderId = `PKP-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      orderId,
      customerName,
      phone,
      fileName: fileName || "Document_Print.pdf",
      fileSize: fileSizeBytes ? `${(fileSizeBytes / (1024 * 1024)).toFixed(1)} MB` : "Attached via WhatsApp",
      isLargeFile,
      pages,
      copies,
      colorMode: colorMode === "bw" ? "Black and White" : "Colour",
      sides: sides === "double" ? "Double-Sided" : "Single-Sided",
      binding: binding.toUpperCase(),
      fulfillment: fulfillment === "counter" ? "In-Store Pickup (Valanchery Bus Stand)" : "Home Delivery",
      address: fulfillment === "delivery" ? address : "Counter Pickup - Valanchery Bus Stand",
      gps: gpsCoordinates,
      totalAmount: quote.total,
      paymentMode,
      paymentStatus: paymentStatusText,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };

    setCompletedOrder(newOrder);
    setIsPaymentModalOpen(false);
    setOrderSuccess(true);
  };

  const processDigitalPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      finalizeOrder(
        selectedOnlineMethod === "upi" ? "UPI (GPay / PhonePe / Paytm)" : "Debit/Credit Card",
        "PAID DIGITALLY (Verified)"
      );
    }, 1200);
  };

  const sendWhatsAppNotification = () => {
    if (!completedOrder) return;
    const msg = encodeURIComponent(
      `*🖨️ NEW PRINT ORDER - PK BOOKS VALANCHERY*\n` +
      `-----------------------------------------\n` +
      `🆔 *Order ID:* ${completedOrder.orderId}\n` +
      `👤 *Customer:* ${completedOrder.customerName}\n` +
      `📞 *Phone:* ${completedOrder.phone}\n` +
      `📄 *Document:* ${completedOrder.fileName} (${completedOrder.fileSize})\n` +
      `${completedOrder.isLargeFile ? `⚠️ *Note:* File >5MB, sending via this chat!\n` : ""}` +
      `📑 *Pages:* ${completedOrder.pages} pages × ${completedOrder.copies} copy\n` +
      `🎨 *Color:* ${completedOrder.colorMode}\n` +
      `🔄 *Sides:* ${completedOrder.sides}\n` +
      `🌀 *Binding:* ${completedOrder.binding}\n` +
      `🚚 *Fulfillment:* ${completedOrder.fulfillment}\n` +
      `${completedOrder.fulfillment === "Home Delivery" ? `📍 *Address:* ${completedOrder.address}\n🌐 *GPS:* ${completedOrder.gps || "Valanchery"}\n` : ""}` +
      `💰 *Total Amount:* ${money.format(completedOrder.totalAmount)}\n` +
      `💳 *Payment:* ${completedOrder.paymentMode} [${completedOrder.paymentStatus}]\n` +
      `⏱️ *Time:* ${completedOrder.timestamp}\n` +
      `-----------------------------------------\n` +
      `Please queue this for 15-min digital print!`
    );
    window.open(`https://wa.me/919746700123?text=${msg}`, "_blank");
  };

  const handleBookInquiryWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryBookName.trim()) {
      alert("Please enter the book or syllabus name you are searching for.");
      return;
    }
    const msg = encodeURIComponent(
      `*📚 BOOK AVAILABILITY INQUIRY - PK BOOKS*\n` +
      `-----------------------------------------\n` +
      `👤 *Customer:* ${inquiryCustomerName || "Student / Reader"}\n` +
      `📖 *Book / Topic:* ${inquiryBookName}\n` +
      `-----------------------------------------\n` +
      `Hi PK Books team, could you please check if this title is in stock at your Valanchery store?`
    );
    window.open(`https://wa.me/919746700123?text=${msg}`, "_blank");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-slate-50/40 to-white pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20 border-b border-slate-200/60">
      {/* Ambient background blur elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#0056B3]/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-80 h-80 bg-[#ED1C24]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          
          {/* ======================================================== */}
          {/* LEFT COLUMN: Hero Brand Narrative & 4 Core Pillars      */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200/90 px-3.5 py-1 text-xs font-bold text-slate-800 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#ED1C24]" />
              <span>Valanchery Bus Stand · Flagship Bookstore &amp; Print Lab</span>
            </div>

            {/* Main Headline - Clean, Authoritative, Logo Colors Only */}
            <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 tracking-tight leading-[1.12]">
              Books, Stationery &amp;<br className="hidden sm:inline" />
              <span className="text-[#0056B3]">Digital Print Lab</span> in{" "}
              <span className="text-[#ED1C24]">Valanchery</span>.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-xl">
              Your comprehensive destination for <strong>10,000+ academic &amp; literature titles</strong>, Kerala PSC guides, and genuine school stationery—featuring our dedicated <strong>15-minute express counter pickup</strong> at Valanchery Bus Stand.
            </p>

            {/* 4 Core Pillars: Strict 2-Color Logo Harmony (Blue & Red) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <Link
                href="/books"
                className="group flex flex-col p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#0056B3] transition-all text-left"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0056B3] grid place-items-center mb-2 group-hover:scale-105 transition-transform">
                  <BookOpen className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-slate-900 group-hover:text-[#0056B3]">10,000+ Titles</span>
                <span className="text-[10px] text-slate-400">PSC, SCERT, Novels</span>
              </Link>

              <Link
                href="/stationery"
                className="group flex flex-col p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#0056B3] transition-all text-left"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0056B3] grid place-items-center mb-2 group-hover:scale-105 transition-transform">
                  <Boxes className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-slate-900 group-hover:text-[#0056B3]">Stationery</span>
                <span className="text-[10px] text-slate-400">Classmate &amp; Art</span>
              </Link>

              <div
                onClick={() => setActiveTab("print")}
                className="group flex flex-col p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#ED1C24] transition-all cursor-pointer text-left"
              >
                <div className="w-8 h-8 rounded-xl bg-red-50 text-[#ED1C24] grid place-items-center mb-2 group-hover:scale-105 transition-transform">
                  <Printer className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-slate-900 group-hover:text-[#ED1C24]">15-Min Print</span>
                <span className="text-[10px] text-slate-400">Thesis &amp; Xerox</span>
              </div>

              <Link
                href="/custom-products"
                className="group flex flex-col p-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#ED1C24] transition-all text-left"
              >
                <div className="w-8 h-8 rounded-xl bg-red-50 text-[#ED1C24] grid place-items-center mb-2 group-hover:scale-105 transition-transform">
                  <Sparkles className="h-4 w-4" />
                </div>
                <span className="text-xs font-bold text-slate-900 group-hover:text-[#ED1C24]">Custom Gifts</span>
                <span className="text-[10px] text-slate-400">Photo Mugs &amp; ID</span>
              </Link>
            </div>

            {/* Action CTA Row - Unified Brand Palette */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/books"
                className="inline-flex items-center gap-2 rounded-full bg-[#ED1C24] hover:bg-[#d0141b] text-white font-bold text-xs sm:text-sm px-6 py-3.5 shadow-md shadow-red-500/20 hover:shadow-lg transition-all active:scale-98"
              >
                <span>Browse All Books</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="https://wa.me/919746700123?text=Hi%20PK%20Books%2C%20I%20need%20assistance%20with%20an%20order"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#0056B3] hover:bg-blue-800 text-white font-bold text-xs sm:text-sm px-5 py-3.5 shadow-md shadow-blue-500/20 hover:shadow-lg transition-all active:scale-98"
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp Order</span>
              </a>

              <a
                href="tel:+919746700123"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-950 px-3 py-2 transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-[#0056B3]" />
                <span>9746 700 123</span>
              </a>
            </div>

            {/* Trust Proof Row - Disciplined Monochrome & Brand Accent */}
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-500 border-t border-slate-200/70">
              <span className="font-bold text-slate-900">★ 4.9 / 5 Rating</span>
              <span className="text-slate-300">·</span>
              <span>500+ Valanchery Readers</span>
              <span className="text-slate-300 hidden sm:inline">·</span>
              <span className="hidden sm:inline font-semibold text-[#0056B3] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                Open Daily 8:30 AM – 9:00 PM
              </span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: Streamlined Precision Interactive Console  */}
          {/* ======================================================== */}
          <div className="lg:col-span-6 w-full">
            {/* Clean Architectural Console Container */}
            <div className="rounded-3xl bg-white p-5 sm:p-7 shadow-xl border border-slate-200/90 text-left">
              
              {/* Switcher Tabs - Pure Logo Colors */}
              <div className="flex rounded-2xl bg-slate-100 p-1 mb-5 text-xs font-bold gap-1 border border-slate-200/60">
                <button
                  type="button"
                  onClick={() => setActiveTab("print")}
                  className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
                    activeTab === "print"
                      ? "bg-[#ED1C24] text-white shadow-sm font-extrabold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Printer className="h-4 w-4" />
                  <span>15-Min Print Counter</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-semibold ${
                    activeTab === "print" ? "bg-white/20 text-white" : "bg-red-100 text-red-700"
                  }`}>
                    Live
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("book_inquiry")}
                  className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 ${
                    activeTab === "book_inquiry"
                      ? "bg-[#0056B3] text-white shadow-sm font-extrabold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Quick Book Check</span>
                </button>
              </div>

              {/* TAB 1: 15-Minute Print & Binding Counter */}
              {activeTab === "print" && (
                <>
                  {orderSuccess && completedOrder ? (
                    /* Success Receipt Card */
                    <div className="p-4 text-center text-slate-800 animate-in zoom-in-95 duration-200">
                      <div className="w-12 h-12 bg-blue-50 text-[#0056B3] rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-xs border border-blue-200/60">
                        <CheckCircle2 className="h-7 w-7" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#0056B3] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                        Print Order Queued
                      </span>
                      <h3 className="text-lg font-black text-slate-900 mt-1">Order #{completedOrder.orderId}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Thank you, <strong>{completedOrder.customerName}</strong>! Ready in 15 mins at Valanchery Bus Stand.
                      </p>

                      <div className="my-3 rounded-2xl bg-slate-50 p-3.5 text-left text-xs space-y-1.5 border border-slate-100">
                        <div className="flex justify-between font-bold text-slate-800 pb-1 border-b border-slate-200/60">
                          <span>Document:</span>
                          <span className="truncate max-w-[170px]">{completedOrder.fileName}</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Config:</span>
                          <span>{completedOrder.pages} pgs × {completedOrder.copies} copy ({completedOrder.colorMode})</span>
                        </div>
                        <div className="flex justify-between text-slate-600">
                          <span>Fulfillment:</span>
                          <span>{completedOrder.fulfillment}</span>
                        </div>
                        <div className="flex justify-between font-bold pt-1 border-t border-slate-200/60 text-sm text-slate-900">
                          <span>Total Amount:</span>
                          <span className="text-[#0056B3] font-black">{money.format(completedOrder.totalAmount)}</span>
                        </div>
                        <div className="flex justify-between text-[11px] pt-0.5">
                          <span className="text-slate-500">Status:</span>
                          <span className="text-[#0056B3] font-bold">
                            ● {completedOrder.paymentStatus}
                          </span>
                        </div>
                      </div>

                      {completedOrder.isLargeFile && (
                        <div className="mb-3 rounded-xl bg-slate-100 border border-slate-200 p-2.5 text-xs text-slate-800 text-left flex items-start gap-2">
                          <AlertCircle className="h-4 w-4 text-[#ED1C24] shrink-0 mt-0.5" />
                          <span>File is &gt;5MB. Please tap the button below to send your document via WhatsApp!</span>
                        </div>
                      )}

                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={sendWhatsAppNotification}
                          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0056B3] hover:bg-blue-800 px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all"
                        >
                          <MessageSquare className="h-4 w-4" />
                          {completedOrder.isLargeFile ? "Send File on WhatsApp ➔" : "Ping WhatsApp Counter ➔"}
                        </button>
                        <button
                          onClick={() => {
                            setOrderSuccess(false);
                            setFileName("");
                            setFileSizeBytes(0);
                            setIsLargeFile(false);
                          }}
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-200"
                        >
                          <RotateCcw className="h-3.5 w-3.5" /> New Print
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Modern Print Form */
                    <form onSubmit={handleOrderSubmit} className="space-y-3.5">
                      {/* Upload Dropzone */}
                      <label className="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-blue-50/40 border border-dashed border-slate-300 hover:border-[#0056B3] cursor-pointer transition-all">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-[#0056B3] grid place-items-center shrink-0 group-hover:bg-[#0056B3] group-hover:text-white transition-all">
                            <UploadCloud className="h-5 w-5" />
                          </div>
                          <div className="truncate">
                            <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                              {fileName ? fileName : "Upload Document (PDF, Word, PPT, Image)"}
                            </p>
                            <p className="text-[11px] text-slate-500">
                              {fileSizeBytes ? `${(fileSizeBytes / (1024 * 1024)).toFixed(1)} MB` : "Up to 5MB · Larger files supported via WhatsApp"}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-[#0056B3] bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs shrink-0 group-hover:bg-[#0056B3] group-hover:text-white transition-colors">
                          {fileName ? "Change" : "Browse File"}
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.ppt,.pptx,image/*"
                          onChange={handleFileUpload}
                          className="sr-only"
                        />
                      </label>

                      {isLargeFile && (
                        <p className="text-xs text-slate-800 bg-slate-100 p-2.5 rounded-xl border border-slate-200">
                          ⚠️ <strong>File &gt;5MB:</strong> Complete details here &amp; send file via WhatsApp <strong>9746 700 123</strong>.
                        </p>
                      )}

                      {/* Color Selector */}
                      <div className="p-1 bg-slate-100 rounded-2xl flex items-center text-xs font-bold gap-1 border border-slate-200">
                        <button
                          type="button"
                          onClick={() => setColorMode("bw")}
                          className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-2 ${
                            colorMode === "bw"
                              ? "bg-slate-900 text-white shadow-xs font-bold"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          <span>Black &amp; White</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                            colorMode === "bw" ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                          }`}>
                            ₹1.50/pg
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setColorMode("color")}
                          className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-2 ${
                            colorMode === "color"
                              ? "bg-[#ED1C24] text-white shadow-xs font-bold"
                              : "text-slate-600 hover:text-slate-900"
                          }`}
                        >
                          <span>Colour Laser</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                            colorMode === "color" ? "bg-white/20 text-white" : "bg-red-50 text-red-700 border border-red-200"
                          }`}>
                            ₹7.00/pg
                          </span>
                        </button>
                      </div>

                      {/* Steppers: Pages, Copies, Sides */}
                      <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                        {/* Pages */}
                        <div className="flex items-center gap-2 pl-1">
                          <span className="text-slate-500 font-semibold">Pages:</span>
                          <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-xl border border-slate-200 shadow-2xs">
                            <button
                              type="button"
                              onClick={() => setPages((p) => Math.max(1, p - 1))}
                              className="w-5 h-5 text-slate-600 font-bold hover:text-slate-900 active:scale-95"
                            >
                              −
                            </button>
                            <span className="w-6 text-center font-bold text-slate-900">{pages}</span>
                            <button
                              type="button"
                              onClick={() => setPages((p) => p + 1)}
                              className="w-5 h-5 text-slate-600 font-bold hover:text-slate-900 active:scale-95"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="h-4 w-px bg-slate-200" />

                        {/* Copies */}
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 font-semibold">Copies:</span>
                          <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-xl border border-slate-200 shadow-2xs">
                            <button
                              type="button"
                              onClick={() => setCopies((c) => Math.max(1, c - 1))}
                              className="w-5 h-5 text-slate-600 font-bold hover:text-slate-900 active:scale-95"
                            >
                              −
                            </button>
                            <span className="w-6 text-center font-bold text-slate-900">{copies}</span>
                            <button
                              type="button"
                              onClick={() => setCopies((c) => c + 1)}
                              className="w-5 h-5 text-slate-600 font-bold hover:text-slate-900 active:scale-95"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="h-4 w-px bg-slate-200" />

                        {/* Sides */}
                        <div className="p-0.5 bg-slate-200 rounded-xl flex items-center text-[11px] font-bold">
                          <button
                            type="button"
                            onClick={() => setSides("single")}
                            className={`px-2.5 py-1 rounded-lg transition-all ${
                              sides === "single" ? "bg-white text-[#0056B3] shadow-xs font-bold" : "text-slate-500"
                            }`}
                          >
                            1-Side
                          </button>
                          <button
                            type="button"
                            onClick={() => setSides("double")}
                            className={`px-2.5 py-1 rounded-lg transition-all ${
                              sides === "double" ? "bg-white text-[#0056B3] shadow-xs font-bold" : "text-slate-500"
                            }`}
                          >
                            2-Side
                          </button>
                        </div>
                      </div>

                      {/* Binding & Fulfillment Row */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <select
                          value={binding}
                          onChange={(e) => setBinding(e.target.value as any)}
                          className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-800 outline-none focus:bg-white focus:border-[#0056B3]"
                        >
                          <option value="none">No Binding (Loose)</option>
                          <option value="staple">Corner Staple (+₹5)</option>
                          <option value="spiral">Spiral Wire Binding (+₹35)</option>
                          <option value="hardcover">Hardcover Thesis Gold (+₹180)</option>
                        </select>

                        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-[11px] font-bold border border-slate-200">
                          <button
                            type="button"
                            onClick={() => setFulfillment("counter")}
                            className={`py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${
                              fulfillment === "counter"
                                ? "bg-white text-[#0056B3] shadow-xs font-bold"
                                : "text-slate-500 hover:text-slate-800"
                            }`}
                          >
                            Pickup (Free)
                          </button>
                          <button
                            type="button"
                            onClick={() => setFulfillment("delivery")}
                            className={`py-1.5 rounded-lg transition-all flex items-center justify-center gap-1 ${
                              fulfillment === "delivery"
                                ? "bg-white text-slate-900 shadow-xs font-bold"
                                : "text-slate-500 hover:text-slate-800"
                            }`}
                          >
                            Delivery (+₹30)
                          </button>
                        </div>
                      </div>

                      {fulfillment === "delivery" && (
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Delivery Address in Valanchery"
                            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-[#0056B3]"
                          />
                          <button
                            type="button"
                            onClick={detectGPSLocation}
                            disabled={isLocating}
                            className="px-3 py-2 rounded-xl bg-blue-50 text-[#0056B3] border border-blue-200 text-xs font-bold hover:bg-blue-100 flex items-center gap-1 shrink-0"
                          >
                            {isLocating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Navigation className="h-3.5 w-3.5" />}
                            <span>GPS</span>
                          </button>
                        </div>
                      )}

                      {/* Customer Details Row */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <input
                          type="text"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="Your Full Name"
                          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-[#0056B3]"
                        />
                        <div className="relative flex items-center">
                          <span className="absolute left-3 text-[11px] font-bold text-slate-400">+91</span>
                          <input
                            type="tel"
                            maxLength={10}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                            placeholder="WhatsApp Number"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 py-2 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-[#0056B3]"
                          />
                        </div>
                      </div>

                      {/* Payment Toggle & Action Button */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-4">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Estimated Total</span>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-slate-900">{money.format(quote.total)}</span>
                            <span className="text-[10px] text-slate-400 font-semibold">(incl. GST)</span>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="flex-1 max-w-[210px] inline-flex items-center justify-center gap-2 rounded-2xl bg-[#ED1C24] hover:bg-[#d0141b] text-white font-extrabold text-xs sm:text-sm py-3 px-4 shadow-lg shadow-red-500/20 hover:shadow-xl transition-all active:scale-98"
                        >
                          <span>Print &amp; Pay Now</span>
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}

                {/* TAB 2: Quick Book Finder & Availability Check */}
                {activeTab === "book_inquiry" && (
                  <form onSubmit={handleBookInquiryWhatsApp} className="space-y-4 py-2">
                    <div className="text-left">
                      <h4 className="text-sm font-extrabold text-slate-900">Search Books &amp; Study Materials</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Looking for a specific PSC Rank File, SCERT / CBSE textbook, or Malayalam literature? Check instant physical store availability!
                      </p>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Book Name or Subject</label>
                      <input
                        type="text"
                        value={inquiryBookName}
                        onChange={(e) => setInquiryBookName(e.target.value)}
                        placeholder="e.g. Kerala PSC LDC Rank File 2026 / Wings of Fire"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-[#0057B8]"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 uppercase block mb-1">Your Name (Optional)</label>
                      <input
                        type="text"
                        value={inquiryCustomerName}
                        onChange={(e) => setInquiryCustomerName(e.target.value)}
                        placeholder="e.g. Rahul Nair"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 focus:bg-white focus:outline-none focus:border-[#0057B8]"
                      />
                    </div>

                    <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/60 text-xs text-slate-700 space-y-1">
                      <div className="flex items-center gap-2 font-bold text-[#0057B8]">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Instant 2-Minute WhatsApp Verification</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        Our store attendants at Valanchery Bus Stand will immediately check rack inventory and reserve your copy.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#0056B3] hover:bg-blue-800 text-white font-extrabold text-xs sm:text-sm py-3.5 shadow-md shadow-blue-500/20 hover:shadow-lg transition-all active:scale-98"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Check Availability on WhatsApp ➔</span>
                    </button>
                  </form>
                )}

              </div>
            </div>

        </div>
      </div>

      {/* Digital Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0057B8] bg-blue-50 px-2 py-0.5 rounded-md">
                  Secure Checkout
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-1">Complete Order Payment</h3>
              </div>
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between font-medium text-slate-600">
                <span>Customer:</span>
                <strong className="text-slate-900">{customerName}</strong>
              </div>
              <div className="flex justify-between font-medium text-slate-600">
                <span>Document:</span>
                <strong className="text-slate-900 truncate max-w-[190px]">{fileName || "Print Order"}</strong>
              </div>
              <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t border-slate-200">
                <span>Total to Pay:</span>
                <span className="text-[#0057B8]">{money.format(quote.total)}</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <label
                onClick={() => setSelectedOnlineMethod("upi")}
                className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                  selectedOnlineMethod === "upi" ? "border-[#0057B8] bg-blue-50/50" : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-[#0057B8] grid place-items-center">
                    <QrCode className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">UPI (GPay / PhonePe / Paytm)</p>
                    <p className="text-[10px] text-slate-500">Scan &amp; pay with 0% extra fee</p>
                  </div>
                </div>
                <input type="radio" checked={selectedOnlineMethod === "upi"} readOnly className="accent-[#0057B8]" />
              </label>

              <label
                onClick={() => setSelectedOnlineMethod("card")}
                className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all ${
                  selectedOnlineMethod === "card" ? "border-[#0057B8] bg-blue-50/50" : "border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 grid place-items-center">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Debit / Credit Card / NetBanking</p>
                    <p className="text-[10px] text-slate-500">Visa, Mastercard, RuPay</p>
                  </div>
                </div>
                <input type="radio" checked={selectedOnlineMethod === "card"} readOnly className="accent-[#0057B8]" />
              </label>
            </div>

            <button
              onClick={processDigitalPayment}
              disabled={isProcessingPayment}
              className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#0057B8] hover:bg-blue-700 text-white font-bold text-sm py-3.5 shadow-lg transition-all active:scale-98 disabled:opacity-60"
            >
              {isProcessingPayment ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Connecting Secure Gateway...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="h-4 w-4" />
                  <span>Pay {money.format(quote.total)} &amp; Queue Print</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
