import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifyToken } from "@/lib/auth";
import { IkigaiData } from "@/lib/types";
import { analyzeIkigaiBusinessFit } from "@/lib/ikigai-analyzer";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const session = token ? verifyToken(token) : null;

    const body = await req.json();
    const ikigai = body.ikigai as IkigaiData;
    const language = (body.language as string) || "en";
    const apiKey = body.apiKey as string | undefined;
    const provider = body.provider as "builtin" | "openai" | "gemini" | undefined;

    if (!ikigai) {
      return NextResponse.json(
        { error: "Ikigai data must be provided for fit analysis." },
        { status: 400 }
      );
    }

    const result = await analyzeIkigaiBusinessFit(ikigai, language, apiKey, provider);

    return NextResponse.json({
      success: true,
      data: result,
      message: "Ikigai business fit analysis completed successfully.",
    });
  } catch (error: any) {
    console.error("Ikigai fit analysis error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to analyze Ikigai business fit." },
      { status: 500 }
    );
  }
}
