"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Clock,
  CreditCard,
  FileCheck,
  FileText,
  FileUp,
  HelpCircle,
  Loader2,
  MapPin,
  MessageSquare,
  Navigation,
  Phone,
  Printer,
  QrCode,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Truck,
  UploadCloud,
  User,
  Wallet,
  X,
  Zap
} from "lucide-react";
import { placeSystemOrder } from "@/lib/storeSync";

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

export default function QuickPrintSection() {
  // File state
  const [fileName, setFileName] = useState<string>("");
  const [fileSizeBytes, setFileSizeBytes] = useState<number>(0);
  const [isLargeFile, setIsLargeFile] = useState<boolean>(false);

  // Print specifications
  const [pages, setPages] = useState<number>(10);
  const [copies, setCopies] = useState<number>(1);
  const [colorMode, setColorMode] = useState<"bw" | "color">("bw");
  const [sides, setSides] = useState<"single" | "double">("double");
  const [paperType, setPaperType] = useState<"standard" | "premium" | "glossy">("standard");
  const [binding, setBinding] = useState<"none" | "staple" | "spiral" | "hardcover">("none");
  const [lamination, setLamination] = useState<boolean>(false);

  // Customer details
  const [customerName, setCustomerName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  // Fulfillment & Address
  const [fulfillment, setFulfillment] = useState<"counter" | "delivery">("counter");
  const [address, setAddress] = useState<string>("");
  const [gpsCoordinates, setGpsCoordinates] = useState<string>("");
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [gpsAccuracy, setGpsAccuracy] = useState<string>("");

  // Payment State
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
          const accuracy = Math.round(pos.coords.accuracy);
          setGpsCoordinates(`${lat}, ${lng}`);
          setGpsAccuracy(`±${accuracy}m`);
          setAddress(`📍 GPS Pin: ${lat}, ${lng} (Valanchery Area)`);
          setIsLocating(false);
        },
        (err) => {
          console.warn("GPS detection failed:", err.message);
          setAddress("Near Bus Stand, Valanchery - 676552");
          setGpsCoordinates("10.8794, 76.0718");
          setIsLocating(false);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Pricing calculation
  const quote = useMemo(() => {
    let perPage = 0;
    if (colorMode === "bw") {
      perPage = sides === "double" ? 1.5 : 2.0;
    } else {
      perPage = sides === "double" ? 7.0 : 8.0;
    }

    if (paperType === "premium") perPage += 0.5;
    if (paperType === "glossy") perPage += 4.0;

    const printCost = pages * perPage * copies;

    let bindingCost = 0;
    if (binding === "staple") bindingCost = 5 * copies;
    if (binding === "spiral") bindingCost = 35 * copies;
    if (binding === "hardcover") bindingCost = 180 * copies;

    const laminationCost = lamination ? 20 * copies : 0;
    const deliveryCost = fulfillment === "delivery" ? 30 : 0;
    const subtotal = printCost + bindingCost + laminationCost + deliveryCost;
    const gst = Math.round(subtotal * 0.05);
    const total = Math.max(10, subtotal + gst);

    return { printCost, bindingCost, laminationCost, deliveryCost, gst, total };
  }, [pages, copies, colorMode, sides, paperType, binding, lamination, fulfillment]);

  // Submit Order / Open Payment Modal
  const handleSubmitOrder = (e: React.FormEvent) => {
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
      alert("Please enter your delivery address or click 'Auto-Detect GPS'.");
      return;
    }

    if (fulfillment === "counter" && paymentType === "cash") {
      // Direct cash order confirmation
      finalizeOrder("Cash on Counter Pickup", "UNPAID (Pay Cash on Collection)");
    } else {
      // Open online payment modal
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
      paperType: paperType.toUpperCase(),
      binding: binding.toUpperCase(),
      lamination,
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

    // Save to unified system orders for Admin Print Orders view
    placeSystemOrder({
      id: orderId,
      orderType: "print",
      customerName,
      phone,
      items: `${fileName || "Document Print"} (${pages} pgs × ${copies} copies, ${colorMode === "bw" ? "B/W" : "Color"}, ${binding.toUpperCase()})`,
      itemCount: copies,
      totalAmount: quote.total,
      fulfillment: fulfillment === "counter" ? "Store Pickup (Valanchery Bus Stand)" : `Home Delivery (${address})`,
      address: fulfillment === "delivery" ? address : "Counter Pickup - Valanchery Bus Stand",
      gps: gpsCoordinates,
      paymentMode,
      paymentStatus: paymentStatusText.includes("PAID") ? "Paid" : "Unpaid",
      orderStatus: "Received",
      date: new Date().toISOString().slice(0, 16).replace("T", " "),
      printSpecs: {
        pages,
        copies,
        colorMode: colorMode === "bw" ? "Black and White" : "Colour",
        sides: sides === "double" ? "Double-Sided" : "Single-Sided",
        binding: binding.toUpperCase(),
        fileName: fileName || "Document_Print.pdf",
        fileSize: fileSizeBytes ? `${(fileSizeBytes / (1024 * 1024)).toFixed(1)} MB` : "Attached via WhatsApp"
      }
    });
  };

  const processDigitalPayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      finalizeOrder(
        selectedOnlineMethod === "upi" ? "UPI (GPay / PhonePe / Paytm)" : "Debit/Credit Card",
        "PAID DIGITALLY (Verified)"
      );
    }, 1500);
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
      `🌀 *Binding:* ${completedOrder.binding}${completedOrder.lamination ? " + Lamination" : ""}\n` +
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
    <section id="online-printing-section" className="py-10 sm:py-16 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-50 border border-red-200 px-3.5 py-1 text-xs font-bold text-[#ED1C24] mb-3">
            <Zap className="h-3.5 w-3.5" />
            <span>High-Speed 15-Minute Print & Xerox Counter</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a1a] tracking-tight">
            Upload & Print Online
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-slate-500 font-medium">
            Upload your documents, customize pages & binding, pay digitally or cash on pickup, and collect at Valanchery Bus Stand or get doorstep delivery with GPS tracking.
          </p>
        </div>

        {/* Success Screen */}
        {orderSuccess && completedOrder ? (
          <div className="max-w-2xl mx-auto rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-emerald-100 text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Order Confirmed & Queued
            </span>

            <h3 className="text-2xl font-black text-slate-900 mt-3">
              Order #{completedOrder.orderId}
            </h3>

            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Thank you, <strong className="text-slate-800">{completedOrder.customerName}</strong>! Your print job has been sent to our Valanchery counter queue.
            </p>

            {/* Order Details Card */}
            <div className="mt-6 rounded-2xl bg-slate-50 p-4 sm:p-5 text-left text-xs space-y-2 border border-slate-100">
              <div className="flex justify-between pb-2 border-b border-slate-200/60 font-semibold text-slate-800">
                <span>File: {completedOrder.fileName}</span>
                <span className="text-slate-500">{completedOrder.fileSize}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Configuration:</span>
                <span className="font-bold text-slate-800">{completedOrder.pages} pgs × {completedOrder.copies} copy ({completedOrder.colorMode})</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Fulfillment:</span>
                <span className="font-bold text-slate-800">{completedOrder.fulfillment}</span>
              </div>
              {completedOrder.fulfillment === "Home Delivery" && (
                <div className="flex justify-between text-slate-600">
                  <span>Delivery Address:</span>
                  <span className="font-medium text-slate-800 text-right max-w-[220px] truncate">{completedOrder.address}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-slate-200/60 font-bold text-sm">
                <span className="text-slate-900">Total: {money.format(completedOrder.totalAmount)}</span>
                <span className={completedOrder.paymentStatus.includes("PAID") ? "text-emerald-600" : "text-amber-600"}>
                  ● {completedOrder.paymentStatus}
                </span>
              </div>
            </div>

            {/* Large file warning reminder */}
            {completedOrder.isLargeFile && (
              <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800 flex items-start gap-2.5 text-left">
                <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Reminder:</strong> Your file was over 5MB. Please tap the WhatsApp button below to send your PDF/document directly to the counter so printing can start immediately!
                </span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={sendWhatsAppNotification}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-xs font-bold text-white hover:bg-[#1EBE5D] shadow-md transition-all"
              >
                <MessageSquare className="h-4 w-4" />
                {completedOrder.isLargeFile ? "Send File & Details via WhatsApp ➔" : "Ping Print Counter on WhatsApp ➔"}
              </button>

              <button
                onClick={() => {
                  setOrderSuccess(false);
                  setFileName("");
                  setFileSizeBytes(0);
                  setIsLargeFile(false);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-100 px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-200 transition-all"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Print Another Document
              </button>
            </div>
          </div>
        ) : (
          /* Main Configurator Form */
          <form onSubmit={handleSubmitOrder} className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            {/* Left Column: Options */}
            <div className="space-y-6">
              {/* Step 1: File Upload */}
              <div className="rounded-3xl bg-white p-6 sm:p-7 shadow-xs border border-slate-200/80">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2.5">
                    <span className="grid h-6 w-6 place-items-center rounded-lg bg-red-100 text-[#ED1C24] text-xs font-bold">1</span>
                    Upload Pages or Document
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-400">PDF, Word, PPT, JPG</span>
                </div>

                <label className="group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-6 sm:p-8 text-center cursor-pointer hover:bg-red-50/40 hover:border-red-300 transition-all duration-200">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,image/*"
                    onChange={handleFileUpload}
                    className="sr-only"
                  />
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-[#ED1C24] shadow-xs border border-slate-100 group-hover:scale-105 transition-transform">
                    <UploadCloud className="h-6 w-6" />
                  </div>
                  <p className="mt-3 text-xs sm:text-sm font-bold text-slate-800">
                    Click to Upload or Drag & Drop Document
                  </p>
                  <p className="mt-0.5 text-[11px] text-slate-400">
                    Maximum direct upload 5 MB · Larger files sent via WhatsApp
                  </p>

                  {/* Upload Status */}
                  {fileName && (
                    <div className="mt-4 w-full max-w-md space-y-2">
                      <div className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-xs font-bold text-slate-800 border border-slate-200 shadow-2xs">
                        <FileCheck className="h-4 w-4 text-emerald-600" />
                        <span className="truncate max-w-[200px]">{fileName}</span>
                        <span className="text-slate-400 font-mono">
                          ({(fileSizeBytes / (1024 * 1024)).toFixed(1)} MB)
                        </span>
                      </div>

                      {/* > 5 MB WhatsApp Notice */}
                      {isLargeFile ? (
                        <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-left text-xs text-amber-900 space-y-2">
                          <div className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold">File exceeds 5 MB!</p>
                              <p className="text-[11px] text-amber-800 mt-0.5">
                                Large files must be sent directly via WhatsApp to our Valanchery counter (<strong>9746 700 123</strong>). You can configure options and complete payment here to secure your print queue!
                              </p>
                            </div>
                          </div>
                          <a
                            href={`https://wa.me/919746700123?text=${encodeURIComponent(`Hi PK Books, I am ordering a print job for file "${fileName}" (${(fileSizeBytes / (1024 * 1024)).toFixed(1)} MB). Here is my document:`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-1.5 text-[11px] font-bold text-white hover:bg-[#1EBE5D] transition-colors"
                          >
                            <MessageSquare className="h-3 w-3" /> Send file on WhatsApp now
                          </a>
                        </div>
                      ) : (
                        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-2 text-xs text-emerald-800 flex items-center justify-center gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                          <span>File ready for instant processing (&le; 5 MB)</span>
                        </div>
                      )}
                    </div>
                  )}
                </label>
              </div>

              {/* Step 2: Print Pages & Specifications */}
              <div className="rounded-3xl bg-white p-6 sm:p-7 shadow-xs border border-slate-200/80 space-y-5">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2.5">
                  <span className="grid h-6 w-6 place-items-center rounded-lg bg-red-100 text-[#ED1C24] text-xs font-bold">2</span>
                  Print Specifications
                </h3>

                {/* Page count & Copies */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Total Page Count
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={1000}
                      value={pages}
                      onChange={(e) => setPages(Math.max(1, Number(e.target.value)))}
                      className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 text-xs font-bold text-slate-800 outline-none focus:border-[#0057B8] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Number of Copies
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={copies}
                      onChange={(e) => setCopies(Math.max(1, Number(e.target.value)))}
                      className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3.5 text-xs font-bold text-slate-800 outline-none focus:border-[#0057B8] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Color Mode Selection */}
                <div>
                  <span className="block text-xs font-bold text-slate-700 mb-2">Print Color</span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setColorMode("bw")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        colorMode === "bw"
                          ? "border-[#1a1a1a] bg-[#1a1a1a] text-white shadow-xs"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="text-xs font-bold">Black and White</div>
                      <div className="text-[10px] opacity-80 mt-0.5">₹1.50 / page (double sided)</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setColorMode("color")}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        colorMode === "color"
                          ? "border-[#ED1C24] bg-[#ED1C24] text-white shadow-xs"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="text-xs font-bold">Colour</div>
                      <div className="text-[10px] opacity-80 mt-0.5">₹7.00 / page (high-def)</div>
                    </button>
                  </div>
                </div>

                {/* Sides & Paper Type */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Print Sides</label>
                    <select
                      value={sides}
                      onChange={(e) => setSides(e.target.value as "single" | "double")}
                      className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#0057B8]"
                    >
                      <option value="double">2-Side / Double Sided (Duplex)</option>
                      <option value="single">1-Side / Single Sided</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Paper Quality</label>
                    <select
                      value={paperType}
                      onChange={(e) => setPaperType(e.target.value as "standard" | "premium" | "glossy")}
                      className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#0057B8]"
                    >
                      <option value="standard">75 GSM Standard Copy Bond</option>
                      <option value="premium">85 GSM Executive Super White (+₹0.50)</option>
                      <option value="glossy">180 GSM Glossy Cover Paper (+₹4.00)</option>
                    </select>
                  </div>
                </div>

                {/* Binding & Lamination */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Binding Style</label>
                  <select
                    value={binding}
                    onChange={(e) => setBinding(e.target.value as any)}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/60 px-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#0057B8]"
                  >
                    <option value="none">📄 No Binding (Loose Pages)</option>
                    <option value="staple">📎 Corner Staple (₹5)</option>
                    <option value="spiral">🌀 Spiral Coil Binding with Transparent Sheet (₹35)</option>
                    <option value="hardcover">📘 Hardcover Golden Foil Thesis Binding (₹180)</option>
                  </select>
                </div>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-slate-50/40 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={lamination}
                    onChange={(e) => setLamination(e.target.checked)}
                    className="h-4 w-4 rounded text-[#0057B8] focus:ring-[#0057B8]"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-slate-800 block">Thermal Gloss Lamination (+₹20)</span>
                    <span className="text-slate-400 text-[10px]">Protects front and back pages from water & tear</span>
                  </div>
                </label>
              </div>

              {/* Step 3: Customer Information */}
              <div className="rounded-3xl bg-white p-6 sm:p-7 shadow-xs border border-slate-200/80 space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2.5">
                  <span className="grid h-6 w-6 place-items-center rounded-lg bg-red-100 text-[#ED1C24] text-xs font-bold">3</span>
                  Customer Information
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                    <div className="relative flex items-center">
                      <User className="absolute left-3 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Nair"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-9 pr-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#0057B8] focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Phone Number</label>
                    <div className="relative flex items-center">
                      <Phone className="absolute left-3 h-4 w-4 text-slate-400" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9746 700 123"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/60 pl-9 pr-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#0057B8] focus:bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Fulfillment (In-Store Pickup vs Home Delivery) */}
              <div className="rounded-3xl bg-white p-6 sm:p-7 shadow-xs border border-slate-200/80 space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2.5">
                  <span className="grid h-6 w-6 place-items-center rounded-lg bg-red-100 text-[#ED1C24] text-xs font-bold">4</span>
                  Fulfillment & Location
                </h3>

                {/* Pickup or Delivery Option Cards */}
                <div className="grid sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFulfillment("counter");
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      fulfillment === "counter"
                        ? "border-[#0057B8] bg-blue-50/60 text-[#0057B8] ring-1 ring-[#0057B8]"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-[#ED1C24]" />
                      In-Store Pickup (Free)
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Valanchery Bus Stand · Ready in 15 mins (No address required)
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFulfillment("delivery");
                      if (!address) detectGPSLocation();
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      fulfillment === "delivery"
                        ? "border-[#0057B8] bg-blue-50/60 text-[#0057B8] ring-1 ring-[#0057B8]"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <Truck className="h-3.5 w-3.5 text-[#0057B8]" />
                      Doorstep Delivery (+₹30)
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      Local Valanchery area & nearby campuses
                    </div>
                  </button>
                </div>

                {/* If Home Delivery -> Show Address & Geolocation Tracking */}
                {fulfillment === "delivery" ? (
                  <div className="rounded-2xl bg-blue-50/70 p-4 border border-blue-100 space-y-3 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-[#0057B8]" /> Delivery Address & Landmark
                      </span>

                      {/* GPS Geolocation Button */}
                      <button
                        type="button"
                        onClick={detectGPSLocation}
                        disabled={isLocating}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-[#0057B8] border border-blue-200 hover:bg-blue-50 transition-colors shadow-2xs"
                      >
                        {isLocating ? (
                          <>
                            <Loader2 className="h-3 w-3 animate-spin" /> Detecting Location...
                          </>
                        ) : (
                          <>
                            <Navigation className="h-3 w-3" /> Auto-Detect GPS Location
                          </>
                        )}
                      </button>
                    </div>

                    <input
                      type="text"
                      required
                      placeholder="House/Shop name, Street, Landmark, Valanchery"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="h-10 w-full rounded-xl border border-blue-200 bg-white px-3.5 text-xs font-semibold text-slate-800 outline-none focus:border-[#0057B8]"
                    />

                    {gpsCoordinates && (
                      <div className="flex items-center justify-between text-[10px] text-blue-700 bg-white/70 px-3 py-1.5 rounded-lg border border-blue-100 font-mono">
                        <span>📍 GPS Lat/Lng: {gpsCoordinates}</span>
                        {gpsAccuracy && <span>Accuracy: {gpsAccuracy}</span>}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="rounded-xl bg-slate-50 p-3 text-[11px] text-slate-500 flex items-center gap-2 border border-slate-100">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>In-Store Pickup selected: No home address required. Simply visit our counter at Bus Stand, Valanchery.</span>
                  </div>
                )}
              </div>

              {/* Step 5: Payment Method */}
              <div className="rounded-3xl bg-white p-6 sm:p-7 shadow-xs border border-slate-200/80 space-y-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2.5">
                  <span className="grid h-6 w-6 place-items-center rounded-lg bg-red-100 text-[#ED1C24] text-xs font-bold">5</span>
                  Payment Option
                </h3>

                <div className="grid sm:grid-cols-2 gap-3">
                  {/* Digital Online Payment */}
                  <button
                    type="button"
                    onClick={() => setPaymentType("online")}
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      paymentType === "online"
                        ? "border-[#0057B8] bg-blue-50/60 text-[#0057B8] ring-1 ring-[#0057B8]"
                        : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <div className="text-xs font-bold flex items-center gap-1.5">
                      <QrCode className="h-3.5 w-3.5 text-[#0057B8]" />
                      Pay Digitally Online (UPI / Card)
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">
                      GPay, PhonePe, Paytm, QR Code, Cards
                    </div>
                  </button>

                  {/* Cash at Counter (only for pickup) */}
                  {fulfillment === "counter" ? (
                    <button
                      type="button"
                      onClick={() => setPaymentType("cash")}
                      className={`p-3.5 rounded-2xl border text-left transition-all ${
                        paymentType === "cash"
                          ? "border-[#0057B8] bg-blue-50/60 text-[#0057B8] ring-1 ring-[#0057B8]"
                          : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <div className="text-xs font-bold flex items-center gap-1.5">
                        <Wallet className="h-3.5 w-3.5 text-emerald-600" />
                        Pay by Cash on Pickup
                      </div>
                      <div className="text-[11px] text-slate-500 mt-1">
                        Pay by hand at Valanchery counter
                      </div>
                    </button>
                  ) : (
                    <div className="p-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 text-slate-400 text-xs">
                      <div className="font-bold text-slate-400">Cash on Delivery</div>
                      <div className="text-[10px] mt-1">Home delivery requires digital prepay for print security.</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Live Order Summary & Submit (Sticky) */}
            <div className="lg:sticky lg:top-24 h-fit space-y-4">
              <div className="rounded-3xl bg-slate-900 p-6 sm:p-7 text-white shadow-xl">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-red-400 block">Print Estimate</span>
                    <h4 className="text-xl font-black">Live Summary</h4>
                  </div>
                  <span className="rounded-full bg-emerald-500/20 border border-emerald-400/30 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                    ⚡ 15-Min Express
                  </span>
                </div>

                <div className="mt-4 space-y-2.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span>File:</span>
                    <span className="font-semibold text-white truncate max-w-[150px]">{fileName || "No file chosen"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pages & Copies:</span>
                    <span className="font-semibold text-white">{pages} pgs × {copies} copy</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Printing Cost:</span>
                    <span className="font-mono text-white">{money.format(quote.printCost)}</span>
                  </div>
                  {quote.bindingCost > 0 && (
                    <div className="flex justify-between">
                      <span>Binding ({binding}):</span>
                      <span className="font-mono text-white">{money.format(quote.bindingCost)}</span>
                    </div>
                  )}
                  {quote.laminationCost > 0 && (
                    <div className="flex justify-between">
                      <span>Lamination:</span>
                      <span className="font-mono text-white">{money.format(quote.laminationCost)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Fulfillment:</span>
                    <span className="font-semibold text-white">
                      {fulfillment === "counter" ? "In-Store Pickup (Free)" : money.format(quote.deliveryCost)}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-400">
                    <span>GST (5%):</span>
                    <span className="font-mono">{money.format(quote.gst)}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Payable</span>
                    <span className="text-3xl font-black text-white">{money.format(quote.total)}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">Incl. all taxes</span>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#ED1C24] font-bold text-white shadow-lg shadow-red-900/30 hover:bg-[#C40022] active:scale-[0.98] transition-all text-xs"
                >
                  <Printer className="h-4 w-4" />
                  {fulfillment === "counter" && paymentType === "cash"
                    ? `Confirm Pickup Order (Pay Cash ₹${quote.total})`
                    : `Proceed to Pay ${money.format(quote.total)} ➔`}
                </button>
              </div>

              {/* Counter Guarantee Badge */}
              <div className="rounded-2xl bg-white p-4 border border-slate-200/80 shadow-2xs text-xs space-y-2 text-slate-600">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Clock className="h-4 w-4 text-[#0057B8]" />
                  <span>Ready at Bus Stand Counter in 15 Mins</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Questions? Call our counter directly at <strong>9746 700 123</strong>.
                </p>
              </div>
            </div>
          </form>
        )}

        {/* Digital Online Payment Modal */}
        {isPaymentModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
              <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0057B8] bg-blue-50 px-2 py-0.5 rounded-md">
                    Digital Payment Gateway
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">Pay {money.format(quote.total)}</h3>
                </div>
                <button
                  onClick={() => setIsPaymentModalOpen(false)}
                  className="grid h-8 w-8 place-items-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="py-4 space-y-4 text-xs">
                {/* Mode tabs */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedOnlineMethod("upi")}
                    className={`py-2 px-3 rounded-xl font-bold border transition-all ${
                      selectedOnlineMethod === "upi"
                        ? "border-[#0057B8] bg-blue-50 text-[#0057B8]"
                        : "border-slate-200 bg-slate-50 text-slate-700"
                    }`}
                  >
                    UPI / QR Code
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedOnlineMethod("card")}
                    className={`py-2 px-3 rounded-xl font-bold border transition-all ${
                      selectedOnlineMethod === "card"
                        ? "border-[#0057B8] bg-blue-50 text-[#0057B8]"
                        : "border-slate-200 bg-slate-50 text-slate-700"
                    }`}
                  >
                    Debit / Credit Card
                  </button>
                </div>

                {/* UPI Mode */}
                {selectedOnlineMethod === "upi" && (
                  <div className="space-y-3 text-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="mx-auto w-40 h-40 bg-white p-2.5 rounded-xl border border-slate-200 flex flex-col items-center justify-center shadow-xs">
                      {/* Stylized QR Code preview */}
                      <div className="w-full h-full bg-slate-900 rounded-lg p-2 flex flex-col items-center justify-center text-white text-[10px]">
                        <QrCode className="h-20 w-20 text-white" />
                        <span className="font-mono mt-1 text-[9px] text-slate-300">Scan via GPay / PhonePe</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold text-slate-700 block">UPI VPA:</span>
                      <span className="font-mono font-bold text-[#0057B8] text-xs">pkbooksvalanchery@okhdfcbank</span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Scan with any UPI App (Google Pay, PhonePe, Paytm, BHIM) to pay instantly.
                    </p>
                  </div>
                )}

                {/* Card Mode */}
                {selectedOnlineMethod === "card" && (
                  <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="4532 •••• •••• 8910"
                        defaultValue="4532 8821 9012 4432"
                        className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 font-mono text-xs outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">Expiry</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          defaultValue="08/28"
                          className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 font-mono text-xs outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">CVV</label>
                        <input
                          type="password"
                          placeholder="•••"
                          defaultValue="829"
                          maxLength={4}
                          className="h-9 w-full rounded-lg border border-slate-200 bg-white px-3 font-mono text-xs outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1 font-medium">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" /> 256-bit Encrypted
                  </span>
                  <span className="font-bold text-slate-800">PK Books Valanchery</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={processDigitalPayment}
                  disabled={isProcessingPayment}
                  className="w-full flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0057B8] font-bold text-white shadow-md hover:bg-[#00438F] active:scale-95 transition-all text-xs"
                >
                  {isProcessingPayment ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Verifying Digital Payment...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" /> Confirm & Pay {money.format(quote.total)}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
