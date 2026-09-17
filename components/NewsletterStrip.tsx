"use client";

import { useState } from "react";
import { ArrowRight, Check, Mail, Sparkles } from "lucide-react";

export default function NewsletterStrip() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0057B8] via-[#00438F] to-slate-900 text-white p-8 sm:p-12 lg:p-16 text-center shadow-xl overflow-hidden">
          {/* Ambient Glow Circles */}
          <div className="absolute top-0 right-0 -mr-12 -mt-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-12 -mb-12 w-64 h-64 bg-[#ED1C24]/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-black uppercase tracking-wider text-white">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>PK Books VIP Readers Club</span>
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
              Subscribe our Newsletter
            </h2>

            <p className="text-sm sm:text-base text-blue-100 max-w-lg mx-auto leading-relaxed">
              Get <strong>₹100 OFF</strong> your first order, plus instant alerts for Kerala PSC rank files, new Malayalam book releases, and school packages.
            </p>

            {/* Form */}
            {subscribed ? (
              <div className="pt-4 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-sm font-bold">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Thank you! Welcome to the PK Books Readers Club.</span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pt-4 flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto">
                <div className="relative w-full">
                  <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="w-full pl-11 pr-4 py-3.5 rounded-full bg-white text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-white/40 shadow-inner"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#ED1C24] text-white text-sm font-bold shadow-lg hover:bg-[#C40022] hover:-translate-y-0.5 transition-all"
                >
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            <p className="text-[11px] text-blue-200/80 pt-2">
              We respect your privacy. No spam, unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
