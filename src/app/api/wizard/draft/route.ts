import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifyToken } from "@/lib/auth";
import { saveWizardDraft } from "@/lib/repository";
import { WizardFormState } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const session = token ? verifyToken(token) : null;

    if (!session || !session.id) {
      return NextResponse.json({
        success: false,
        message: "No active authenticated session for server draft",
      });
    }

    const body = await req.json();
    const wizardState = body.wizardState as Partial<WizardFormState>;
    const language = (body.language as string) || "en";

    const res = await saveWizardDraft(session.id, wizardState, language);

    return NextResponse.json({
      success: res.success,
      message: res.message || "Draft auto-saved to database successfully",
    });
  } catch (error: any) {
    console.error("Wizard draft error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process wizard draft." },
      { status: 500 }
    );
  }
}
