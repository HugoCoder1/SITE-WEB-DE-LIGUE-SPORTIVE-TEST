import { NextResponse } from "next/server";
import { matches } from "@/lib/data/matches";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");

  let data = matches;
  if (status === "finished" || status === "scheduled" || status === "live") {
    data = matches.filter((m) => m.status === status);
  }

  return NextResponse.json({ matches: data });
}
