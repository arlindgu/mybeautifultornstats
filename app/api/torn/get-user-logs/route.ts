import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getLogsFromUser } from "@/lib/apicalls";

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const apiKey = cookieStore.get("apiKey")?.value;

    if (!apiKey) {
      return NextResponse.json({ error: "No API key found" }, { status: 401 });
    }

    const { searchParams } = request.nextUrl;
    const category = parseInt(searchParams.get("category") || "0", 10);
    const timestampTo = parseInt(searchParams.get("to") || "0", 10);

    const res = await getLogsFromUser(apiKey, category, timestampTo);

    return NextResponse.json(res);

  } catch (err) {
    console.error("❌ Fehler in /api/torn:", err);
    return NextResponse.json(
      { error: "Internal Server Error", message: (err as Error).message },
      { status: 500 }
    );
  }
}
