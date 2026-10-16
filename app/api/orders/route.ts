import { NextResponse } from "next/server";
import { orders, printJobs } from "@/lib/catalog";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({ orders, printJobs });
}

