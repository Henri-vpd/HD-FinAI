import { NextResponse } from "next/server";
import { fetchGeminiResponse } from "@/lib/gemini";

export async function POST(req) {
  try {
    const { message } = await req.json();
    if (!message) return NextResponse.json({ error: "Message is required" }, { status: 400 });

    const reply = await fetchGeminiResponse(message);
    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
