import { NextRequest, NextResponse } from "next/server";
import { signToken, COOKIE_NAME, SessionUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const demoUser: SessionUser = {
    id: "demo-user-01",
    email: "founder@nexusgrowth.io",
    name: "Alex Vance (Founder)",
    isDemo: true,
  };

  const token = signToken(demoUser);

  const response = NextResponse.json({
    success: true,
    user: demoUser,
  });

  response.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  });

  return response;
}
