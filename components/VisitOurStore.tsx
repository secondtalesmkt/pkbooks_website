"use client";

import { MapPin, Phone, Mail, Clock, ArrowRight, ExternalLink, Navigation, Sparkles } from "lucide-react";

export default function VisitOurStore() {
  const mapLink = "https://share.google/NRW6kQ1GOlQiZ9C5";

  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#0057B8] mb-1.5">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Valanchery Flagship Store</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Visit Our Store &amp; Print Counter
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pick up print orders in 15 minutes, browse bestselling books, and explore complete school stationery kits.
          </p>
        </div>

        {/* Store Card with Embedded Google Map */}
        <div className="rounded-3xl overflow-hidden bg-white shadow-xl border border-slate-200/80 grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
          {/* Left Column: Store Information */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 lg:p-10 bg-slate-50/60 border-b lg:border-b-0 lg:border-r border-slate-200/80">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100/90 text-emerald-800 border border-emerald-200 px-3 py-1 text-xs font-bold mb-4">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Open Now · 8:30 AM – 9:00 PM</span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 mb-1">
                PK Books &amp; Stationery
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Books · Stationery · Digital Printing &amp; Binding
              </p>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-100/60 text-[#0057B8] grid place-items-center shrink-0 mt-0.5">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Store Address</span>
                    <span className="text-slate-600 leading-relaxed">
                      Neetukkatil Complex, Near Private Bus Stand,<br />
                      Valanchery, Malappuram, Kerala - 676552
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100/60 text-emerald-700 grid place-items-center shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Phone &amp; WhatsApp</span>
                    <a href="tel:+919746700123" className="text-slate-600 hover:text-[#0057B8] transition-colors">
                      +91 9746 700 123
                    </a>
                    <span className="text-slate-400 mx-1.5">/</span>
                    <a href="tel:+919995037373" className="text-slate-600 hover:text-[#0057B8] transition-colors">
                      9995 037 373
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-100/60 text-amber-800 grid place-items-center shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Working Hours</span>
                    <span className="text-slate-600">Monday – Sunday, 8:30 AM – 9:00 PM</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-purple-100/60 text-purple-700 grid place-items-center shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Support Email</span>
                    <span className="text-slate-600">pkbooks.valanchery@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 mt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-3">
              <a
                href={mapLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0057B8] hover:bg-[#004799] text-white px-5 py-2.5 text-xs font-bold shadow-md shadow-blue-500/20 transition-all active:scale-98"
              >
                <Navigation className="h-3.5 w-3.5" />
                <span>Get Google Maps Directions</span>
                <ExternalLink className="h-3 w-3 opacity-80" />
              </a>

              <a
                href="https://wa.me/919746700123"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 px-4 py-2.5 text-xs font-bold transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Right Column: Live Embedded Google Map */}
          <div className="lg:col-span-7 relative min-h-[340px] lg:min-h-full w-full bg-slate-100">
            <iframe
              title="PK Books Valanchery Location Map"
              src="https://maps.google.com/maps?q=PK+Books,+Neetukkatil+Complex,+Near+Bus+Stand,+Valanchery,+Malappuram,+Kerala+676552&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full min-h-[340px] lg:min-h-[440px] border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Floating Quick Action Overlay Pill */}
            <a
              href={mapLink}
              target="_blank"
              rel="noreferrer"
              className="absolute top-3 right-3 bg-white/95 hover:bg-white backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-slate-800 shadow-md border border-slate-200/70 flex items-center gap-1.5 transition-all hover:scale-105"
            >
              <Navigation className="h-3.5 w-3.5 text-[#0057B8]" />
              <span>Open in Google Maps</span>
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
