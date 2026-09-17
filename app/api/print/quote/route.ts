import { NextRequest, NextResponse } from "next/server";
import { calculatePrintQuote, type PrintQuoteInput } from "@/lib/pricing";

export async function POST(request: NextRequest) {
  const input = (await request.json()) as PrintQuoteInput;
  return NextResponse.json({ quote: calculatePrintQuote(input) });
}
