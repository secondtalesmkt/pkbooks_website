export type PrintQuoteInput = {
  pages: number;
  copies: number;
  color: "bw" | "color";
  side: "single" | "double";
  paper: "standard" | "premium" | "photo";
  binding: "none" | "staple" | "spiral" | "hard";
  lamination: boolean;
  delivery: "pickup" | "local" | "express";
};

const paperRates = {
  standard: 0,
  premium: 1.5,
  photo: 10
};

const bindingRates = {
  none: 0,
  staple: 12,
  spiral: 55,
  hard: 180
};

const deliveryRates = {
  pickup: 0,
  local: 45,
  express: 95
};

export function calculatePrintQuote(input: PrintQuoteInput) {
  const printableSides = input.side === "double" ? Math.ceil(input.pages / 2) : input.pages;
  const baseRate = input.color === "color" ? 8 : 2;
  const pageCost = printableSides * input.copies * (baseRate + paperRates[input.paper]);
  const bindingCost = bindingRates[input.binding] * input.copies;
  const finishingCost = input.lamination ? 35 * input.copies : 0;
  const subtotal = pageCost + bindingCost + finishingCost;
  const gst = Math.round(subtotal * 0.18);
  const delivery = deliveryRates[input.delivery];
  return {
    pageCost,
    bindingCost,
    finishingCost,
    gst,
    delivery,
    total: Math.round(subtotal + gst + delivery)
  };
}
