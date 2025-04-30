import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getFromUser } from "@/lib/apicalls";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies(); // kein await nötig
    const apiKey = cookieStore.get("apiKey")?.value;

    if (!apiKey) {
      return NextResponse.json({ error: "No API key found" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const selection = searchParams.get("selection") || "profile"; // <-- HIER

    const res = await getFromUser(apiKey, selection);

    return NextResponse.json(res);

  } catch (err) {
    console.error("❌ Fehler in /api/torn:", err);
    return NextResponse.json(
      { error: "Internal Server Error", message: (err as Error).message },
      { status: 500 }
    );
  }
}

