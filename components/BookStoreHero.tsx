"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
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
  ShieldCheck,
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

  // Handle File Upload & > 5 MB WhatsApp Check
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

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-6">
      {/* ============================================================ */}
      {/* 1. DESKTOP VIEW (lg:block hidden) - Perfectly Balanced       */}
      {/* ============================================================ */}
      <div className="hidden lg:block w-full rounded-[28px] xl:rounded-[32px] overflow-hidden bg-gradient-to-br from-[#0c2356] via-[#08183c] to-[#040e24] shadow-2xl border border-blue-900/30 p-7 lg:p-8 xl:p-9">
        <div className="grid grid-cols-12 gap-8 xl:gap-10 items-stretch">
          {/* Desktop Left Column: Clean Editorial Brand Display */}
          <div className="flex col-span-5 flex-col justify-between text-white py-1">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1.5 text-xs font-bold text-white shadow-2xs w-fit">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Valanchery Bus Stand · 15-Min Express</span>
              </div>

              <div className="space-y-2.5">
                <h1
                  className="text-4xl lg:text-[42px] font-extrabold text-white leading-[1.15] tracking-tight"
                  style={{ fontFamily: "var(--font-serif-title), Georgia, serif" }}
                >
                  Online Printing &amp;<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-cyan-200">
                    Thesis Binding
                  </span>
                </h1>

                <p className="text-sm text-blue-100/85 leading-relaxed font-normal max-w-sm">
                  Upload your document, select options, and pick up in 15 minutes at our Valanchery counter or get home delivery.
                </p>
              </div>
            </div>

            {/* Highlights to balance vertical space */}
            <div className="space-y-2.5 py-4 border-y border-white/10 max-w-sm my-4">
              <div className="flex items-center gap-2.5 text-xs text-blue-100/90 font-medium">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-500/30">
                  <Check className="h-3 w-3" />
                </div>
                <span>15-Minute Express Counter Pickup</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-blue-100/90 font-medium">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 text-cyan-300 flex items-center justify-center shrink-0 border border-blue-500/30">
                  <Check className="h-3 w-3" />
                </div>
                <span>Crisp Laser Printing &amp; Thesis Hardcover</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-blue-100/90 font-medium">
                <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <Check className="h-3 w-3" />
                </div>
                <span>Instant WhatsApp Order Confirmation</span>
              </div>
            </div>

            <div className="pt-1 flex items-center gap-3">
              <Link
                href="/books"
                className="inline-flex items-center gap-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 px-4 py-2.5 text-xs font-bold text-white transition-all shadow-xs"
              >
                <span>Browse Book Store</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
              <a
                href="tel:+919746700123"
                className="inline-flex items-center gap-1.5 text-xs text-blue-200 hover:text-white font-semibold transition-colors"
              >
                <Phone className="h-3.5 w-3.5" /> 9746 700 123
              </a>
            </div>
          </div>

          {/* Desktop Right Column: Modern Minimalist Card */}
          <div className="w-full col-span-7 p-6 sm:p-7 bg-white rounded-2xl xl:rounded-3xl shadow-2xl border border-slate-100 flex flex-col justify-between">
            {orderSuccess && completedOrder ? (
              /* Success Receipt Card */
              <div className="p-4 text-center text-slate-800 animate-in zoom-in-95 duration-200">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-xs">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
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
                    <span className="text-[#0057B8] font-black">{money.format(completedOrder.totalAmount)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] pt-0.5">
                    <span className="text-slate-500">Status:</span>
                    <span className={completedOrder.paymentStatus.includes("PAID") ? "text-emerald-600 font-bold" : "text-amber-600 font-bold"}>
                      ● {completedOrder.paymentStatus}
                    </span>
                  </div>
                </div>

                {completedOrder.isLargeFile && (
                  <div className="mb-3 rounded-xl bg-amber-50 border border-amber-200 p-2.5 text-xs text-amber-900 text-left flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>File is &gt;5MB. Please tap the button below to send your document via WhatsApp!</span>
                  </div>
                )}

                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={sendWhatsAppNotification}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#1EBE5D] shadow-md transition-all"
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
              /* Minimalist Desktop Form */
              <form onSubmit={handleOrderSubmit} className="space-y-3.5">
                {/* Header Title inside Card */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <Printer className="h-4 w-4 text-[#0057B8]" />
                      Document Printing &amp; Binding
                    </h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">Direct upload with 15-minute counter pickup</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/80">
                    ⚡ 15-Min Express
                  </span>
                </div>

                {/* Upload Dropzone Bar */}
                <label className="group flex items-center justify-between p-3 rounded-2xl bg-slate-50/70 hover:bg-blue-50/30 border border-dashed border-slate-200 hover:border-blue-400 cursor-pointer transition-all">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-blue-100/60 text-[#0057B8] grid place-items-center shrink-0 group-hover:bg-[#0057B8] group-hover:text-white transition-all">
                      <UploadCloud className="h-4 w-4" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                        {fileName ? fileName : "Upload Document (PDF, Word, Images)"}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {fileSizeBytes ? `${(fileSizeBytes / (1024 * 1024)).toFixed(1)} MB` : "Up to 5MB · Larger files supported via WhatsApp"}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#0057B8] bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-2xs shrink-0 group-hover:bg-[#0057B8] group-hover:text-white transition-colors">
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
                  <p className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                    ⚠️ <strong>File &gt;5MB:</strong> Complete payment here &amp; send file via WhatsApp <strong>9746 700 123</strong>.
                  </p>
                )}

                {/* Segmented Color Switcher (No Bulky Cards) */}
                <div className="p-1 bg-slate-100/80 rounded-2xl flex items-center text-xs font-bold gap-1 border border-slate-200/60">
                  <button
                    type="button"
                    onClick={() => setColorMode("bw")}
                    className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-2 ${
                      colorMode === "bw"
                        ? "bg-slate-900 text-white shadow-xs font-bold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <span>Black and White</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                      colorMode === "bw" ? "bg-white/20 text-white" : "bg-slate-200/70 text-slate-700"
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
                    <span>Colour</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-md font-semibold ${
                      colorMode === "color" ? "bg-white/20 text-white" : "bg-red-50 text-red-700 border border-red-200/60"
                    }`}>
                      ₹7.00/pg
                    </span>
                  </button>
                </div>

                {/* Unified Quantity & Sides Row */}
                <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50/70 border border-slate-200/70 text-xs">
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

                  {/* Sides Segmented Slide Switch */}
                  <div className="p-0.5 bg-slate-200/80 rounded-xl flex items-center text-[11px] font-bold border border-slate-200/80">
                    <button
                      type="button"
                      onClick={() => setSides("single")}
                      className={`px-2.5 py-1 rounded-lg transition-all duration-150 flex items-center gap-1 ${
                        sides === "single"
                          ? "bg-white text-[#0057B8] shadow-xs font-bold"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                      title="Single Sided / 1-Side"
                    >
                      <span>1-Side</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSides("double")}
                      className={`px-2.5 py-1 rounded-lg transition-all duration-150 flex items-center gap-1 ${
                        sides === "double"
                          ? "bg-white text-[#0057B8] shadow-xs font-bold"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                      title="Double Sided / 2-Side"
                    >
                      <span>2-Side</span>
                    </button>
                  </div>
                </div>

                {/* Binding & Fulfillment Row */}
                <div className="grid grid-cols-2 gap-2.5">
                  <select
                    value={binding}
                    onChange={(e) => setBinding(e.target.value as any)}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-xs font-semibold text-slate-800 outline-none focus:bg-white focus:border-blue-500"
                  >
                    <option value="none">No Binding (Loose Pages)</option>
                    <option value="staple">Corner Staple (+₹5)</option>
                    <option value="spiral">Spiral Binding (+₹35)</option>
                    <option value="hardcover">Hardcover Thesis (+₹180)</option>
                  </select>

                  <div className="p-0.5 bg-slate-100/80 rounded-xl flex items-center text-xs font-bold border border-slate-200/60">
                    <button
                      type="button"
                      onClick={() => setFulfillment("counter")}
                      className={`flex-1 h-9 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                        fulfillment === "counter"
                          ? "bg-white text-emerald-800 shadow-2xs border border-slate-200 font-bold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      🏪 Pickup (Free)
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFulfillment("delivery");
                        if (!address) detectGPSLocation();
                      }}
                      className={`flex-1 h-9 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                        fulfillment === "delivery"
                          ? "bg-white text-[#0057B8] shadow-2xs border border-slate-200 font-bold"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      🛵 Delivery (+₹30)
                    </button>
                  </div>
                </div>

                {/* Fulfillment Status Banner */}
                {fulfillment === "counter" ? (
                  <p className="text-[11px] text-emerald-700 font-medium px-1 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    Ready in 15 mins at Valanchery Bus Stand counter (Free)
                  </p>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      required
                      placeholder="Enter delivery address in Valanchery"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="flex-1 h-10 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 text-xs font-semibold outline-none focus:bg-white focus:border-[#0057B8]"
                    />
                    <button
                      type="button"
                      onClick={detectGPSLocation}
                      disabled={isLocating}
                      className="h-10 px-3.5 rounded-xl bg-[#0057B8] text-white text-xs font-bold flex items-center gap-1.5 shrink-0 hover:bg-blue-700 shadow-xs"
                    >
                      {isLocating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Navigation className="h-3.5 w-3.5" />}
                      Auto GPS
                    </button>
                  </div>
                )}

                {/* Customer Details Row */}
                <div className="grid grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 text-xs font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#0057B8] placeholder:text-slate-400"
                  />
                  <div className="flex h-10">
                    <span className="inline-flex items-center px-2.5 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-xs font-bold text-slate-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp Number (10 digits)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-10 w-full rounded-r-xl border border-slate-200 bg-slate-50/70 px-3.5 text-xs font-semibold text-slate-900 outline-none focus:bg-white focus:border-[#0057B8] placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Checkout & Total Bar */}
                <div className="pt-3 border-t border-slate-100 space-y-2.5">
                  {fulfillment === "counter" && (
                    <div className="flex items-center justify-between text-xs px-1">
                      <span className="text-slate-500 font-medium">Payment Option:</span>
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-slate-700">
                          <input
                            type="radio"
                            name="payOption"
                            checked={paymentType === "online"}
                            onChange={() => setPaymentType("online")}
                            className="text-[#0057B8]"
                          />
                          <span>Pay Online (UPI)</span>
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-slate-700">
                          <input
                            type="radio"
                            name="payOption"
                            checked={paymentType === "cash"}
                            onChange={() => setPaymentType("cash")}
                            className="text-[#0057B8]"
                          />
                          <span>Cash on Pickup</span>
                        </label>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-4 pt-0.5">
                    <div className="pl-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block leading-tight">
                        Total Amount
                      </span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <span className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">
                          {money.format(quote.total)}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          (incl. GST)
                        </span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="h-12 px-6 sm:px-8 rounded-xl bg-[#ED1C24] hover:bg-[#d0141b] text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 shrink-0"
                    >
                      <Printer className="h-4 w-4" />
                      <span>
                        {fulfillment === "counter" && paymentType === "cash"
                          ? "Confirm Order ➔"
                          : "Print & Pay Now ➔"}
                      </span>
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. MOBILE VIEW (block lg:hidden) - ZERO HORIZONTAL OVERFLOW  */}
      {/* ============================================================ */}
      <div className="block lg:hidden w-full max-w-full rounded-3xl overflow-hidden bg-white shadow-xl border border-slate-100">
        {/* Mobile Header Banner */}
        <div className="bg-[#0c2356] text-white p-3.5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <Printer className="h-4 w-4 text-emerald-400" />
              <h2 className="text-sm font-bold tracking-tight">PK Books Online Print</h2>
            </div>
            <p className="text-[11px] text-blue-200/80 mt-0.5">
              Valanchery Bus Stand · 15-Min Express
            </p>
          </div>
          <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
            ⚡ 15-Min Ready
          </span>
        </div>

        {orderSuccess && completedOrder ? (
          /* Mobile Success Receipt */
          <div className="p-4 text-center text-slate-800">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Order Queued
            </span>
            <h3 className="text-base font-black text-slate-900 mt-1">Order #{completedOrder.orderId}</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Ready in 15 mins at Valanchery Bus Stand.
            </p>

            <div className="my-3 rounded-2xl bg-slate-50 p-3 text-left text-xs space-y-1.5 border border-slate-100">
              <div className="flex justify-between font-bold text-slate-800 pb-1 border-b border-slate-200/60">
                <span>Doc:</span>
                <span className="truncate max-w-[150px]">{completedOrder.fileName}</span>
              </div>
              <div className="flex justify-between text-slate-600 text-[11px]">
                <span>Config:</span>
                <span>{completedOrder.pages} pgs × {completedOrder.copies} copy</span>
              </div>
              <div className="flex justify-between font-bold pt-1 border-t border-slate-200/60 text-sm">
                <span>Total:</span>
                <span className="text-[#0057B8]">{money.format(completedOrder.totalAmount)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                onClick={sendWhatsAppNotification}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] py-2.5 text-xs font-bold text-white shadow-sm"
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
                className="w-full py-2 rounded-xl bg-slate-100 text-xs font-bold text-slate-700"
              >
                New Print Order
              </button>
            </div>
          </div>
        ) : (
          /* Mobile Dedicated Form */
          <form onSubmit={handleOrderSubmit} className="p-3.5 space-y-3.5 w-full max-w-full">
            {/* Upload Dropzone Bar */}
            <label className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/70 active:bg-blue-50/40 border border-dashed border-slate-200 cursor-pointer">
              <div className="flex items-center gap-2.5 min-w-0 pr-2">
                <div className="w-8 h-8 rounded-xl bg-blue-100/60 text-[#0057B8] grid place-items-center shrink-0">
                  <UploadCloud className="h-4 w-4" />
                </div>
                <div className="truncate">
                  <p className="text-xs font-bold text-slate-800 truncate">
                    {fileName || "Choose file to print"}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {fileSizeBytes ? `${(fileSizeBytes / (1024 * 1024)).toFixed(1)} MB` : "PDF, Word, Images ≤ 5MB"}
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-[#0057B8] bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 shadow-2xs shrink-0">
                {fileName ? "Change" : "Browse"}
              </span>
              <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx,image/*" onChange={handleFileUpload} className="sr-only" />
            </label>

            {isLargeFile && (
              <p className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                ⚠️ File &gt; 5MB: Place order &amp; send document via WhatsApp.
              </p>
            )}

            {/* Segmented Color Switcher */}
            <div className="p-1 bg-slate-100/80 rounded-2xl flex items-center text-xs font-bold gap-1 border border-slate-200/60">
              <button
                type="button"
                onClick={() => setColorMode("bw")}
                className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  colorMode === "bw"
                    ? "bg-slate-900 text-white shadow-xs font-bold"
                    : "text-slate-600"
                }`}
              >
                <span>B/W Print</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${colorMode === "bw" ? "bg-white/20 text-white" : "bg-slate-200/70 text-slate-700"}`}>
                  ₹1.50/pg
                </span>
              </button>
              <button
                type="button"
                onClick={() => setColorMode("color")}
                className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                  colorMode === "color"
                    ? "bg-[#ED1C24] text-white shadow-xs font-bold"
                    : "text-slate-600"
                }`}
              >
                <span>Color Print</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${colorMode === "color" ? "bg-white/20 text-white" : "bg-red-50 text-red-700 border border-red-200/60"}`}>
                  ₹7.00/pg
                </span>
              </button>
            </div>

            {/* Pages, Copies & Duplex */}
            <div className="p-2.5 rounded-2xl bg-slate-50/70 border border-slate-200/70 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                {/* Pages */}
                <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] font-semibold text-slate-500">Pages:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setPages((p) => Math.max(1, p - 1))}
                      className="w-5 h-5 text-slate-600 font-bold active:scale-95"
                    >
                      −
                    </button>
                    <span className="text-xs font-black text-slate-900 w-5 text-center">{pages}</span>
                    <button
                      type="button"
                      onClick={() => setPages((p) => p + 1)}
                      className="w-5 h-5 text-slate-600 font-bold active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Copies */}
                <div className="flex items-center justify-between bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 shadow-2xs">
                  <span className="text-[11px] font-semibold text-slate-500">Copies:</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setCopies((c) => Math.max(1, c - 1))}
                      className="w-5 h-5 text-slate-600 font-bold active:scale-95"
                    >
                      −
                    </button>
                    <span className="text-xs font-black text-slate-900 w-5 text-center">{copies}</span>
                    <button
                      type="button"
                      onClick={() => setCopies((c) => c + 1)}
                      className="w-5 h-5 text-slate-600 font-bold active:scale-95"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Duplex Toggle Button */}
              <button
                type="button"
                onClick={() => setSides((s) => (s === "double" ? "single" : "double"))}
                className="w-full py-1.5 px-3 rounded-xl border border-slate-200 bg-white text-xs font-bold text-[#0057B8] flex items-center justify-center gap-1.5 shadow-2xs"
              >
                {sides === "double" ? "📑 Both Sides Printed" : "📄 Single-Sided Print"}
              </button>
            </div>

            {/* Binding & Collection */}
            <div className="space-y-2">
              <select
                value={binding}
                onChange={(e) => setBinding(e.target.value as any)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-xs font-semibold text-slate-800 outline-none"
              >
                <option value="none">No Binding (Loose Pages)</option>
                <option value="staple">Corner Staple (+₹5)</option>
                <option value="spiral">Spiral Binding (+₹35)</option>
                <option value="hardcover">Hardcover Thesis (+₹180)</option>
              </select>

              {/* Pickup / Delivery Tabs */}
              <div className="p-0.5 bg-slate-100/80 rounded-xl flex items-center text-xs font-bold border border-slate-200/60">
                <button
                  type="button"
                  onClick={() => setFulfillment("counter")}
                  className={`flex-1 h-9 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    fulfillment === "counter"
                      ? "bg-white text-emerald-800 shadow-2xs border border-slate-200 font-bold"
                      : "text-slate-600"
                  }`}
                >
                  🏪 Pickup (Free)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFulfillment("delivery");
                    if (!address) detectGPSLocation();
                  }}
                  className={`flex-1 h-9 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                    fulfillment === "delivery"
                      ? "bg-white text-[#0057B8] shadow-2xs border border-slate-200 font-bold"
                      : "text-slate-600"
                  }`}
                >
                  🛵 Delivery (+₹30)
                </button>
              </div>

              {fulfillment === "counter" ? (
                <p className="text-[11px] text-emerald-700 font-medium px-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  Ready in 15 mins at Valanchery Bus Stand counter
                </p>
              ) : (
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    required
                    placeholder="Delivery address in Valanchery"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="flex-1 h-10 rounded-xl border border-slate-200 bg-slate-50/70 px-2.5 text-xs font-medium outline-none"
                  />
                  <button
                    type="button"
                    onClick={detectGPSLocation}
                    disabled={isLocating}
                    className="h-10 px-3 rounded-xl bg-[#0057B8] text-white text-xs font-bold shrink-0 flex items-center gap-1 shadow-xs"
                  >
                    {isLocating ? <Loader2 className="h-3 w-3 animate-spin" /> : <Navigation className="h-3.5 w-3.5" />}
                    GPS
                  </button>
                </div>
              )}
            </div>

            {/* Contact Details */}
            <div className="space-y-2">
              <input
                type="text"
                required
                placeholder="Your Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-xs font-medium text-slate-900 outline-none"
              />
              <div className="flex h-10">
                <span className="inline-flex items-center px-2.5 rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 text-xs font-bold text-slate-500">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  placeholder="WhatsApp Number (10 digits)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-10 w-full rounded-r-xl border border-slate-200 bg-slate-50/70 px-3 text-xs font-medium text-slate-900 outline-none"
                />
              </div>
            </div>

            {/* Payment & Total Checkout */}
            <div className="pt-2 border-t border-slate-100 space-y-2">
              {fulfillment === "counter" && (
                <div className="p-0.5 bg-slate-100/80 rounded-xl flex items-center text-xs font-semibold border border-slate-200/60">
                  <button
                    type="button"
                    onClick={() => setPaymentType("online")}
                    className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
                      paymentType === "online"
                        ? "bg-white text-[#0057B8] shadow-2xs font-bold border border-slate-200"
                        : "text-slate-600"
                    }`}
                  >
                    Pay Online (UPI)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentType("cash")}
                    className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
                      paymentType === "cash"
                        ? "bg-white text-emerald-700 shadow-2xs font-bold border border-slate-200"
                        : "text-slate-600"
                    }`}
                  >
                    Cash on Pickup
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between gap-3 p-3 bg-slate-900 text-white rounded-2xl shadow-md">
                <div className="pl-1">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-semibold leading-none">
                    Total Payable
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-xl font-black text-white leading-none">
                      {money.format(quote.total)}
                    </span>
                    <span className="text-[9px] text-slate-400 font-normal">
                      (incl. GST)
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="h-11 px-5 rounded-xl bg-[#ED1C24] hover:bg-[#d0141b] text-white text-xs font-bold shadow-md active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>
                    {fulfillment === "counter" && paymentType === "cash"
                      ? "Confirm ➔"
                      : "Print & Pay ➔"}
                  </span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Digital Payment Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            <div className="flex items-start justify-between pb-2.5 border-b border-slate-100">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#0057B8] bg-blue-50 px-2 py-0.5 rounded">
                  UPI &amp; Cards
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">Pay {money.format(quote.total)}</h3>
              </div>
              <button
                onClick={() => setIsPaymentModalOpen(false)}
                className="grid h-7 w-7 place-items-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="py-3 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedOnlineMethod("upi")}
                  className={`py-1.5 px-2 rounded-lg font-bold border text-xs transition-all ${
                    selectedOnlineMethod === "upi"
                      ? "border-[#0057B8] bg-blue-50 text-[#0057B8]"
                      : "border-slate-200 bg-slate-50 text-slate-700"
                  }`}
                >
                  UPI QR Code
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedOnlineMethod("card")}
                  className={`py-1.5 px-2 rounded-lg font-bold border text-xs transition-all ${
                    selectedOnlineMethod === "card"
                      ? "border-[#0057B8] bg-blue-50 text-[#0057B8]"
                      : "border-slate-200 bg-slate-50 text-slate-700"
                  }`}
                >
                  Debit/Credit Card
                </button>
              </div>

              {selectedOnlineMethod === "upi" && (
                <div className="space-y-2 text-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="mx-auto w-32 h-32 bg-slate-900 p-2 rounded-lg flex flex-col items-center justify-center text-white">
                    <QrCode className="h-14 w-14 text-white" />
                    <span className="font-mono text-[8px] text-slate-300 mt-1">GPay · PhonePe · Paytm</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-700 block">UPI VPA:</span>
                    <span className="font-mono font-bold text-[#0057B8] text-xs">pkbooksvalanchery@okhdfcbank</span>
                  </div>
                  <p className="text-[9px] text-slate-400">
                    Scan with any UPI App to pay securely and dispatch to printer queue.
                  </p>
                </div>
              )}

              {selectedOnlineMethod === "card" && (
                <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-700 mb-0.5">Card Number</label>
                    <input
                      type="text"
                      defaultValue="4532 •••• •••• 8910"
                      className="h-8 w-full rounded-md border border-slate-200 bg-white px-2.5 font-mono text-xs outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 mb-0.5">Expiry</label>
                      <input
                        type="text"
                        defaultValue="08/28"
                        className="h-8 w-full rounded-md border border-slate-200 bg-white px-2 font-mono text-xs outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-700 mb-0.5">CVV</label>
                      <input
                        type="password"
                        defaultValue="829"
                        maxLength={4}
                        className="h-8 w-full rounded-md border border-slate-200 bg-white px-2 font-mono text-xs outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1.5 border-t border-slate-100">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3 text-emerald-600" /> 256-bit Encrypted
                </span>
                <span className="font-bold text-slate-800">PK Books</span>
              </div>
            </div>

            <div className="pt-1">
              <button
                type="button"
                onClick={processDigitalPayment}
                disabled={isProcessingPayment}
                className="w-full flex h-10 items-center justify-center gap-2 rounded-xl bg-[#0057B8] font-bold text-white shadow-sm hover:bg-[#00438F] active:scale-95 transition-all text-xs"
              >
                {isProcessingPayment ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" /> Verifying Payment...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-3.5 w-3.5" /> Confirm &amp; Pay {money.format(quote.total)}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
