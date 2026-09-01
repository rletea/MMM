import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifyToken } from "@/lib/auth";
import { getOrCreateUserProfile } from "@/lib/repository";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const session = token ? verifyToken(token) : null;
    const userId = session ? session.id : "demo-user-01";

    const profile = await getOrCreateUserProfile(userId);
    return NextResponse.json({ success: true, data: profile });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch profile." },
      { status: 500 }
    );
  }
}
