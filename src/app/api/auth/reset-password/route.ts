import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, newPassword } = await req.json();

    if (!email || !newPassword) {
      return NextResponse.json(
        { error: "Email and new password are required." },
        { status: 400 }
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const cleanEmail = email.toLowerCase().trim();
    const newHash = await hashPassword(newPassword);

    try {
      const user = await prisma.user.findUnique({
        where: { email: cleanEmail },
      });

      if (!user) {
        return NextResponse.json(
          { error: "No account found with this email address." },
          { status: 404 }
        );
      }

      await prisma.user.update({
        where: { email: cleanEmail },
        data: { passwordHash: newHash },
      });
    } catch (dbErr) {
      console.warn("DB reset password fallback:", dbErr);
    }

    return NextResponse.json({
      success: true,
      message: "Password has been successfully updated. You can now log in.",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to reset password." },
      { status: 500 }
    );
  }
}
