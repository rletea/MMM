import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { comparePassword, signToken, COOKIE_NAME, SessionUser } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    let sessionUser: SessionUser = {
      id: `user-${cleanEmail.replace(/[^a-zA-Z0-9]/g, "")}`,
      email: cleanEmail,
      name: cleanEmail.split("@")[0],
      isDemo: false,
    };

    try {
      const user = await prisma.user.findUnique({
        where: { email: cleanEmail },
      });

      if (user) {
        const isValid = await comparePassword(password, user.passwordHash);
        if (!isValid) {
          return NextResponse.json(
            { error: "Invalid email or password." },
            { status: 401 }
          );
        }
        sessionUser = {
          id: user.id,
          email: user.email,
          name: user.name || user.email.split("@")[0],
          isDemo: false,
        };
      }
    } catch (dbErr) {
      console.warn("DB login lookup fallback:", dbErr);
    }

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
      { error: error.message || "Login failed." },
      { status: 500 }
    );
  }
}
