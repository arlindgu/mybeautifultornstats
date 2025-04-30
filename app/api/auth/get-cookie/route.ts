import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");

  if (!key) {
    return NextResponse.json({ error: "Cookie key is missing" }, { status: 400 });
  }

  const cookieStore = await cookies(); // kein await nötig
  const value = cookieStore.get(key)?.value;

  return NextResponse.json({ key, value });
}