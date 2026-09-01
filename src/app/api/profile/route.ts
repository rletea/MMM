import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifyToken } from "@/lib/auth";
import { getUserProfile } from "@/lib/repository";
import { getDemoFullProfile } from "@/lib/mock-data";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const session = token ? verifyToken(token) : null;
    const lang = req.nextUrl.searchParams.get("lang") || "en";
    const forceDemo = req.nextUrl.searchParams.get("demo") === "true";

    // If explicit demo sandbox requested
    if (forceDemo) {
      const demoData = getDemoFullProfile(lang);
      return NextResponse.json({
        success: true,
        data: demoData,
        hasProfile: true,
        isDemo: true,
      });
    }

    if (!session) {
      // Unauthenticated visitor with no session
      return NextResponse.json({
        success: true,
        data: null,
        hasProfile: false,
        authenticated: false,
      });
    }

    const userId = session.id;
    const profile = await getUserProfile(userId, lang, session.isDemo);

    return NextResponse.json({
      success: true,
      data: profile,
      hasProfile: !!profile,
      authenticated: true,
      user: session,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch profile." },
      { status: 500 }
    );
  }
}
