"use client";

import { products } from "@/lib/catalog";
import { Star } from "lucide-react";

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
});

const reviews = [
  {
    stars: 5,
    title: "Incredibly Inspiring Read",
    text: "\"A captivating journey from start to finish, this remarkable book combines rich characters with a well-paced plot, making it truly impossible to put down.\"",
    name: "Rahul Menon",
    location: "Customer from Valanchery",
    productId: "bio-wings-of-fire"
  },
  {
    stars: 5,
    title: "Perfect for PSC Preparation",
    text: "\"With its beautifully organized content and comprehensive coverage, this book is a must-have for anyone serious about cracking Kerala PSC exams.\"",
    name: "Sreelakshmi K",
    location: "Customer from Malappuram",
    productId: "psc-rank"
  },
  {
    stars: 5,
    title: "Noticeable Quality Difference",
    text: "\"Brimming with wisdom and emotion, this book draws you in with its authenticity, offering a deep exploration of life, culture, and the human spirit.\"",
    name: "Anwar Ibrahim",
    location: "Customer from Calicut",
    productId: "lit-aadu-jeevitham"
  }
];

export default function CustomerReviews() {
  return (
    <section className="py-10 sm:py-14 bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h2
          className="text-2xl sm:text-3xl font-extrabold text-center text-[#1a1a1a] mb-8 sm:mb-10"
          style={{ fontFamily: "var(--font-outfit), 'Outfit', serif" }}
        >
          Customer Reviews
        </h2>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {reviews.map((review, idx) => {
            const product = products.find((p) => p.id === review.productId);
            return (
              <div
                key={idx}
                className="border border-gray-100 rounded-2xl p-6 sm:p-7 flex flex-col"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-[#f5a623] fill-[#f5a623]"
                    />
                  ))}
                </div>

                {/* Review content */}
                <h4 className="text-sm font-bold text-[#1a1a1a] mb-2">
                  {review.title}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed flex-1">
                  {review.text}
                </p>

                {/* Reviewer */}
                <div className="mt-4 mb-5">
                  <p className="text-xs font-bold text-[#1a1a1a]">{review.name}</p>
                  <p className="text-[10px] text-gray-400">{review.location}</p>
                </div>

                {/* Associated product */}
                <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
                  {product && (
                    <>
                      <div className={`w-11 h-14 rounded-md bg-gradient-to-b ${product.imageTone} flex items-center justify-center p-1 flex-shrink-0`}>
                        <span className="text-[6px] font-bold text-white/80 text-center leading-tight">
                          {product.name.split(":")[0].slice(0, 20)}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-[#1a1a1a] line-clamp-1">
                          {product.name}
                        </p>
                        <p className="text-xs font-bold text-[#1a1a1a] mt-0.5">
                          {money.format(product.discountPrice)}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
