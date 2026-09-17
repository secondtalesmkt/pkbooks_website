import { NextResponse } from "next/server";
import { orders, printJobs } from "@/lib/catalog";

export async function GET() {
  return NextResponse.json({ orders, printJobs });
}
