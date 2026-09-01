import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifyToken } from "@/lib/auth";
import { updatePostStatus } from "@/lib/repository";
import { ContentStatusType } from "@/lib/types";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const session = token ? verifyToken(token) : null;
    const userId = session ? session.id : "demo-user-01";

    const { status } = await req.json();
    const validStatuses: ContentStatusType[] = ["DRAFT", "SCHEDULED", "COPIED", "PUBLISHED"];

    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid content status." }, { status: 400 });
    }

    await updatePostStatus(userId, params.id, status);

    return NextResponse.json({
      success: true,
      message: `Post ${params.id} updated to ${status}`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to update status." },
      { status: 500 }
    );
  }
}
