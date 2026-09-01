import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifyToken } from "@/lib/auth";
import { updatePostStatus } from "@/lib/repository";
import { ContentStatusType } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const session = token ? verifyToken(token) : null;
    const userId = session ? session.id : "demo-user-01";

    const { postIds, status } = await req.json();

    if (!Array.isArray(postIds) || !status) {
      return NextResponse.json({ error: "postIds and status are required." }, { status: 400 });
    }

    for (const id of postIds) {
      await updatePostStatus(userId, id, status as ContentStatusType);
    }

    return NextResponse.json({
      success: true,
      message: `Updated ${postIds.length} posts to ${status}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update batch status." },
      { status: 500 }
    );
  }
}
