"use client";

import { CheckCircle2, MessageSquareQuote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Dr. Anjali Nair",
    role: "Assistant Professor, Valanchery",
    rating: 5,
    quote: "PK Books is our go-to bookstore in Valanchery. Whether it's academic textbooks or contemporary Malayalam literature, their stock and speedy delivery are unmatched.",
    verified: "Verified Reader"
  },
  {
    name: "Muhammed Razi",
    role: "Kerala PSC Aspirant, Malappuram",
    rating: 5,
    quote: "Got my 2027 Kerala PSC Rank File delivered to my home within 24 hours of placing the order. The book came in immaculate condition with free practice OMR sheets!",
    verified: "Verified Buyer"
  },
  {
    name: "Sujith & Priya Kumar",
    role: "Parents of Class 8 Student, Tirur",
    rating: 5,
    quote: "The complete school package saved us hours of bookstore hopping. All NCERT textbooks, notebooks, and geometry sets packed neatly and delivered right to our door.",
    verified: "Verified Parent"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-14 sm:py-20 bg-slate-50 border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching BePaintStore */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-xs font-black uppercase tracking-widest text-[#ED1C24]">
            Community Voices
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">
            Testimonials
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Read authentic feedback from our readers, educators, and students across Kerala.
          </p>
        </div>

        {/* 3 Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="group flex flex-col justify-between p-6 sm:p-7 rounded-3xl bg-white border border-slate-200 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-slate-300 transition-all duration-300"
            >
              <div>
                {/* Top Stars & Verified Pill */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>{item.verified}</span>
                  </span>
                </div>

                {/* Quote Text */}
                <p className="text-sm text-slate-700 leading-relaxed italic">
                  &ldquo;{item.quote}&rdquo;
                </p>
              </div>

              {/* Author Details */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0057B8]/10 text-[#0057B8] flex items-center justify-center font-black text-sm">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
