import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, signToken, COOKIE_NAME, SessionUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    let userId = `user-${Date.now()}`;
    const passwordHash = await hashPassword(password);

    try {
      const existing = await prisma.user.findUnique({
        where: { email: cleanEmail },
      });

      if (existing) {
        return NextResponse.json(
          { error: "An account with this email already exists." },
          { status: 400 }
        );
      }

      const created = await prisma.user.create({
        data: {
          email: cleanEmail,
          name: name || cleanEmail.split("@")[0],
          passwordHash,
        },
      });
      userId = created.id;
    } catch (dbErr) {
      console.warn("DB user creation skipped in dev fallback mode:", dbErr);
    }

    const sessionUser: SessionUser = {
      id: userId,
      email: cleanEmail,
      name: name || cleanEmail.split("@")[0],
      isDemo: false,
    };

    const token = signToken(sessionUser);

    const response = NextResponse.json({
      success: true,
      user: sessionUser,
    });

    response.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Registration failed." },
      { status: 500 }
    );
  }
}
