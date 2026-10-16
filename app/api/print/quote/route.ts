import { NextResponse } from "next/server";
import { calculatePrintQuote } from "@/lib/pricing";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    quote: calculatePrintQuote({
      pages: 10,
      copies: 1,
      color: "bw",
      side: "double",
      paper: "standard",
      binding: "none",
      lamination: false,
      delivery: "pickup"
    })
  });
}


