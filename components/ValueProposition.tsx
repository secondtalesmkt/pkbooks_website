"use client";

import { Award, BookOpen, Headphones, ShieldCheck, Sparkles, Truck, Users } from "lucide-react";

const valueProps = [
  {
    icon: ShieldCheck,
    title: "100% Genuine Publisher Editions",
    description: "Every book is authentic and directly sourced from DC Books, Mathrubhumi, Universities Press, NCERT, and SCERT.",
    badge: "Authentic Guarantee",
    color: "text-[#0057B8]",
    bg: "bg-blue-50"
  },
  {
    icon: Truck,
    title: "Express Valanchery & Kerala Delivery",
    description: "Same-day order dispatch with fast doorstep delivery across Valanchery, Malappuram, and all districts in Kerala.",
    badge: "24h Dispatch",
    color: "text-[#ED1C24]",
    bg: "bg-red-50"
  },
  {
    icon: Sparkles,
    title: "Digital On-Demand Printing & Binding",
    description: "Upload study notes, research papers, or project records directly from your phone for instant laser printing and spiral binding.",
    badge: "High-Speed Press",
    color: "text-amber-600",
    bg: "bg-amber-50"
  },
  {
    icon: Headphones,
    title: "Dedicated Academic & Book Guidance",
    description: "Our experienced store staff in Valanchery is always ready to guide parents, schools, and competitive exam aspirants.",
    badge: "Local Support",
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  }
];

export default function ValueProposition() {
  return (
    <section className="py-14 sm:py-20 bg-white border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching BePaintStore */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-black uppercase tracking-widest text-[#0057B8]">
            Our Commitment to Excellence
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tight">
            A Passion for Knowledge & Quality
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Serving students, teachers, institutions, and readers in Kerala with unwavering dedication since our inception.
          </p>
        </div>

        {/* 4 Feature Columns Grid (BePaintStore Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {valueProps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group flex flex-col justify-between p-6 rounded-3xl bg-slate-50 border border-slate-200/80 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center ${item.color} shadow-xs group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7 stroke-[1.75]" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 bg-white px-2.5 py-1 rounded-full border border-slate-200">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center text-xs font-bold text-slate-400">
                  <span>PK Books Valanchery</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
