import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME, verifyToken } from "@/lib/auth";
import { saveWizardAndGenerate } from "@/lib/repository";
import { WizardFormState } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get(COOKIE_NAME)?.value;
    const session = token ? verifyToken(token) : null;
    const userId = session ? session.id : "demo-user-01";

    const body = await req.json();
    const wizardState = body.wizardState as WizardFormState;
    const apiKey = body.apiKey as string | undefined;
    const provider = body.provider as "builtin" | "openai" | "gemini" | undefined;

    if (!wizardState || !wizardState.business || !wizardState.ikigai) {
      return NextResponse.json(
        { error: "Incomplete diagnostic questionnaire state provided." },
        { status: 400 }
      );
    }

    const payload = await saveWizardAndGenerate(userId, wizardState, apiKey, provider);

    return NextResponse.json({
      success: true,
      data: payload,
      message: "Diagnostic calculated and marketing strategy generated successfully.",
    });
  } catch (error: any) {
    console.error("Wizard submit error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process wizard submission." },
      { status: 500 }
    );
  }
}
