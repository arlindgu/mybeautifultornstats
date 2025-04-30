import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { key, value } = await req.json();

  if (!key || typeof value !== "string") {
    return NextResponse.json({ error: "Invalid key or value" }, { status: 400 });
  }

  const cookieStore = await cookies();
  cookieStore.set(key, value, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
  });

  return NextResponse.json({ success: true });
}