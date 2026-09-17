"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  User,
  Zap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Book Availability Inquiry");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    const text = encodeURIComponent(
      `*Contact Inquiry - PK Books Website*\n\n` +
      `👤 *Name:* ${name || "Customer"}\n` +
      `📞 *Phone:* ${phone || "N/A"}\n` +
      `📌 *Topic:* ${subject}\n` +
      `💬 *Message:* ${message}`
    );
    window.open(`https://wa.me/919746700123?text=${text}`, "_blank");
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-slate-900">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-red-50/80 via-white to-[#FAFAFA] border-b border-red-100/60 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-100/80 border border-red-200 px-3.5 py-1 text-xs font-bold text-[#ED1C24] mb-3">
            <Phone className="h-3.5 w-3.5" /> Customer Support & Store Visits
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Get in Touch with PK Books Valanchery
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Have a question about book availability, bulk school orders, or urgent thesis printing? Reach our counter staff directly via phone or WhatsApp.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="mx-auto max-w-7xl w-full px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          {/* Left: Store Cards */}
          <div className="space-y-5">
            {/* 1. Phone & WhatsApp */}
            <div className="rounded-3xl bg-white p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.03)] border border-slate-100 space-y-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-black text-slate-900 text-base">Direct Phone & WhatsApp</h3>
                  <p className="text-xs text-slate-500">Instant counter response</p>
                </div>
              </div>

              <div className="space-y-2.5 pt-2">
                <a
                  href="tel:+919746700123"
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-[#0056B3] transition-colors"
                >
                  <span>Primary Counter Line</span>
                  <span className="font-mono text-[#0056B3]">9746 700 123</span>
                </a>
                <a
                  href="tel:+919995037373"
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-800 hover:bg-blue-50 hover:text-[#0056B3] transition-colors"
                >
                  <span>Alternate Support Line</span>
                  <span className="font-mono text-[#0056B3]">9995 037 373</span>
                </a>
                <a
                  href="https://wa.me/919746700123"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800 hover:bg-emerald-100 transition-colors"
                >
                  <span>WhatsApp Chat</span>
                  <span className="flex items-center gap-1 font-semibold text-emerald-700">
                    Open Chat <ExternalLink className="h-3.5 w-3.5" />
                  </span>
                </a>
              </div>
            </div>

            {/* 2. Store Location & Timings */}
            <div className="rounded-3xl bg-white p-6 sm:p-7 shadow-[0_10px_35px_rgba(0,0,0,0.03)] border border-slate-100 space-y-4">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-[#0056B3]">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-black text-slate-900 text-base">Store Address</h3>
                  <p className="text-xs text-slate-500">Opposite/Near Bus Stand</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <strong>PK Books</strong><br />
                Neetukkatil Complex, Bus Stand<br />
                Valanchery, Malappuram District<br />
                Kerala, PIN: 676552
              </p>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 text-slate-600">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock className="h-4 w-4 text-blue-500" /> Daily Hours:
                </span>
                <span className="font-bold text-slate-900">8:30 AM – 9:00 PM</span>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="rounded-3xl bg-white p-7 sm:p-9 shadow-[0_10px_35px_rgba(0,0,0,0.03)] border border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0056B3] block mb-1">Direct Message</span>
            <h2 className="text-2xl font-black text-slate-900">Send an Inquiry to Counter</h2>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Fill out this form and our Valanchery counter staff will respond promptly on WhatsApp.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block text-xs font-bold text-slate-700">
                  Your Name
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs font-medium text-slate-800 outline-none focus:border-[#0056B3] focus:bg-white transition-all"
                  />
                </label>

                <label className="block text-xs font-bold text-slate-700">
                  Phone / WhatsApp Number
                  <input
                    type="tel"
                    required
                    placeholder="9746 700 123"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs font-medium text-slate-800 outline-none focus:border-[#0056B3] focus:bg-white transition-all"
                  />
                </label>
              </div>

              <label className="block text-xs font-bold text-slate-700">
                Inquiry Topic
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 text-xs font-bold text-slate-800 outline-none focus:border-[#0056B3]"
                >
                  <option value="Book Availability Inquiry">📖 Book Availability & Stock Check</option>
                  <option value="Online Print & Thesis Order">🖨️ Urgent Print / Thesis Binding Order</option>
                  <option value="School Kit Package Bulk Order">🎒 School Curriculum Package Inquiry</option>
                  <option value="Custom Notebooks / Gifts">🎨 Custom Notebooks & Merchandise</option>
                  <option value="General Inquiry">💬 Other General Inquiry</option>
                </select>
              </label>

              <label className="block text-xs font-bold text-slate-700">
                Your Message / Details
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what books, copies, or services you need..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 p-3.5 text-xs font-medium text-slate-800 outline-none focus:border-[#0056B3] focus:bg-white transition-all"
                />
              </label>

              <button
                type="submit"
                className="h-12 w-full flex items-center justify-center gap-2 rounded-xl bg-[#0056B3] text-xs font-bold text-white shadow-sm hover:bg-[#00438F] active:scale-[0.99] transition-all"
              >
                <Send className="h-4 w-4" /> Send Inquiry to Counter Staff ➔
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
