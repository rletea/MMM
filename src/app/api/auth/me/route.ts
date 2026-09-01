import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, signToken, verifyToken, SessionUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) {
    // If no session cookie, return a default demo session user so user can explore seamlessly
    const demoUser: SessionUser = {
      id: "demo-user-01",
      email: "founder@nexusgrowth.io",
      name: "Alex Vance (Demo)",
      isDemo: true,
    };
    return NextResponse.json({ user: demoUser, authenticated: false });
  }

  const user = verifyToken(token);
  if (!user) {
    return NextResponse.json({ user: null, authenticated: false }, { status: 401 });
  }

  return NextResponse.json({ user, authenticated: true });
}
