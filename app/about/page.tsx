"use client";

import Link from "next/link";
import {
  Award,
  BookOpen,
  Boxes,
  Building2,
  CheckCircle2,
  Clock,
  Heart,
  MapPin,
  Phone,
  Printer,
  ShieldCheck,
  Sparkles,
  Users,
  Zap
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PKLogo, { PKBookIcon } from "@/components/PKLogo";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-slate-900">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50/80 via-white to-[#FAFAFA] border-b border-blue-100/60 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100/80 border border-blue-200 px-3.5 py-1 text-xs font-bold text-[#0056B3] mb-4">
            <Building2 className="h-3.5 w-3.5" /> Trusted Bookstore & Printing Hub in Valanchery
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            Empowering Students & Readers Across Malappuram
          </h1>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            Located at the heart of Valanchery Bus Stand, PK Books is your single destination for school curriculum packages, competitive exam rank files, stationery supplies, and 15-minute express digital printing.
          </p>
        </div>
      </section>

      {/* Store Key Highlights */}
      <section className="mx-auto max-w-7xl w-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "10,000+ Titles", desc: "Syllabus textbooks, PSC guides, medical & literature", icon: BookOpen, color: "text-[#ED1C24] bg-red-50" },
            { title: "15-Min Express Print", desc: "Fast online upload with counter pickup & thesis binding", icon: Printer, color: "text-[#0056B3] bg-blue-50" },
            { title: "Curriculum Bundles", desc: "Prescribed book & stationery packages for local schools", icon: Boxes, color: "text-[#0056B3] bg-blue-50" },
            { title: "GST Compliant & Trusted", desc: "GSTIN: 32CUEPP5402M1ZL with 100% verified billing", icon: ShieldCheck, color: "text-[#ED1C24] bg-red-50" }
          ].map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="rounded-3xl bg-white p-6 shadow-[0_10px_35px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col justify-between">
                <div className={`grid h-12 w-12 place-items-center rounded-2xl ${card.color} mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-slate-900">{card.title}</h3>
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed font-medium">{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Story & Location */}
        <div className="mt-12 rounded-3xl bg-white p-8 sm:p-12 shadow-[0_10px_35px_rgba(0,0,0,0.03)] border border-slate-100 grid gap-8 lg:grid-cols-2 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#0056B3] block mb-1">Our Heritage</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              A Complete Educational & Creative Partner
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              PK Books was established to bridge the gap between students, educators, and high-quality learning resources in Valanchery. Over the years, we have grown to provide complete school package distributions, specialized college textbook sourcing, competitive exam rank files, and state-of-the-art digital printing and binding services.
            </p>
            <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Whether you are a parent buying an annual school package, a college student submitting a final semester thesis, or an aspirant preparing for the Kerala PSC, our dedicated staff is here to help.
            </p>

            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-wrap gap-4">
              <Link
                href="/printing"
                className="h-11 px-5 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0056B3] text-xs font-bold text-white shadow-sm hover:bg-[#00438F] transition-all"
              >
                <Printer className="h-4 w-4" /> Try Online Print Counter
              </Link>
              <Link
                href="/contact"
                className="h-11 px-5 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <MapPin className="h-4 w-4 text-[#ED1C24]" /> Visit Store Location
              </Link>
            </div>
          </div>

          {/* Store Info Card */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-[#003E94] p-8 text-white shadow-xl space-y-6">
            <div>
              <PKLogo colorMode="white" size="lg" />
              <p className="mt-3 text-xs text-slate-300">
                Neetukkatil Complex, Bus Stand, Valanchery, Malappuram, Kerala - 676552
              </p>
            </div>

            <div className="space-y-3 text-xs pt-4 border-t border-white/15">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Store Timings</span>
                <span className="font-bold text-white">Daily 8:30 AM – 9:00 PM</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Primary Phone</span>
                <a href="tel:+919746700123" className="font-bold text-white hover:underline">9746 700 123</a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Secondary Phone</span>
                <a href="tel:+919995037373" className="font-bold text-white hover:underline">9995 037 373</a>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">GST Registration</span>
                <span className="font-mono font-bold text-emerald-300">32CUEPP5402M1ZL</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
